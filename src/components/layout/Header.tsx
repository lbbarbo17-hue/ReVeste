import React from 'react';
import { ShoppingBag, User, Sparkles, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSellModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="w-full bg-[#8DB9F0] text-[#1E293B] border-b border-[#7AA7DE]/40 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logomarca ReVeste */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#F5B69E]" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1E293B]">
              ReVeste
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#1E293B]/70 -mt-1 font-semibold">
              Brechó Digital Curado
            </span>
          </div>
        </div>

        {/* Navegação Central em Pílulas (Exatamente como na Referência) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/30 p-1.5 rounded-full border border-white/50 backdrop-blur-sm">
          <a
            href="#catalogo"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-white text-[#1E293B] transition-all duration-200 shadow-sm"
          >
            Início
          </a>
          <a
            href="#sobre"
            className="px-5 py-2 text-sm font-medium rounded-full text-[#1E293B] hover:bg-white/50 transition-all duration-200"
          >
            Sobre
          </a>
          <a
            href="#categorias"
            className="px-5 py-2 text-sm font-medium rounded-full text-[#1E293B] hover:bg-white/50 transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#F5B69E]" />
            Categorias
          </a>
          <a
            href="#achados"
            className="px-5 py-2 text-sm font-medium rounded-full text-[#1E293B] hover:bg-white/50 transition-all duration-200"
          >
            Achados
          </a>
          <a
            href="#impacto"
            className="px-5 py-2 text-sm font-medium rounded-full text-[#1E293B] hover:bg-white/50 transition-all duration-200"
          >
            Economia Circular
          </a>
        </nav>

        {/* Ações da Direita */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            title="Favoritos"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-white/30 transition-colors"
          >
            <Heart className="w-5 h-5 text-[#1E293B] hover:text-[#F5B69E]" />
          </button>

          <button 
            type="button" 
            title="Minha Conta"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-white/30 transition-colors"
          >
            <User className="w-5 h-5 text-[#1E293B]" />
          </button>

          {/* Botão da Sacolinha com badge Pêssego Pastel */}
          <button
            onClick={onOpenCart}
            type="button"
            className="relative flex items-center gap-2.5 bg-[#F5B69E] hover:bg-[#e8a38a] text-[#1E293B] px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Sacolinha</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#1E293B] text-xs font-bold flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
