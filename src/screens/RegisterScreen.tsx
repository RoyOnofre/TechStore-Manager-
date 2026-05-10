import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';
import { api } from '../api';

interface RegisterScreenProps {
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    rol: 'admin',
    contrasena: '',
    confirmar: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (step < 3) setStep(step + 1);
    else handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    if (formData.contrasena !== formData.confirmar) { setError('Las contraseñas no coinciden'); return; }
    if (formData.contrasena.length < 6) { setError('Mínimo 6 caracteres'); return; }

    setLoading(true);
    try {
      await api.registrar(`${formData.nombre} ${formData.apellido}`.trim(), formData.correo, formData.contrasena, formData.rol);
      setSuccess(true);
      setTimeout(() => onBack(), 2500);
    } catch (err: any) { setError(err.message || 'Error al crear la cuenta'); }
    finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-background-dark tech-pattern">
        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-xl shadow-primary/20 animate-bounce-subtle">
            <CheckCircle2 className="text-background-dark" size={64} />
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter">¡CUENTA LISTA!</h2>
          <p className="text-slate-400 text-xl font-medium">Usuario sincronizado en Supabase.</p>
          <div className="w-12 h-1.5 bg-primary mx-auto rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-6 bg-background-dark tech-pattern">
      <div className="w-full max-w-2xl glass-panel p-12 rounded-[48px] relative shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button onClick={onBack} className="absolute left-10 top-10 p-3 hover:bg-primary hover:text-background-dark rounded-2xl transition-all duration-300 text-primary border border-primary/20">
          <ArrowLeft size={28} />
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Crear <span className="text-primary">Perfil</span></h1>
          <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px]">Paso {step} de 3</p>
          
          <div className="flex items-center justify-center gap-4 mt-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${step >= s ? 'bg-primary text-background-dark scale-110 shadow-lg' : 'bg-surface-dark text-slate-600 border border-white/5'}`}>
                  {step > s ? <CheckCircle2 size={24} /> : s}
                </div>
                {s < 3 && <div className={`w-16 h-1 rounded-full mx-1 transition-all duration-700 ${step > s ? 'bg-primary' : 'bg-surface-dark'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm text-center font-black animate-in zoom-in">{error}</div>}

        <form className="space-y-8" onSubmit={handleNext}>
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nombre</label>
                    <input name="nombre" type="text" value={formData.nombre} onChange={handleChange} placeholder="Juan" className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-5 px-8 text-white focus:border-primary transition-all font-bold" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Apellido</label>
                    <input name="apellido" type="text" value={formData.apellido} onChange={handleChange} placeholder="Pérez" className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-5 px-8 text-white focus:border-primary transition-all font-bold" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Correo Corporativo</label>
                  <input name="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="juan@techstore.com" className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-5 px-8 text-white focus:border-primary transition-all font-bold" required />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-8">
                <button type="button" onClick={() => setFormData(p => ({ ...p, rol: 'admin' }))} className={`group flex flex-col items-center gap-4 p-10 rounded-[32px] border-4 transition-all duration-300 ${formData.rol === 'admin' ? 'border-primary bg-primary/10 text-primary scale-105 shadow-xl' : 'border-white/5 bg-background-dark/30 text-slate-500 hover:border-primary/30'}`}>
                  <ShieldCheck className={`transition-transform duration-500 ${formData.rol === 'admin' ? 'scale-125' : ''}`} size={64} />
                  <span className="font-black uppercase tracking-tighter text-xl">Administrador</span>
                </button>
                <button type="button" onClick={() => setFormData(p => ({ ...p, rol: 'cajero' }))} className={`group flex flex-col items-center gap-4 p-10 rounded-[32px] border-4 transition-all duration-300 ${formData.rol === 'cajero' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 scale-105 shadow-xl' : 'border-white/5 bg-background-dark/30 text-slate-500 hover:border-emerald-500/30'}`}>
                  <UserCheck className={`transition-transform duration-500 ${formData.rol === 'cajero' ? 'scale-125' : ''}`} size={64} />
                  <span className="font-black uppercase tracking-tighter text-xl">Cajero</span>
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Contraseña de Seguridad</label>
                  <input name="contrasena" type="password" value={formData.contrasena} onChange={handleChange} placeholder="••••••••" className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-5 px-8 text-white focus:border-primary transition-all font-bold" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Confirmar Acceso</label>
                  <input name="confirmar" type="password" value={formData.confirmar} onChange={handleChange} placeholder="••••••••" className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-5 px-8 text-white focus:border-primary transition-all font-bold" required />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-5 bg-surface-dark text-white font-black rounded-[24px] border border-white/5 hover:bg-white/10 transition-all">
                Atrás
              </button>
            )}
            <button type="submit" disabled={loading} className="flex-1 bg-primary text-background-dark font-black py-5 rounded-[24px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.95] transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 text-xl tracking-tighter">
              {loading ? 'Sincronizando...' : step === 3 ? 'FINALIZAR REGISTRO' : 'CONTINUAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
