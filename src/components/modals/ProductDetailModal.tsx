import React from 'react';
import { Product } from '../../types/product';
import { X, Check, Ruler, Sparkles, MapPin, Star, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenFitting: (product: Product) => void;
  isInCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenFitting,
  isInCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative bg-white border border-[#D8D7EE] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-modal z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar detalhes da peça"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#E9E8F8] flex items-center justify-center text-[#1E293B] hover:bg-[#D8D7EE] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Foto Principal e SKU */}
          <div className="space-y-3">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#E9E8F8]/30 shadow-xs border border-[#D8D7EE] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-[#8DB9F0] text-[#1E293B] font-bold text-[10px] font-mono px-3 py-1 rounded-full shadow-xs">
                SKU: {product.sku}
              </span>
            </div>

            {/* Badges de Curadoria */}
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#8DB9F0]/25 text-[#1E293B] font-bold px-3 py-1 rounded-full border border-[#8DB9F0]/50">
                🌱 {product.ecoImpact.waterSavedLiters}L Água Poupada
              </span>
              <span className="bg-[#E9E8F8] text-[#1E293B] font-semibold px-3 py-1 rounded-full border border-[#D8D7EE]">
                {product.condition}
              </span>
            </div>
          </div>

          {/* Dados e História da Peça */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <span className="text-xs uppercase font-bold text-[#8DB9F0] tracking-wider block">
                  {product.brand} • {product.category}
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#1E293B] mt-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-bold text-[#1E293B]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#1E293B]/50 line-through font-medium">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#1E293B] bg-[#F5B69E] px-2.5 py-0.5 rounded-full shadow-xs">
                    Economia Circular
                  </span>
                </div>
              </div>

              {/* História & Curadoria */}
              <div>
                <h5 className="font-serif text-sm font-bold text-[#1E293B] mb-1">
                  História & Detalhes do Garimpo:
                </h5>
                <p className="text-xs text-[#1E293B]/80 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Composição */}
              <div className="text-xs bg-[#E9E8F8]/60 p-3 rounded-xl border border-[#D8D7EE]">
                <strong className="text-[#1E293B] block mb-0.5">Composição do Tecido:</strong>
                <span className="text-[#1E293B]/80 font-medium">{product.composition}</span>
              </div>

              {/* Perfil do Vendedor / Brechó */}
              <div className="bg-[#E9E8F8]/40 p-3 rounded-xl border border-[#D8D7EE] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#1E293B]/60 uppercase block font-semibold">Desapegado por:</span>
                  <strong className="text-[#1E293B] font-bold">{product.seller.name}</strong>
                  <div className="flex items-center gap-1 text-[11px] text-[#1E293B]/70 mt-0.5 font-medium">
                    <MapPin className="w-3 h-3 text-[#F5B69E]" />
                    <span>{product.seller.city}, {product.seller.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-600 font-bold justify-end">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.seller.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-[10px] text-[#1E293B]/70 font-semibold">{product.seller.salesCount} vendas no brechó</span>
                </div>
              </div>

            </div>

            {/* Ações */}
            <div className="space-y-3 pt-6 border-t border-[#D8D7EE]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenFitting(product);
                  }}
                  className="w-full bg-[#E9E8F8] hover:bg-white border border-[#8DB9F0] text-[#1E293B] py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Ruler className="w-4 h-4 text-[#8DB9F0]" />
                  <span>Provador Virtual</span>
                </button>

                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={isInCart}
                  className="w-full bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-70"
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Na Sacolinha</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Adicionar à Sacolinha</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#1E293B]/70 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8DB9F0]" />
                <span>Reserva garantida por 15 minutos ao adicionar à sacolinha</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
