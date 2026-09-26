<?php
/**
 * Güzelyalı Dönercisi - İletişim Formu İşleyicisi
 * 
 * Özellikler:
 * - Honeypot spam koruması (gizli alan kontrolü)
 * - IP bazlı oran sınırlama (10 dakikada en fazla 3 mesaj)
 * - Veri doğrulama ve temizleme
 * - Güvenli kayıt tutma (Web'den erişilemeyen dizine)
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedDomains = [
    'https://guzelyalidonercisi.com',
    'https://www.guzelyalidonercisi.com',
    'http://localhost:4321',
    'http://localhost:3000'
];

if (in_array($origin, $allowedDomains, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Geçersiz istek yöntemi.']);
    exit;
}

// 1. IP Tespiti & Rate Limiting
function getClientIp(): string {
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ips = explode(',', $_SERVER[$key]);
            $ip = trim($ips[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '127.0.0.1';
}

$clientIp = getClientIp();
$rateLimitDir = sys_get_temp_dir() . '/guzelyali_contact_limit';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0700, true);
}

$ipHash = md5($clientIp);
$rateFile = $rateLimitDir . '/' . $ipHash . '.json';
$now = time();
$requests = [];

if (file_exists($rateFile)) {
    $data = @json_decode((string)file_get_contents($rateFile), true);
    if (is_array($data)) {
        // Son 600 saniye (10 dakika) içindeki gönderimler
        $requests = array_filter($data, fn($ts) => ($now - $ts) < 600);
    }
}

if (count($requests) >= 3) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'error' => 'Kısa süre içinde birden fazla mesaj gönderdiniz. Lütfen birkaç dakika bekleyin.'
    ]);
    exit;
}

// 2. Girdileri Doğrulama
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Geçersiz form verisi.']);
    exit;
}

// Honeypot kontrolü (Botlar bu gizli alanı doldurur)
if (!empty($data['website_url']) || !empty($data['_gotcha'])) {
    // Bot yakalandı: Başarılı gibi gösterip sessizce sonlandır
    echo json_encode(['success' => true, 'message' => 'Mesajınız başarıyla iletildi.']);
    exit;
}

$name = trim(strip_tags((string)($data['fullName'] ?? '')));
$phone = trim(strip_tags((string)($data['phone'] ?? '')));
$email = trim(strip_tags((string)($data['email'] ?? '')));
$message = trim(strip_tags((string)($data['message'] ?? '')));

if (mb_strlen($name) < 2 || mb_strlen($name) > 80) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen geçerli bir ad ve soyad girin.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen geçerli bir e-posta adresi girin.']);
    exit;
}

if (mb_strlen($message) < 5 || mb_strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen en az 5 karakterlik bir mesaj yazın.']);
    exit;
}

// Rate limiti güncelle
$requests[] = $now;
@file_put_contents($rateFile, json_encode($requests), LOCK_EX);

// 3. Mesajı Güvenli Şekilde Kaydet
$logEntry = [
    'timestamp' => date('c'),
    'ip' => $clientIp,
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'message' => $message
];

$storageDir = sys_get_temp_dir() . '/guzelyali_messages';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0700, true);
}
@file_put_contents(
    $storageDir . '/contacts_' . date('Y-m') . '.log',
    json_encode($logEntry, JSON_UNESCAPED_UNICODE) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

// Başarılı yanıt
echo json_encode([
    'success' => true,
    'message' => 'Teşekkür ederiz! Mesajınız ekibimize ulaştı, en kısa sürede dönüş yapacağız.'
], JSON_UNESCAPED_UNICODE);
exit;
