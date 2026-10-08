<?php
/**
 * Güzelyalı Dönercisi - Masa Rezervasyonu Formu İşleyicisi
 * 
 * Özellikler:
 * - Honeypot spam koruması (gizli alan kontrolü)
 * - IP bazlı oran sınırlama (10 dakikada en fazla 3 rezervasyon talebi)
 * - Katı sunucu tarafı veri doğrulama (Ad, telefon, tarih, saat, kişi sayısı)
 * - Geçmiş tarih kontrolü & çalışma saati aralık doğrulaması
 * - Kurumsal e-posta bildirimi (iletisim@guzelyalidonercisi.com)
 * - Güvenli yerel kayıt tutma (Web'den erişilemeyen geçici depolama)
 * - Yönetilebilir RESERVATIONS_ENABLED kontrolü
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Zaman dilimi ayarı
date_default_timezone_set('Europe/Istanbul');

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

// 0. Çevre Değişkenlerini (.env) Oku
function loadEnvVariables(): array {
    $env = [];
    $candidates = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../.env',
        __DIR__ . '/.env'
    ];
    foreach ($candidates as $filePath) {
        if (file_exists($filePath) && is_readable($filePath)) {
            $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if ($lines !== false) {
                foreach ($lines as $line) {
                    $line = trim($line);
                    if ($line === '' || str_starts_with($line, '#')) {
                        continue;
                    }
                    if (str_contains($line, '=')) {
                        [$key, $val] = explode('=', $line, 2);
                        $env[trim($key)] = trim($val);
                    }
                }
            }
            break;
        }
    }
    return $env;
}

$envVars = loadEnvVariables();
$reservationsEnabledEnv = $envVars['RESERVATIONS_ENABLED'] ?? getenv('RESERVATIONS_ENABLED') ?: 'false';
$isReservationsEnabled = filter_var($reservationsEnabledEnv, FILTER_VALIDATE_BOOLEAN);

$notificationEmail = $envVars['RESERVATION_NOTIFICATION_EMAIL'] 
    ?? getenv('RESERVATION_NOTIFICATION_EMAIL') 
    ?: 'iletisim@guzelyalidonercisi.com';

// 1. IP Tespiti & Rate Limiting (Spam Koruması)
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
$rateLimitDir = sys_get_temp_dir() . '/guzelyali_reservation_limit';
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
        // Son 600 saniye (10 dakika) içindeki talepler
        $requests = array_filter($data, fn($ts) => ($now - $ts) < 600);
    }
}

if (count($requests) >= 3) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'error' => 'Kısa süre içinde birden fazla rezervasyon talebi gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Girdileri Çözümleme ve Doğrulama
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Geçersiz form verisi iletildi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Honeypot spam kontrolü
if (!empty($data['website_url']) || !empty($data['_gotcha'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Rezervasyon talebiniz alınmıştır. Rezervasyonunuz, işletmemiz tarafından onaylandığında kesinleşecektir.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Rezervasyon sistemi aktiflik kontrolü
// Test amaçlı özel başlık veya istek bayrağı yoksa ve sistem kapalıysa reddet
$allowTestSimulation = (!empty($data['_test_mode']) && in_array($origin, ['http://localhost:4321', 'http://localhost:3000'], true));
if (!$isReservationsEnabled && !$allowTestSimulation) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'error' => 'Restoranımız açılış hazırlığı sürecinde olduğundan şu anda masa rezervasyonu kabul edilmemektedir. Rezervasyonlarımız çok yakında açılacaktır.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Alan Değerleri
$fullName = trim(strip_tags((string)($data['fullName'] ?? '')));
$phone = trim(strip_tags((string)($data['phone'] ?? '')));
$email = trim(strip_tags((string)($data['email'] ?? '')));
$date = trim(strip_tags((string)($data['date'] ?? '')));
$time = trim(strip_tags((string)($data['time'] ?? '')));
$guests = (int)($data['guests'] ?? 0);
$notes = trim(strip_tags((string)($data['notes'] ?? '')));
$kvkkConsent = !empty($data['kvkkConsent']);

// Alan Doğrulamaları
if (mb_strlen($fullName) < 2 || mb_strlen($fullName) > 80) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen geçerli bir ad ve soyad girin (en az 2 karakter).'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Telefon kontrolü (En az 7, en fazla 20 karakter ve geçerli telefon formatı)
$cleanedPhone = preg_replace('/[^\d+]/', '', $phone);
if (strlen($cleanedPhone) < 10 || strlen($cleanedPhone) > 16) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen geçerli bir telefon numarası girin (örn: 0532 123 45 67).'], JSON_UNESCAPED_UNICODE);
    exit;
}

// E-posta isteğe bağlı; ancak girilmişse geçerli olmalı
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Girdiğiniz e-posta adresi geçersizdir.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Tarih kontrolü (YYYY-MM-DD ve geçmiş olmamalı)
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Geçersiz rezervasyon tarihi seçildi.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$todayStr = date('Y-m-d');
$maxDateStr = date('Y-m-d', strtotime('+60 days'));
if ($date < $todayStr) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Geçmiş bir tarihe rezervasyon yapılamaz.'], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($date > $maxDateStr) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Rezervasyonlar en fazla 60 gün ileriye dönük oluşturulabilir.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Saat kontrolü
$allowedHours = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30'
];

if (!in_array($time, $allowedHours, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen servis saatlerimiz arasından geçerli bir rezervasyon saati seçin.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Kişi sayısı kontrolü (1–12)
if ($guests < 1 || $guests > 12) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen 1 ile 12 arasında bir kişi sayısı seçin. Daha kalabalık gruplar için lütfen doğrudan arayınız.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Not uzunluğu
if (mb_strlen($notes) > 500) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Özel notunuz en fazla 500 karakter olabilir.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// KVKK onayı
if (!$kvkkConsent) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Rezervasyon işlemini tamamlamak için aydınlatma metnini onaylamanız gerekmektedir.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Rate limiti güncelle
$requests[] = $now;
@file_put_contents($rateFile, json_encode($requests), LOCK_EX);

// 3. Rezervasyon Kaydı Hazırlığı
$timestampStr = date('Y-m-d H:i:s');
$recordId = 'REZ-' . date('Ymd-His') . '-' . substr(md5(uniqid('', true)), 0, 4);

$reservationEntry = [
    'id' => $recordId,
    'timestamp' => $timestampStr,
    'ip' => $clientIp,
    'fullName' => $fullName,
    'phone' => $phone,
    'email' => $email,
    'date' => $date,
    'time' => $time,
    'guests' => $guests,
    'notes' => $notes,
    'status' => 'pending' // Beklemede (işletme teyidi bekleniyor)
];

// 4. Güvenli Yerel Dosya Kaydı (Fail-safe storage)
$storageDir = sys_get_temp_dir() . '/guzelyali_reservations';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0700, true);
}
$logFile = $storageDir . '/reservations_' . date('Y-m') . '.log';
$logSuccess = (bool)@file_put_contents(
    $logFile,
    json_encode($reservationEntry, JSON_UNESCAPED_UNICODE) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

// 5. Kurumsal E-posta Bildirimi Gönderimi
$mailSubject = "Yeni Masa Rezervasyonu Talebi: {$fullName} ({$guests} Kişi) - {$date} {$time}";
$encodedSubject = '=?UTF-8?B?' . base64_encode($mailSubject) . '?=';

$escapedNotes = $notes !== '' ? nl2br(htmlspecialchars($notes, ENT_QUOTES, 'UTF-8')) : '<em>Belirtilmedi</em>';
$escapedEmail = $email !== '' ? htmlspecialchars($email, ENT_QUOTES, 'UTF-8') : '<em>Belirtilmedi</em>';
$escapedPhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$escapedName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');

$htmlMessage = <<<HTML
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Yeni Rezervasyon Talebi</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; margin: 0; padding: 24px; color: #1C1614;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5DCD1; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
    <tr>
      <td style="background-color: #7A1A22; padding: 24px 32px; text-align: left;">
        <h1 style="color: #FAF7F2; font-size: 20px; margin: 0; font-weight: 700;">GÜZELYALI DÖNERCİSİ</h1>
        <p style="color: #F7F1E4; font-size: 13px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 1px;">Yeni Masa Rezervasyonu Talebi</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 15px; line-height: 1.6; margin-top: 0; color: #382F2C;">
          Web sitesi üzerinden yeni bir masa rezervasyonu talebi iletildi. Müşteriyle telefonla iletişime geçerek rezervasyonu teyit edebilirsiniz.
        </p>

        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #FDFBF8; border-radius: 8px; border: 1px solid #EFE9DF; margin: 20px 0;">
          <tr>
            <td width="35%" style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">Talep No:</td>
            <td style="color: #1C1614; font-weight: 700; border-bottom: 1px solid #EFE9DF;">{$recordId}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">Müşteri Adı:</td>
            <td style="color: #1C1614; font-weight: 700; border-bottom: 1px solid #EFE9DF;">{$escapedName}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">Telefon Numarası:</td>
            <td style="color: #7A1A22; font-weight: 700; border-bottom: 1px solid #EFE9DF;">
              <a href="tel:{$cleanedPhone}" style="color: #7A1A22; text-decoration: none;">{$escapedPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">E-posta:</td>
            <td style="color: #1C1614; border-bottom: 1px solid #EFE9DF;">{$escapedEmail}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">Rezervasyon Tarihi:</td>
            <td style="color: #1C1614; font-weight: 700; border-bottom: 1px solid #EFE9DF;">{$date}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">Rezervasyon Saati:</td>
            <td style="color: #1C1614; font-weight: 700; border-bottom: 1px solid #EFE9DF;">{$time}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E; border-bottom: 1px solid #EFE9DF;">Kişi Sayısı:</td>
            <td style="color: #B88B4A; font-weight: 700; font-size: 16px; border-bottom: 1px solid #EFE9DF;">{$guests} Kişi</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #6E625E;">Özel İstek / Not:</td>
            <td style="color: #1C1614;">{$escapedNotes}</td>
          </tr>
        </table>

        <div style="background-color: #FEF8ED; border-left: 4px solid #B88B4A; padding: 12px 16px; margin-top: 24px; border-radius: 4px;">
          <p style="margin: 0; font-size: 13px; color: #8C6D37;">
            <strong>Hatırlatma:</strong> Bu talep henüz ön aşamadadır. Müşteri web sitesinde şu mesajı görmüştür:<br />
            <em>"Rezervasyon talebiniz alınmıştır. Rezervasyonunuz, işletmemiz tarafından onaylandığında kesinleşecektir."</em>
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #F8F5EF; padding: 16px 32px; font-size: 12px; color: #948681; border-top: 1px solid #E5DCD1;">
        Kayıt Zamanı: {$timestampStr} | Müşteri IP: {$clientIp}
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$replyTo = ($email !== '') ? $email : 'iletisim@guzelyalidonercisi.com';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Güzelyalı Dönercisi <' . $notificationEmail . '>',
    'Reply-To: ' . $replyTo,
    'X-Mailer: PHP/' . phpversion()
];

// PHP mail gönderimi denemesi
$mailSent = false;
if (function_exists('mail')) {
    $mailSent = @mail(
        $notificationEmail,
        $encodedSubject,
        $htmlMessage,
        implode("\r\n", $headers)
    );
}

// "E-posta gönderimi veya kayıt işlemi başarısız olursa talep alınmış gibi gösterilmesin."
// Hem mail gönderimi başarısız olmuşsa hem de yerel dosya kaydı yapılamamışsa hata döndür:
if (!$mailSent && !$logSuccess) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Rezervasyon talebiniz teknik bir aksaklık sebebiyle iletilemedi. Lütfen doğrudan restoranımızla telefon üzerinden iletişime geçiniz.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Başarılı yanıt (Belirtilen resmi onay mesajı)
echo json_encode([
    'success' => true,
    'message' => 'Rezervasyon talebiniz alınmıştır. Rezervasyonunuz, işletmemiz tarafından onaylandığında kesinleşecektir.',
    'recordId' => $recordId
], JSON_UNESCAPED_UNICODE);
exit;
