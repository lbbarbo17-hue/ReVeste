import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Sparkles, X } from 'lucide-react';
import { FilterState } from '../../types/product';
import { SEARCH_SUGGESTIONS } from '../../data/mockProducts';

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
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o autocomplete ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="catalogo" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full">
      
      {/* Contador de Peças (Pill elegante) */}
      <div className="flex-shrink-0 bg-white/90 text-[#1E293B] px-5 py-3 rounded-full border border-[#D8D7EE] font-bold text-xs sm:text-sm flex items-center justify-center shadow-xs">
        <span>{totalCount} peças encontradas</span>
      </div>

      {/* Barra de Busca com Autocomplete Integrado */}
      <div ref={containerRef} className="relative flex-grow">
        <Search className="w-4 h-4 text-[#8DB9F0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        
        <input
          type="text"
          value={searchQuery}
          onFocus={() => setIsAutocompleteOpen(true)}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsAutocompleteOpen(true);
          }}
          placeholder="Buscar por peça, tecido, linho, vintage, estampa..."
          className="w-full bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] focus:ring-2 focus:ring-[#8DB9F0]/40 pl-11 pr-10 py-3 rounded-full text-xs sm:text-sm text-[#1E293B] placeholder-[#1E293B]/50 outline-none transition-all shadow-xs font-medium"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              setIsAutocompleteOpen(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E293B]/40 hover:text-[#1E293B] p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Dropdown de Sugestões de Autocomplete */}
        {isAutocompleteOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#D8D7EE] shadow-modal z-30 p-3 overflow-hidden">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#1E293B]/60 px-2 pb-2 border-b border-[#D8D7EE]/50">
              <Sparkles className="w-3 h-3 text-[#F5B69E]" />
              Sugestões de Garimpo
            </div>

            <div className="mt-1 max-h-48 overflow-y-auto space-y-0.5">
              {(filteredSuggestions.length > 0 ? filteredSuggestions : SEARCH_SUGGESTIONS).map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => {
                    onSearchChange(sug);
                    setIsAutocompleteOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#1E293B] hover:bg-[#E9E8F8] flex items-center justify-between transition-colors"
                >
                  <span>{sug}</span>
                  <span className="text-[10px] text-[#8DB9F0] font-bold">Buscar</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botão de Filtro Mobile */}
      {onToggleMobileFilter && (
        <button
          onClick={onToggleMobileFilter}
          className="lg:hidden flex items-center justify-center gap-2 bg-[#8DB9F0] border border-[#7AA7DE] px-4 py-3 rounded-full text-xs sm:text-sm font-bold text-[#1E293B] hover:bg-[#F5B69E] transition-colors shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      )}

      {/* Dropdown de Ordenação (Mais recentes, Menor preço, Maior economia de água) */}
      <div className="relative flex-shrink-0">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
          aria-label="Ordenar peças do catálogo"
          className="appearance-none bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] text-[#1E293B] font-bold text-xs sm:text-sm pl-4 pr-9 py-3 rounded-full outline-none cursor-pointer hover:border-[#8DB9F0] transition-colors shadow-xs"
        >
          <option value="newest">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="eco-water">Maior economia de água 💧</option>
          <option value="featured">Curadoria (Destaques)</option>
          <option value="price-desc">Maior preço</option>
        </select>
        <ChevronDown className="w-4 h-4 text-[#1E293B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

    </div>
  );
};
