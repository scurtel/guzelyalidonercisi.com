# Güzelyalı Dönercisi — Üç Domain İçin Teknik Strateji ve Yönlendirme Mimarisi

**Tarih:** 8 Ekim 2026  
**İncelenen Alan Adları:**
1. `https://guzelyalidonercisi.com/` (Ana Marka Alan Adı)
2. `https://adanadoner.site/` (Yeni Tescil Edilen Alan Adı)
3. `https://adanadoner.store/` (Yeni Tescil Edilen Alan Adı)

---

## 1. MEVCUT ALAN ADI DURUMU VE GEÇMİŞ DENETİMİ

Hostinger Domains & DNS API üzerinden yapılan doğrulamalar sonucunda:

| Alan Adı | Tescil Tarihi | Hostinger ID | Durum | Mevcut DNS A Kaydı | İndeks Durumu |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `guzelyalidonercisi.com` | 26.09.2026 10:06 | 34787204 | Aktif (Hosting Bağlı) | `guzelyalidonercisi.com.cdn.hstgr.net` (Hostinger CDN) | Aktif (Geliştirme & İndeksleme aşamasında) |
| `adanadoner.site` | 08.10.2026 10:02 | 35160863 | Aktif (Park Modu) | `2.57.91.91` (Hostinger Park IP) | **Sıfır İndeks** (Yeni Tescil) |
| `adanadoner.store` | 08.10.2026 10:02 | 35160864 | Aktif (Park Modu) | `2.57.91.91` (Hostinger Park IP) | **Sıfır İndeks** (Yeni Tescil) |

### Önemli Tespit:
- `adanadoner.site` ve `adanadoner.store` alan adları 8 Ekim 2026 saat 10:02 UTC itibarıyla tescil edilmiştir.
- Alan adlarının geçmişten gelen zararlı bir backlink profili, ceza geçmişi veya eski indeksi **bulunmamaktadır**.
- Ancak yeni tescil edilmiş olmaları sebebiyle herhangi bir **arama motoru otoritesine (Domain Authority) sahip değillerdir**. Yalnızca alan adında "adana döner" geçmesi, Google nezdinde doğrudan sıralama avantajı sağlamaz. Google'ın E-E-A-T (Deneyim, Uzmanlık, Otoriterlik, Güvenilirlik) algoritmaları alan adı anahtar kelimesinden ziyade içerik ve işletme sinyallerine bakar.

---

## 2. NEDEN AYRI KOPYA RESTORAN SİTELERİ KURULMAMALI?

Google'ın Arama Kalitesi Yönergeleri (Search Quality Rater Guidelines) ve Spam Politikaları gereğince:
1. **Kopya & İkinci Restoran Sitesi Cezası (Doorway Pages & Duplicate Content):** Aynı restorana ait aynı menüyü, aynı fotoğrafları ve aynı adresi içeren ikinci veya üçüncü bir restoran sitesi açmak Google tarafından "Doorway Site" (Köprü Sayfa) veya mükerrer içerik olarak algılanır. Bu durum ana domainin (`guzelyalidonercisi.com`) sıralama kazanmasını da engeller.
2. **Sahte E-Ticaret / Sipariş Algısı:** `adanadoner.store` üzerinde çalışan bir online ödeme, sepet veya anlık kurye sipariş yazılımı bulunmadığı takdirde bir "mağaza" gibi davranmak kullanıcı güvenini sarsar ve yüksek hemen çıkma oranı (bounce rate) üretir.
3. **Otorite Dağılması:** Gelen yerel bağlantıların (backlink), sosyal medya tıklamalarının ve basın bültenlerinin 3 farklı siteye dağılması yerine tek bir güçlü ana merkezde toplanması yerel rekabette kat kat daha hızlı yükseliş sağlar.

---

## 3. VARSAYILAN VE UYGULANACAK YÖNLENDİRME STRATEJİSİ (301 PERMANENT REDIRECT)

Tüm SEO otoritesini ve kullanıcı trafiğini `guzelyalidonercisi.com` üzerinde biriktirmek için **tek aşamalı, temiz 301 kalıcı yönlendirme mimarisi** uygulanmalıdır.

### Eşleme Tablosu:

