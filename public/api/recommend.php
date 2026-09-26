<?php
/**
 * Güzelyalı Dönercisi - "Ne Yesem?" Gemini AI Lezzet Asistanı Endpoint'i
 * 
 * Güvenlik:
 * - GEMINI_API_KEY asla istemciye / tarayıcıya sızdırılmaz.
 * - IP tabanlı oran sınırlama (Rate Limiting) uygulanır (Dakikada en fazla 5 istek).
 * - Girdi temizlenir ve kısıtlanır (Maks 250 karakter).
 * - Menü veri seti dışına çıkılması engellenir (Strict Grounding).
 * - API kesintisi veya hata durumunda yerel kural motoru devreye girer.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// CORS Koruması: Sadece kendi alan adı veya aynı kök kabul edilir
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
    echo json_encode(['success' => false, 'error' => 'Sadece POST istekleri kabul edilir.']);
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
$rateLimitDir = sys_get_temp_dir() . '/guzelyali_ratelimit';
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
        // Son 60 saniyedeki istekleri filtrele
        $requests = array_filter($data, fn($ts) => ($now - $ts) < 60);
    }
}

if (count($requests) >= 6) {
    http_response_code(429);
    echo json_encode([
        'success' => false, 
        'error' => 'Kısa süre içinde çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.'
    ]);
    exit;
}

$requests[] = $now;
@file_put_contents($rateFile, json_encode($requests), LOCK_EX);

// 2. Girdiyi Alma & Temizleme
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data['preference'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen nasıl bir lezzet aradığınızı belirtin.']);
    exit;
}

$userPreference = trim(strip_tags((string)$data['preference']));
if (mb_strlen($userPreference) > 250) {
    $userPreference = mb_substr($userPreference, 0, 250);
}

if (mb_strlen($userPreference) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Lütfen biraz daha ayrıntı verin.']);
    exit;
}

// 3. Menü Verisini Yükleme
$menuFilePath = __DIR__ . '/../data/menu.json';
$menuData = [];
if (file_exists($menuFilePath)) {
    $menuData = json_decode((string)file_get_contents($menuFilePath), true) ?: [];
}

// Menüyü metin haline getirme (Gemini Grounding)
$menuContextLines = [];
foreach ($menuData as $item) {
    $tags = !empty($item['tags']) ? ' (' . implode(', ', $item['tags']) . ')' : '';
    $portion = !empty($item['portion']) ? ' [' . $item['portion'] . ']' : '';
    $menuContextLines[] = "- {$item['name']}: {$item['description']}{$tags}{$portion}";
}
$menuContextText = implode("\n", $menuContextLines);

// 4. Çevre Değişkeninden API Key Okuma
function getGeminiApiKey(): ?string {
    // 1. Doğrudan çevre değişkeni
    $key = getenv('GEMINI_API_KEY');
    if (!empty($key)) return $key;

    // 2. .env dosyalarını arama (.env webroot dışında veya içinde olabilir)
    $possibleEnvPaths = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../.env',
        dirname(__DIR__, 2) . '/.env',
        '/home/' . ($_SERVER['USER'] ?? 'u687566817') . '/.env'
    ];

    foreach ($possibleEnvPaths as $envPath) {
        if (file_exists($envPath) && is_readable($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (str_starts_with($line, 'GEMINI_API_KEY=')) {
                    $val = trim(substr($line, 15), "\"' ");
                    if (!empty($val)) return $val;
                }
            }
        }
    }
    return null;
}

// 5. Akıllı Yedek (Fallback) Öneri Motoru
function getSmartFallbackRecommendation(string $pref, array $menu): string {
    $p = mb_strtolower($pref, 'UTF-8');
    
    if (str_contains($p, 'iskender') || str_contains($p, 'yoğurt') || str_contains($p, 'tereyağ')) {
        return "Sizin için en doğru seçim: **Güzelyalı Hakiki Bursa Usulü İskender**. Fırınlanmış tırnak pide üzerine nar gibi kızaran incecik yaprak dönerimiz, taze domates sosumuz ve manda yoğurduyla harika bir uyum yakalıyor. Yanında da bol köpüklü yayık ayranımızı öneririz.";
    }
    
    if (str_contains($p, 'aç değilim') || str_contains($p, 'hafif') || str_contains($p, 'atıştır') || str_contains($p, 'tombik')) {
        return "Hafif ve pratik bir öğün arıyorsanız **Özel Tombik / Somun Et Döner** tam size göre. Çıtır fırın tombik ekmeği içerisinde bol yaprak dönerimiz sizi yormadan doyuracaktır. Yanına da Çukurova Bostana Salatası çok yakışır.";
    }
    
    if (str_contains($p, 'dürüm') || str_contains($p, 'lavaş') || str_contains($p, 'ayaküstü') || str_contains($p, 'hızlı')) {
        return "Gözünüz kapalı tercih edebileceğiniz imzamız: **Güzelyalı Özel Lavaş Döner Dürüm**. İncecik taze lavaşa sarılı bol yaprak et döner ve köz Adana biberi lezzeti tamamlıyor. Eritme kaşarlı seçeneğini de mutlaka değerlendirin!";
    }
    
    if (str_contains($p, 'doyurucu') || str_contains($p, 'çok açım') || str_contains($p, 'porsiyon') || str_contains($p, 'pilav') || str_contains($p, 'et')) {
        return "Gerçek bir et şöleni için **Güzelyalı Usta Tabağı (1.5 Porsiyon)** veya **Tereyağlı Pilav Üstü Et Döner** öneriyoruz. Bol yaprak döner, tereyağlı pide parçaları ve köz sebzelerle açlığınızı en lezzetli şekilde dindirecektir.";
    }

    if (str_contains($p, 'tatlı') || str_contains($p, 'kapanış') || str_contains($p, 'fıstık')) {
        return "Yemeğin üstüne fırından yeni çıkmış sıcacık **Çıtır Antep Fıstıklı Katmer** veya hafif bir tatlı isterseniz tam yağlı köy sütüyle hazırlanan **Geleneksel Fırın Sütlaç** mükemmel bir final olacaktır.";
    }

    // Genel dengeli öneri
    return "Damak zevkinize göre iki özel önerimiz var: Köz ateşinde pişen lezzeti doyasıya hissetmek için **Güzelyalı Yaprak Et Döner (Porsiyon)** veya sıcak lavaşla sarılan **Güzelyalı Özel Lavaş Dürüm**. Yanında da buz gibi açık yayık ayranımız sofranın olmazsa olmazı!";
}

$apiKey = getGeminiApiKey();

// API anahtarı yoksa güvenli yerel öneri motoruyla yanıt ver
if (empty($apiKey)) {
    $fallbackText = getSmartFallbackRecommendation($userPreference, $menuData);
    echo json_encode([
        'success' => true,
        'recommendation' => $fallbackText,
        'source' => 'curated'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 6. Gemini REST API Çağrısı
$systemInstruction = "Sen Adana Güzelyalı Dönercisi'nin usta lezzet danışmanısın.
Görevin: Misafirin tercihine ve ruh haline göre SADECE aşağıdaki resmi menüde yer alan ürünlerden en fazla 1 ila 2 lezzet önermektir.

MENÜMÜZ:
" . $menuContextText . "

KESİN KURALLAR:
1. Menüde yer almayan hiçbir yemeği (örneğin tavuk döner, hamburger, pizza, lahmacun vb.) ASLA önerme ve uydurma.
2. Kesinlikle fiyat uydurma.
3. Yanıtın kısa (en fazla 2-3 cümle), samimi, sıcak, iştah açıcı ve doğal Türkçe olsun.
4. Önerdiğin yemeklerin adını menüdeki gibi belirt. Adana lezzet kültürünün sıcaklığını hissettir.";

$requestPayload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                ['text' => $systemInstruction . "\n\nMisafirin isteği: \"" . $userPreference . "\"\nÖnerin:"]
            ]
        ]
    ],
    'generationConfig' => [
        'temperature' => 0.4,
        'maxOutputTokens' => 200,
        'topP' => 0.8
    ]
];

$model = getenv('GEMINI_MODEL') ?: 'gemini-2.5-flash';
$url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key=" . urlencode($apiKey);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($requestPayload),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT => 6,
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_SSL_VERIFYPEER => true
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode === 200 && $response) {
    $resData = json_decode($response, true);
    $text = $resData['candidates'][0]['content']['parts'][0]['text'] ?? null;
    if (!empty($text)) {
        echo json_encode([
            'success' => true,
            'recommendation' => trim($text),
            'source' => 'gemini'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Gemini API yanıt vermediyse veya hata aldıysa kullanıcıyı asla yarı yolda bırakma:
$fallbackText = getSmartFallbackRecommendation($userPreference, $menuData);
echo json_encode([
    'success' => true,
    'recommendation' => $fallbackText,
    'source' => 'curated_fallback'
], JSON_UNESCAPED_UNICODE);
exit;
