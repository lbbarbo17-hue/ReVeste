import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'rev-01',
    sku: 'REV-2026-COAT-01',
    name: 'Colete Corset Alfaiataria Vintage',
    category: 'Tops & Coletes',
    categoryKey: 'tops',
    price: 180,
    originalPrice: 390,
    size: 'M',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Marrom Caramelo',
    colorHex: '#6F4E37',
    brand: 'Curadoria 90s',
    badge: 'Peça Única',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Colete com corte de alfaiataria fina e amarrações frontais delicadas. Peça vintage garimpada em brechó de Paris, tecido estruturado em sarja de algodão encorpado.',
    composition: '100% Algodão Puro Estruturado',
    measurements: {
      bust: 92,
      waist: 76,
      length: 48,
      shoulder: 36
    },
    ecoImpact: {
      waterSavedLiters: 2700,
      co2SavedKg: 8.5
    },
    seller: {
      name: 'Mariana Garimpos',
      city: 'São Paulo',
      state: 'SP',
      rating: 4.9,
      salesCount: 84
    },
    isAvailable: true
  },
  {
    id: 'rev-02',
    sku: 'REV-2026-DNM-02',
    name: 'Jaqueta Denim Oversized 1994',
    category: 'Casacos & Jaquetas',
    categoryKey: 'jackets',
    price: 285,
    originalPrice: 520,
    size: 'G',
    condition: 'Vintage Curado',
    colorName: 'Azul Jeans',
    colorHex: '#3b82f6',
    brand: "Levi's Vintage",
    badge: 'Destaque',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Autêntica jaqueta jeans anos 90 com lavagem estonada média, botões originais em cobre envelhecido e modelagem oversized unissex com caimento solto.',
    composition: '100% Denim Jeans Pesado 14oz',
    measurements: {
      bust: 116,
      waist: 110,
      length: 68,
      shoulder: 49,
      sleeve: 62
    },
    ecoImpact: {
      waterSavedLiters: 7500,
      co2SavedKg: 19.2
    },
    seller: {
      name: 'Brechó Acervo Retrô',
      city: 'Curitiba',
      state: 'PR',
      rating: 5.0,
      salesCount: 142
    },
    isAvailable: true
  },
  {
    id: 'rev-03',
    sku: 'REV-2026-BAG-03',
    name: 'Bolsa Tote Palha & Couro Natural',
    category: 'Bolsas & Malas',
    categoryKey: 'bags',
    price: 85,
    originalPrice: 240,
    size: 'Único',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Creme & Caramelo',
    colorHex: '#C49A6C',
    brand: 'Artesanal Nordeste',
    badge: 'Peça Única',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    description: 'Bolsa tote tramada manualmente em palha de carnaúba com detalhes e alças reforçadas em couro legítimo reaproveitado. Bolso frontal funcional.',
    composition: 'Palha de Fibra Natural & Couro Bovino',
    measurements: {
      length: 32,
      waist: 40 // largura
    },
    ecoImpact: {
      waterSavedLiters: 1800,
      co2SavedKg: 5.4
    },
    seller: {
      name: 'Clara Desapegos',
      city: 'Belo Horizonte',
      state: 'MG',
      rating: 4.8,
      salesCount: 37
    },
    isAvailable: true
  },
  {
    id: 'rev-04',
    sku: 'REV-2026-SWT-04',
    name: 'Moletom Confort Hoodie Rosa Chá',
    category: 'Casacos & Jaquetas',
    categoryKey: 'jackets',
    price: 110,
    originalPrice: 260,
    size: 'M',
    condition: 'Novo com Etiqueta',
    colorName: 'Rosa Suave',
    colorHex: '#f472b6',
    brand: 'Cotton Basic',
    badge: 'Novo',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Moletom de algodão flanelado super macio com capuz forrado e bolso canguru. Cor rosa quartzo suave, nunca usado, preservado com etiqueta original.',
    composition: '80% Algodão Sustentável, 20% Poliéster Reciclado',
    measurements: {
      bust: 104,
      waist: 98,
      length: 64,
      shoulder: 44,
      sleeve: 60
    },
    ecoImpact: {
      waterSavedLiters: 3200,
      co2SavedKg: 9.8
    },
    seller: {
      name: 'Juliana Pires',
      city: 'Rio de Janeiro',
      state: 'RJ',
      rating: 4.9,
      salesCount: 56
    },
    isAvailable: true
  },
  {
    id: 'rev-05',
    sku: 'REV-2026-TRN-05',
    name: 'Trench Coat Clássico Parisiense',
    category: 'Casacos & Jaquetas',
    categoryKey: 'jackets',
    price: 195,
    originalPrice: 780,
    size: 'M',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Bege Areia',
    colorHex: '#D2B48C',
    brand: 'Burberrys Vintage',
    badge: 'Destaque',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    description: 'Sobretudo trench coat clássico em gabardine impermeabilizada bege areia com faixa para cintura e abotoamento duplo vintage.',
    composition: '100% Algodão Gabardine',
    measurements: {
      bust: 98,
      waist: 84,
      hips: 106,
      length: 108,
      shoulder: 40,
      sleeve: 61
    },
    ecoImpact: {
      waterSavedLiters: 8900,
      co2SavedKg: 24.5
    },
    seller: {
      name: 'Sofia Curadoria',
      city: 'Porto Alegre',
      state: 'RS',
      rating: 5.0,
      salesCount: 198
    },
    isAvailable: true
  },
  {
    id: 'rev-06',
    sku: 'REV-2026-TSH-06',
    name: 'T-shirt Algodão Egípcio Mostarda',
    category: 'Camisas & Blusas',
    categoryKey: 'shirts',
    price: 55,
    originalPrice: 140,
    size: 'P',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Amarelo Mostarda',
    colorHex: '#eab308',
    brand: 'Osklen Vintage',
    badge: 'Peça Única',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Camiseta básica com toque aveludado e caimento reto. Cor mostarda quente ideal para composições com tons terrosos.',
    composition: '100% Algodão Pima Puro',
    measurements: {
      bust: 94,
      waist: 90,
      length: 62,
      shoulder: 39,
      sleeve: 20
    },
    ecoImpact: {
      waterSavedLiters: 2100,
      co2SavedKg: 4.8
    },
    seller: {
      name: 'Gabriel Desapega',
      city: 'São Paulo',
      state: 'SP',
      rating: 4.7,
      salesCount: 29
    },
    isAvailable: true
  },
  {
    id: 'rev-07',
    sku: 'REV-2026-KNIT-07',
    name: 'Cardigan Cocoon Lã Pura Mescla',
    category: 'Casacos & Jaquetas',
    categoryKey: 'jackets',
    price: 105,
    originalPrice: 320,
    size: 'G',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Cinza Mescla',
    colorHex: '#9ca3af',
    brand: 'Linho & Fio',
    badge: 'Peça Única',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    description: 'Maxi cardigan em tricot de lã pura com botões de tartaruga ecológicos. Corte envelope aconchegante para dias frios.',
    composition: '100% Lã Natural Tosa Consciente',
    measurements: {
      bust: 112,
      waist: 108,
      length: 82,
      shoulder: 46,
      sleeve: 58
    },
    ecoImpact: {
      waterSavedLiters: 4800,
      co2SavedKg: 14.1
    },
    seller: {
      name: 'Beatriz Brechó',
      city: 'Florianópolis',
      state: 'SC',
      rating: 4.9,
      salesCount: 77
    },
    isAvailable: true
  },
  {
    id: 'rev-08',
    sku: 'REV-2026-SUN-08',
    name: 'Óculos de Sol Steampunk Retrô',
    category: 'Acessórios & Óculos',
    categoryKey: 'sunglasses',
    price: 59,
    originalPrice: 190,
    size: 'Único',
    condition: 'Novo com Etiqueta',
    colorName: 'Preto & Bronze',
    colorHex: '#18181b',
    brand: 'RetroFrame Studio',
    badge: 'Novo',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Armação circular metálica com proteções laterais vintage e lentes pretas com proteção UV400 testada em laboratório.',
    composition: 'Metal Anticorrosivo e Acetato',
    measurements: {
      length: 14 // largura frontal
    },
    ecoImpact: {
      waterSavedLiters: 950,
      co2SavedKg: 2.1
    },
    seller: {
      name: 'Mariana Garimpos',
      city: 'São Paulo',
      state: 'SP',
      rating: 4.9,
      salesCount: 84
    },
    isAvailable: true
  },
  {
    id: 'rev-09',
    sku: 'REV-2026-BLZ-09',
    name: 'Blazer Tapestry Floral Urbano',
    category: 'Casacos & Jaquetas',
    categoryKey: 'jackets',
    price: 230,
    originalPrice: 650,
    size: 'M',
    condition: 'Vintage Curado',
    colorName: 'Floral Multicolor',
    colorHex: '#8FA893',
    brand: 'Ateliê Tapeçaria 80s',
    badge: 'Destaque',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
    description: 'Blazer statement confeccionado em tecido jacquard tapeçaria com motivos botânicos e forro acetinado. Peça histórica impecável.',
    composition: 'Jacquard de Algodão e Viscose Vintage',
    measurements: {
      bust: 96,
      waist: 82,
      length: 70,
      shoulder: 41,
      sleeve: 59
    },
    ecoImpact: {
      waterSavedLiters: 6100,
      co2SavedKg: 17.8
    },
    seller: {
      name: 'Brechó Acervo Retrô',
      city: 'Curitiba',
      state: 'PR',
      rating: 5.0,
      salesCount: 142
    },
    isAvailable: true
  },
  {
    id: 'rev-10',
    sku: 'REV-2026-SHO-10',
    name: 'Sneakers Camurça Vintage Neutral',
    category: 'Calçados',
    categoryKey: 'shoes',
    price: 199,
    originalPrice: 480,
    size: 'G', // equivalente ao 39/40
    condition: 'Excelente / Sem Marcas',
    colorName: 'Bege & Fendi',
    colorHex: '#F0EBE0',
    brand: 'New Balance Heritage',
    badge: 'Peça Única',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    description: 'Tênis clássico em camurça genuína com solado tratorado antiderrapante. Higienizado e impermeabilizado com cera natural.',
    composition: 'Camurça Natural e Borracha Vulcanizada',
    measurements: {
      length: 26 // 26cm de palmilha
    },
    ecoImpact: {
      waterSavedLiters: 5200,
      co2SavedKg: 13.5
    },
    seller: {
      name: 'Sneakers & Desapegos',
      city: 'Santos',
      state: 'SP',
      rating: 4.8,
      salesCount: 63
    },
    isAvailable: true
  },
  {
    id: 'rev-11',
    sku: 'REV-2026-DRS-11',
    name: 'Vestido Midi Floral Campo Francês',
    category: 'Vestidos & Saias',
    categoryKey: 'dresses',
    price: 85,
    originalPrice: 280,
    size: 'P',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Terracota Floral',
    colorHex: '#C96A4B',
    brand: 'Farm Rio Desapego',
    badge: 'Destaque',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    description: 'Vestido midi em viscose encorpada com decote transpassado em V e amarração na cintura. Estampa floral poética e caimento fluido.',
    composition: '100% Viscose de Reflorestamento',
    measurements: {
      bust: 88,
      waist: 70,
      hips: 102,
      length: 118,
      shoulder: 37
    },
    ecoImpact: {
      waterSavedLiters: 3900,
      co2SavedKg: 11.2
    },
    seller: {
      name: 'Camila Vintage',
      city: 'Campinas',
      state: 'SP',
      rating: 4.9,
      salesCount: 45
    },
    isAvailable: true
  },
  {
    id: 'rev-12',
    sku: 'REV-2026-LIN-12',
    name: 'Camisa Alfaiataria Linho Rústico',
    category: 'Camisas & Blusas',
    categoryKey: 'shirts',
    price: 129,
    originalPrice: 340,
    size: 'M',
    condition: 'Excelente / Sem Marcas',
    colorName: 'Creme Natural',
    colorHex: '#FAF7F0',
    brand: 'Linho Puro Ateliê',
    badge: 'Peça Única',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    description: 'Camisa manga longa em puro linho europeu pré-encolhido. Botões de madrepérola natural, bolso frontal e gola italiana.',
    composition: '100% Linho Cru Puro',
    measurements: {
      bust: 102,
      waist: 98,
      length: 71,
      shoulder: 43,
      sleeve: 61
    },
    ecoImpact: {
      waterSavedLiters: 3100,
      co2SavedKg: 8.9
    },
    seller: {
      name: 'Mariana Garimpos',
      city: 'São Paulo',
      state: 'SP',
      rating: 4.9,
      salesCount: 84
    },
    isAvailable: true
  }
];

