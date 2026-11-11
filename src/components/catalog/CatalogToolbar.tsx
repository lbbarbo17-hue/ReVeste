import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { FilterState } from '../../types/product';

interface CatalogToolbarProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: FilterState['sortBy'];
  onSortChange: (sort: FilterState['sortBy']) => void;
  onToggleMobileFilter?: () => void;
}

export const CatalogToolbar: React.FC<CatalogToolbarProps> = ({
  totalCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onToggleMobileFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full">
      
      {/* Contador de Peças (Pill como na referência) */}
      <div className="flex-shrink-0 bg-white/90 text-[#1E293B] px-5 py-3 rounded-full border border-[#D8D7EE] font-bold text-sm flex items-center justify-center shadow-xs">
        <span>{totalCount} peças encontradas</span>
      </div>

      {/* Input de Busca Amplo e Arredondado */}
      <div className="relative flex-grow">
        <Search className="w-4 h-4 text-[#8DB9F0] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por peça, tecido, linho, vintage..."
          className="w-full bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] focus:ring-2 focus:ring-[#8DB9F0]/40 pl-11 pr-4 py-3 rounded-full text-sm text-[#1E293B] placeholder-[#1E293B]/50 outline-none transition-all shadow-xs font-medium"
        />
      </div>

      {/* Botão de Filtro Mobile */}
      {onToggleMobileFilter && (
        <button
          onClick={onToggleMobileFilter}
          className="lg:hidden flex items-center justify-center gap-2 bg-[#8DB9F0] border border-[#7AA7DE] px-4 py-3 rounded-full text-sm font-bold text-[#1E293B] hover:bg-[#F5B69E] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      )}

      {/* Dropdown de Ordenação (Sort By) */}
      <div className="relative flex-shrink-0">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
          aria-label="Ordenar peças do catálogo"
          className="appearance-none bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] text-[#1E293B] font-bold text-sm pl-5 pr-10 py-3 rounded-full outline-none cursor-pointer hover:border-[#8DB9F0] transition-colors shadow-xs"
        >
          <option value="featured">Curadoria (Destaques)</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="newest">Garimpos Mais Recentes</option>
        </select>
        <ChevronDown className="w-4 h-4 text-[#1E293B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

    </div>
  );
};
