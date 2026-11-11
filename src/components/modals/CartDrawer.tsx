import React, { useEffect, useState } from 'react';
import { CartItem } from '../../types/product';
import { X, Trash2, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);

  useEffect(() => {
    if (!isOpen || items.length === 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, items.length]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const subtotal = items.reduce((sum, item) => sum + item.product.price, 0);
  const totalWaterSaved = items.reduce((sum, item) => sum + item.product.ecoImpact.waterSavedLiters, 0);
  const shippingFee = items.length > 0 ? 18.90 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#1E293B]/40 backdrop-blur-sm transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#D8D7EE] shadow-modal flex flex-col justify-between">
          
          {/* Cabeçalho da Gaveta em Azul Celeste #8DB9F0 */}
          <div className="p-6 border-b border-[#7AA7DE]/40 bg-[#8DB9F0] text-[#1E293B]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-[#1E293B]">
                  Sua Sacolinha
                </span>
                <span className="bg-white text-[#1E293B] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {items.length} {items.length === 1 ? 'peça' : 'peças'}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar sacolinha"
                className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-[#1E293B] hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner de Reserva Temporária Anti-Overselling */}
            {items.length > 0 && (
              <div className="bg-white rounded-xl p-3 border border-[#F5B69E] flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2 text-[#1E293B]">
                  <Clock className="w-4 h-4 text-[#F5B69E] animate-pulse" />
                  <div>
                    <span className="font-bold">Reserva de Peça Única</span>
                    <p className="text-[10px] text-[#1E293B]/70 font-medium">Garante que ninguém compre sua peça agora</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-sm bg-[#F5B69E] text-[#1E293B] px-2.5 py-1 rounded-md shadow-xs">
                  {formattedTime}
                </span>
              </div>
            )}
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#E9E8F8]/30">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#8DB9F0]/30 flex items-center justify-center mx-auto mb-4 text-[#8DB9F0]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h5 className="font-serif text-xl font-bold text-[#1E293B] mb-2">
                  Sua Sacolinha está vazia
                </h5>
                <p className="text-xs text-[#1E293B]/70 max-w-xs mx-auto mb-6 font-medium">
                  Explore o acervo de brechó, garimpe achados únicos e adicione à sua sacolinha!
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] px-6 py-2.5 rounded-full text-xs font-bold transition-colors shadow-xs"
                >
                  Continuar Garimpando
                </button>
              </div>
            ) : (
              items.map(({ product }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#D8D7EE] items-center shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded-xl bg-[#E9E8F8]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8DB9F0] block">
                      {product.brand}
                    </span>
                    <h6 className="font-serif text-sm font-bold text-[#1E293B] truncate">
                      {product.name}
                    </h6>
                    <div className="text-xs text-[#1E293B]/70 flex items-center gap-2 mt-0.5 font-medium">
                      <span>Tam: {product.size}</span>
                      <span>•</span>
                      <span className="text-[11px] text-[#8DB9F0] font-bold">SKU Único</span>
                    </div>
                    <span className="text-sm font-bold text-[#1E293B] block mt-1">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    aria-label={`Remover ${product.name} da sacolinha`}
                    className="text-[#1E293B]/50 hover:text-[#F5B69E] p-2 transition-colors"
                    title="Remover peça"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Rodapé da Sacolinha com Cálculo de Frete e Impactômetro */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#D8D7EE] bg-white space-y-4">
              
              {/* Impactômetro Sustentável */}
              <div className="bg-[#8DB9F0]/20 border border-[#8DB9F0]/50 rounded-xl p-3 text-xs text-[#1E293B] flex items-center gap-2.5">
                <span className="text-lg">🌿</span>
                <div>
                  <strong className="block font-bold">Impacto Consciente Gerado</strong>
                  <span className="text-[11px] text-[#1E293B]/80 font-medium">
                    Você está poupando aproximadamente <strong>{totalWaterSaved.toLocaleString('pt-BR')} Litros de água</strong> comprando de segunda mão!
                  </span>
                </div>
              </div>

              {/* Valores */}
              <div className="space-y-1.5 text-xs text-[#1E293B]/80 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} itens)</span>
                  <span className="font-bold text-[#1E293B]">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete Consolidado (Sacolinha 30 dias)</span>
                  <span className="font-bold text-[#1E293B]">R$ {shippingFee.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1E293B] pt-2 border-t border-[#D8D7EE]">
                  <span>Total</span>
                  <span className="text-[#1E293B]">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Botão de Finalização em Azul Celeste #8DB9F0 */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98"
              >
                <span>Finalizar Pedido com Proteção</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#1E293B]/70 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8DB9F0]" />
                <span>Custódia Escrow segura • Peça conferida antes do envio</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
