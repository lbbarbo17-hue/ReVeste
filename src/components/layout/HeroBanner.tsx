import React from 'react';
import { ChevronRight, Leaf, ShieldCheck, Clock } from 'lucide-react';

interface HeroBannerProps {
  currentCategory: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ currentCategory }) => {
  return (
    <section className="relative bg-[#8DB9F0] text-[#1E293B] pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#7AA7DE]/30">
      
      {/* Elementos Gráficos Geométricos Sutis (Estilo da Referência) */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 pointer-events-none opacity-25">
        <svg width="280" height="280" viewBox="0 0 200 200" fill="none" stroke="currentColor" className="text-white">
          <path d="M100 0 L100 200 M0 100 L200 100 M29 29 L171 171 M29 171 L171 29" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="70" strokeWidth="2" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          {/* Lado Esquerdo: Breadcrumb e Título Editorial Serifado */}
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1E293B]/70 mb-4 font-bold">
              <a href="#" className="hover:text-[#1E293B] transition-colors">Início</a>
              <ChevronRight className="w-3.5 h-3.5 text-[#F5B69E]" />
              <span className="text-[#1E293B] font-extrabold">{currentCategory}</span>
            </div>

            {/* Título Principal Idêntico à Referência com Fundo Azul Celeste */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#1E293B]">
              Garimpo Curado & <br />
              <span className="italic font-serif text-white drop-shadow-sm">Moda Circular</span>
            </h1>
          </div>

          {/* Lado Direito: Descrição e Selos */}
          <div className="lg:max-w-md flex flex-col justify-end">
            <p className="text-[#1E293B]/90 text-sm sm:text-base leading-relaxed font-normal mb-6">
              Cada peça é um achado exclusivo de <strong className="text-[#1E293B] font-bold">SKU único</strong>. Higienizadas, medidas minuciosamente em centímetros e prontas para uma nova história no seu guarda-roupa.
            </p>

            {/* Badges Rápidos de Confiança em fundo branco translúcido */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/70 shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#1E293B]" />
                <span className="text-[#1E293B] font-semibold">Moda Consciente</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/70 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#F5B69E]" />
                <span className="text-[#1E293B] font-semibold">Reserva 15 min</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/70 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E293B]" />
                <span className="text-[#1E293B] font-semibold">Frete Consolidado</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