| Kaynak Alan Adı | Yönlendirme Tipi | Hedef URL | Stratejik Gerekçe |
| :--- | :--- | :--- | :--- |
| `adanadoner.site` (ve `www.adanadoner.site`) | **301 Permanent** | `https://guzelyalidonercisi.com/adana-doner-rehberi/` *(veya `https://guzelyalidonercisi.com/`)* | Rehber ve bilgi arayan kullanıcıları doğrudan kapsamlı Adana Döner Rehberi sayfasına iletmek |
| `adanadoner.store` (ve `www.adanadoner.store`) | **301 Permanent** | `https://guzelyalidonercisi.com/menu/` *(veya `https://guzelyalidonercisi.com/`)* | Ürün ve lezzet arayan kullanıcıları doğrudan zengin Menü sayfasına iletmek |

### Yönlendirme Standartları (6 Zorunlu Kural):
1. **Tek Aşamalı Çözüm:** `http://adanadoner.site` -> `https://guzelyalidonercisi.com/adana-doner-rehberi/` (Arada `http` -> `https` -> `www` gibi 2-3 aşamalı zincirler kesinlikle olmamalıdır).
2. **HTTPS Desteği:** Yönlendirme sunucusunda SSL sertifikası aktif olmalı, tarayıcılarda "Güvensiz Bağlantı" uyarısı verilmeden 301 tetiklenmelidir.
3. **www ve non-www Eşitliği:** `www.adanadoner.site` ve `adanadoner.site` aynı hedefe gitmelidir.
4. **Sonsuz Döngü Koruması:** `guzelyalidonercisi.com` üzerinden diğer domainlere hiçbir geri yönlendirme bulunmamalıdır.
5. **Kopya İndeks Engeli:** Arama motorları `adanadoner.site` park sayfasını değil, yalnızca yönlendiği hedef sayfayı dizine eklemelidir.

---

## 4. ALTERNATİF SEÇENEK: `adanadoner.site` ÜZERİNDE BAĞIMSIZ GASTRONOMİ PORTALI

Eğer işletme sahibi ileride `adanadoner.site` alan adını yönlendirmek yerine bağımsız bir proje olarak kullanmak isterse, bunun uygulanabilir tek meşru yolu şudur:

- **Proje Tanımı:** "Adana Döner Rehberi & Çukurova Gastronomi Portalı"
- **İçerik Kapsamı:** Yalnızca Güzelyalı Dönercisi'ni değil; Adana genelindeki geleneksel döner zanaatini, ustaları, et terbiye yöntemlerini, tarihi döner salonlarını tarafsız bir gastronomi blogu/dergisi gibi anlatan bağımsız bir yayın.
- **Dezavantajları ve Maliyeti:** Sürekli yeni bağımsız makale üretimi, ayrı hosting, ayrı içerik yönetimi ve bağımsız SEO bütçesi gerektirir.
- **Tavsiye:** Başlangıç aşamasında tüm kaynakların ana marka olan `guzelyalidonercisi.com` üzerine odaklanması ve `adanadoner.site`'nin 301 yönlendirmesiyle ana siteyi beslemesi en yüksek yatırım getirisine (ROI) sahiptir.

---

## 5. HOSTINGER ÜZERİNDE UYGULAMA ADIMLARI

Hostinger hPanel veya Hostinger API üzerinde yönlendirmelerin aktif edilmesi için gereken işlem adımları:

1. **Hostinger Domains Forwarding API:**
   - İşlem: `domains_forwarding_create`
   - İstek 1:
     - `domain`: `adanadoner.site`
     - `redirect_type`: `"301"`
     - `redirect_url`: `"https://guzelyalidonercisi.com/adana-doner-rehberi/"`
   - İstek 2:
     - `domain`: `adanadoner.store`
     - `redirect_type`: `"301"`
     - `redirect_url`: `"https://guzelyalidonercisi.com/menu/"`

2. **SSL ve DNS Yayılım Kontrolü:**
   - Yönlendirme oluşturulduktan sonra DNS TTL süresi (300 saniye) beklenerek curl ile test edilmelidir:
     ```bash
     curl -I http://adanadoner.site/
     curl -I https://adanadoner.site/
     ```
   - Yanıtın doğrudan `301 Moved Permanently` ve `location: https://guzelyalidonercisi.com/...` olduğu teyit edilmelidir.
