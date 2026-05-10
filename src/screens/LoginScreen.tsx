import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Package, UserCheck, ShieldCheck, ShoppingBag, X, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '../types';
import { api } from '../api';

interface LoginScreenProps {
  onLogin: (role: UserRole, userData?: any) => void;
  onRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetCorreo, setResetCorreo] = useState('');
  const [resetNueva, setResetNueva] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [mostrarPass, setMostrarPass] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetNueva.length < 6) { setResetError('Mínimo 6 caracteres'); return; }
    setResetLoading(true); setResetError('');
    try {
      await api.resetContrasena(resetCorreo, resetNueva);
      setResetSuccess(true);
      setTimeout(() => { setShowReset(false); setResetSuccess(false); }, 2000);
    } catch (err: any) { setResetError(err.message || 'Correo no encontrado'); }
    finally { setResetLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (selectedRole === 'cliente') { onLogin('cliente'); return; }
    setLoading(true);
    try {
      const data = await api.login(correo, contrasena);
      localStorage.setItem(`profile_${data.usuario.rol}`, JSON.stringify(data.usuario));
      onLogin(data.usuario.rol as UserRole, data.usuario);
    } catch (err: any) { setError(err.message || 'Error al iniciar sesión'); }
    finally { setLoading(false); }
  };

  return (
    <div className="h-full flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-1000"></div>
      
      <div className="w-full max-w-md glass-panel p-10 rounded-[40px] relative z-10 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 animate-bounce-subtle">
            <Package className="text-background-dark" size={40} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">TechStore<span className="text-primary">Pro</span></h1>
          <p className="text-slate-400 mt-2 font-medium">Sincronizado con Supabase Master</p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2">
            {(['admin', 'cajero', 'cliente'] as UserRole[]).map((role) => (
              <button 
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${selectedRole === role ? 'bg-primary border-primary text-background-dark font-black' : 'bg-background-dark/50 border-primary/10 text-slate-400 hover:border-primary/40'}`}
              >
                {role === 'admin' ? <ShieldCheck size={24} /> : role === 'cajero' ? <UserCheck size={24} /> : <ShoppingBag size={24} />}
                <span className="text-[10px] uppercase tracking-widest">{role}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <div className="mb-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs text-center font-bold animate-in slide-in-from-top-2">{error}</div>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {selectedRole === 'cliente' ? (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="p-8 bg-violet-500/10 border border-violet-500/20 rounded-[32px] text-center">
                <ShoppingBag className="mx-auto text-violet-500 mb-2" size={48} />
                <h3 className="text-white font-black text-lg">Modo Invitado</h3>
                <p className="text-xs text-slate-400 mt-1">Explora sin contraseñas.</p>
              </div>
              <button type="button" onClick={() => onLogin('cliente')} className="w-full bg-violet-500 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-violet-500/20">
                Acceso Directo <ArrowRight size={24} />
              </button>
            </div>
          ) : (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Email Corporativo" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary text-white font-medium" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input type={mostrarPass ? 'text' : 'password'} value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña Maestra" className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-primary text-white font-medium" required />
                  <button type="button" onClick={() => setMostrarPass(!mostrarPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary">
                    {mostrarPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-background-dark font-black py-5 rounded-[24px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.95] transition-all shadow-xl shadow-primary/20 disabled:opacity-50">
                {loading ? 'Validando...' : `Entrar como ${selectedRole.toUpperCase()}`} {!loading && <ArrowRight size={24} />}
              </button>
            </div>
          )}
        </form>

        <div className="mt-8 text-center"><button onClick={onRegister} className="text-primary font-black hover:underline text-xs uppercase tracking-widest">Crear Cuenta Nueva</button></div>
      </div>

      {showReset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface-dark border border-primary/20 rounded-[40px] w-full max-w-sm p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-8"><h3 className="text-xl font-black text-white uppercase tracking-tighter">Reset Pass</h3><button onClick={() => setShowReset(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full"><X size={24}/></button></div>
            <form onSubmit={handleReset} className="space-y-5">
              <input type="email" value={resetCorreo} onChange={e => setResetCorreo(e.target.value)} placeholder="Email registrado" required className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 px-6 text-white" />
              <input type="password" value={resetNueva} onChange={e => setResetNueva(e.target.value)} placeholder="Nueva Contraseña" required className="w-full bg-background-dark/50 border border-primary/20 rounded-2xl py-4 px-6 text-white" />
              <button type="submit" disabled={resetLoading} className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50 uppercase">{resetLoading ? 'Cargando...' : 'Restablecer'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
