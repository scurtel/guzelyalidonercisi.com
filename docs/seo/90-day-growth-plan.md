# Güzelyalı Dönercisi — 90 Günlük Yerel SEO ve Büyüme Eylem Planı

**Tarih:** 8 Ekim 2026  
**Marka:** Güzelyalı Dönercisi  
**Hedef:** Adana Çukurova ve Güzelyalı bölgesinde organik ve harita arama liderliği  

---

## 1. YOL HARİTASI GENEL BAKIŞ

Bu büyüme planı; geçici SEO hileleri veya yapay sıralama vaatleri üzerine değil, Google'ın Faydalı İçerik (Helpful Content) ve Yerel Arama (Local Search) yönergelerine dayalı sürdürülebilir bir sistem üzerine kurulmuştur.

```
[FAZ 1: GÜN 1-30]  ──► [FAZ 2: GÜN 31-60] ──► [FAZ 3: GÜN 61-90]
Teknik Sağlamlık        Yerel Otorite & Yorum       Topikal Hakimiyet &
ve İndeksleme Lansmanı  Güzelyalı Harita Paketi    AI Arama Dönüşümü
```

---

## 2. FAZ 1 (GÜN 1 - 30): TEKNİK TEMEL, İNDEKSLEME VE AÇILIŞ HAZIRLIĞI

### Hedefler:
- Tüm sayfaların Google dizinine (index) eksiksiz girmesi,
- Google Business Profile (GBP) temel ayarlarının tamamlanması,
- Search Console ve GA4 veri akışının başlaması.

### Eylem Maddeleri:
1. **Google Search Console Doğrulaması:**
   - Hostinger DNS üzerinden TXT kaydı ile Domain Mülkü (`guzelyalidonercisi.com`) olarak Search Console'a eklenmesi.
   - `https://guzelyalidonercisi.com/sitemap-index.xml` adresinin Google'a sunulması.
2. **Google Business Profile (GBP) Düzenlemeleri:**
   - İşletme başlığının politika ihlali oluşturmayacak şekilde tabeladaki adla (`Güzelyalı Dönercisi`) eşitlenmesi.
   - Birincil kategorinin `Döner Restoranı`, ikincil kategorilerin `Restoran` ve `Türk Restoranı` olarak seçilmesi.
   - 750 karakterlik açıklamanın girilmesi, web sitesi ve menü URL'lerinin bağlanması.
   - Asgari 20 adet yüksek kaliteli özgün fotoğrafın (tabela, salon, döner şişi, mutfak) yüklenmesi.
3. **Yeni Domainlerin 301 Yönlendirmesi:**
   - `adanadoner.site` -> `https://guzelyalidonercisi.com/adana-doner-rehberi/`
   - `adanadoner.store` -> `https://guzelyalidonercisi.com/menu/`
   - Hostinger panelinde tek aşamalı HTTPS 301 yönlendirmelerinin doğrulanması.
4. **Fiili Açılış Gerçekleştiğinde:**
   - Kesin telefon numarası ve kapı numarasının `src/config/business.ts` içinde güncellenmesi.
   - Açılış sonrası çalışma saatlerinin aktif edilmesi.

---

## 3. FAZ 2 (GÜN 31 - 60): YEREL HARİTA OTORİTESİ VE GERÇEK YORUM SÜRECİ

### Hedefler:
- Güzelyalı ve Turgut Özal aksında harita aramalarında ilk 3 (Local 3-Pack) görünürlüğe ulaşmak,
- İlk 40+ gerçek ve olumlu müşteri değerlendirmesi toplamak (4.8+ ortalama puan).

### Eylem Maddeleri:
1. **Masa Başı Etik Yorum Toplama Sistemi:**
   - Restoran masalarına zarif akrilik QR standları yerleştirilmesi ("Lezzet Deneyiminizi Google'da Paylaşın").
   - Salon şeflerinin ve servis personelinin memnun ayrılan misafirlere harita profilini nazikçe hatırlatması.
2. **Yorum Yanıtlama Rutini:**
   - Gelen her yoruma azami 24 saat içerisinde restoran yetkilisi tarafından teşekkür edilmesi, bahsedilen lezzetlere (örn. yaprak döner, İskender) doğal atıfta bulunarak yanıt verilmesi.
3. **Haftalık GBP Güncellemeleri:**
   - Her hafta en az 1 adet yeni fotoğraf ve kısa güncelleme postu (Örn: "Bugün meşe kömürü ateşimizde pişen taze yaprak dönerimiz servise hazır") paylaşılması.
