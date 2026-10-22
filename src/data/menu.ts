/**
 * Güzelyalı Dönercisi - Menü Veri Modeli
 * 
 * Tüm menü öğeleri, kategorileri ve güncel fiyatlar tek merkezden yönetilir.
 * Toplam 16 ürün tanımlanmıştır. Fiyatlar TL cinsindendir.
 */

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: MenuCategoryKey;
  price: number;
  priceFormatted: string;
  priceNote?: string;
  image: string;
  featured?: boolean;
  signature?: boolean;
  available: boolean;
  portion?: string;
  tags?: string[];
  preparationNote?: string;
}

export type MenuCategoryKey = 
  | 'tavuk-doner' 
  | 'et-doner' 
  | 'pilav-ustu' 
  | 'yan-urunler' 
  | 'icecekler';

export interface MenuCategory {
  key: MenuCategoryKey;
  title: string;
  description: string;
  icon?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    key: 'tavuk-doner',
    title: 'Tavuk Döner',
    description: 'Özel baharat ve yoğurt terbiyesiyle marine edilen, köz ateşinde nar gibi kızaran tavuk döner lezzetlerimiz.',
  },
  {
    key: 'et-doner',
    title: 'Et Döner',
    description: 'Özenle dinlendirilmiş yerli dana ve kuzu etinden, geleneksel köz ateşinde ağır ağır pişen yaprak et döner.',
  },
  {
    key: 'pilav-ustu',
    title: 'Pilav Üstü',
    description: 'Tereyağlı tane tane baldo pirinç pilavı üzerinde servis edilen zengin döner sunumlarımız.',
  },
  {
    key: 'yan-urunler',
    title: 'Yan Ürünler',
    description: 'Dönerinizin yanına altın sarısı, çıtır çıtır ve sıcacık patates kızartması.',
  },
  {
    key: 'icecekler',
    title: 'İçecekler',
    description: 'Köpüklü soğuk ayran, buz gibi kutu meşrubatlar ve doğal kaynak suyu.',
  },
];

