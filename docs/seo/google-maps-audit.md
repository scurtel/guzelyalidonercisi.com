# Güzelyalı Dönercisi — Google Maps & Google Business Profile (GBP) Denetimi

**Tarih:** 8 Ekim 2026  
**Harita Profili URL:** `https://maps.app.goo.gl/XHxKeHS4UhTNiNWv6`  
**Google CID (Hex):** `0xc9f41e67778d66d3`  
**Google Place / Feature ID:** `/g/11hz334skl`  
**Doğrulanmış Pin Koordinatları:** Enlem `37.04887`, Boylam `35.29594`  
**Bölge:** Güzelyalı Mahallesi, Çukurova / Adana  

---

## 1. PROFİL DOĞRULAMASI VE TEKNİK PARAMETRELER

Mevcut kısa bağlantı çözümlendiğinde profilin doğru coğrafi konuma ulaştığı teyit edilmiştir:
- Profil Google Haritalar üzerinde Güzelyalı Mahallesi sınırları içerisindedir.
- Web sitesinde daha önce kullanılan genel mahalle arama koordinatı (`37.0392, 35.3051`) yerine profilin gerçek pini olan **`37.04887, 35.29594`** koordinatları `src/config/business.ts` dosyasına işlenmiştir.
- Web sitesindeki tüm "Yol Tarifi Al", "Harita", footer ve mobil butonlar doğrudan bu doğrulanmış işletme profiline (`https://maps.app.goo.gl/XHxKeHS4UhTNiNWv6`) bağlanmıştır.

---

## 2. KRİTİK BULGU VE UYARI: İŞLETME ADI POLİTİKA İHLALİ

Google Maps üzerinde işletmenin adı şu şekilde kayıtlıdır:
> **Mevcut Başlık:** `Adana Güzelyalı Dönercisi - Meşhur Adana Döner`

### ⚠️ Google İşletme Profili Kuralları Uyarısı:
Google'ın resmi *"İşletmenizi Google'da Temsil Etme Yönergeleri (Guidelines for representing your business on Google)"* kuralları uyarınca:
- İşletme adına tabela, resmi evrak veya gerçek dünyadaki tabela haricinde anahtar kelime, sıfat, unvan, bölge veya pazarlama sloganı eklemek (örn: `"- Meşhur Adana Döner"`) açıkça **YASAKTIR**.
- Bu durum yapay anahtar kelime doldurma (Keyword Stuffing) olarak sınıflandırılır.
- **Doğrudan Risk:** Rakip işletmelerin yapacağı "Adı Düzenle" bildirimleri veya Google algoritmik taramaları sonucunda profilin **askıya alınması (Hard/Soft Suspension)**, aramalardan silinmesi veya yerel harita paketinden (Local 3-Pack) düşürülmesi riski yüksektir.

### Tavsiye Edilen Aksiyon:
Google Business Profile yönetim paneline erişildiğinde işletme adı tabeladaki gerçek kurumsal kimlikle tam uyumlu olacak şekilde:
> **Önerilen İşletme Adı:** `Güzelyalı Dönercisi`
olarak güncellenmelidir. "Adana", "Çukurova" ve "Yaprak Döner" ifadeleri işletme başlığında spam yapmak yerine kategori, işletme açıklaması, hizmetler ve web sitesi entegrasyonu ile organik olarak kazandırılmalıdır.

---

## 3. GOOGLE BUSINESS PROFILE DENETİM VE OPTİMİZASYON KONTROL LİSTESİ

İşletme paneli üzerinden yapılması gereken zorunlu optimizasyonlar:

### 1. Kategori Yapılandırması
- **Birincil Kategori (Primary Category):** `Döner Restoranı` (*Doner restaurant*)
- **İkincil Kategoriler (Secondary Categories):**
  - `Restoran` (*Restaurant*)
  - `Türk Restoranı` (*Turkish restaurant*)
  - `Kebap Restoranı` (*Kebab shop*)
  - `Paket Servis Restoranı` (*Takeout restaurant*)

### 2. İşletme Açıklaması (750 Karakter Örneği)
> "Adana Çukurova Güzelyalı Mahallesi'nde hakiki yaprak et döner ustalığı. Güzelyalı Dönercisi olarak kıymasız, katkısız, dinlendirilmiş yerli dana antrikot ve lezzet veren kuzu etiyle hazırladığımız yaprak dönerlerimizi doğal odun ve köz ateşinde ağır ağır pişiriyoruz. Sıcak taş fırın tırnak pidelerimiz, taze sumaklı soğan ve bostana salatamız, Bursa usulü tereyağlı İskenderimiz ve ferah salonumuzla aileler ve döner tutkunları için Çukurova'nın nezih lezzet durağıyız. Çok yakında kapılarımızı açıyoruz."