4. **Doğal Yerel Atıflar (Local Citations):**
   - Adana Ticaret Odası / Esnaf Odası kurumsal kayıtları,
   - Yandex Haritalar ve Apple Haritalar (Apple Business Connect) kayıtlarının birebir aynı NAP (İsim-Adres-Telefon) ile açılması.

---

## 4. FAZ 3 (GÜN 61 - 90): TOPİKAL HAKİMİYET, AI ARAMA VE DÖNÜŞÜM OPTİMİZASYONU

### Hedefler:
- "Adana yaprak döner", "Adana döner", "Çukurova dönerci" sorgularında ilk sayfada yer almak,
- ChatGPT, Gemini ve Perplexity'de Adana döner önerilerinde kaynak gösterilmek,
- Online masa rezervasyonu taleplerini düzenli akışa bağlamak.

### Eylem Maddeleri:
1. **Search Console Performans Analizi:**
   - Gösterim alan ancak CTR'ı düşük olan sorguların incelenmesi; ilgili sayfaların meta title ve description metinlerinin tıklama oranını artıracak şekilde ince ayarlanması.
2. **AI / GEO Görünürlük Testleri:**
   - Belirlenen 7 standart test sorgusunun (Bkz. `docs/seo/ai-visibility.md`) Gemini ve ChatGPT üzerinde çalıştırılması, marka tavsiye durumunun raporlanması.
3. **Rezervasyon & Menü Dönüşüm İyileştirmesi:**
   - Google Analytics 4 üzerinden `menu_view`, `directions_click` ve `reservation_submit_success` olaylarının hunisi (funnel) incelenerek buton yerleşimlerinin optimize edilmesi.
4. **Mevsimsel ve Özel Lezzet Güncellemeleri:**
   - Kış veya yaz aylarına özel ikramların (örneğin sıcak tırnak pide, özel Adana bostana salatası) menü ve rehber sayfalarına yeni alt başlıklar olarak eklenmesi.

---

## 5. TEMEL PERFORMANS GÖSTERGELERİ (KPI) VE HEDEF TABLOSU

| Metrik | Başlangıç (0. Gün) | 30. Gün Hedefi | 60. Gün Hedefi | 90. Gün Hedefi | Takip Aracı |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **İndekslenen Sayfalar** | ~6 Sayfa | 10+ Sayfa (Tam İndeks) | 10+ Sayfa | 10+ Sayfa | Google Search Console |
| **Aylık Organik Tıklama** | ~0 (Yeni Site) | 50 - 150 | 300 - 600 | 1.000+ | Google Search Console |
| **Aylık Organik Gösterim** | ~0 | 1.500 - 3.000 | 6.000 - 12.000 | 25.000+ | Google Search Console |
| **Google Maps Yol Tarifi İstekleri** | ~0 | 30 - 60 | 120 - 250 | 400+ | GBP Performans Paneli |
| **Doğrulanmış Harita Yorum Sayısı** | 0 - 5 | 15 - 25 | 40 - 60 | 75+ (4.8+ Puan) | Google Haritalar |
| **Local 3-Pack Görünürlüğü (Güzelyalı)** | - | İlk 5 içinde | İlk 3 içinde | İlk 3 Liderliği | Geo-Grid / Arama |

---

## 6. KAÇINILMASI GEREKEN TEHLİKELİ UYGULAMALAR (NEGATIVE SEO & PENALTY RISKS)

1. **Toplu Yapay Backlink Satın Alımı (PBN):** Forum tanıtımı, otomatik footer linki veya spam paketleri satın almaktan kesinlikle kaçınılmalıdır. Bu linkler kısa sürede tespit edilir ve ceza (algoritmik suppression) getirir.
2. **Yapay Yorum Üretimi:** Google'ın 2024 sonu ve 2025/2026 sahte inceleme algoritmaları profilin haritadan tamamen silinmesine neden olabilir. Yalnızca masada yemek yemiş gerçek misafirlerden yorum alınmalıdır.
3. **Anahtar Kelime Yığma (Keyword Stuffing):** Sayfa metinlerinde "Adana en iyi döner adana dönerci döner adana" gibi doğal olmayan tekrarlardan kaçınılmalıdır. Hazırladığımız zengin, akıcı ve kurumsal dil yapısı korunmalıdır.
