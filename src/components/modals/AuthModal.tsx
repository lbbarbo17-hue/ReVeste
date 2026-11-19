import React, { useState } from 'react';
import { X, Sparkles, User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Bem-vindo ao ReVeste! Modo demonstração: login com ${email || 'garimpador@reveste.com.br'} efetuado com sucesso.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E293B]/40 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-modal border border-[#D8D7EE] z-10 overflow-hidden">
        
        {/* Detalhe Superior Pêssego Pastel */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8DB9F0] via-[#F5B69E] to-[#8DB9F0]" />

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E9E8F8] flex items-center justify-center text-[#1E293B] border border-[#D8D7EE]">
              <Sparkles className="w-5 h-5 text-[#F5B69E]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E293B]">
                {tab === 'login' ? 'Entrar no ReVeste' : 'Criar Conta de Garimpo'}
              </h3>
              <p className="text-xs text-[#1E293B]/70 font-medium">
                Comunidade de moda circular & SKU único
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E9E8F8] hover:bg-[#D8D7EE] text-[#1E293B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Abas Alternáveis */}
        <div className="flex p-1 bg-[#E9E8F8] rounded-full mb-6 border border-[#D8D7EE]">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              tab === 'login'
                ? 'bg-white text-[#1E293B] shadow-xs'
                : 'text-[#1E293B]/70 hover:text-[#1E293B]'
            }`}
          >
            Já tenho conta
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              tab === 'register'
                ? 'bg-white text-[#1E293B] shadow-xs'
                : 'text-[#1E293B]/70 hover:text-[#1E293B]'
            }`}
          >
            Quero me cadastrar
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1 uppercase tracking-wider">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8DB9F0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Seu nome ou nome do brechó"
                  required
                  className="w-full bg-[#E9E8F8]/40 border border-[#D8D7EE] focus:border-[#8DB9F0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E293B] outline-none font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1 uppercase tracking-wider">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8DB9F0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full bg-[#E9E8F8]/40 border border-[#D8D7EE] focus:border-[#8DB9F0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E293B] outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1 uppercase tracking-wider">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8DB9F0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#E9E8F8]/40 border border-[#D8D7EE] focus:border-[#8DB9F0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E293B] outline-none font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#F5B69E] hover:bg-[#e8a38a] text-[#1E293B] font-bold py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>{tab === 'login' ? 'Acessar Conta' : 'Criar Perfil Sustentável'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#D8D7EE] flex items-center justify-center gap-2 text-[11px] text-[#1E293B]/70 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Custódia segura e proteção contra fraudes ReVeste</span>
        </div>

      </div>
    </div>
  );
};
