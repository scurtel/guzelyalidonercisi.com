import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

console.log('--- Post-build Doğrulama ve Dosya Hazırlığı ---');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Hata: dist dizini bulunamadı!');
  process.exit(1);
}

// 1. .htaccess dosyasını kopyala
const htaccessSrc = path.resolve('public/.htaccess');
const htaccessDest = path.join(DIST_DIR, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, htaccessDest);
  console.log('✅ .htaccess başarıyla kopyalandı.');
}

// 2. PHP API ve backend scriptlerini kopyala
const apiSrc = path.resolve('public/api');
const apiDest = path.join(DIST_DIR, 'api');
if (fs.existsSync(apiSrc)) {
  fs.cpSync(apiSrc, apiDest, { recursive: true });
  console.log('✅ /api backend scriptleri başarıyla kopyalandı.');
}

// 3. Menü veri setini kopyala
const dataSrc = path.resolve('public/data');
const dataDest = path.join(DIST_DIR, 'data');
if (fs.existsSync(dataSrc)) {
  fs.cpSync(dataSrc, dataDest, { recursive: true });
  console.log('✅ /data JSON veri seti başarıyla kopyalandı.');
}

// 4. .env dosyasını dist içine güvenli şekilde kopyala (PHP endpoint'i için)
const envSrc = path.resolve('.env');
const envDest = path.join(DIST_DIR, '.env');
if (fs.existsSync(envSrc)) {
  fs.copyFileSync(envSrc, envDest);
  console.log('✅ .env dosyası sunucu arka planı için kopyalandı (.htaccess ile korunuyor).');
}

// 5. 404.html dosyasının varlığını doğrula
const errorPage404 = path.join(DIST_DIR, '404/index.html');
const root404 = path.join(DIST_DIR, '404.html');
if (fs.existsSync(errorPage404) && !fs.existsSync(root404)) {
  fs.copyFileSync(errorPage404, root404);
  console.log('✅ 404.html kök dizine oluşturuldu.');
}

// 6. Güvenlik Denetimi: İstemci JS veya HTML dosyalarında gizli anahtar var mı?
console.log('🔍 İstemci tarafı secret sızıntı taraması yapılıyor...');
let secretLeakFound = false;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      // AIza... pattern
      if (/AIza[0-9A-Za-z-_]{35}/.test(content)) {
        console.error(`❌ TEHLİKE: ${fullPath} içinde istemciye açık API anahtarı bulundu!`);
        secretLeakFound = true;
      }
    }
  }
}

scanDir(DIST_DIR);

if (secretLeakFound) {
  console.error('❌ Güvenlik kontrolü BAŞARISIZ! Build durduruldu.');
  process.exit(1);
} else {
  console.log('✅ Güvenlik denetimi başarılı: İstemci dosyalarında hiçbir secret sızıntısı yok.');
}

console.log('🎉 Post-build işlemleri başarıyla tamamlandı.');
