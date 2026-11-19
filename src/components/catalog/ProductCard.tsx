import React from 'react';
import { Product } from '../../types/product';
import { Plus, Ruler, Eye, Heart, CheckCircle2, Droplets, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  isFavorite?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  onOpenFitting: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInCart,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
  onOpenFitting,
  onViewDetails,
}) => {
  const sellerHandle = product.seller.handle || `@${product.seller.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  return (
    <div className="group relative bg-white hover:bg-white border border-[#D8D7EE] rounded-3xl p-4 transition-all duration-300 hover:shadow-card flex flex-col justify-between shadow-soft">
      
      {/* 1. Área Visual Superior: Foto 4:5 com Zoom no Hover e Badges */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#E9E8F8]/40 mb-3.5">
        
        {/* Badges Superiores à Esquerda: "Peça Única" em Pêssego e "SKU Único" em Azul */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-xs tracking-wide bg-[#F5B69E] text-[#1E293B]">
            Peça Única
          </span>
          <span className="text-[10px] font-semibold bg-[#8DB9F0] text-[#1E293B] px-2.5 py-0.5 rounded-full w-max shadow-xs">
            SKU Único
          </span>
        </div>

        {/* Botão Circular Discreto de Favoritar (Coração) no Canto Superior Direito */}
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavorite) onToggleFavorite(product);
            }}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Favoritar peça'}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1E293B] flex items-center justify-center shadow-xs border border-white/80 hover:scale-110 active:scale-90 transition-all backdrop-blur-xs"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite
                  ? 'fill-[#F5B69E] text-[#1E293B]'
                  : 'text-[#1E293B] hover:text-[#F5B69E]'
              }`}
            />
          </button>
        </div>

        {/* Ações Flutuantes no Hover (Detalhes e Provador Virtual em cm) */}
        <div className="absolute inset-0 bg-[#8DB9F0]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 z-10 backdrop-blur-[2px]">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-10 h-10 rounded-full bg-white text-[#1E293B] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Ver Detalhes do Garimpo"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onOpenFitting(product)}
            className="w-10 h-10 rounded-full bg-white text-[#1E293B] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Abrir Provador Virtual (Medidas em cm)"
          >
            <Ruler className="w-4 h-4 text-[#F5B69E]" />
          </button>
        </div>

        {/* Foto do Produto 4:5 com Zoom Suave no Hover */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* 2. Informações Editoriais da Peça */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          
          {/* Nome do Brechó Vendedor com Selo de Verificado + Badge de Tamanho */}
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 text-[#1E293B] font-semibold truncate max-w-[150px]">
              <span className="truncate">{product.seller.name}</span>
              {product.seller.verified !== false && (
                <span title="Brechó Verificado ReVeste" className="inline-flex">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8DB9F0] fill-[#1E293B] flex-shrink-0" />
                </span>
              )}
            </div>

            {/* Badge de Tamanho */}
            <span className="bg-[#E9E8F8] text-[#1E293B] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#D8D7EE]">
              Tam: {product.size}
            </span>
          </div>

          {/* Linha Sutil com @nome_do_brecho para identificar mesma sacolinha */}
          <div className="flex items-center justify-between text-[11px] mb-2 font-medium">
            <span className="text-[#1E293B]/80 font-semibold hover:text-[#1E293B] transition-colors">
              {sellerHandle}
            </span>
            <span className="text-[10px] text-[#1E293B]/70 bg-[#E9E8F8]/60 px-2 py-0.5 rounded-md border border-[#D8D7EE]/60 font-medium">
              Mesma Sacolinha
            </span>
          </div>

          {/* Título Editorial Serifado */}
          <h4
            onClick={() => onViewDetails(product)}
            className="font-serif font-bold text-base sm:text-lg text-[#1E293B] leading-snug hover:text-[#8DB9F0] transition-colors cursor-pointer line-clamp-1 mb-1.5"
          >
            {product.name}
          </h4>

          {/* Estado de Conservação */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-medium text-[#1E293B] bg-[#E9E8F8]/80 px-2 py-0.5 rounded-md border border-[#D8D7EE]/50">
              {product.condition}
            </span>
            {product.styleVibe && (
              <span className="text-[11px] text-[#1E293B]/70 font-semibold truncate">
                • {product.styleVibe}
              </span>
            )}
          </div>
        </div>

        {/* 3. Rodapé do Card: Preços, Indicador de Economia de Água e Botão com Feedback Visual */}
        <div className="flex items-center justify-between pt-3 border-t border-[#D8D7EE]">
          
          <div>
            {/* Preço Atual + Preço Original Riscado */}
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-extrabold text-[#1E293B] tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#1E293B]/50 line-through font-medium">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            {/* Indicador Verde/Azul de Economia de Água */}
            <div className="flex items-center gap-1 mt-0.5 text-[10px] font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 w-max">
              <Droplets className="w-3 h-3 text-teal-600" />
              <span>Poupa {product.ecoImpact.waterSavedLiters.toLocaleString('pt-BR')}L de água</span>
            </div>
          </div>

          {/* Botão de Ação: Feedback visual mudando para "Reservado • 14:59" em Pêssego Pastel #F5B69E */}
          {isInCart ? (
            <div
              className="inline-flex items-center gap-1.5 bg-[#F5B69E] text-[#1E293B] px-3 py-2 rounded-full font-bold text-xs shadow-xs border border-[#e8a38a] animate-fadeIn"
              title="Peça reservada com timer anti-overselling"
            >
              <Clock className="w-3.5 h-3.5 text-[#1E293B]" />
              <span className="font-bold tracking-tight">Reservado • 14:59</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              title="Adicionar à sacolinha (Reserva 15 min)"
              className="w-10 h-10 rounded-full bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] font-bold flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs border border-[#7AA7DE]"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
