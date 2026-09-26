/**
 * Güzelyalı Dönercisi - Menü Veri Modeli
 * 
 * Fiyatlar açılış öncesi netleşmediği için uydurma fiyat yazılmamış;
 * veri yapısı ileride kolayca fiyat ve yeni ürün eklenebilecek şekilde tasarlanmıştır.
 */

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: MenuCategoryKey;
  price?: number;
  priceFormatted?: string;
  priceNote?: string;
  image: string;
  featured?: boolean;
  signature?: boolean;
  available: boolean;
  preparationNote?: string;
  tags?: string[];
  portion?: string;
}

export type MenuCategoryKey = 
  | 'donerler' 
  | 'durumler' 
  | 'porsiyonlar' 
  | 'iskender' 
  | 'yan-urunler' 
  | 'tatlilar' 
  | 'icecekler';

export interface MenuCategory {
  key: MenuCategoryKey;
  title: string;
  description: string;
  icon?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    key: 'donerler',
    title: 'Yaprak Dönerler',
    description: 'Özenle dinlendirilmiş dana ve kuzu döş etinden, ustalıkla takılan geleneksel yaprak döner.',
  },
  {
    key: 'durumler',
    title: 'Özel Dürümler',
    description: 'Tırnaklı pide veya sıcacık lavaş ile közlenmiş biber ve domates eşliğinde sunulan dürümler.',
  },
  {
    key: 'porsiyonlar',
    title: 'Porsiyon & Tabak',
    description: 'Tereyağlı tırnak pide, sumaklı soğan, közlenmiş sebzeler ve taze garnitürlerle zengin sunum.',
  },
  {
    key: 'iskender',
    title: 'Güzelyalı İskender',
    description: 'Közde kızarmış tereyağlı pide üzerinde ince kesim yaprak döner, özel domates sosu ve manda yoğurdu.',
  },
  {
    key: 'yan-urunler',
    title: 'Garnitür & Meze',
    description: 'Masanızı şenlendiren taptaze mezeler, salatalar ve fırından sıcak çıkan tamamlayıcılar.',
  },
  {
    key: 'tatlilar',
    title: 'Geleneksel Tatlılar',
    description: 'Hakiki Antep fıstıklı ve manda kaymaklı tatlılarımızla lezzetli bir kapanış.',
  },
  {
    key: 'icecekler',
    title: 'İçecekler & Yayık Ayran',
    description: 'Köpüklü açık yayık ayranı, geleneksel Adana şalgamı ve soğuk meşrubatlar.',
  },
];

