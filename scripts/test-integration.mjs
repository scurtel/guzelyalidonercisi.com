import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const DIST_DIR = path.resolve('dist');

console.log('🧪 === GÜZELYALI DÖNERCİSİ - ENTEGRASYON VE BAĞLANTI TESTLERİ === 🧪\n');

let passedTests = 0;
let totalTests = 0;

function test(title, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ [GEÇTİ] ${title}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [BAŞARISIZ] ${title}`);
    console.error(`   Hata: ${err.message}`);
  }
}

// 1. Dosya Varlıkları
test('1.1 dist/menu/index.html dosyası mevcut', () => {
  assert.ok(fs.existsSync(path.join(DIST_DIR, 'menu/index.html')));
});

test('1.2 dist/rezervasyon/index.html dosyası mevcut', () => {
  assert.ok(fs.existsSync(path.join(DIST_DIR, 'rezervasyon/index.html')));
});

test('1.3 dist/api/reservation.php backend işleyicisi mevcut', () => {
  assert.ok(fs.existsSync(path.join(DIST_DIR, 'api/reservation.php')));
});

// 2. Menü Sayfası Doğrulamaları
test('2.1 Menü sayfası başlık ve ürün kategorileri korunmuş', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'menu/index.html'), 'utf-8');
  assert.ok(html.includes('Lezzet Menümüz'), 'H1 Lezzet Menümüz bulunmalı');
  assert.ok(html.includes('id="cat-donerler"'), 'Kategori id="cat-donerler" bulunmalı');
  assert.ok(html.includes('id="cat-durumler"'), 'Kategori id="cat-durumler" bulunmalı');
  assert.ok(html.includes('id="cat-iskender"'), 'Kategori id="cat-iskender" bulunmalı');
});

test('2.2 Menü sayfasında Masanızı Ayırtın rezervasyon CTA bağlantısı mevcut', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'menu/index.html'), 'utf-8');
  assert.ok(html.includes('href="/rezervasyon"'), 'Rezervasyon linki bulunmalı');
  assert.ok(html.includes('Masanızı Ayırtın'), 'Masanızı Ayırtın metni bulunmalı');
});

// 3. Rezervasyon Sayfası Doğrulamaları
test('3.1 Rezervasyon sayfası title, H1 ve meta description doğru', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'rezervasyon/index.html'), 'utf-8');
  assert.ok(html.includes('Masa Rezervasyonu | Güzelyalı Dönercisi Adana'), 'Title doğru olmalı');
  assert.ok(html.includes('Güzelyalı Dönercisi Masa Rezervasyonu'), 'H1 doğru olmalı');
  assert.ok(html.includes('sevdiklerinizle keyifli bir sofra için masa rezervasyonu talebinizi kolayca iletin'), 'Açıklama doğru olmalı');
  assert.ok(html.includes('rel="canonical" href="https://guzelyalidonercisi.com/rezervasyon"'), 'Canonical URL doğru olmalı');
});

test('3.2 Rezervasyon sayfası varsayılan açılış yakında mesajını gösteriyor', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'rezervasyon/index.html'), 'utf-8');
  assert.ok(html.includes('Rezervasyonlarımız Çok Yakında Açılıyor'), 'Açılış yakında başlığı bulunmalı');
  assert.ok(html.includes('Açılış Hazırlığı Sürüyor'), 'Açılış hazırlığı rozeti bulunmalı');
  assert.ok(html.includes('Şeffaflık İlkesi'), 'Şeffaflık açıklaması bulunmalı');
});

// 4. Header & Navigasyon Doğrulamaları
test('4.1 Ana navigasyonda Menü belirginleştirilmiş ve Rezervasyon linki mevcut', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  assert.ok(html.includes('nav-link-featured'), 'Menü bağlantısında nav-link-featured sınıfı olmalı');
  assert.ok(html.includes('href="/rezervasyon"'), 'Rezervasyon linki olmalı');
});

test('4.2 Masaüstü header sağ alanda dikkat çeken Masa Ayırt butonu mevcut', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  assert.ok(html.includes('cta-reserve'), 'cta-reserve sınıfı bulunmalı');
  assert.ok(html.includes('Masa Ayırt'), 'Masa Ayırt butonu bulunmalı');
});

// 5. Hero & Ana Sayfa Doğrulamaları
test('5.1 Hero alanında Menüyü İncele ve Masa Rezervasyonu butonları mevcut', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  assert.ok(html.includes('Menüyü İncele'), 'Menüyü İncele butonu bulunmalı');
  assert.ok(html.includes('Masa Rezervasyonu'), 'Masa Rezervasyonu butonu bulunmalı');
  assert.ok(html.includes('Yol Tarifi'), 'Yol Tarifi butonu bulunmalı');
});

test('5.2 Ana sayfadaki imza lezzet ürün kartları menü sayfasına bağlı', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  assert.ok(html.includes('href="/menu#cat-donerler"'), 'Dönerler kategorisine bağlantı olmalı');
  assert.ok(html.includes('Menüde İncele'), 'Menüde İncele bağlantısı olmalı');
});

// 6. İletişim Sayfası Doğrulaması
test('6.1 İletişim sayfasında Rezervasyon Talebi Oluştur butonu mevcut', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'iletisim/index.html'), 'utf-8');
  assert.ok(html.includes('Rezervasyon Talebi Oluştur'), 'Rezervasyon Talebi Oluştur butonu olmalı');
  assert.ok(html.includes('href="/rezervasyon"'), 'Rezervasyon sayfasına bağlantı olmalı');
});

// 7. Mobil Alt Navigasyon Doğrulaması
test('7.1 Mobil alt navigasyon Menü | Rezervasyon | Yol Tarifi bağlantılarına sahip', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  assert.ok(html.includes('mobile-action-bar'), 'Mobil aksiyon barı bulunmalı');
  assert.ok(html.includes('href="/menu"'), 'Menü linki bulunmalı');
  assert.ok(html.includes('href="/rezervasyon"'), 'Rezervasyon linki bulunmalı');
  assert.ok(html.includes('Yol Tarifi'), 'Yol Tarifi linki bulunmalı');
});

// 8. Footer Doğrulaması
test('8.1 Footer alanında Lezzet Menümüz ve Masa Rezervasyonu korunmuş', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  assert.ok(html.includes('Lezzet Menümüz'), 'Lezzet Menümüz linki bulunmalı');
  assert.ok(html.includes('Masa Rezervasyonu'), 'Masa Rezervasyonu linki bulunmalı');
});

// 9. SEO & Sitemap
test('9.1 Sitemap sitemap-0.xml içinde /menu/ ve /rezervasyon/ yer alıyor', () => {
  const sitemap = fs.readFileSync(path.join(DIST_DIR, 'sitemap-0.xml'), 'utf-8');
  assert.ok(sitemap.includes('https://guzelyalidonercisi.com/menu/'), 'Sitemap /menu/ içermeli');
  assert.ok(sitemap.includes('https://guzelyalidonercisi.com/rezervasyon/'), 'Sitemap /rezervasyon/ içermeli');
});

console.log(`\n📊 Test Sonucu: ${passedTests} / ${totalTests} test başarıyla tamamlandı.`);
if (passedTests === totalTests) {
  console.log('🎉 TÜM TESTLER BAŞARIYLA GEÇTİ!');
  process.exit(0);
} else {
  console.error('⚠️ Bazı testler başarısız oldu.');
  process.exit(1);
}
