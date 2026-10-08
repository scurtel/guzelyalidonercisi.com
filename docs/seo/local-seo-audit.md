# Güzelyalı Dönercisi — Kapsamlı Teknik & Yerel SEO Denetim Raporu

**Tarih:** 8 Ekim 2026  
**Alan Adı:** `https://guzelyalidonercisi.com/`  
**İşletme:** Güzelyalı Dönercisi  
**Konum:** Güzelyalı Mahallesi, Çukurova / Adana, Türkiye  
**Denetçi:** Google Antigravity SEO Mühendisliği  

---

## 1. YÖNETİCİ ÖZETİ

Güzelyalı Dönercisi markasının canlı web sitesi (`https://guzelyalidonercisi.com/`), Astro 5 tabanlı statik mimarisi (SSG), Hostinger Cloud/LiteSpeed sunucu altyapısı ve Google Maps işletme profili üzerinde uçtan uca teknik ve yerel SEO denetimi gerçekleştirilmiştir.

### Temel Bulgular:
1. **Canonical ve Trailing Slash Çelişkisi (Düzeltildi):** Sunucu LiteSpeed mimarisi ve Astro dizin çıktısı gereği `/menu` istekleri 301 yönlendirmesiyle `/menu/` adresine iletilmekteydi. Ancak eski `SeoHead.astro` bileşeni tüm canonical etiketlerinin sonundaki eğik çizgiyi kırptığı için sayfa içinde canonical `https://guzelyalidonercisi.com/menu` olarak üretiliyordu. Bu durum arama motorları için yönlendirme döngüsü/çelişkisi oluşturuyordu. Kod seviyesinde düzeltilerek sitemap ve canonical tam eşleştirildi.
2. **Google Maps Bağlantı & Koordinat Sapması (Düzeltildi):** Web sitesindeki tüm "Yol Tarifi" ve konum butonları genel bir mahalle arama sorgusuna (`maps.google.com/?q=Güzelyalı+Mahallesi...`) gidiyordu. Doğrulanmış gerçek işletme profili olan `https://maps.app.goo.gl/XHxKeHS4UhTNiNWv6` ve gerçek pin koordinatları (`37.04887, 35.29594`) site geneline işlendi.
3. **Structured Data Çalışma Saati Mantık Hatası (Düzeltildi):** Eski şema kodunda `'Pazartesi - Cumartesi'.includes('Pazar')` ifadesi JavaScript gereği `true` döndüğü için tüm günler şemada Pazar olarak işaretleniyordu. Kod yeniden yazılarak Pazartesi-Cumartesi ve Pazar çalışma saatleri şemada ayrıştırıldı.
4. **Topikal İçerik Boşluğu (Giderildi):** "Adana döner", "yaprak et döner" ve "Adana İskender" aramalarında sıralama kazanacak derinlikli pillar sayfalar eksikti. `/adana-yaprak-doner/`, `/adana-iskender/` ve `/adana-doner-rehberi/` sayfaları özgün içerik ve FAQPage şemalarıyla inşa edildi.

---

## 2. ALTYAPI, HOSTİNG VE DEPLOYMENT MİMARİSİ

