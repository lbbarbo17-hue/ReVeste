export interface ProductMeasurements {
  bust?: number;       // Busto em cm
  waist?: number;      // Cintura em cm
  hips?: number;       // Quadril em cm
  length?: number;     // Comprimento em cm
  shoulder?: number;   // Ombro a ombro em cm
  sleeve?: number;     // Manga em cm
}

export interface EcoImpact {
  waterSavedLiters: number; // Litros de água poupados
  co2SavedKg: number;       // kg de CO2 evitados
}

export interface ProductSeller {
  name: string;
  handle?: string;    // @nome_do_brecho para identificar mesma sacolinha
  avatar?: string;
  city: string;
  state: string;
  rating: number;
  salesCount: number;
  verified?: boolean; // Selo de verificado do brechó vendedor
}

export type ProductSize = 
  | 'PP' 
  | 'P' 
  | 'M' 
  | 'G' 
  | 'GG' 
  | 'XGG' 
  | 'Único'
  | '34'
  | '36'
  | '38'
  | '40'
  | '42'
  | '44'
  | '46'
  | string;

export type ProductCondition = 
  | 'Novo com Etiqueta'
  | 'Perfeito Estado'
  | 'Gentilmente Usado'
  | 'Vintage'
  | 'Novo com etiqueta'
  | 'Perfeito estado'
  | 'Gentilmente usado';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  categoryKey: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  condition: ProductCondition;
  colorName: string;
  colorHex: string;
  brand: string;
  badge?: 'Peça Única' | 'Destaque' | 'Novo' | 'Promoção';
  image: string;
  additionalImages?: string[];
  description: string;
  composition: string;
  measurements: ProductMeasurements;
  ecoImpact: EcoImpact;
  seller: ProductSeller;
  styleVibe?: string; // Estilo/Vibe (ex: 'Y2K / Anos 2000', 'Minimalista Chic', etc.)
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  reservedAt: number; // Timestamp da reserva
  expiresAt: number;  // Timestamp de expiração (15 minutos)
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  size: string;
  condition?: string;
  styleVibe?: string;
  color: string;
  brand: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'eco-water';
}

