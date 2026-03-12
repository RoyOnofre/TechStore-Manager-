import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Shield, Camera, Save, Lock, Bell, Globe } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const ProfileScreen: React.FC = () => {
  const user = MOCK_USERS[0]; // Current user (Admin)
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'preferences'>('info');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
          <p className="text-slate-400">Gestiona tu información personal y seguridad</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-2xl text-sm font-bold glow-shadow hover:scale-105 transition-all">
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-primary text-4xl font-black">
                {user.initials}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-background-dark rounded-full glow-shadow hover:scale-110 transition-all">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mt-1">{user.role}</p>
            <div className="mt-6 pt-6 border-t border-primary/10 flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-white">124</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Ventas</p>
              </div>
              <div className="w-px h-8 bg-primary/10"></div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">98%</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Rating</p>
              </div>
            </div>
          </div>

          <nav className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-4 backdrop-blur-sm space-y-2">
            <ProfileTabButton 
              active={activeTab === 'info'} 
              onClick={() => setActiveTab('info')} 
              icon={<UserIcon size={20} />} 
              label="Información" 
            />
            <ProfileTabButton 
              active={activeTab === 'security'} 
              onClick={() => setActiveTab('security')} 
              icon={<Shield size={20} />} 
              label="Seguridad" 
            />
            <ProfileTabButton 
              active={activeTab === 'preferences'} 
              onClick={() => setActiveTab('preferences')} 
              icon={<Bell size={20} />} 
              label="Preferencias" 
            />
          </nav>
        </div>

        {/* Right: Tab Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-10 backdrop-blur-sm min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'info' && (
                <motion.div 
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-white">Información Personal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInput label="Nombre Completo" icon={<UserIcon size={20} />} value={user.name} />
                    <ProfileInput label="Correo Electrónico" icon={<Mail size={20} />} value={user.email} />
                    <ProfileInput label="Teléfono" icon={<Phone size={20} />} value={user.phone || ''} />
                    <ProfileInput label="Ubicación" icon={<MapPin size={20} />} value={user.address || ''} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Biografía / Notas</label>
                    <textarea 
                      className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all h-32 resize-none"
                      placeholder="Cuéntanos un poco sobre ti..."
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div 
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-white">Seguridad de la Cuenta</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                          <Lock size={24} />
                        </div>
                        <div>
                          <p className="text-white font-bold">Cambiar Contraseña</p>
                          <p className="text-xs text-slate-500">Actualiza tu contraseña regularmente para mayor seguridad</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-bold hover:bg-primary hover:text-background-dark transition-all">
                        Actualizar
                      </button>
                    </div>

                    <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                          <Shield size={24} />
                        </div>
                        <div>
                          <p className="text-white font-bold">Autenticación de Dos Pasos</p>
                          <p className="text-xs text-slate-500">Añade una capa extra de protección a tu cuenta</p>
                        </div>
                      </div>
                      <div className="relative inline-block w-12 h-6 bg-primary/20 rounded-full cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full glow-shadow"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div 
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-white">Preferencias del Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Idioma</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                        <select className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary appearance-none transition-all">
                          <option>Español (México)</option>
                          <option>English (US)</option>
                          <option>Português</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Zona Horaria</label>
                      <select className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary appearance-none transition-all">
                        <option>(GMT-06:00) Mexico City</option>
                        <option>(GMT-05:00) New York</option>
                        <option>(UTC) London</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
      active ? 'bg-primary text-background-dark font-bold glow-shadow' : 'text-slate-400 hover:bg-primary/10 hover:text-primary'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const ProfileInput = ({ label, icon, value }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
        {icon}
      </div>
      <input 
        type="text" 
        defaultValue={value}
        className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
      />
    </div>
  </div>
);

export default ProfileScreen;