export const CATEGORIES_DATA = [
  { key: 'all', label: 'Todas as Peças', count: 247 },
  { key: 'shirts', label: 'Camisas & Blusas', count: 25 },
  { key: 'tops', label: 'Tops & Coletes', count: 42 },
  { key: 'jackets', label: 'Casacos & Jaquetas', count: 36 },
  { key: 'bags', label: 'Bolsas & Malas', count: 12 },
  { key: 'sunglasses', label: 'Acessórios & Óculos', count: 18 },
  { key: 'dresses', label: 'Vestidos & Saias', count: 54 },
  { key: 'shoes', label: 'Calçados', count: 8 },
];

export const SIZES_DATA: Product['size'][] = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

export const COLORS_DATA = [
  { name: 'Lavanda', hex: '#E9E8F8', border: true },
  { name: 'Azul Celeste', hex: '#8DB9F0' },
  { name: 'Pêssego', hex: '#F5B69E' },
  { name: 'Marinho', hex: '#162032' },
  { name: 'Rosa Suave', hex: '#f472b6' },
  { name: 'Bege Areia', hex: '#D2B48C' },
  { name: 'Azul Jeans', hex: '#3b82f6' },
  { name: 'Amarelo Mostarda', hex: '#eab308' },
  { name: 'Preto', hex: '#18181b' }
];

export const BRANDS_DATA = [
  'Todas',
  "Levi's Vintage",
  'Farm Rio Desapego',
  'Burberrys Vintage',
  'Linho Puro Ateliê',
  'Curadoria 90s',
  'New Balance Heritage',
  'Osklen Vintage'
];
