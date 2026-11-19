import React from 'react';
import { Clock, Ruler, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react';

export const SmartThriftFeatures: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Peça Única com Reserva de 15 min */}
        <div className="group bg-white rounded-3xl p-6 border border-[#D8D7EE] shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5B69E]/20 rounded-bl-[60px] pointer-events-none transition-transform group-hover:scale-110" />
          
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#F5B69E]/30 text-[#1E293B] flex items-center justify-center mb-5 border border-[#F5B69E]/60 shadow-xs">
              <Clock className="w-6 h-6 text-[#1E293B]" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1E293B] bg-[#F5B69E] px-3 py-1 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              1 de 1 no mundo
            </div>

            <h3 className="font-serif text-xl font-bold text-[#1E293B] mb-2 leading-snug">
              Peça Única com Reserva de 15 min
            </h3>
            
            <p className="text-xs text-[#1E293B] leading-relaxed font-medium">
              Garimpos de brechó não têm reposição. Ao colocar na sacolinha, a peça fica congelada exclusivamente para você por 15 minutos, protegendo seu achado contra concorrência imediata.
            </p>
          </div>

          <div className="pt-4 mt-5 border-t border-[#D8D7EE] flex items-center justify-between text-xs font-bold text-[#1E293B]">
            <span className="flex items-center gap-1 text-[#1E293B] font-semibold">
              Anti-overselling garantido
            </span>
            <span className="text-[#1E293B] group-hover:translate-x-1 transition-transform inline-flex items-center font-bold">
              Saiba mais <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Provador Virtual por Medidas em cm */}
        <div className="group bg-white rounded-3xl p-6 border border-[#D8D7EE] shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8DB9F0]/20 rounded-bl-[60px] pointer-events-none transition-transform group-hover:scale-110" />
          
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#8DB9F0]/30 text-[#1E293B] flex items-center justify-center mb-5 border border-[#8DB9F0]/60 shadow-xs">
              <Ruler className="w-6 h-6 text-[#1E293B]" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1E293B] bg-[#8DB9F0] px-3 py-1 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Zero erro de tamanho
            </div>

            <h3 className="font-serif text-xl font-bold text-[#1E293B] mb-2 leading-snug">
              Provador Virtual por Medidas em cm
            </h3>
            
            <p className="text-xs text-[#1E293B] leading-relaxed font-medium">
              Tamanhos de etiqueta variam com a época e marca. Nossa curadoria afere fita métrica real: busto, cintura, quadril e comprimento. Compare com suas roupas e compre com certeza.
            </p>
          </div>

          <div className="pt-4 mt-5 border-t border-[#D8D7EE] flex items-center justify-between text-xs font-bold text-[#1E293B]">
            <span className="flex items-center gap-1 text-[#1E293B] font-semibold">
              Medições manuais estritas
            </span>
            <span className="text-[#1E293B] group-hover:translate-x-1 transition-transform inline-flex items-center font-bold">
              Como medir <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Sacolinha de 30 dias com Frete Único */}
        <div className="group bg-white rounded-3xl p-6 border border-[#D8D7EE] shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8DB9F0]/20 rounded-bl-[60px] pointer-events-none transition-transform group-hover:scale-110" />
          
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#E9E8F8] text-[#1E293B] flex items-center justify-center mb-5 border border-[#D8D7EE] shadow-xs">
              <RefreshCw className="w-6 h-6 text-[#1E293B]" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1E293B] bg-[#F5B69E] px-3 py-1 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Logística Inteligente
            </div>

            <h3 className="font-serif text-xl font-bold text-[#1E293B] mb-2 leading-snug">
              Sacolinha 30 dias com Frete Único
            </h3>
            
            <p className="text-xs text-[#1E293B] leading-relaxed font-medium">
              Garimpe peças em dias diferentes sem pagar múltiplos fretes. Você garante a peça agora, ela fica guardada com carinho no galpão ReVeste e você despacha tudo junto ao final de 30 dias.
            </p>
          </div>

          <div className="pt-4 mt-5 border-t border-[#D8D7EE] flex items-center justify-between text-xs font-bold text-[#1E293B]">
            <span className="flex items-center gap-1 text-[#1E293B] font-semibold">
              Menos emissão de CO₂
            </span>
            <span className="text-[#1E293B] group-hover:translate-x-1 transition-transform inline-flex items-center font-bold">
              Ver regras <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
