/**
 * Güzelyalı Dönercisi - Merkezi İşletme ve Yapılandırma Bilgileri
 * 
 * Tüm işletme iletişim bilgileri, adres, çalışma saatleri, SEO ve sosyal medya
 * bağlantıları bu tek merkezden yönetilir.
 */

export interface BusinessConfig {
  brandName: string;
  legalName: string;
  tagline: string;
  slogan: string;
  shortDescription: string;
  metaDescription: string;
  isOpeningSoon: boolean;
  openingStatusText: string;
  
  // İletişim Bilgileri
  contact: {
    phone: string;              // Görüntülenen telefon (örn: "+90 322 000 00 00")
    phoneRaw: string;           // tel: bağlantısı için (örn: "+903220000000")
    hasActivePhone: boolean;    // Telefon henüz aktif değilse false yapılır
    email: string;              // Web sitesinde gösterilecek birincil kurumsal e-posta
    address: {
      street: string;           // Cadde / Sokak (kesinleşince güncellenir)
      district: string;         // Güzelyalı Mahallesi
      city: string;             // Çukurova / Adana
      country: string;          // Türkiye
      postalCode: string;
      fullText: string;         // Tam adres metni
      hasExactAddress: boolean; // Kesin kapı no/cadde netleştiğinde true yapılır
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
    googleMapsUrl: string;      // Google Haritalar arama/yol tarifi linki
    googleMapsEmbedUrl: string; // iframe gömme URL'si
  };

  // Çalışma Saatleri (Açılış sonrası geçerli planlanan saatler)
  hours: {
    statusNote: string;
    schedule: Array<{
      days: string;
      hours: string;
      opens: string;
      closes: string;
    }>;
  };

  // Sosyal Medya & Harici Bağlantılar
  social: {
    instagram: string;
    facebook?: string;
    whatsapp?: string;
  };

  // Rezervasyon Yapılandırması
  reservations: {
    enabled: boolean;
    statusNotice: string;
    openingSoonMessage: string;
    openingSoonDetail: string;
    allowedHours: string[];
    minGuests: number;
    maxGuests: number;
    whatsappNumber?: string;
  };

  // Web Sitesi & SEO Parametreleri
  site: {
    url: string;
    canonicalDomain: string;
    locale: string;
    themeColor: string;
    author: string;
  };
}

export const businessConfig: BusinessConfig = {
  brandName: 'Güzelyalı Dönercisi',
  legalName: 'Güzelyalı Dönercisi Gıda İşletmesi',
  tagline: 'Adana Güzelyalı’da Gerçek Döner Ustalığı',
  slogan: 'Özenle seçilmiş et, ustalıkla açılmış şiş, köz ateşinde ağır ağır pişen lezzet.',
  shortDescription: 'Adana Güzelyalı’da geleneksel lezzeti modern ve tertemiz bir sunumla buluşturan premium döner salonu.',
  metaDescription: 'Güzelyalı Dönercisi; Adana Güzelyalı’da özenle hazırlanan yaprak et döner, iskender ve özel dürümleriyle döner tutkunlarını ağırlamaya hazırlanıyor. Çok yakında hizmetinizde.',
  
  isOpeningSoon: true,
  openingStatusText: 'Çok Yakında Adana Güzelyalı’da Açılıyoruz',

  contact: {
    phone: 'Çok Yakında Açıklanacaktır',
    phoneRaw: '',
    hasActivePhone: false,
    email: 'iletisim@guzelyalidonercisi.com',
    address: {
      street: 'Güzelyalı Mahallesi (Açılış öncesi konum hazırlığı sürmektedir)',
      district: 'Güzelyalı Mahallesi, Çukurova',
      city: 'Adana',
      country: 'Türkiye',
      postalCode: '01150',
      fullText: 'Güzelyalı Mahallesi, Çukurova / Adana, Türkiye',
      hasExactAddress: false, // Kesin dükkan numarası netleştiğinde güncellenir
    },
    // Güzelyalı Mahallesi Google Maps İşletme Profili ve Pin Koordinatları
    // Profil: https://maps.app.goo.gl/XHxKeHS4UhTNiNWv6
    coordinates: {
      latitude: 37.04887,
      longitude: 35.29594,
    },
    googleMapsUrl: 'https://maps.app.goo.gl/XHxKeHS4UhTNiNWv6',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.361!2d35.29336!3d37.04887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152889cc0ed16519%3A0xc9f41e67778d66d3!2zQWRhbmEgR8O8emVseWFswLEgRMO2bmVyY2lzaQ!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str',
  },

  hours: {
    statusNote: 'Açılış hazırlıklarımız devam ediyor. Çalışma saatlerimiz kapılarımızı açtığımız gün aktif olacaktır.',
    schedule: [
      {
        days: 'Pazartesi - Cumartesi',
        hours: '11:30 - 22:30',
        opens: '11:30',
        closes: '22:30',
      },
      {
        days: 'Pazar',
        hours: '12:00 - 22:00',
        opens: '12:00',
        closes: '22:00',
      }
    ],
  },

  social: {
    instagram: 'https://instagram.com/guzelyalidonercisi',
  },

  reservations: {
    enabled: true,
    statusNotice: 'Masa rezervasyonu talebinizi aşağıdaki form üzerinden doldurabilir, WhatsApp hattımız üzerinden kolayca iletebilirsiniz.',
    openingSoonMessage: 'Rezervasyon Talebi Oluşturun',
    openingSoonDetail: 'Güzelyalı Dönercisi olarak Adana Çukurova’da en lezzetli yaprak döner deneyimini sizlere sunuyoruz.',
    allowedHours: [
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
      '21:00', '21:30'
    ],
    minGuests: 1,
    maxGuests: 12,
    whatsappNumber: process.env.RESERVATION_WHATSAPP_NUMBER || '',
  },

  site: {
    url: 'https://guzelyalidonercisi.com',
    canonicalDomain: 'guzelyalidonercisi.com',
    locale: 'tr_TR',
    themeColor: '#7A1A22',
    author: 'Güzelyalı Dönercisi',
  },
};
