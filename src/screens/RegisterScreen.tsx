import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, CheckCircle2, Building2, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface RegisterScreenProps {
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-background-dark tech-pattern">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl glass-panel p-10 rounded-3xl relative glow-shadow"
      >
        <button 
          onClick={onBack}
          className="absolute left-8 top-8 p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">Crea tu Cuenta</h1>
          <p className="text-slate-400 mt-2">Únete a la red TechStore Pro</p>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-primary text-background-dark glow-shadow' : 'bg-surface-dark text-slate-500 border border-primary/10'
                }`}>
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary' : 'bg-surface-dark'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if(step < 3) nextStep(); else onBack(); }}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <input type="text" placeholder="Juan" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Apellido</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <input type="text" placeholder="Pérez" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type="email" placeholder="juan.perez@ejemplo.com" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nombre de la Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type="text" placeholder="Tech Solutions S.A." className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type="tel" placeholder="+52 55 1234 5678" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type="password" placeholder="••••••••" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type="password" placeholder="••••••••" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white" required />
                </div>
              </div>
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full bg-primary text-background-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all glow-shadow mt-10"
          >
            {step === 3 ? 'Finalizar Registro' : 'Siguiente Paso'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterScreen;