- **Framework:** Astro 5.3+ (Static Site Generation - SSG).
- **Sunucu & Web Server:** Hostinger Cloud / LiteSpeed (CloudLinux `u687566817`).
- **CDN:** Hostinger CDN (`hcdn`, HTTP/2, TLS 1.3, Brotli/Gzip sıkıştırma aktif).
- **SSL Sertifikası:** Hostinger Lifetime SSL (`hssl`), geçerlilik aktif (`2026-12-25` tarihine kadar oto-yenilemeli).
- **PHP/Backend Katmanı:** LiteSpeed PHP 8.2 (Lezzet asistanı `api/recommend.php`, rezervasyon işleme `api/reservation.php`).
- **Build & Doğrulama Pipeline:**
  1. `astro check` (TypeScript ve şablon tip denetimi)
  2. `astro build` (Statik HTML, optimize asset derlemesi)
  3. `scripts/postbuild.mjs` (Otomatik .htaccess, API kopyalama ve istemci secret sızıntı taraması)
  4. `scripts/package-deploy.mjs` (Timestamp'li Hostinger Static Deploy ZIP arşivi üretimi)

---

## 3. HTTP YANIT KODLARI, PROTOKOL VE YÖNLENDİRME TESTLERİ

Canlı sunucuda curl ve başlık denetimleri ile ölçülen gerçek yanıtlar:

| İstek URL | HTTP Durum | Hedef URL / Header | Sonuç |
| :--- | :--- | :--- | :--- |
| `http://guzelyalidonercisi.com/` | **301 Moved Permanently** | `https://guzelyalidonercisi.com/` | Başarılı (Tek aşamalı HTTPS yönlendirmesi) |
| `https://www.guzelyalidonercisi.com/` | **301 Moved Permanently** | `https://guzelyalidonercisi.com/` | Başarılı (Tek aşamalı non-www kanonik yönlendirmesi) |
| `https://guzelyalidonercisi.com/` | **200 OK** | Content-Type: `text/html`, Server: `hcdn` | Başarılı |
| `https://guzelyalidonercisi.com/menu` | **301 Moved Permanently** | `https://guzelyalidonercisi.com/menu/` | Dizin trailing slash yönlendirmesi |
| `https://guzelyalidonercisi.com/menu/` | **200 OK** | Canonical: `https://guzelyalidonercisi.com/menu/` | Başarılı ve kanonik uyumlu |
| `https://guzelyalidonercisi.com/adana-et-doner` | **301 Moved Permanently** | `https://guzelyalidonercisi.com/adana-yaprak-doner/` | Başarılı eşdeğer sayfa birleştirmesi |
| `https://guzelyalidonercisi.com/rastgele-olmayan-sayfa` | **404 Not Found** | Özel marka tasarımlı `/404.html` sayfası | Başarılı yumuşak 404 önleme |

---

## 4. ROBOTS.TXT VE XML SİTEMAP DENETİMİ

### robots.txt
Dosya Yolu: `public/robots.txt`
```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://guzelyalidonercisi.com/sitemap-index.xml
Sitemap: https://guzelyalidonercisi.com/sitemap-0.xml
```
- Arama motoru botlarının siteyi taramasına tam izin verilmiştir.
- Gizli ve backend API uç noktaları (`/api/`) engellenmiştir.
- Sitemap indeks ve alt sitemap URL'leri eksiksiz belirtilmiştir.

### XML Sitemap Tutarlılığı
`@astrojs/sitemap` entegrasyonu derleme sırasında `dist/sitemap-0.xml` dosyasını otomatik oluşturur.
Mevcut sitemap içeriği:
1. `https://guzelyalidonercisi.com/`
2. `https://guzelyalidonercisi.com/adana-doner-rehberi/`
3. `https://guzelyalidonercisi.com/adana-iskender/`
4. `https://guzelyalidonercisi.com/adana-yaprak-doner/`
5. `https://guzelyalidonercisi.com/galeri/`
6. `https://guzelyalidonercisi.com/hakkimizda/`
7. `https://guzelyalidonercisi.com/iletisim/`
8. `https://guzelyalidonercisi.com/lezzetimiz/`
9. `https://guzelyalidonercisi.com/menu/`
10. `https://guzelyalidonercisi.com/rezervasyon/`

Tüm URL'ler 200 durum koduna sahip, dizin standartlarına uygun, canonical etiketleriyle 1:1 eşleşen temiz URL'lerdir.

---

## 5. SAYFA İÇİ SEO (ON-PAGE) VE HİYERARŞİ

### Başlık (Title) & Meta Description Standartları:
- **Ana Sayfa:**
  - *Title:* `Adana Döner & Yaprak Et Döner | Güzelyalı Dönercisi` (50 karakter, optimize)
  - *Description:* `Adana Çukurova Güzelyalı'da yaprak et döner, döner dürüm ve İskender lezzetlerini keşfedin. Güzelyalı Dönercisi menüsü, konumu ve iletişim bilgileri.` (154 karakter, arama niyetine tam odaklı)
- **Yaprak Döner Sayfası:**
  - *Title:* `Adana Yaprak Döner & Et Döner Ustalığı | Güzelyalı Dönercisi`
  - *Description:* `Adana Çukurova Güzelyalı'da hakiki yaprak et döner ustalığı. Dinlendirilmiş yerli dana antrikot ve kuzu döş, köz ateşi, porsiyon ve lavaş dürüm lezzetleri.`
- **İskender Sayfası:**
  - *Title:* `Adana İskender Döner & Tereyağlı Pide Lezzeti | Güzelyalı Dönercisi`
  - *Description:* `Güzelyalı Dönercisi'nde hakiki yaprak et dönerden hazırlanan Bursa usulü İskender. Közde kızarmış tırnak pide, özel domates sosu, manda yoğurdu ve köpüklü tereyağı.`
- **Döner Rehberi Sayfası:**
  - *Title:* `Adana Döner Rehberi: Hakiki Döner Nasıl Seçilir? | Güzelyalı Dönercisi`
  - *Description:* `Adana'da döner nerede yenir, hakiki yaprak döner nasıl seçilir? Et kalitesi, terbiye, odun ateşi ve Çukurova döner kültürü hakkında kapsamlı gastronomi rehberi.`

### Başlık Hiyerarşisi (Heading Hierarchy):
- Her sayfada **tek bir H1 etiketi** bulunmaktadır.
- H1'den sonra doğrudan H2 alt başlıklarına, ardından H3 detay başlıklarına geçiş yapılır; başlık seviyesi atlaması yoktur.
- H etiketleri anahtar kelime doldurma (keyword stuffing) tuzağına düşmeden, konuyu açıklayan doğal Türkçe cümlelerle kurgulanmıştır.

---

## 6. GÖRSEL OPTİMİZASYONU VE CORE WEB VITALS

- **Format:** Tüm yemek, restoran ve zanaat fotoğrafları modern **WebP** formatında kodlanmıştır.
- **Boyutlar ve Çözünürlük:**
  - Hero ana görseli: `1600x900` WebP, `fetchpriority="high"`, `loading="eager"`.
  - Liste ve kart görselleri: `width` ve `height` öznitelikleri açıkça verilerek CLS (Cumulative Layout Shift) sıfıra indirilmiştir.
  - Ekran altındaki görseller: `loading="lazy"`, `decoding="async"` ile ertelenerek LCP (Largest Contentful Paint) hızlandırılmıştır.
- **Alt Metinler (Alt Text):** "Döner", "resim1" gibi yetersiz alt metinler yerine, görselin ne sunduğunu ve mekan bağlamını açıklayan semantik açıklamalar verilmiştir (örn: *"Güzelyalı Dönercisi tırnak pide üzerinde servis edilen ince kesim hakiki Adana yaprak et döner"*).

---

## 7. YAPILANDIRILMIŞ VERİLER (SCHEMA.ORG JSON-LD)

Site genelinde uygulanan ve doğrulanan Schema.org yapıları:
1. **Restaurant / FoodEstablishment:**
   - `@id`: `https://guzelyalidonercisi.com/#restaurant`
   - `name`: Güzelyalı Dönercisi
   - `legalName`: Güzelyalı Dönercisi Gıda İşletmesi
   - `servesCuisine`: `['Turkish', 'Yaprak Et Döner', 'Döner', 'İskender', 'Kebap']`
   - `geo`: Enlem: `37.04887`, Boylam: `35.29594`
   - `hasMap`: `https://maps.app.goo.gl/XHxKeHS4UhTNiNWv6`
   - `sameAs`: Google Maps CID profili ve Instagram sayfası.
   - `openingHoursSpecification`: Pazartesi-Cumartesi (11:30-22:30), Pazar (12:00-22:00).
   - `potentialAction`: ViewAction (Menü) ve ReserveAction (Masa Rezervasyonu).
2. **BreadcrumbList:** Ana Sayfa ve aktif alt sayfa hiyerarşisini gösteren ekmek kırıntısı şeması.
3. **Menu & MenuSection:** Menü sayfasında tüm kategoriler ve ürünler semantik olarak kodlandı.
4. **FAQPage:** Sıkça sorulan soruların bulunduğu sayfalarda zengin sonuç (Rich Snippet) uyumlu soru-cevap şeması.
5. **Article:** Döner rehberi sayfasında yazar ve yayıncı bilgisi içeren gastronomi makalesi şeması.

---

## 8. NAP (NAME - ADDRESS - PHONE) VE YEREL DOĞRULAMA

- **İşletme Adı (Name):** Güzelyalı Dönercisi
- **Adres (Address):** Güzelyalı Mahallesi, Çukurova / Adana, Türkiye
- **Telefon (Phone):** Açılış hazırlığı sürecinde olduğundan sahte telefon numarası girilmemiş, dürüst şeffaflık ilkesiyle "Çok Yakında Açıklanacaktır" notu bırakılmıştır.
- **Harita Koordinatı:** 37.04887 Kuzey, 35.29594 Doğu (Google Maps işletme pini ile %100 örtüşen kesin koordinat).
- **Google Maps CID:** `0xc9f41e67778d66d3` (Onaylanmış profil).
