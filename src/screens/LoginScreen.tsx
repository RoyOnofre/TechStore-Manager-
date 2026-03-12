import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Package, UserCheck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  return (
    <div className="h-full flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-panel p-10 rounded-3xl relative z-10 glow-shadow"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 glow-shadow">
            <Package className="text-background-dark" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">TechStore<span className="text-primary">Pro</span></h1>
          <p className="text-slate-400 mt-2">Gestión inteligente de inventario</p>
        </div>

        <div className="mb-8">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block text-center">Seleccionar Rol (Demo)</label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setSelectedRole('admin')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${selectedRole === 'admin' ? 'bg-primary/20 border-primary text-primary' : 'bg-background-dark/50 border-primary/10 text-slate-400 hover:border-primary/30'}`}
            >
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase">Admin</span>
            </button>
            <button 
              onClick={() => setSelectedRole('cajero')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${selectedRole === 'cajero' ? 'bg-primary/20 border-primary text-primary' : 'bg-background-dark/50 border-primary/10 text-slate-400 hover:border-primary/30'}`}
            >
              <UserCheck size={20} />
              <span className="text-[10px] font-bold uppercase">Cajero</span>
            </button>
            <button 
              onClick={() => setSelectedRole('cliente')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${selectedRole === 'cliente' ? 'bg-primary/20 border-primary text-primary' : 'bg-background-dark/50 border-primary/10 text-slate-400 hover:border-primary/30'}`}
            >
              <ShoppingBag size={20} />
              <span className="text-[10px] font-bold uppercase">Cliente</span>
            </button>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(selectedRole); }}>
          {selectedRole === 'cliente' ? (
            <div className="space-y-4">
              <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-center">
                <ShoppingBag className="mx-auto text-violet-500 mb-2" size={32} />
                <h3 className="text-white font-bold">Acceso de Invitado</h3>
                <p className="text-xs text-slate-400 mt-1">Como cliente, puedes acceder sin contraseña para ver el catálogo y tus pedidos.</p>
              </div>
              <button 
                type="button"
                onClick={() => onLogin('cliente')}
                className="w-full bg-violet-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all glow-shadow"
              >
                Entrar como Cliente
                <ArrowRight size={20} />
              </button>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-surface-dark px-2 text-slate-500">O usa tu cuenta</span></div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500" size={20} />
                  <input 
                    type="email" 
                    placeholder="cliente@techstore.com"
                    className="w-full bg-background-dark/50 border border-violet-500/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-violet-500 transition-all text-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input 
                    type="email" 
                    placeholder={selectedRole === 'admin' ? 'admin@techstore.com' : 'cajero@techstore.com'}
                    className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-slate-300">Contraseña</label>
                  <button type="button" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all text-white"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-background-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all glow-shadow mt-2"
              >
                Iniciar Sesión como {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            ¿No tienes una cuenta? {' '}
            <button onClick={onRegister} className="text-primary font-semibold hover:underline">Regístrate ahora</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
