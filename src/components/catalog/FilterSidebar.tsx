import React from 'react';
import {
  CATEGORIES_DATA,
  SIZES_DATA,
  NUMERIC_SIZES_DATA,
  CONDITIONS_DATA,
  STYLES_DATA,
} from '../../data/mockProducts';
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
  const hasActiveFilters =
    filters.category !== 'all' ||
    Boolean(filters.size) ||
    Boolean(filters.condition) ||
    Boolean(filters.styleVibe) ||
    Boolean(filters.color) ||
    filters.brand !== 'Todas' ||
    filters.minPrice > 30 ||
    filters.maxPrice < 350;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      
      {/* 1. Categorias de Produtos com contadores */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] tracking-tight">
            Categorias
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#1E293B] hover:text-[#F5B69E] hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Limpar tudo
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = filters.category === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onFilterChange({ category: cat.key })}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#8DB9F0] text-[#1E293B] shadow-sm border border-[#7AA7DE]'
                    : 'bg-white/80 text-[#1E293B] hover:bg-white border border-[#D8D7EE]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-[#F5B69E] text-[#1E293B]'
                      : 'bg-[#E9E8F8] text-[#1E293B]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Faixa de Preço (Inputs Min/Max + Slider) */}
      <div className="pt-3 border-t border-[#D8D7EE]">
        <h3 className="font-serif text-xl font-bold text-[#1E293B] mb-3 tracking-tight">
          Faixa de Preço
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white p-2.5 rounded-xl border border-[#D8D7EE]">
            <span className="text-[10px] uppercase tracking-wider text-[#1E293B] block font-bold">Min</span>
            <span className="text-xs font-bold text-[#1E293B]">R$ {filters.minPrice}</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#D8D7EE]">
            <span className="text-[10px] uppercase tracking-wider text-[#1E293B] block font-bold">Max</span>
            <span className="text-xs font-bold text-[#1E293B]">R$ {filters.maxPrice}</span>
          </div>
        </div>

        <input
          type="range"
          min="30"
          max="350"
          step="5"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#8DB9F0] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#1E293B] mt-1 font-semibold">
          <span>R$ 30</span>
          <span>Até R$ {filters.maxPrice}</span>
        </div>
      </div>

      {/* 3. Tamanho (PP ao XGG + Numeração) */}
      <div className="pt-3 border-t border-[#D8D7EE]">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-serif text-xl font-bold text-[#1E293B] tracking-tight">
            Tamanho
          </h3>
          {filters.size && (
            <button
              onClick={() => onFilterChange({ size: '' })}
              className="text-[11px] text-[#1E293B] hover:underline font-semibold"
            >
              Limpar
            </button>
          )}
        </div>
        
        {/* Letras PP ao XGG */}
        <span className="text-[11px] uppercase tracking-wider text-[#1E293B] block font-bold mb-1.5">
          Padrão Letras
        </span>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {SIZES_DATA.map((size) => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onFilterChange({ size: isSelected ? '' : size })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#8DB9F0] text-[#1E293B] border-[#7AA7DE] shadow-xs scale-105'
                    : 'bg-white/80 text-[#1E293B] border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Numerações 34 a 46 */}
        <span className="text-[11px] uppercase tracking-wider text-[#1E293B] block font-bold mb-1.5">
          Numeração
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {NUMERIC_SIZES_DATA.map((numSize) => {
            const isSelected = filters.size === numSize;
            return (
              <button
                key={numSize}
                type="button"
                onClick={() => onFilterChange({ size: isSelected ? '' : numSize })}
                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#8DB9F0] text-[#1E293B] border-[#7AA7DE] shadow-xs'
                    : 'bg-white/70 text-[#1E293B] border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {numSize}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Estado de Conservação (Logo abaixo de Tamanho com Pílulas Selecionáveis) */}
      <div className="pt-3 border-t border-[#D8D7EE]">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-serif text-xl font-bold text-[#1E293B] tracking-tight">
            Estado de Conservação
          </h3>
          {filters.condition && (
            <button
              onClick={() => onFilterChange({ condition: '' })}
              className="text-[11px] text-[#1E293B] hover:underline font-semibold"
            >
              Limpar
            </button>
          )}
        </div>
        
        {/* Pílulas selecionáveis: Novo com Etiqueta, Perfeito Estado, Gentilmente Usado, Vintage */}
        <div className="flex flex-wrap gap-2">
          {CONDITIONS_DATA.map((cond) => {
            const isSelected = filters.condition === cond;
            return (
              <button
                key={cond}
                type="button"
                onClick={() => onFilterChange({ condition: isSelected ? '' : cond })}
                className={`px-3.5 py-2 text-xs font-bold rounded-full border transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#8DB9F0] text-[#1E293B] border-[#7AA7DE] shadow-xs scale-105'
                    : 'bg-white/80 text-[#1E293B] border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Estilo / Vibe */}
      <div className="pt-3 border-t border-[#D8D7EE]">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-serif text-xl font-bold text-[#1E293B] tracking-tight">
            Estilo / Vibe
          </h3>
          {filters.styleVibe && (
            <button
              onClick={() => onFilterChange({ styleVibe: '' })}
              className="text-[11px] text-[#1E293B] hover:underline font-semibold"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STYLES_DATA.map((vibe) => {
            const isSelected = filters.styleVibe === vibe;
            return (
              <button
                key={vibe}
                type="button"
                onClick={() => onFilterChange({ styleVibe: isSelected ? '' : vibe })}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all font-semibold ${
                  isSelected
                    ? 'bg-[#8DB9F0] text-[#1E293B] border-[#7AA7DE] shadow-xs'
                    : 'bg-white/80 text-[#1E293B] border-[#D8D7EE] hover:border-[#8DB9F0]'
                }`}
              >
                {vibe}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Card Azul Promocional "Junte suas peças com frete único" com espaçamento interno aprimorado */}
      <div className="relative rounded-3xl overflow-hidden p-7 text-[#1E293B] shadow-card bg-[#8DB9F0] border border-[#7AA7DE]/60">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#F5B69E] text-[#1E293B] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Sacolinha 30 Dias
          </div>

          <h4 className="font-serif text-xl font-bold leading-snug text-[#1E293B]">
            Junte suas peças com frete único
          </h4>

          <p className="text-xs text-[#1E293B] leading-relaxed font-medium">
            Garimpe hoje, mantenha sua sacolinha em aberto e adicione novos achados durante 30 dias. Um único despacho com sustentabilidade máxima e custo reduzido.
          </p>

          <div className="text-xs font-bold text-[#1E293B] border-t border-[#1E293B]/20 pt-3 flex items-center gap-1.5">
            <span>💧 Mais de 2.700L de água poupados por peça</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
