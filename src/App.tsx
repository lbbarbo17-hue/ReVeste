import { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { HeroBanner } from './components/layout/HeroBanner';
import { Footer } from './components/layout/Footer';
import { FilterSidebar } from './components/catalog/FilterSidebar';
import { CatalogToolbar } from './components/catalog/CatalogToolbar';
import { ProductGrid } from './components/catalog/ProductGrid';
import { CartDrawer } from './components/modals/CartDrawer';
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
    color: '',
    brand: 'Todas',
    searchQuery: '',
    sortBy: 'featured',
  });

  // Estado da Sacolinha Turbinada
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modais de Peça e Provador
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
      color: '',
      brand: 'Todas',
      searchQuery: '',
      sortBy: 'featured',
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
      // Tamanho
      if (filters.size && product.size !== filters.size) {
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
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesComp) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
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

  return (
    <div className="min-h-screen flex flex-col bg-[#E9E8F8] text-[#1E293B]">
      
      {/* 1. Header Fixo & Sofisticado */}
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Hero Banner Editorial Estilo Referência */}
      <HeroBanner currentCategory={currentCategoryLabel} />

      {/* 3. Área Principal: Sidebar de Filtros + Catálogo */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Sidebar Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalProductsCount={filteredProducts.length}
            />
          </div>

          {/* Drawer Mobile de Filtros */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative ml-auto w-full max-w-xs bg-white p-6 shadow-2xl overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-xl font-bold text-[#1E293B]">Filtros</span>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-sm font-bold text-[#8DB9F0] hover:text-[#F5B69E]"
                  >
                    Fechar
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalProductsCount={filteredProducts.length}
                />
              </div>
            </div>
          )}

          {/* Área de Produtos: Toolbar + Grid de Cards + Paginação */}
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
              onAddToCart={handleAddToCart}
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

      {/* 4. Rodapé Sustentável */}
      <Footer />

      {/* 5. Modais Interativos */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          alert('Redirecionando para o Checkout Seguro (Custódia Escrow ReVeste / Pagamento PIX com Frete Consolidado)!');
        }}
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
