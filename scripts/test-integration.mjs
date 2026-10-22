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
  assert.ok(fs.existsSync(path.join(DIST_DIR, 'menu/index.html')), 'dist/menu/index.html bulunamadı');
});

test('1.2 dist/rezervasyon/index.html dosyası mevcut', () => {
  assert.ok(fs.existsSync(path.join(DIST_DIR, 'rezervasyon/index.html')), 'dist/rezervasyon/index.html bulunamadı');
});

test('1.3 dist/api/reservation.php backend işleyicisi mevcut', () => {
  assert.ok(fs.existsSync(path.join(DIST_DIR, 'api/reservation.php')), 'dist/api/reservation.php bulunamadı');
});

// 2. Menü Sayfası Doğrulamaları
test('2.1 Menü sayfası title, H1 ve meta description doğru', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'menu/index.html'), 'utf-8');
  assert.ok(html.includes('Adana Güzelyalı Dönercisi Menü ve Güncel Fiyatlar'), 'Title "Adana Güzelyalı Dönercisi Menü ve Güncel Fiyatlar" içermeli');
  assert.ok(html.includes('Güzelyalı Dönercisi Menü'), 'H1 "Güzelyalı Dönercisi Menü" içermeli');
  assert.ok(html.includes('Güzelyalı Dönercisi et döner, tavuk döner, dürüm, pilav üstü döner ve içecek seçeneklerini güncel fiyatlarıyla inceleyin'), 'Meta description doğru olmalı');
});

test('2.2 Menü sayfası 5 kategoriyi içeriyor', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'menu/index.html'), 'utf-8');
  assert.ok(html.includes('id="cat-tavuk-doner"'), 'Kategori id="cat-tavuk-doner" bulunmalı');
  assert.ok(html.includes('id="cat-et-doner"'), 'Kategori id="cat-et-doner" bulunmalı');
  assert.ok(html.includes('id="cat-pilav-ustu"'), 'Kategori id="cat-pilav-ustu" bulunmalı');
  assert.ok(html.includes('id="cat-yan-urunler"'), 'Kategori id="cat-yan-urunler" bulunmalı');
  assert.ok(html.includes('id="cat-icecekler"'), 'Kategori id="cat-icecekler" bulunmalı');
});

test('2.3 Menüde 16 ürünün tamamı ve doğru fiyatlar yer alıyor', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'menu/index.html'), 'utf-8');
  const expectedItems = [
    { name: 'Tavuk Döner Servis', price: '270' },
    { name: 'Tavuk Döner Dürüm', price: '220' },
    { name: 'Tavuk Döner Sütlü Ekmeğe', price: '220' },
    { name: 'Et Döner Servis', price: '420' },
    { name: 'Et Döner Dürüm', price: '400' },
    { name: 'Et Döner Sütlü Dürüm Ekmeğe', price: '400' },
    { name: 'Pilav Üstü Tavuk', price: '370' },
    { name: 'Pilav Üstü Et', price: '500' },
    { name: 'Patates Kızartması', price: '90' },
    { name: 'Ayran', price: '60' },
    { name: 'Coca-Cola', price: '80' },
    { name: 'Sprite', price: '80' },
    { name: 'Fanta', price: '80' },
    { name: 'Fuse Tea Şeftali', price: '80' },
    { name: 'Fuse Tea Limon', price: '80' },
    { name: 'Su', price: '20' },
  ];

  for (const item of expectedItems) {
    assert.ok(html.includes(item.name), `Menüde ürün bulunamadı: ${item.name}`);
    assert.ok(html.includes(item.price), `Menüde fiyat bulunamadı: ${item.price} TL (${item.name})`);
  }
});

test('2.4 Menü sayfasında Masanızı Ayırtın rezervasyon CTA bağlantısı mevcut', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'menu/index.html'), 'utf-8');
  assert.ok(html.includes('href="/rezervasyon"'), 'Rezervasyon linki bulunmalı');
  assert.ok(html.includes('Masanızı Ayırtın'), 'Masanızı Ayırtın metni bulunmalı');
});

// 3. Rezervasyon Sayfası Doğrulamaları
test('3.1 Rezervasyon sayfası title, H1 ve meta description doğru', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'rezervasyon/index.html'), 'utf-8');
  assert.ok(html.includes('Masa Rezervasyonu | Adana Güzelyalı Dönercisi'), 'Title "Masa Rezervasyonu | Adana Güzelyalı Dönercisi" olmalı');
  assert.ok(html.includes('Masa Rezervasyonu'), 'H1 "Masa Rezervasyonu" olmalı');
  assert.ok(html.includes('Adana Güzelyalı Dönercisi için kolayca masa rezervasyon talebi oluşturun'), 'Açıklama doğru olmalı');
  assert.ok(html.includes('rel="canonical" href="https://guzelyalidonercisi.com/rezervasyon/"'), 'Canonical URL doğru olmalı');
});

test('3.2 Rezervasyon formu tüm gerekli alanları ve onay metnini içeriyor', () => {
  const html = fs.readFileSync(path.join(DIST_DIR, 'rezervasyon/index.html'), 'utf-8');
  assert.ok(html.includes('id="rezFullName"'), 'Ad Soyad alanı bulunmalı');
  assert.ok(html.includes('id="rezPhone"'), 'Telefon alanı bulunmalı');
  assert.ok(html.includes('id="rezDate"'), 'Tarih alanı bulunmalı');
  assert.ok(html.includes('id="rezTime"'), 'Saat alanı bulunmalı');
  assert.ok(html.includes('id="rezGuests"'), 'Kişi sayısı alanı bulunmalı');
  assert.ok(html.includes('id="rezNotes"'), 'Not alanı bulunmalı');
  assert.ok(html.includes('id="rezKvkk"'), 'KVKK onay kutusu bulunmalı');
  assert.ok(html.includes('Rezervasyon Talebi Gönder'), 'Rezervasyon Talebi Gönder butonu bulunmalı');
  assert.ok(html.includes('data-whatsapp="905403036637"'), 'WhatsApp numarası data-whatsapp="905403036637" tanımlı olmalı');
  assert.ok(html.includes('Rezervasyonunuz işletme tarafından onaylandıktan sonra kesinleşecektir'), 'Kesinleşme bilgilendirmesi bulunmalı');
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
  assert.ok(html.includes('href="/menu#cat-et-doner"'), 'Et döner kategorisine bağlantı olmalı');
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
