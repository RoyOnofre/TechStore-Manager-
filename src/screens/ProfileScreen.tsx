import React, { useState, useRef, useEffect } from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Shield, Camera, Save, Lock, Bell, Globe, CheckCircle2 } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole, User } from '../types';

interface ProfileScreenProps {
  userRole: UserRole;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userRole }) => {
  // Find the user based on role or default to first one
  const initialUser = MOCK_USERS.find(u => u.role === userRole) || MOCK_USERS[0];
  
  const [user, setUser] = useState<User>(initialUser);
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'preferences'>('info');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Additional state for preferences and security
  const [bio, setBio] = useState('');
  const [language, setLanguage] = useState('Español (México)');
  const [timezone, setTimezone] = useState('(GMT-06:00) Mexico City');
  const [twoFactor, setTwoFactor] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(`profile_${userRole}`);
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      if (parsed.bio) setBio(parsed.bio);
      if (parsed.language) setLanguage(parsed.language);
      if (parsed.timezone) setTimezone(parsed.timezone);
      if (parsed.twoFactor !== undefined) setTwoFactor(parsed.twoFactor);
    }
  }, [userRole]);

  const handleInputChange = (field: keyof User, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      const dataToSave = {
        ...user,
        bio,
        language,
        timezone,
        twoFactor
      };
      localStorage.setItem(`profile_${userRole}`, JSON.stringify(dataToSave));
      window.dispatchEvent(new CustomEvent('profileUpdated'));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Mi <span className="text-primary">Perfil</span></h1>
          <p className="text-slate-400">Gestiona tu información personal y seguridad</p>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20"
              >
                <CheckCircle2 size={18} />
                ¡Cambios guardados!
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-2xl text-sm font-black glow-shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
            ) : (
              <Save size={20} />
            )}
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 rounded-[40px] border border-primary/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-surface-dark border-4 border-primary/20 flex items-center justify-center text-primary text-4xl font-black overflow-hidden shadow-2xl">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  user.initials
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-3 bg-primary text-background-dark rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all z-10"
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </div>
            
            <h2 className="text-xl font-black text-white tracking-tight">{user.name}</h2>
            <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mt-2">{user.role}</p>
            
            <div className="mt-8 pt-8 border-t border-primary/10 flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-xl font-black text-white">124</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Ventas</p>
              </div>
              <div className="w-px h-8 bg-primary/10"></div>
              <div className="text-center">
                <p className="text-xl font-black text-white">98%</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Rating</p>
              </div>
            </div>
          </div>

          <nav className="glass-panel p-4 rounded-[32px] border border-primary/10 space-y-2">
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
          <div className="glass-panel p-10 rounded-[40px] border border-primary/10 min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'info' && (
                <motion.div 
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <UserIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Información Personal</h3>
                      <p className="text-slate-400 text-sm">Actualiza tus datos de contacto y ubicación</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProfileInput 
                      label="Nombre Completo" 
                      icon={<UserIcon size={20} />} 
                      value={user.name} 
                      onChange={(val: string) => handleInputChange('name', val)}
                    />
                    <ProfileInput 
                      label="Correo Electrónico" 
                      icon={<Mail size={20} />} 
                      value={user.email} 
                      onChange={(val: string) => handleInputChange('email', val)}
                    />
                    <ProfileInput 
                      label="Teléfono" 
                      icon={<Phone size={20} />} 
                      value={user.phone || ''} 
                      onChange={(val: string) => handleInputChange('phone', val)}
                    />
                    <ProfileInput 
                      label="Ubicación" 
                      icon={<MapPin size={20} />} 
                      value={user.address || ''} 
                      onChange={(val: string) => handleInputChange('address', val)}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Biografía / Notas</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 px-6 text-white focus:outline-none focus:border-primary transition-all h-40 resize-none placeholder:text-slate-600"
                      placeholder="Cuéntanos un poco sobre ti..."
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div 
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Seguridad</h3>
                      <p className="text-slate-400 text-sm">Gestiona la protección de tu cuenta</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 bg-background-dark/30 border border-primary/10 rounded-[32px] flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                          <Lock size={28} />
                        </div>
                        <div>
                          <p className="text-white font-black text-lg">Cambiar Contraseña</p>
                          <p className="text-sm text-slate-500">Actualiza tu contraseña regularmente para mayor seguridad</p>
                        </div>
                      </div>
                      <button className="px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all">
                        Actualizar
                      </button>
                    </div>

                    <div className="p-8 bg-background-dark/30 border border-primary/10 rounded-[32px] flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                          <Shield size={28} />
                        </div>
                        <div>
                          <p className="text-white font-black text-lg">Autenticación de Dos Pasos</p>
                          <p className="text-sm text-slate-500">Añade una capa extra de protección a tu cuenta</p>
                        </div>
                      </div>
                      <div 
                        onClick={() => setTwoFactor(!twoFactor)}
                        className={`relative inline-block w-14 h-7 rounded-full cursor-pointer transition-colors ${twoFactor ? 'bg-primary/40' : 'bg-slate-700'}`}
                      >
                        <div className={`absolute top-1.5 w-4 h-4 bg-primary rounded-full glow-shadow transition-all ${twoFactor ? 'right-1.5' : 'left-1.5'}`}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div 
                  key="preferences"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Bell size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Preferencias</h3>
                      <p className="text-slate-400 text-sm">Personaliza tu experiencia en el sistema</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Idioma</label>
                      <div className="relative">
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary appearance-none transition-all font-bold"
                        >
                          <option>Español (México)</option>
                          <option>English (US)</option>
                          <option>Português</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Zona Horaria</label>
                      <select 
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 px-6 text-white focus:outline-none focus:border-primary appearance-none transition-all font-bold"
                      >
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
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
      active ? 'bg-primary text-background-dark font-black glow-shadow' : 'text-slate-400 hover:bg-primary/10 hover:text-primary'
    }`}
  >
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </button>
);

const ProfileInput = ({ label, icon, value, onChange }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
        {icon}
      </div>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-600"
      />
    </div>
  </div>
);

export default ProfileScreen;
