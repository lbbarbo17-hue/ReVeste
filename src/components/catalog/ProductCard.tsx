import React from 'react';
import { Product } from '../../types/product';
import { Plus, Check, Ruler, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  onAddToCart: (product: Product) => void;
  onOpenFitting: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInCart,
  onAddToCart,
  onOpenFitting,
  onViewDetails,
}) => {
  return (
    <div className="group relative bg-white hover:bg-white/95 border border-[#D8D7EE] rounded-3xl p-4 transition-all duration-300 hover:shadow-card flex flex-col justify-between shadow-xs">
      
      {/* Topo: Badges e Botão Rápido de Provador */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#E9E8F8]/40 mb-4">
        
        {/* Badges Flutuantes (Estilo Referência) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-xs tracking-wide ${
              product.badge === 'Destaque'
                ? 'bg-[#F5B69E] text-[#1E293B]'
                : product.badge === 'Novo'
                ? 'bg-[#8DB9F0] text-[#1E293B]'
                : 'bg-white text-[#1E293B] border border-[#D8D7EE]'
            }`}>
              {product.badge}
            </span>
          )}
          <span className="text-[10px] font-bold bg-[#8DB9F0] text-[#1E293B] px-2.5 py-0.5 rounded-full w-max shadow-xs">
            SKU Único
          </span>
        </div>

        {/* Botão de Ver Detalhes Flutuante no Hover */}
        <div className="absolute inset-0 bg-[#8DB9F0]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 backdrop-blur-[2px]">
          <button
            onClick={() => onViewDetails(product)}
            className="w-10 h-10 rounded-full bg-white text-[#1E293B] flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            title="Ver Detalhes do Garimpo"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenFitting(product)}
            className="w-10 h-10 rounded-full bg-white text-[#1E293B] flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            title="Abrir Provador Virtual (Medidas em cm)"
          >
            <Ruler className="w-4 h-4 text-[#F5B69E]" />
          </button>
        </div>

        {/* Imagem do Produto */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Informações da Peça */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* Categoria e Marca */}
          <div className="flex items-center justify-between text-xs text-[#1E293B]/70 mb-1 font-semibold">
            <span className="truncate max-w-[140px]">{product.brand}</span>
            <span className="bg-[#E9E8F8] text-[#1E293B] px-2 py-0.5 rounded-md border border-[#D8D7EE]">
              Tam: {product.size}
            </span>
          </div>

          {/* Nome da Peça */}
          <h4 
            onClick={() => onViewDetails(product)}
            className="font-serif font-bold text-lg text-[#1E293B] leading-snug hover:text-[#8DB9F0] transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h4>

          {/* Estado de Conservação */}
          <p className="text-xs text-[#1E293B]/70 mb-3 line-clamp-1 font-medium">
            {product.condition}
          </p>
        </div>

        {/* Rodapé do Card: Preço e Botão Circular de Ação (+) em Azul Celeste #8DB9F0 */}
        <div className="flex items-center justify-between pt-2 border-t border-[#D8D7EE]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#1E293B] tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#1E293B]/50 line-through font-medium">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#1E293B]/70 block font-semibold">
              💧 Poupa {product.ecoImpact.waterSavedLiters}L de água
            </span>
          </div>

          {/* Botão Circular em Azul Celeste #8DB9F0 (ou Pêssego se estiver no carrinho) */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={isInCart}
            title={isInCart ? 'Peça reservada na sua Sacolinha' : 'Adicionar à Sacolinha (Reserva 15 min)'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              isInCart
                ? 'bg-[#F5B69E] text-[#1E293B] scale-95 cursor-default'
                : 'bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] hover:scale-105 active:scale-95'
            }`}
          >
            {isInCart ? (
              <Check className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Plus className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
