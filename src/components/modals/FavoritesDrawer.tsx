import React from 'react';
import { Product } from '../../types/product';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProducts: Product[];
  onRemoveFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  cartItemsIds: Set<string>;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteProducts,
  onRemoveFavorite,
  onAddToCart,
  cartItemsIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1E293B]/40 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#D8D7EE] shadow-modal flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-[#8DB9F0] text-[#1E293B] border-b border-[#7AA7DE]/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E293B] shadow-xs">
                  <Heart className="w-4 h-4 fill-[#F5B69E] text-[#1E293B]" />
                </div>
                <h3 className="font-serif text-xl font-bold">Meus Garimpos Salvos</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/40 hover:bg-white text-[#1E293B] flex items-center justify-center transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#1E293B]/80 font-medium">
              Peças únicas salvas. Lembre-se: outras pessoas podem reservar a qualquer momento!
            </p>
          </div>

          {/* Lista de Favoritos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#E9E8F8] flex items-center justify-center mx-auto mb-4 text-[#8DB9F0]">
                  <Heart className="w-8 h-8 text-[#8DB9F0]" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#1E293B] mb-2">
                  Sua lista de desejos está vazia
                </h4>
                <p className="text-xs text-[#1E293B]/70 max-w-xs mx-auto mb-6">
                  Navegue pelo catálogo e clique no coração dos cards para guardar suas peças preferidas.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] px-6 py-2.5 rounded-full text-xs font-bold transition-colors shadow-xs"
                >
                  Explorar Garimpos
                </button>
              </div>
            ) : (
              favoriteProducts.map((product) => {
                const isInCart = cartItemsIds.has(product.id);
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 bg-[#E9E8F8]/40 border border-[#D8D7EE] rounded-2xl relative group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-xl bg-white flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#1E293B]/70 font-semibold mb-0.5">
                          <span>{product.brand}</span>
                          <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-[#D8D7EE]">
                            Tam: {product.size}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[#1E293B] line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-[#1E293B]/70 block mt-0.5">
                          💧 Poupa {product.ecoImpact.waterSavedLiters}L de água
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#D8D7EE]/60">
                        <span className="font-bold text-sm text-[#1E293B]">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRemoveFavorite(product.id)}
                            title="Remover dos favoritos"
                            className="p-1.5 text-[#1E293B]/50 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onAddToCart(product)}
                            disabled={isInCart}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                              isInCart
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#F5B69E] hover:bg-[#e8a38a] text-[#1E293B] shadow-xs'
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{isInCart ? 'Reservado' : 'Reservar 15m'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer da Gaveta */}
          {favoriteProducts.length > 0 && (
            <div className="p-6 bg-white border-t border-[#D8D7EE]">
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] py-3 rounded-full font-bold text-sm transition-all shadow-xs"
              >
                <span>Continuar Garimpando</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