export const menuItems: MenuItem[] = [
  // 1. TAVUK DÖNER (3 Ürün)
  {
    id: 'tavuk-doner-servis',
    name: 'Tavuk Döner Servis',
    slug: 'tavuk-doner-servis',
    description: 'Özel baharat ve marinasyonla dinlendirilmiş tavuk döner; tırnak pide, közlenmiş biber, domates ve sumaklı soğan salatası eşliğinde servis edilir.',
    category: 'tavuk-doner',
    price: 270,
    priceFormatted: '270 TL',
    image: '/images/menu/porsiyon-doner.webp',
    featured: true,
    available: true,
    portion: 'Porsiyon Servis',
    tags: ['Özel Terbiye', 'Köz Ateşi', 'Garnitürlü'],
    preparationNote: 'Köz ateşinde taze kesilerek sıcak tırnak pide ile servis edilir.',
  },
  {
    id: 'tavuk-doner-durum',
    name: 'Tavuk Döner Dürüm',
    slug: 'tavuk-doner-durum',
    description: 'Sıcak açma lavaş içerisine sarılı bol tavuk döner, közlenmiş biber ve isteğe göre hafif maydanozlu soğan.',
    category: 'tavuk-doner',
    price: 220,
    priceFormatted: '220 TL',
    image: '/images/menu/durum-doner.webp',
    featured: true,
    available: true,
    portion: 'Lavaş Dürüm',
    tags: ['Taze Lavaş', 'Doyurucu'],
    preparationNote: 'Lavaş ızgarada ısıtılarak sıcak servis edilir.',
  },
  {
    id: 'tavuk-doner-sutlu-ekmege',
    name: 'Tavuk Döner Sütlü Ekmeğe',
    slug: 'tavuk-doner-sutlu-ekmege',
    description: 'Özel fırınlanmış yumuşak sütlü ekmek arasına bol tavuk döner, domates dilimleri ve özel sos dokunuşu.',
    category: 'tavuk-doner',
    price: 220,
    priceFormatted: '220 TL',
    image: '/images/menu/tombik-doner.webp',
    featured: false,
    available: true,
    portion: 'Sütlü Ekmek',
    tags: ['Sütlü Ekmek', 'Özel Lezzet'],
  },

  // 2. ET DÖNER (3 Ürün)
  {
    id: 'et-doner-servis',
    name: 'Et Döner Servis',
    slug: 'et-doner-servis',
    description: 'Özel marinasyonla dinlendirilmiş dana ve kuzu etinden incecik yaprak kesim; tırnak pide, köz biber, domates ve taze yeşilliklerle.',
    category: 'et-doner',
    price: 420,
    priceFormatted: '420 TL',
    image: '/images/menu/yaprak-et-doner.webp',
    featured: true,
    signature: true,
    available: true,
    portion: 'Porsiyon Servis',
    tags: ['İmza Lezzet', 'Yaprak Et', 'Odun / Köz Ateşi'],
    preparationNote: 'Özel marinasyonlu antrikot ve kuzu döş etinden ince yaprak olarak kesilir.',
  },
  {
    id: 'et-doner-durum',
    name: 'Et Döner Dürüm',
    slug: 'et-doner-durum',
    description: 'İncecik taze lavaş içerisine bol yaprak et döner, közlenmiş Adana biberi, domates ve sumaklı ince soğan.',
    category: 'et-doner',
    price: 400,
    priceFormatted: '400 TL',
    image: '/images/menu/durum-doner.webp',
    featured: true,
    signature: true,
    available: true,
    portion: 'Lavaş Dürüm',
    tags: ['Şefin İmzası', 'Sıcak Lavaş'],
    preparationNote: 'Lavaş dönerin lezzetiyle ızgarada hafifçe ısıtılarak sarılır.',
  },
  {
    id: 'et-doner-sutlu-durum-ekmege',
    name: 'Et Döner Sütlü Dürüm Ekmeğe',
    slug: 'et-doner-sutlu-durum-ekmege',
    description: 'Fırından taze çıkan özel sütlü dürüm ekmeği içerisine bol yaprak et döner, köz sebzeler ve hafif baharat çeşnisi.',
    category: 'et-doner',
    price: 400,
    priceFormatted: '400 TL',
    image: '/images/menu/tombik-doner.webp',
    featured: false,
    available: true,
    portion: 'Sütlü Dürüm Ekmek',
    tags: ['Sütlü Ekmek', 'Yaprak Döner'],
  },

  // 3. PİLAV ÜSTÜ (2 Ürün)
  {
    id: 'pilav-ustu-tavuk',
    name: 'Pilav Üstü Tavuk',
    slug: 'pilav-ustu-tavuk',
    description: 'Geleneksel tereyağlı tane tane baldo pirinç pilavı üzerinde lezzetli tavuk döner, közlenmiş biber ve domates eşliğinde.',
    category: 'pilav-ustu',
    price: 370,
    priceFormatted: '370 TL',
    image: '/images/menu/pilav-ustu-doner.webp',
    featured: true,
    available: true,
    portion: 'Tek Porsiyon',
    tags: ['Tereyağlı Pilav', 'Doyurucu'],
  },
  {
    id: 'pilav-ustu-et',
    name: 'Pilav Üstü Et',
    slug: 'pilav-ustu-et',
    description: 'Geleneksel tereyağlı baldo pirinç pilavı üzerinde sulu ve yumuşacık yaprak et döner, közlenmiş biber ve domatesle.',
    category: 'pilav-ustu',
    price: 500,
    priceFormatted: '500 TL',
    image: '/images/menu/pilav-ustu-doner.webp',
    featured: true,
    signature: true,
    available: true,
    portion: 'Tek Porsiyon',
    tags: ['Geleneksel', 'Tereyağlı Pilav', 'İmza'],
  },

  // 4. YAN ÜRÜNLER (1 Ürün)
  {
    id: 'patates-kizartmasi',
    name: 'Patates Kızartması',
    slug: 'patates-kizartmasi',
    description: 'Altın sarısı çıtır çıtır kızarmış patates dilimleri, özel baharat harmanıyla sıcacık masanıza sunulur.',
    category: 'yan-urunler',
    price: 90,
    priceFormatted: '90 TL',
    image: '/images/menu/patates-tava.webp',
    featured: false,
    available: true,
    portion: 'Porsiyon',
    tags: ['Çıtır', 'Sıcak Servis'],
  },

  // 5. İÇECEKLER (7 Ürün)
  {
    id: 'ayran',
    name: 'Ayran',
    slug: 'ayran',
    description: 'Geleneksel lezzetinde, bol köpüklü ve ferahlatıcı soğuk ayran.',
    category: 'icecekler',
    price: 60,
    priceFormatted: '60 TL',
    image: '/images/menu/yayik-ayran.webp',
    featured: true,
    available: true,
    portion: 'Soğuk İçecek',
    tags: ['Bol Köpüklü', 'Geleneksel'],
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    slug: 'coca-cola',
    description: 'Buz gibi soğuk servis edilen kutu Coca-Cola.',
    category: 'icecekler',
    price: 80,
    priceFormatted: '80 TL',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
    portion: 'Kutu 330 ml',
  },
  {
    id: 'sprite',
    name: 'Sprite',
    slug: 'sprite',
    description: 'Limon ferahlığı veren buz gibi kutu gazoz.',
    category: 'icecekler',
    price: 80,
    priceFormatted: '80 TL',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
    portion: 'Kutu 330 ml',
  },
  {
    id: 'fanta',
    name: 'Fanta',
    slug: 'fanta',
    description: 'Portakal lezzetiyle ferahlatıcı soğuk kutu meşrubat.',
    category: 'icecekler',
    price: 80,
    priceFormatted: '80 TL',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
    portion: 'Kutu 330 ml',
  },
  {
    id: 'fuse-tea-seftali',
    name: 'Fuse Tea Şeftali',
    slug: 'fuse-tea-seftali',
    description: 'Doğal çay demi ve şeftali aromalı serinletici soğuk çay.',
    category: 'icecekler',
    price: 80,
    priceFormatted: '80 TL',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
    portion: 'Kutu 330 ml',
  },
  {
    id: 'fuse-tea-limon',
    name: 'Fuse Tea Limon',
    slug: 'fuse-tea-limon',
    description: 'Ferahlatıcı limon aromalı soğuk buzlu çay.',
    category: 'icecekler',
    price: 80,
    priceFormatted: '80 TL',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
    portion: 'Kutu 330 ml',
  },
  {
    id: 'su',
    name: 'Su',
    slug: 'su',
    description: 'Doğal kaynak mineralli içme suyu.',
    category: 'icecekler',
    price: 20,
    priceFormatted: '20 TL',
    image: '/images/menu/mesrubat.webp',
    featured: false,
    available: true,
    portion: 'Pet Şişe 500 ml',
  },
];
