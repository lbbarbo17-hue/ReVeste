import React from 'react';
import { CATEGORIES_DATA, SIZES_DATA, COLORS_DATA, BRANDS_DATA } from '../../data/mockProducts';
import { FilterState } from '../../types/product';
import { Sparkles, RefreshCw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
      
      {/* 1. Categorias de Produtos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] tracking-tight">
            Categorias
          </h3>
          {(filters.category !== 'all' || filters.size !== '' || filters.color !== '' || filters.brand !== 'Todas' || filters.maxPrice < 350) && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#1E293B] hover:text-[#F5B69E] hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Limpar
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = filters.category === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onFilterChange({ category: cat.key })}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#8DB9F0] text-[#1E293B] shadow-sm border border-[#7AA7DE]/60'
                    : 'bg-white/80 text-[#1E293B] hover:bg-white border border-[#D8D7EE]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-[#F5B69E] text-[#1E293B]'
                      : 'bg-[#E9E8F8] text-[#1E293B]/70'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Faixa de Preço (Pricing) */}
      <div className="pt-2 border-t border-[#D8D7EE]">
        <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 tracking-tight">
          Faixa de Preço
        </h3>
        
        {/* Inputs Min e Max estilizados como na referência */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/90 p-2.5 rounded-xl border border-[#D8D7EE]">
            <span className="text-[11px] uppercase tracking-wider text-[#1E293B]/70 block font-semibold">Min</span>
            <span className="text-sm font-bold text-[#1E293B]">R$ {filters.minPrice}</span>
          </div>
          <div className="bg-white/90 p-2.5 rounded-xl border border-[#D8D7EE]">
            <span className="text-[11px] uppercase tracking-wider text-[#1E293B]/70 block font-semibold">Max</span>
            <span className="text-sm font-bold text-[#1E293B]">R$ {filters.maxPrice}</span>
          </div>
        </div>

        {/* Slider com Azul Celeste #8DB9F0 */}
        <input
          type="range"
          min="30"
          max="350"
          step="5"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#8DB9F0] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[#1E293B]/70 mt-1 font-semibold">
          <span>R$ 30</span>
          <span>Até R$ {filters.maxPrice}</span>
        </div>
      </div>

      {/* 3. Tamanho da Peça (Item Size) */}
      <div className="pt-2 border-t border-[#D8D7EE]">
        <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 tracking-tight">
          Tamanho
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {SIZES_DATA.map((size) => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onFilterChange({ size: isSelected ? '' : size })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#8DB9F0] text-[#1E293B] border-[#7AA7DE] shadow-sm scale-105'
                    : 'bg-white/80 text-[#1E293B] border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Paleta de Cores (Color) */}
      <div className="pt-2 border-t border-[#D8D7EE]">
        <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 tracking-tight">
          Cor
        </h3>
        <div className="grid grid-cols-5 gap-2.5">
          {COLORS_DATA.map((c) => {
            const isSelected = filters.color === c.name;
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => onFilterChange({ color: isSelected ? '' : c.name })}
                className={`w-9 h-9 rounded-full relative flex items-center justify-center transition-transform hover:scale-110 ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#8DB9F0]' : ''
                } ${c.border ? 'border border-[#D8D7EE]' : ''}`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <span className={`w-2 h-2 rounded-full ${c.name === 'Lavanda' ? 'bg-[#1E293B]' : 'bg-white'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Marca / Curadoria (Brand) */}
      <div className="pt-2 border-t border-[#D8D7EE]">
        <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 tracking-tight">
          Marca & Curadoria
        </h3>
        <div className="flex flex-wrap gap-2">
          {BRANDS_DATA.map((brand) => {
            const isSelected = filters.brand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => onFilterChange({ brand })}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all font-semibold ${
                  isSelected
                    ? 'bg-[#8DB9F0] text-[#1E293B] border-[#7AA7DE] shadow-xs'
                    : 'bg-white/80 text-[#1E293B]/70 border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Card Editorial da Sacolinha em Azul Celeste #8DB9F0 */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-[#1E293B] shadow-card bg-[#8DB9F0] border border-[#7AA7DE]/40">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#F5B69E] text-[#1E293B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3 h-3" />
            Sacolinha 30 Dias
          </div>
          <h4 className="font-serif text-xl font-bold mb-2 leading-snug text-[#1E293B]">
            Junte suas peças com frete único
          </h4>
          <p className="text-xs text-[#1E293B]/85 leading-relaxed mb-4 font-medium">
            Compre hoje, mantenha em aberto e adicione novos garimpos durante o mês. Despacho único com pegada zero de desperdício.
          </p>
          <div className="text-[11px] font-bold text-[#1E293B] border-t border-[#7AA7DE]/40 pt-3">
            ✨ Mais de 2.700L de água poupados por peça
          </div>
        </div>
      </div>

    </aside>
  );
};
