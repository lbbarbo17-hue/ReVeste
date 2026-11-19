import { useState, useMemo } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Header } from './components/layout/Header';
import { HeroBanner } from './components/layout/HeroBanner';
import { SmartThriftFeatures } from './components/home/SmartThriftFeatures';
import { Footer } from './components/layout/Footer';
import { FilterSidebar } from './components/catalog/FilterSidebar';
import { CatalogToolbar } from './components/catalog/CatalogToolbar';
import { ProductGrid } from './components/catalog/ProductGrid';
import { CartDrawer } from './components/modals/CartDrawer';
import { FavoritesDrawer } from './components/modals/FavoritesDrawer';
import { AuthModal } from './components/modals/AuthModal';
import { VirtualFittingModal } from './components/modals/VirtualFittingModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { MOCK_PRODUCTS, CATEGORIES_DATA } from './data/mockProducts';
import { Product, CartItem, FilterState } from './types/product';

const ITEMS_PER_PAGE = 6;

export default function App() {
  // Estado dos Filtros
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: 30,
    maxPrice: 350,
    size: '',
    condition: '',
    styleVibe: '',
    color: '',
    brand: 'Todas',
    searchQuery: '',
    sortBy: 'newest',
  });

  // Estado da Sacolinha Turbinada (Reserva de 15 minutos)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado de Favoritos
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['rev-02', 'rev-05']));
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Estado de Autenticação / Perfil
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Modais de Peça e Provador Virtual
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fittingProduct, setFittingProduct] = useState<Product | null>(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Conjunto de IDs no carrinho para busca rápida O(1)
  const cartItemsIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.product.id));
  }, [cartItems]);

  // Lista de produtos favoritados
  const favoriteProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => favorites.has(product.id));
  }, [favorites]);

  // Alternador de Favoritos
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  // Atualizador parcial de filtros
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Volta para primeira página ao mudar filtro
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      minPrice: 30,
      maxPrice: 350,
      size: '',
      condition: '',
      styleVibe: '',
      color: '',
      brand: 'Todas',
      searchQuery: '',
      sortBy: 'newest',
    });
    setCurrentPage(1);
  };

  // Adicionar à Sacolinha com Timer de Reserva (Anti-Overselling)
  const handleAddToCart = (product: Product) => {
    if (cartItemsIds.has(product.id)) return;
    const now = Date.now();
    const newItem: CartItem = {
      product,
      reservedAt: now,
      expiresAt: now + 15 * 60 * 1000, // 15 minutos
    };
    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filtragem dos Produtos
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Categoria
      if (filters.category !== 'all' && product.categoryKey !== filters.category) {
        return false;
      }
      // Preço
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      // Tamanho (aceita tamanho padrão PP-XGG ou número)
      if (filters.size && product.size !== filters.size) {
        return false;
      }
      // Estado de Conservação
      if (filters.condition && product.condition !== filters.condition) {
        return false;
      }
      // Estilo / Vibe
      if (filters.styleVibe && product.styleVibe !== filters.styleVibe) {
        return false;
      }
      // Cor
      if (filters.color && product.colorName !== filters.color) {
        return false;
      }
      // Marca
      if (filters.brand !== 'Todas' && product.brand !== filters.brand) {
        return false;
      }
      // Busca por texto
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesComp = product.composition.toLowerCase().includes(query);
        const matchesVibe = product.styleVibe ? product.styleVibe.toLowerCase().includes(query) : false;
        const matchesCond = product.condition.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesComp && !matchesVibe && !matchesCond) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'eco-water') return b.ecoImpact.waterSavedLiters - a.ecoImpact.waterSavedLiters;
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // 'featured' mantém a ordem curada
    });
  }, [filters]);

  // Paginação dos Produtos
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Nome da Categoria Atual para o Hero
  const currentCategoryLabel = useMemo(() => {
    const found = CATEGORIES_DATA.find((c) => c.key === filters.category);
    return found ? found.label : 'Todas as Peças';
  }, [filters.category]);

  const handleScrollToCatalog = () => {
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E9E8F8] text-[#1E293B]">
      
      {/* 1. Navbar Fixa */}
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.size}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Hero Banner Editorial + Impactômetro Global */}
      <HeroBanner
        currentCategory={currentCategoryLabel}
        onExploreClick={handleScrollToCatalog}
      />

      {/* 3. Faixa "Como Funciona o Garimpo Inteligente" (3 cards compactos) */}
      <div id="como-funciona">
        <SmartThriftFeatures />
      </div>

      {/* 4. Seção de Catálogo com Sidebar de Filtros + Grid de Produtos */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Sidebar Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalProductsCount={filteredProducts.length}
            />
          </div>

          {/* Drawer Mobile Deslizante de Filtros */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              {/* Backdrop escuro com blur */}
              <div
                className="fixed inset-0 bg-[#1E293B]/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              {/* Painel lateral deslizante */}
              <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
                <div className="p-5 border-b border-[#D8D7EE] bg-[#8DB9F0] text-[#1E293B] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#1E293B]" />
                    <span className="font-serif text-xl font-bold text-[#1E293B]">Filtros do Brechó</span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#1E293B] flex items-center justify-center transition-colors shadow-xs"
                    aria-label="Fechar filtros"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    totalProductsCount={filteredProducts.length}
                  />
                </div>

                <div className="p-4 border-t border-[#D8D7EE] bg-white sticky bottom-0">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] font-bold py-3 rounded-full text-sm transition-colors shadow-xs border border-[#7AA7DE]"
                  >
                    Ver {filteredProducts.length} peças encontradas
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Área de Produtos: Toolbar com Autocomplete + Grid de Cards + Paginação */}
          <div className="flex-1 w-full">
            <CatalogToolbar
              totalCount={filteredProducts.length}
              searchQuery={filters.searchQuery}
              onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
              sortBy={filters.sortBy}
              onSortChange={(sort) => handleFilterChange({ sortBy: sort })}
              onToggleMobileFilter={() => setIsMobileFilterOpen(true)}
            />

            <ProductGrid
              products={paginatedProducts}
              cartItemsIds={cartItemsIds}
              favoritesIds={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenFitting={(prod) => setFittingProduct(prod)}
              onViewDetails={(prod) => setSelectedProduct(prod)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              onResetFilters={handleResetFilters}
            />
          </div>

        </div>
      </main>

      {/* 5. Footer Azul Celeste */}
      <div id="impacto">
        <Footer />
      </div>

      {/* 6. Modais Interativos e Gavetas */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          alert('Redirecionando para o Checkout Seguro (Custódia Escrow ReVeste / Pagamento PIX com Frete Consolidado)!');
        }}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={handleRemoveFavorite}
        onAddToCart={handleAddToCart}
        cartItemsIds={cartItemsIds}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <VirtualFittingModal
        product={fittingProduct}
        onClose={() => setFittingProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={fittingProduct ? cartItemsIds.has(fittingProduct.id) : false}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenFitting={(prod) => {
          setSelectedProduct(null);
          setFittingProduct(prod);
        }}
        isInCart={selectedProduct ? cartItemsIds.has(selectedProduct.id) : false}
      />

    </div>
  );
}
