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
  avatar?: string;
  city: string;
  state: string;
  rating: number;
  salesCount: number;
}

export type ProductSize = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XGG' | 'Único';

export type ProductCondition = 
  | 'Novo com Etiqueta'
  | 'Excelente / Sem Marcas'
  | 'Vintage Curado'
  | 'Bom Estado';

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
  color: string;
  brand: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
