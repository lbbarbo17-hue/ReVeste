import React, { useState } from 'react';
import { Product } from '../../types/product';
import { X, Ruler, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface VirtualFittingModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export const VirtualFittingModal: React.FC<VirtualFittingModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isInCart,
}) => {
  if (!product) return null;

  const [userBust, setUserBust] = useState<number>(90);
  const [userWaist, setUserWaist] = useState<number>(74);
  const [userHips, setUserHips] = useState<number>(98);

  const m = product.measurements;

  const calculateFit = () => {
    let diff = 0;
    let count = 0;
    if (m.bust) { diff += (m.bust - userBust); count++; }
    if (m.waist) { diff += (m.waist - userWaist); count++; }
    if (m.hips) { diff += (m.hips - userHips); count++; }

    const avgDiff = count > 0 ? diff / count : 0;
    if (avgDiff >= -2 && avgDiff <= 4) {
      return { status: 'Perfeito no Corpo', color: 'text-[#1E293B] bg-[#8DB9F0]/30 border-[#8DB9F0]', icon: CheckCircle2, note: 'Essa peça ficará com caimento ideal nas suas medidas.' };
    } else if (avgDiff > 4) {
      return { status: 'Caimento Levemente Solto / Oversized', color: 'text-[#1E293B] bg-[#E9E8F8] border-[#D8D7EE]', icon: Sparkles, note: 'A modelagem terá uma folga confortável.' };
    } else {
      return { status: 'Ajustado / Pode Apertar', color: 'text-[#1E293B] bg-[#F5B69E]/40 border-[#F5B69E]', icon: AlertTriangle, note: 'As medidas da peça são ligeiramente menores que as suas.' };
    }
  };

  const fitResult = calculateFit();
  const IconComp = fitResult.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative bg-white border border-[#D8D7EE] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-modal z-10">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8D7EE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8DB9F0] text-[#1E293B] flex items-center justify-center shadow-xs">
              <Ruler className="w-5 h-5 text-[#1E293B]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E293B]">
                Provador Virtual & Medidas
              </h3>
              <p className="text-xs text-[#1E293B]/70 font-medium">
                Conferência em centímetros reais para compras sem surpresas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar provador virtual"
            className="w-9 h-9 rounded-full bg-[#E9E8F8] flex items-center justify-center text-[#1E293B] hover:bg-[#D8D7EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informações da Peça */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 items-center">
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#E9E8F8]/40 shadow-xs border border-[#D8D7EE]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="sm:col-span-2 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#8DB9F0] uppercase tracking-wider">
                {product.brand} • {product.size}
              </span>
              <h4 className="font-serif text-xl font-bold text-[#1E293B]">
                {product.name}
              </h4>
              <p className="text-xs text-[#1E293B]/70 mt-1 font-medium">{product.composition}</p>
            </div>

            {/* Medidas Reais Tiradas da Peça */}
            <div className="bg-[#E9E8F8]/60 rounded-2xl p-4 border border-[#D8D7EE]">
              <h5 className="font-serif text-sm font-bold text-[#1E293B] mb-2 flex items-center gap-2">
                <span>📏 Fita Métrica (Medidas da Peça):</span>
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {m.bust && <div className="flex justify-between py-1 border-b border-[#D8D7EE]/80"><span>Busto:</span> <strong className="text-[#1E293B]">{m.bust} cm</strong></div>}
                {m.waist && <div className="flex justify-between py-1 border-b border-[#D8D7EE]/80"><span>Cintura:</span> <strong className="text-[#1E293B]">{m.waist} cm</strong></div>}
                {m.hips && <div className="flex justify-between py-1 border-b border-[#D8D7EE]/80"><span>Quadril:</span> <strong className="text-[#1E293B]">{m.hips} cm</strong></div>}
                {m.length && <div className="flex justify-between py-1 border-b border-[#D8D7EE]/80"><span>Comprimento:</span> <strong className="text-[#1E293B]">{m.length} cm</strong></div>}
                {m.shoulder && <div className="flex justify-between py-1 border-b border-[#D8D7EE]/80"><span>Ombro a Ombro:</span> <strong className="text-[#1E293B]">{m.shoulder} cm</strong></div>}
                {m.sleeve && <div className="flex justify-between py-1 border-b border-[#D8D7EE]/80"><span>Manga:</span> <strong className="text-[#1E293B]">{m.sleeve} cm</strong></div>}
              </div>
            </div>

            {/* Diagnóstico do Provador */}
            <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${fitResult.color}`}>
              <IconComp className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold block">{fitResult.status}</strong>
                <p className="text-[11px] leading-snug">{fitResult.note}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulador Interativo de Medidas do Usuário */}
        <div className="bg-[#E9E8F8]/40 rounded-2xl p-4 border border-[#D8D7EE] mb-6">
          <span className="text-xs font-bold text-[#1E293B] block mb-3">
            Ajuste suas medidas corporais para simular:
          </span>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[#1E293B]/70 mb-1 font-semibold">Seu Busto (cm)</label>
              <input
                type="number"
                value={userBust}
                onChange={(e) => setUserBust(Number(e.target.value))}
                className="w-full bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] rounded-xl px-3 py-1.5 text-[#1E293B] font-bold"
              />
            </div>
            <div>
              <label className="block text-[#1E293B]/70 mb-1 font-semibold">Sua Cintura (cm)</label>
              <input
                type="number"
                value={userWaist}
                onChange={(e) => setUserWaist(Number(e.target.value))}
                className="w-full bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] rounded-xl px-3 py-1.5 text-[#1E293B] font-bold"
              />
            </div>
            <div>
              <label className="block text-[#1E293B]/70 mb-1 font-semibold">Seu Quadril (cm)</label>
              <input
                type="number"
                value={userHips}
                onChange={(e) => setUserHips(Number(e.target.value))}
                className="w-full bg-white border border-[#D8D7EE] focus:border-[#8DB9F0] rounded-xl px-3 py-1.5 text-[#1E293B] font-bold"
              />
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8D7EE]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-[#1E293B]/70 hover:bg-[#E9E8F8] transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            disabled={isInCart}
            className="bg-[#8DB9F0] hover:bg-[#F5B69E] text-[#1E293B] px-6 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all"
          >
            {isInCart ? 'Já está na Sacolinha' : 'Gostei do Caimento! Adicionar à Sacolinha'}
          </button>
        </div>

      </div>
    </div>
  );
};
