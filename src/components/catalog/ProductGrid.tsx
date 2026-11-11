import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  cartItemsIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onOpenFitting: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  cartItemsIds,
  onAddToCart,
  onOpenFitting,
  onViewDetails,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white/80 border border-[#D8D7EE] rounded-3xl p-12 text-center my-6 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#E9E8F8] flex items-center justify-center mx-auto mb-4 text-[#8DB9F0]">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h4 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">
          Nenhum garimpo encontrado
        </h4>
        <p className="text-sm text-[#1E293B]/70 max-w-md mx-auto mb-6 font-medium">
          Tente ajustar os filtros de categoria, faixa de preço, tamanho ou marca para encontrar outras peças únicas do brechó.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-xs"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* Grid de 3 Colunas no Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={cartItemsIds.has(product.id)}
            onAddToCart={onAddToCart}
            onOpenFitting={onOpenFitting}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Paginação Estilizada Idêntica à Referência (< 01 [02] 03 >) com Azul Celeste #8DB9F0 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D8D7EE] bg-white text-[#1E293B] disabled:opacity-40 hover:bg-[#E9E8F8] transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-full font-bold text-xs transition-all duration-150 ${
                  isActive
                    ? 'bg-[#8DB9F0] text-[#1E293B] shadow-sm scale-105 border border-[#7AA7DE]'
                    : 'bg-white text-[#1E293B] border border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {pageNum < 10 ? `0${pageNum}` : pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D8D7EE] bg-white text-[#1E293B] disabled:opacity-40 hover:bg-[#E9E8F8] transition-colors shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
