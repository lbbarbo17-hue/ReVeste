import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#8DB9F0] text-[#1E293B] mt-24 pt-16 pb-12 border-t border-[#7AA7DE]/40 relative overflow-hidden">
      
      {/* Detalhes de Fundo Geométrico */}
      <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-10">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chamada Editorial Superior */}
        <div className="text-center pb-12 border-b border-[#7AA7DE]/40">
          <span className="text-xs uppercase tracking-[0.3em] text-[#1E293B]/70 block mb-2 font-bold">
            DESDE 2026 • MODA CIRCULAR CONSCIENTE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E293B] max-w-2xl mx-auto leading-tight">
            Vista histórias, preserve o futuro.
          </h2>
        </div>

        {/* 4 Pilares de Confiança do Brechó */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-b border-[#7AA7DE]/40 text-center">
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#F5B69E] mb-2" />
            <h5 className="font-bold text-sm mb-1 text-[#1E293B]">100% SKU Único</h5>
            <p className="text-xs text-[#1E293B]/70">Sem risco de peças duplicadas.</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-6 h-6 text-[#1E293B] mb-2" />
            <h5 className="font-bold text-sm mb-1 text-[#1E293B]">Sacolinha 30 Dias</h5>
            <p className="text-xs text-[#1E293B]/70">Consolide vários garimpos em 1 frete.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#1E293B] mb-2" />
            <h5 className="font-bold text-sm mb-1 text-[#1E293B]">Provador Virtual</h5>
            <p className="text-xs text-[#1E293B]/70">Medidas em centímetros reais.</p>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-6 h-6 text-[#F5B69E] mb-2" />
            <h5 className="font-bold text-sm mb-1 text-[#1E293B]">Impacto Monitorado</h5>
            <p className="text-xs text-[#1E293B]/70">Saiba quanto de água você poupou.</p>
          </div>
        </div>

        {/* Links de Rodapé */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-sm">
          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-[#1E293B] mb-4">
              Navegação
            </h6>
            <ul className="space-y-2.5 text-xs text-[#1E293B]/80 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Novidades do Brechó</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Peças com Selo Vintage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garimpos em Promoção</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quero Desapegar e Vender</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-[#1E293B] mb-4">
              Transparência
            </h6>
            <ul className="space-y-2.5 text-xs text-[#1E293B]/80 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Nossa Metodologia de Medição</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Critérios de Curadoria & Higienização</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Relatório de Impacto Ambiental</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custódia Segura (Escrow)</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-[#1E293B] mb-4">
              Ajuda & Suporte
            </h6>
            <ul className="space-y-2.5 text-xs text-[#1E293B]/80 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Regras da Sacolinha Turbinada</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rastreamento de Pedido</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Devolução Fácil</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fale com a Curadoria</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-[#1E293B] mb-4">
              Sobre o Projeto
            </h6>
            <p className="text-xs text-[#1E293B]/80 leading-relaxed mb-4 font-medium">
              <strong>ReVeste</strong> é um projeto integrador dedicado à inovação em e-commerce de moda circular, desenvolvido por Laura Barbosa e Nicoli Silva.
            </p>
            <span className="text-[11px] text-[#1E293B]/70 font-semibold block">
              Feito com sustentabilidade e carinho ✨
            </span>
          </div>
        </div>

        {/* Linha Final com Copyright */}
        <div className="pt-8 border-t border-[#7AA7DE]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1E293B]/70 gap-4">
          <p>© 2026 ReVeste Brechó Digital. Todos os direitos reservados.</p>
          <p className="font-serif italic text-[#1E293B] font-semibold">ReVestindo propósitos, desapegando com estilo.</p>
        </div>

      </div>
    </footer>
  );
};
