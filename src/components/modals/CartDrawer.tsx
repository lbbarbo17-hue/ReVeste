import React, { useEffect, useState, useMemo } from 'react';
import { CartItem, ProductSeller } from '../../types/product';
import {
  X,
  Trash2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Wind,
  Package,
  Truck,
  Lock,
} from 'lucide-react';

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
  // Cronômetro regressivo iniciando em 14:59 (14 min e 59 s)
  const [timeLeft, setTimeLeft] = useState<number>(14 * 60 + 59);

  // Modo de frete por vendedor ('sacolinha30' ou 'immediate')
  const [shippingModes, setShippingModes] = useState<Record<string, 'immediate' | 'sacolinha30'>>({});

  // Simulação de CEP
  const [cep, setCep] = useState('01310-100');

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

  // Agrupamento dos itens por brechó / vendedor
  const itemsBySeller = useMemo(() => {
    const map = new Map<string, { seller: ProductSeller; items: CartItem[] }>();
    for (const item of items) {
      const key = item.product.seller.name;
      if (!map.has(key)) {
        map.set(key, { seller: item.product.seller, items: [] });
      }
      map.get(key)!.items.push(item);
    }
    return Array.from(map.values());
  }, [items]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Totais financeiros
  const subtotal = items.reduce((sum, item) => sum + item.product.price, 0);

  // Total de frete somado conforme escolha de cada brechó
  const totalShipping = itemsBySeller.reduce((sum, { seller }) => {
    const mode = shippingModes[seller.name] || 'sacolinha30';
    return sum + (mode === 'immediate' ? 18.90 : 0);
  }, 0);

  const total = subtotal + totalShipping;

  // Totais de Eco-Impacto
  const totalWaterSaved = items.reduce((sum, item) => sum + item.product.ecoImpact.waterSavedLiters, 0);
  const totalCo2Saved = items.reduce((sum, item) => sum + item.product.ecoImpact.co2SavedKg, 0);

  const handleSetShippingMode = (sellerName: string, mode: 'immediate' | 'sacolinha30') => {
    setShippingModes((prev) => ({
      ...prev,
      [sellerName]: mode,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop com desfoque */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1E293B]/45 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md lg:max-w-lg bg-[#E9E8F8] border-l border-[#D8D7EE] shadow-modal flex flex-col justify-between h-full">
          
          {/* 1. TOPO DA GAVETA: Header + Banner em Pêssego Pastel com Timer Ativo */}
          <div className="bg-[#8DB9F0] text-[#1E293B] border-b border-[#7AA7DE]/60 flex-shrink-0">
            
            {/* Linha de Título e Fechar */}
            <div className="p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1E293B] shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#F5B69E]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E293B]">
                    Sua Sacolinha
                  </h3>
                  <span className="text-[11px] font-bold text-[#1E293B] block -mt-0.5">
                    {items.length} {items.length === 1 ? 'garimpo exclusivo' : 'garimpos exclusivos'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Fechar sacolinha"
                className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#1E293B] flex items-center justify-center transition-colors shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Banner em Pêssego Pastel (#F5B69E) com Cronômetro Regressivo ao Vivo */}
            {items.length > 0 && (
              <div className="bg-[#F5B69E] px-4 sm:px-5 py-3 border-t border-[#e8a38a] flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Clock className="w-4 h-4 text-[#1E293B] animate-pulse" />
                  </div>
                  <p className="text-xs text-[#1E293B] font-semibold leading-tight truncate">
                    Peças únicas reservadas para você! <br />
                    <span className="text-[11px] font-medium opacity-90">
                      Conclua antes que o tempo expire.
                    </span>
                  </p>
                </div>

                <div className="bg-white px-3 py-1.5 rounded-xl border border-[#e8a38a] shadow-xs flex-shrink-0 text-center">
                  <span className="font-mono text-base font-extrabold text-[#1E293B] tracking-wider block">
                    {formattedTime}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#1E293B]/80 block -mt-0.5">
                    reserva ativa
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* 2. ÁREA CENTRAL: Itens Agrupados por Brechó + Resumo de Eco-Impacto */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#D8D7EE] p-8 shadow-soft">
                <div className="w-16 h-16 rounded-full bg-[#E9E8F8] flex items-center justify-center mx-auto mb-4 text-[#8DB9F0]">
                  <Package className="w-8 h-8 text-[#8DB9F0]" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">
                  Sua Sacolinha está vazia
                </h4>
                <p className="text-xs text-[#1E293B] max-w-xs mx-auto mb-6 font-medium leading-relaxed">
                  Peças de brechó têm SKU único. Garimpe achados exclusivos e garanta sua reserva de 15 minutos!
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] px-7 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Agrupamento por Brechó / Vendedor */}
                {itemsBySeller.map(({ seller, items: sellerItems }) => {
                  const currentMode = shippingModes[seller.name] || 'sacolinha30';
                  const sellerHandle = seller.handle || `@${seller.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

                  return (
                    <div
                      key={seller.name}
                      className="bg-white rounded-3xl border border-[#D8D7EE] p-4 sm:p-5 shadow-soft space-y-4"
                    >
                      {/* Cabeçalho do Brechó Parceiro */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#D8D7EE]/60">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#E9E8F8] flex items-center justify-center text-xs font-bold text-[#1E293B] border border-[#D8D7EE]">
                            {seller.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif font-bold text-sm text-[#1E293B]">
                                {seller.name}
                              </span>
                              {seller.verified !== false && (
                                <span title="Brechó Verificado" className="inline-flex">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8DB9F0] fill-[#1E293B]" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#1E293B] font-semibold block">
                              {sellerHandle} • {seller.city}, {seller.state}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold bg-[#E9E8F8] text-[#1E293B] px-2.5 py-1 rounded-full border border-[#D8D7EE]">
                          {sellerItems.length} {sellerItems.length === 1 ? 'peça' : 'peças'}
                        </span>
                      </div>

                      {/* Lista de Peças deste Brechó */}
                      <div className="space-y-3">
                        {sellerItems.map(({ product }) => (
                          <div
                            key={product.id}
                            className="flex gap-3.5 p-3 rounded-2xl bg-[#E9E8F8]/40 border border-[#D8D7EE]/80 items-center justify-between"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-20 object-cover rounded-xl bg-white border border-[#D8D7EE] flex-shrink-0"
                            />

                            <div className="flex-1 min-w-0 pr-2">
                              <span className="text-[10px] uppercase font-bold text-[#1E293B] block tracking-wider">
                                {product.brand}
                              </span>
                              <h5 className="font-serif text-xs sm:text-sm font-bold text-[#1E293B] truncate leading-snug">
                                {product.name}
                              </h5>
                              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-[#1E293B]">
                                <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-[#D8D7EE]">
                                  Tam: {product.size}
                                </span>
                                <span className="text-[10px] font-mono text-[#1E293B]">
                                  SKU: {product.sku.slice(0, 12)}
                                </span>
                              </div>
                              <span className="text-xs sm:text-sm font-extrabold text-[#1E293B] block mt-1">
                                R$ {product.price.toFixed(2).replace('.', ',')}
                              </span>
                            </div>

                            <button
                              onClick={() => onRemoveItem(product.id)}
                              aria-label={`Remover ${product.name}`}
                              title="Remover peça"
                              className="text-[#1E293B]/50 hover:text-rose-600 p-2 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Escolha em Rádio / Cards: Envio Imediato vs. Sacolinha 30 dias */}
                      <div className="pt-2 border-t border-[#D8D7EE]/60 space-y-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#1E293B] font-bold block">
                          Modalidade de Entrega deste Brechó:
                        </span>

                        <div className="grid grid-cols-1 gap-2">
                          
                          {/* Opção B: Sacolinha de 30 dias (Destaque Econômico & Ecológico) */}
                          <label
                            onClick={() => handleSetShippingMode(seller.name, 'sacolinha30')}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                              currentMode === 'sacolinha30'
                                ? 'bg-[#8DB9F0]/20 border-[#8DB9F0] shadow-xs'
                                : 'bg-white border-[#D8D7EE] hover:border-[#8DB9F0]/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.name}`}
                              checked={currentMode === 'sacolinha30'}
                              onChange={() => handleSetShippingMode(seller.name, 'sacolinha30')}
                              className="mt-1 accent-[#1E293B] cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#1E293B] flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-[#F5B69E]" />
                                  Abrir / Adicionar à Sacolinha (30 dias)
                                </span>
                                <span className="text-[10px] font-extrabold bg-[#F5B69E] text-[#1E293B] px-2 py-0.5 rounded-full">
                                  Frete R$ 0,00 Agora
                                </span>
                              </div>
                              <p className="text-[11px] text-[#1E293B] font-medium mt-1 leading-snug">
                                Pague as peças agora para garantir exclusividade e acumule novos garimpos deste brechó por até 30 dias. Frete consolidado único depois!
                              </p>
                            </div>
                          </label>

                          {/* Opção A: Envio Imediato */}
                          <label
                            onClick={() => handleSetShippingMode(seller.name, 'immediate')}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                              currentMode === 'immediate'
                                ? 'bg-[#8DB9F0]/20 border-[#8DB9F0] shadow-xs'
                                : 'bg-white border-[#D8D7EE] hover:border-[#8DB9F0]/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`shipping-${seller.name}`}
                              checked={currentMode === 'immediate'}
                              onChange={() => handleSetShippingMode(seller.name, 'immediate')}
                              className="mt-1 accent-[#1E293B] cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#1E293B] flex items-center gap-1">
                                  <Truck className="w-3.5 h-3.5 text-[#1E293B]" />
                                  Envio Imediato
                                </span>
                                <span className="text-xs font-bold text-[#1E293B]">
                                  + R$ 18,90
                                </span>
                              </div>
                              <p className="text-[11px] text-[#1E293B] font-medium mt-1 leading-snug">
                                Envio direto em até 2 dias úteis via Correios / Jadlog com rastreamento completo.
                              </p>
                              {currentMode === 'immediate' && (
                                <div className="mt-2.5 pt-2 border-t border-[#D8D7EE] flex items-center gap-2">
                                  <span className="text-[10px] text-[#1E293B] font-bold">Simular CEP:</span>
                                  <input
                                    type="text"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    placeholder="00000-000"
                                    className="bg-white border border-[#D8D7EE] rounded-lg px-2 py-1 text-[11px] font-mono text-[#1E293B] w-28 outline-none focus:border-[#8DB9F0]"
                                  />
                                  <span className="text-[10px] text-emerald-700 font-bold">SP Capital (2-3 dias)</span>
                                </div>
                              )}
                            </div>
                          </label>

                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* 3. RESUMO DE ECO-IMPACTO DO CARRINHO */}
                <div className="bg-white rounded-3xl border border-[#D8D7EE] p-4 sm:p-5 shadow-soft space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
                      <Droplets className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h5 className="font-serif text-sm font-bold text-[#1E293B]">
                        Eco-Impacto Desta Sacolinha
                      </h5>
                      <span className="text-[11px] text-[#1E293B] font-medium">
                        Comprando de segunda mão você evita produção têxtil nova
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#E9E8F8]/60 p-3 rounded-2xl border border-[#D8D7EE] text-center">
                      <div className="flex items-center justify-center gap-1.5 text-teal-800 mb-0.5">
                        <Droplets className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-serif font-extrabold text-base sm:text-lg text-[#1E293B]">
                          {totalWaterSaved.toLocaleString('pt-BR')} L
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#1E293B] tracking-wider block">
                        Água Poupada
                      </span>
                    </div>

                    <div className="bg-[#E9E8F8]/60 p-3 rounded-2xl border border-[#D8D7EE] text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[#1E293B] mb-0.5">
                        <Wind className="w-3.5 h-3.5 text-[#1E293B]" />
                        <span className="font-serif font-extrabold text-base sm:text-lg text-[#1E293B]">
                          {totalCo2Saved.toFixed(1).replace('.', ',')} kg
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#1E293B] tracking-wider block">
                        CO₂ Evitado
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4. RODAPÉ FIXO: Subtotal, Frete, Botão Principal em Azul Celeste e Custódia Escrow */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#D8D7EE] bg-white space-y-3.5 flex-shrink-0 shadow-lg">
              
              {/* Linhas de Valores Financeiros */}
              <div className="space-y-1.5 text-xs text-[#1E293B] font-semibold">
                <div className="flex justify-between items-center">
                  <span>Subtotal das peças ({items.length})</span>
                  <span className="font-bold text-sm">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Frete das opções escolhidas</span>
                  {totalShipping === 0 ? (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      R$ 0,00 (Sacolinha 30d)
                    </span>
                  ) : (
                    <span className="font-bold text-xs">
                      R$ {totalShipping.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-baseline text-base sm:text-lg font-bold pt-2 border-t border-[#D8D7EE]">
                  <span className="font-serif">Total a Pagar Agora</span>
                  <span className="font-serif font-extrabold text-xl text-[#1E293B]">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Botão Principal em Azul Celeste #8DB9F0 */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] font-extrabold py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-95 border border-[#7AA7DE]"
              >
                <Lock className="w-4 h-4" />
                <span>Ir para Pagamento Seguro (PIX / Cartão)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Selo de Custódia Segura (Escrow) */}
              <div className="bg-[#E9E8F8]/50 p-2.5 rounded-xl border border-[#D8D7EE] flex items-center gap-2.5 text-[11px] text-[#1E293B] font-medium leading-tight">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Custódia Segura ReVeste (Escrow):</strong> O pagamento fica retido e só é liberado para o brechó após a entrega e confirmação das medidas em cm.
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
