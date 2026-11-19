import React from 'react';
import { ShoppingBag, User, Sparkles, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  favoritesCount?: number;
  onOpenFavorites?: () => void;
  onOpenAuth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  favoritesCount = 0,
  onOpenFavorites,
  onOpenAuth,
}) => {
  return (
    <header className="w-full bg-[#8DB9F0] text-[#1E293B] border-b border-[#7AA7DE]/40 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo ReVeste à esquerda */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B] shadow-sm">
            <Sparkles className="w-5 h-5 text-[#F5B69E]" />
          </div>
          <div>
            <a href="#" className="font-serif text-2xl font-bold tracking-tight text-[#1E293B] block hover:opacity-90">
              ReVeste
            </a>
            <span className="block text-[10px] uppercase tracking-widest text-[#1E293B] -mt-1 font-bold">
              Brechó Digital Curado
            </span>
          </div>
        </div>

        {/* Menu central em pílula translúcida (Início, Sobre, Categorias, Achados, Economia Circular) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/40 p-1.5 rounded-full border border-white/60 backdrop-blur-sm">
          <a
            href="#catalogo"
            className="px-4 py-2 text-sm font-bold rounded-full bg-white text-[#1E293B] transition-all duration-200 shadow-sm"
          >
            Início
          </a>
          <a
            href="#como-funciona"
            className="px-4 py-2 text-sm font-semibold rounded-full text-[#1E293B] hover:bg-white/60 transition-all duration-200"
          >
            Sobre
          </a>
          <a
            href="#catalogo"
            className="px-4 py-2 text-sm font-semibold rounded-full text-[#1E293B] hover:bg-white/60 transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#F5B69E]" />
            Categorias
          </a>
          <a
            href="#catalogo"
            className="px-4 py-2 text-sm font-semibold rounded-full text-[#1E293B] hover:bg-white/60 transition-all duration-200"
          >
            Achados
          </a>
          <a
            href="#impacto"
            className="px-4 py-2 text-sm font-semibold rounded-full text-[#1E293B] hover:bg-white/60 transition-all duration-200"
          >
            Economia Circular
          </a>
        </nav>

        {/* Ações à direita: Favoritos com contador, Perfil/Entrar e botão pêssego Sacolinha com badge */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Favoritos com contador */}
          <button
            type="button"
            onClick={onOpenFavorites}
            title="Meus Favoritos"
            aria-label="Abrir favoritos"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#1E293B] bg-white/40 hover:bg-white/70 border border-white/60 transition-colors shadow-xs"
          >
            <Heart className={`w-5 h-5 transition-colors ${favoritesCount > 0 ? 'text-[#1E293B] fill-[#F5B69E]' : 'text-[#1E293B]'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F5B69E] text-[#1E293B] text-[10px] font-extrabold flex items-center justify-center shadow-xs border border-white">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Perfil / Entrar */}
          <button
            type="button"
            onClick={onOpenAuth}
            title="Perfil do Garimpador / Entrar"
            className="flex items-center gap-1.5 h-10 px-3 sm:px-4 rounded-full text-[#1E293B] bg-white/40 hover:bg-white/70 border border-white/60 text-xs sm:text-sm font-bold transition-all shadow-xs"
          >
            <User className="w-4 h-4 text-[#1E293B]" />
            <span className="hidden sm:inline">Perfil / Entrar</span>
          </button>

          {/* Botão Pêssego Pastel da Sacolinha com badge de itens */}
          <button
            onClick={onOpenCart}
            type="button"
            className="relative flex items-center gap-2 bg-[#F5B69E] hover:bg-[#e8a38a] text-[#1E293B] px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 border border-[#e8a38a]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Sacolinha</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#1E293B] text-xs font-extrabold flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