### 3. Web Sitesi, Menü ve Rezervasyon Bağlantıları
- **Web Sitesi:** `https://guzelyalidonercisi.com/`
- **Menü URL:** `https://guzelyalidonercisi.com/menu/`
- **Rezervasyon URL:** `https://guzelyalidonercisi.com/rezervasyon/` (Açılış gerçekleşip form aktifleştirildiğinde eklenmelidir).

### 4. Hizmet Seçenekleri (Attributes)
- Masada Servis (Dine-in): **Evet**
- Gel-Al / Paket Servis (Takeout): **Evet**
- Adrese Teslim (Delivery): Kendi kurye ağı kurulduğunda aktif edilmeli
- Açık Hava Oturma Alanı (Outdoor seating): Mekan durumuna göre işaretlenmeli
- Çocuklara / Ailelere Uygun (Good for kids / families): **Evet**

---

## 4. FOTOĞRAF VE MEDYA YÖNETİMİ

Yerel harita sıralamasında en güçlü etkileşim faktörlerinden biri özgün, yüksek çözünürlüklü ve düzenli fotoğraf yüklemeleridir. Açılış öncesi ve açılış haftasında profile yüklenmesi gereken asgari 20 fotoğraf paketi:
1. **Dış Cephe & Tabela (3 Adet):** Gündüz, akşam ışıklandırmalı ve cadde aksından net tabelayı gösteren fotoğraflar (Google Maps sokak görünümüyle doğrulama sağlar).
2. **İç Mekan & Salon (5 Adet):** Ferah masalar, hijyenik zemin, aydınlık atmosfer, aile oturma alanları.
3. **Mutfak & Hazırlık Hijyeni (4 Adet):** Açık mutfak, paslanmaz tezgahlar, ustaların eldiven/bone kullanımı.
4. **Ürün ve Sunum Tabakları (8 Adet):**
   - Yaprak et döner porsiyon (sıcak pide ve köz biber ile).
   - Tereyağlı İskender (manda yoğurdu ve köpüklü tereyağı dökülürken).
   - Özel Adana lavaş dürüm.
   - Tereyağlı pilav üstü et döner.
   - Yayık ayranı ve taze mezeler.

---

## 5. DÜRÜST VE ETİK YORUM (REVIEW) TOPLAMA SÜRECİ

### Kesinlikle Yasak Olanlar:
- Ücret karşılığı sahte 5 yıldızlı yorum satın almak (Google 2024-2026 algoritmik güncellemeleri sahte yorumları tespit edip işletmeyi kalıcı olarak haritalardan silmektedir).
- Teşvik veya hediye karşılığında olumlu yorum istemek.
- Açılış öncesinde henüz hizmet almamış kişilere sahte deneyim yorumu yazdırmak.

### Etik ve Başarılı Yorum Stratejisi:
1. **Masa Üstü Şık QR Kartları:** Masalarda "Lezzetimizi değerlendirmeniz bizim için çok kıymetli" yazılı minimal pleksi QR standları bulundurulması.
2. **Kişisel ve Nazik Davet:** Hesap sunulduğunda salon şefinin deneyimden memnun kalan misafirlere harita profilini hatırlatması.
3. **Yorum Yanıtlama Disiplini:**
   - Gelen her yoruma (olumlu veya olumsuz) azami 24 saat içinde kurumsal, saygılı ve doğal bir dille yanıt verilmelidir.
   - *Örnek Olumlu Yanıt:* "Güzelyalı Dönercisi olarak nazik ziyaretiniz ve yaprak et dönerimiz hakkındaki güzel düşünceleriniz için çok teşekkür ederiz. Köz ateşimizin sıcaklığıyla sizleri ve sevdiklerinizi Çukurova'daki soframızda yeniden ağırlamaktan mutluluk duyarız."

---

## 6. YEREL HARİTA SIRALAMASI TAKİP PLANI (GEO-GRID TRACKING)

İşletmenin açılışıyla birlikte Google Maps görünürlüğünü takip etmek için 7 temel koordinat merkezinde haftalık sıralama ölçümü yapılmalıdır:

1. **Nokta 1 (Merkez):** Güzelyalı Mahallesi içi (Restoran konumu)
2. **Nokta 2 (Batı):** Turgut Özal Bulvarı - Anadolu Lisesi Kavşağı
3. **Nokta 3 (Kuzey):** Mahfesığmaz / Toros Mahallesi sınır hattı
4. **Nokta 4 (Güney):** Barajyolu / Sümer Mahallesi hattı
5. **Nokta 5 (Doğu):** Beyazevler / Çamlık aksı
6. **Nokta 6 (Kuzeybatı):** Çukurova Belediyesi & Kenan Evren Bulvarı
7. **Nokta 7 (İlçe Geneli):** Huzurevleri & Yurt Mahallesi

**Takip Edilecek Sorgular:** `döner`, `dönerci`, `et döner`, `yaprak döner`, `iskender`, `adana döner`.  
Hedef: Açılışı takip eden 60 gün içinde Güzelyalı ve Turgut Özal aksında 1 kilometrelik yarıçapta ilk 3 harita paketi (Local Pack) içerisinde yer almak.
