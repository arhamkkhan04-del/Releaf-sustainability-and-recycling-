import React, { useState } from 'react';
import { X, Leaf } from 'lucide-react';
import { AuthState } from '../types';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<AuthState>(AuthState.LOGIN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = name || email.split('@')[0] || 'Eco Warrior';
    onLogin(userName);
    setName('');
    setEmail('');
    setPassword('');
    setMode(AuthState.LOGIN);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-[420px] bg-[#111827] rounded-2xl shadow-2xl overflow-hidden animate-[float_0.3s_ease-out] border border-slate-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="p-8 pt-10">
          <div className="flex flex-col items-center mb-8">
             <div className="flex items-center gap-2 mb-6">
                <Leaf className="text-releaf-500" size={32} />
                <span className="text-3xl font-bold text-white">Releaf</span>
             </div>
             <h2 className="text-xl font-semibold text-white mb-1">
               {mode === AuthState.LOGIN ? 'Welcome Back!' : 'Join the Community'}
             </h2>
             <p className="text-slate-400 text-sm">
               {mode === AuthState.LOGIN ? 'Sign in to continue your journey.' : 'Create an account to get started.'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === AuthState.SIGNUP && (
              <div className="space-y-1">
                 <label className="text-xs text-slate-400 ml-1">Name</label>
                 <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1F2937] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-releaf-500 focus:ring-1 focus:ring-releaf-500 outline-none transition-all"
                  required
                />
              </div>
            )}
            
            <div className="space-y-1">
               <label className="text-xs text-slate-400 ml-1">Email address</label>
               <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1F2937] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-releaf-500 focus:ring-1 focus:ring-releaf-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1">
               <label className="text-xs text-slate-400 ml-1">Password</label>
               <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1F2937] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-releaf-500 focus:ring-1 focus:ring-releaf-500 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-releaf-600 hover:bg-releaf-700 text-white font-medium py-3 rounded-full transition-all shadow-lg shadow-releaf-900/20 mt-6"
            >
              {mode === AuthState.LOGIN ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
             <span className="text-slate-500 text-sm">
                {mode === AuthState.LOGIN ? "Don't have an account? " : "Already have an account? "}
             </span>
            <button
              onClick={() => setMode(mode === AuthState.LOGIN ? AuthState.SIGNUP : AuthState.LOGIN)}
              className="text-sm text-releaf-500 hover:text-releaf-400 font-medium transition-colors"
            >
              {mode === AuthState.LOGIN ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};