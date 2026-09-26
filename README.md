# Güzelyalı Dönercisi Web Sitesi (guzelyalidonercisi.com)

Bu depo, Adana Çukurova Güzelyalı Mahallesi'nde açılacak olan **Güzelyalı Dönercisi**'nin resmi üretim (production) web sitesini içerir.

Modern, ultra hızlı, arama motoru (SEO) odaklı ve mobil öncelikli olarak **Astro 5** statik mimarisi üzerinde inşa edilmiş; sunucu tarafı lezzet asistanı ve iletişim formu işlemleri için **Hostinger LiteSpeed/PHP** entegrasyonu ile güçlendirilmiştir.

---

## 🏛️ Mimari ve Teknolojiler

- **Çatı (Framework):** Astro 5 (Static Site Generation - SSG)
- **Stil & Tasarım Sistemi:** Özel CSS değişkenleri, Playfair Display & Plus Jakarta Sans tipografisi, sıcak krem / kömür / bordo / pirinç paleti
- **Görseller:** Yeni nesil optimize WebP formatı, responsive görsel etiketleri
- **SEO & Yapılandırılmış Veri:** OpenGraph, Twitter Cards, Canonical URL, Schema.org (`Restaurant`, `LocalBusiness`, `BreadcrumbList`)
- **Yapay Zeka (AI) Lezzet Asistanı:** Google Gemini REST API entegrasyonu (Sunucu taraflı, oran sınırlamalı, menü veri setine tam grounded)
- **Sunucu & Dağıtım:** Hostinger Cloud / LiteSpeed, SSL (Let's Encrypt / HSSL), HTTP/2, Brotli/Gzip sıkıştırma, 301 www to non-www yönlendirme

---

## 📁 Proje Yapısı

```
├── public/
│   ├── api/                 # Sunucu taraflı PHP API'leri (recommend.php, contact.php)
│   ├── data/                # Menü veri seti (menu.json - Gemini grounding için)
│   ├── images/              # Optimize WebP yemek, mekan ve zanaat fotoğrafları
│   ├── .htaccess            # LiteSpeed yönlendirme, güvenlik ve önbellekleme kuralları
│   ├── robots.txt           # Arama motoru robot direktifleri
│   └── site.webmanifest     # PWA ve mobil ikon tanımları
├── src/
│   ├── config/              # Merkezi işletme bilgileri (business.ts)
│   ├── data/                # Menü kategorileri ve ürün veri modeli (menu.ts)
│   ├── components/          # Header, Footer, Hero, Menü, Ne Yesem asistanı vb.
│   ├── layouts/             # BaseLayout ve SEO başlıkları
│   ├── pages/               # Ana Sayfa, Menü, Hakkımızda, Lezzetimiz, Galeri, İletişim, 404
│   └── styles/              # Global CSS değişkenleri ve tasarım sistemi
├── scripts/
│   ├── postbuild.mjs        # Derleme sonrası doğrulama ve secret sızıntı denetimi
│   └── package-deploy.mjs   # Hostinger için timestamp'li deploy arşivi oluşturma
├── astro.config.mjs         # Astro ve sitemap yapılandırması
└── package.json
```

---

## ⚙️ Geliştirme ve Çalıştırma

### Gereksinimler
- Node.js >= 20.0.0
- npm >= 10.0.0

### Kurulum
```bash
npm install
```

### Ortam Değişkenleri
`.env.example` dosyasını referans alarak yerel ortamınızda `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

> **ÖNEMLİ GÜVENLİK KURALI:**
> `.env` dosyası ve gerçek API anahtarları asla Git'e eklenmez veya istemci (client) tarafındaki JavaScript kodlarına sızdırılmaz. Gemini API anahtarı sadece sunucu tarafındaki `/api/recommend.php` tarafından okunur.

### Yerel Geliştirme Sunucusu
```bash
npm run dev
```
Tarayıcınızda `http://localhost:4321` adresine gidin.

### Tip Kontrolü ve Derleme
```bash
npm run check
npm run build
```
Build çıktısı `dist/` klasörüne oluşturulur ve `scripts/postbuild.mjs` tarafından otomatik olarak secret sızıntı denetiminden geçirilir.

---

## 🚀 Hostinger Canlı Dağıtım (Deployment)

1. Üretim paketi hazırlama:
```bash
npm run deploy:prep
```
Bu komut `dist/` içeriğini Hostinger Static Website API'sine uygun olarak `guzelyalidonercisi_YYYYMMDD_HHMMSS.zip` formatında arşivler.

2. Dağıtım Hostinger MCP / API veya hPanel Dosya Yöneticisi üzerinden `public_html/` dizinine yüklenir.

---

## 📧 Kurumsal E-posta ve DNS Yapılandırması

Alan adı (`guzelyalidonercisi.com`) için aşağıdaki kurumsal e-posta ve DNS kayıtları Hostinger üzerinde yapılandırılmıştır:
- **MX:** `mx1.hostinger.com` (Öncelik: 5), `mx2.hostinger.com` (Öncelik: 10)
- **SPF:** `v=spf1 include:_spf.mail.hostinger.com ~all`
- **DKIM:** `hostingermail-a/b/c._domainkey` CNAME kayıtları
- **DMARC:** `v=DMARC1; p=none`
- **Webmail:** `https://mail.hostinger.com`
- **Web Sitesi İletişim E-postası:** `iletisim@guzelyalidonercisi.com`

---

## 📄 Lisans
Tüm hakları **Güzelyalı Dönercisi**'ne aittir. İzinsiz çoğaltılamaz ve kullanılamaz.
