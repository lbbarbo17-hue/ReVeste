import React from 'react';
import { ChevronRight, Clock, ShieldCheck, Ruler, ArrowDown, Droplets, Wind, Repeat, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  currentCategory: string;
  onExploreClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ currentCategory, onExploreClick }) => {
  const handleScrollToCatalog = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const catalogEl = document.getElementById('catalogo');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative bg-[#8DB9F0] text-[#1E293B] pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#7AA7DE]/40">
      
      {/* Elementos Geométricos Editoriais de Fundo */}
      <div className="absolute top-1/2 right-6 lg:right-16 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
        <svg width="340" height="340" viewBox="0 0 200 200" fill="none" stroke="currentColor" className="text-[#1E293B]">
          <circle cx="100" cy="100" r="90" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M100 0 L100 200 M0 100 L200 100 M29 29 L171 171 M29 171 L171 29" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Topo do Hero: Breadcrumb, Título Editorial e CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10">
          
          {/* Lado Esquerdo */}
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1E293B] mb-4 font-bold">
              <a href="#" className="hover:underline transition-all">Início</a>
              <ChevronRight className="w-3.5 h-3.5 text-[#1E293B]" />
              <span className="font-extrabold">{currentCategory}</span>
            </div>

            {/* Título Principal Editorial Serifado com Contraste em #1E293B */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#1E293B] mb-5">
              Garimpo Curado & <br />
              <span className="italic font-serif text-[#1E293B] underline decoration-[#F5B69E] decoration-wavy decoration-2">
                Moda Circular
              </span>
            </h1>

            {/* Subtítulo sobre SKU único e medidas reais em cm */}
            <p className="text-[#1E293B] text-sm sm:text-base leading-relaxed font-medium max-w-xl">
              Cada peça é um achado exclusivo de <strong className="text-[#1E293B] font-extrabold bg-white/70 px-2 py-0.5 rounded border border-white/60">SKU único</strong>, higienizada com rigor e aferida com <strong className="text-[#1E293B] font-extrabold bg-white/70 px-2 py-0.5 rounded border border-white/60">medidas reais em cm</strong> para você acertar o caimento de primeira.
            </p>
          </div>

          {/* Lado Direito: Pílulas de Benefícios e CTA Principal */}
          <div className="lg:max-w-md flex flex-col justify-end gap-5">
            
            {/* 3 Pílulas de Benefícios Solicitadas com Contraste em #1E293B */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-xs text-[#1E293B]">
                <Clock className="w-3.5 h-3.5 text-[#1E293B]" />
                <span className="font-bold">Reserva 15 min</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-xs text-[#1E293B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E293B]" />
                <span className="font-bold">Frete Consolidado 30 dias</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-xs text-[#1E293B]">
                <Ruler className="w-3.5 h-3.5 text-[#1E293B]" />
                <span className="font-bold">Provador Virtual</span>
              </div>
            </div>

            {/* CTA Principal: "Explorar Garimpos" */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleScrollToCatalog}
                className="inline-flex items-center justify-center gap-2.5 bg-[#1E293B] hover:bg-black text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>Explorar Garimpos</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#F5B69E]" />
              </button>

              <span className="text-xs text-[#1E293B] font-bold hidden sm:inline">
                ✨ Peças únicas catalogadas hoje
              </span>
            </div>

          </div>

        </div>

        {/* Barra Integrada de Impactômetro Global */}
        <div className="mt-4 pt-6 border-t border-[#1E293B]/20">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-full p-4 sm:px-8 sm:py-3.5 border border-white/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Header do Impactômetro */}
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#1E293B] uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-[#1E293B]" />
                Impactômetro Global ReVeste
              </span>
            </div>

            {/* Três Contadores Reais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full md:w-auto text-center md:text-left">
              
              {/* Contador 1: Água */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#D8D7EE]">
                  <Droplets className="w-4 h-4 text-[#1E293B]" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#1E293B] leading-none">
                    1.240.500 L
                  </span>
                  <span className="text-xs text-[#1E293B] font-semibold">
                    de água poupados
                  </span>
                </div>
              </div>

              {/* Contador 2: CO2 */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#D8D7EE]">
                  <Wind className="w-4 h-4 text-[#1E293B]" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#1E293B] leading-none">
                    3.420 kg
                  </span>
                  <span className="text-xs text-[#1E293B] font-semibold">
                    de CO₂ evitados
                  </span>
                </div>
              </div>

              {/* Contador 3: Peças */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#D8D7EE]">
                  <Repeat className="w-4 h-4 text-[#1E293B]" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#1E293B] leading-none">
                    480 peças
                  </span>
                  <span className="text-xs text-[#1E293B] font-semibold">
                    recirculadas
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