export const menuItems: MenuItem[] = [
  // 1. YAPRAK DÖNERLER
  {
    id: 'yaprak-et-doner-porsiyon',
    name: 'Güzelyalı Yaprak Et Döner (Porsiyon)',
    slug: 'yaprak-et-doner-porsiyon',
    description: 'Özel marinasyonla dinlendirilmiş dana antrikot ve kuzu eti, köz ateşinde nar gibi kızaran ince yaprak kesim.',
    category: 'donerler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/yaprak-et-doner.webp',
    featured: true,
    signature: true,
    available: true,
    portion: '120 gr / 150 gr seçenekleri',
    tags: ['İmza Lezzet', 'Odun / Köz Ateşi', 'Özel Marine'],
    preparationNote: 'Günlük taze takılan şişten, sipariş üzerine incecik yaprak olarak kesilir.',
  },
  {
    id: 'pilav-ustu-et-doner',
    name: 'Tereyağlı Pilav Üstü Et Döner',
    slug: 'pilav-ustu-et-doner',
    description: 'Geleneksel tereyağlı baldo pirinç pilavı üzerinde servis edilen sulu yaprak et döner, köz biber ve domatesle.',
    category: 'donerler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/pilav-ustu-doner.webp',
    featured: true,
    available: true,
    portion: 'Tek Porsiyon',
    tags: ['Geleneksel', 'Tereyağlı Pilav'],
  },
  {
    id: 'ekmek-arasi-et-doner',
    name: 'Özel Tombik / Somun Et Döner',
    slug: 'ekmek-arasi-et-doner',
    description: 'Fırından yeni çıkmış çıtır susamlı tombik ekmek içerisine bol yaprak döner, isteğe göre domates ve ince kıyım soğan.',
    category: 'donerler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/tombik-doner.webp',
    featured: false,
    available: true,
    portion: '100 gr / 130 gr',
    tags: ['Hızlı & Doyurucu', 'Çıtır Tombik'],
  },

  // 2. DÜRÜMLER
  {
    id: 'guzelyali-ozel-durum',
    name: 'Güzelyalı Özel Lavaş Döner Dürüm',
    slug: 'guzelyali-ozel-durum',
    description: 'İncecik taze açma lavaş içerisine bol yaprak et döner, közlenmiş Adana biberi, domates ve hafif maydanozlu sumak.',
    category: 'durumler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/durum-doner.webp',
    featured: true,
    signature: true,
    available: true,
    portion: 'Dürüm',
    tags: ['Şefin Önerisi', 'Sıcak Lavaş'],
    preparationNote: 'Lavaş, dönerin hafif lezzetiyle ızgarada ısıtılarak sarılır.',
  },
  {
    id: 'kasarli-durum-doner',
    name: 'Eritme Kaşarlı Döner Dürüm',
    slug: 'kasarli-durum-doner',
    description: 'Sıcak lavaş arasında dönerin sıcaklığıyla eriyen hakiki Trakya kaşarı ve taze baharat dokunuşu.',
    category: 'durumler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/kasarli-durum.webp',
    featured: false,
    available: true,
    portion: 'Dürüm',
    tags: ['Eritme Kaşar', 'Sıcak Servis'],
  },

  // 3. PORSİYONLAR
  {
    id: 'guzelyali-karisik-tabak',
    name: 'Güzelyalı Usta Tabağı (1.5 Porsiyon)',
    slug: 'guzelyali-karisik-tabak',
    description: 'Döner tutkunları için 180 gr bol yaprak döner, tereyağlı pide parçaları, köz sebzeler, patates tava ve süzme yoğurt.',
    category: 'porsiyonlar',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/usta-tabagi.webp',
    featured: true,
    available: true,
    portion: '1.5 Porsiyon (180 gr)',
    tags: ['Doyurucu', 'Garnitürlü'],
  },
  {
    id: 'sadrazam-porsiyon',
    name: 'Köz Biberli Porsiyon Döner',
    slug: 'koz-biberli-porsiyon',
    description: 'Tırnak pide üzerinde servis edilen yaprak döner, közlenmiş acı ve tatlı biberler, sumaklı taze soğan salatası.',
    category: 'porsiyonlar',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/porsiyon-doner.webp',
    featured: false,
    available: true,
    portion: '1 Porsiyon (130 gr)',
    tags: ['Acı Severler', 'Köz Biber'],
  },

  // 4. İSKENDER
  {
    id: 'guzelyali-ozel-iskender',
    name: 'Güzelyalı Hakiki Bursa Usulü İskender',
    slug: 'guzelyali-ozel-iskender',
    description: 'Fırında hafif kıtırlaştırılmış tırnaklı pide, ince yaprak et döner, kıvamında pişmiş domates sosu, manda yoğurdu ve masada kızgın dökülen saf tereyağı.',
    category: 'iskender',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/iskender.webp',
    featured: true,
    signature: true,
    available: true,
    portion: '1 Porsiyon / 1.5 Porsiyon',
    tags: ['Masada Tereyağı', 'Manda Yoğurdu', 'Geleneksel Sos'],
    preparationNote: 'Hakiki tereyağı misafirin masasında kızgın olarak servis edilir.',
  },

  // 5. YAN ÜRÜNLER & MEZELER
  {
    id: 'adana-bostana-salata',
    name: 'Çukurova Bostana Salatası',
    slug: 'cukurova-bostana-salatasi',
    description: 'Zırhla ince kıyılmış domates, salatalık, taze nane, maydanoz, ceviz parçaları ve hakiki nar ekşisi.',
    category: 'yan-urunler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/bostana-salata.webp',
    featured: false,
    available: true,
    tags: ['Taze & Ferahlatıcı', 'Zırh Kıyım'],
  },
  {
    id: 'baharatli-patates-tava',
    name: 'Özel Baharatlı Çıtır Patates',
    slug: 'ozel-baharatli-citir-patates',
    description: 'Taze patateslerden günlük doğranan, özel baharat harmanıyla tatlandırılmış çıtır patates tava.',
    category: 'yan-urunler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/patates-tava.webp',
    featured: false,
    available: true,
    tags: ['Çıtır', 'Taze'],
  },
  {
    id: 'sumakli-sogan-piyazi',
    name: 'Geleneksel Sumaklı Soğan Salatası',
    slug: 'sumakli-sogan-salatasi',
    description: 'İnce hilal doğranmış soğan, Güneydoğu sumağı, ince kıyım maydanoz ve sızma zeytinyağı.',
    category: 'yan-urunler',
    priceNote: 'İkramımızdır',
    image: '/images/menu/sumakli-sogan.webp',
    featured: false,
    available: true,
    tags: ['Masa İkramı'],
  },

  // 6. TATLILAR
  {
    id: 'antep-fistikli-katmer',
    name: 'Çıtır Antep Fıstıklı Katmer',
    slug: 'fistikli-katmer',
    description: 'İncecik açılmış çıtır hamur içerisinde bol Antep fıstığı ve manda kaymağı, fırından sıcacık.',
    category: 'tatlilar',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/katmer.webp',
    featured: true,
    available: true,
    tags: ['Fırından Sıcak', 'Antep Fıstığı'],
  },
  {
    id: 'firinda-sutlac',
    name: 'Geleneksel Fırın Sütlaç',
    slug: 'firin-sutlac',
    description: 'Tam yağlı köy sütü ile ağır ateşte kaynatılıp fırında nar gibi kızartılan enfes sütlaç.',
    category: 'tatlilar',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/sutlac.webp',
    featured: false,
    available: true,
    tags: ['Hafif Lezzet', 'Köy Sütü'],
  },

  // 7. İÇECEKLER
  {
    id: 'yayik-ayrani',
    name: 'Hakiki Açık Yayık Ayranı',
    slug: 'yayik-ayrani',
    description: 'Bol köpüklü, bakır maşrapa ile sunulan geleneksel soğuk yayık ayranı.',
    category: 'icecekler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/yayik-ayran.webp',
    featured: true,
    signature: true,
    available: true,
    tags: ['Bakır Maşrapa', 'Bol Köpüklü'],
  },
  {
    id: 'adana-ozel-salgam',
    name: 'Adana Usulü Acılı / Acısız Şalgam',
    slug: 'adana-salgam',
    description: 'Geleneksel mayalanma yöntemiyle hazırlanan, mor havuç taneli hakiki Çukurova şalgamı.',
    category: 'icecekler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/salgam.webp',
    featured: true,
    available: true,
    tags: ['Geleneksel', 'Adana'],
  },
  {
    id: 'mesrubatlar',
    name: 'Soğuk Meşrubatlar & Maden Suyu',
    slug: 'soguk-mesrubatlar',
    description: 'Kola, fanta, gazoz ve doğal kaynak mineralli maden suyu çeşitleri.',
    category: 'icecekler',
    priceNote: 'Açılışta Güncellenecektir',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
  },
];
