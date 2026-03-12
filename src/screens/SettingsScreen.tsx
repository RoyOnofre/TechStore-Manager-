import React from 'react';
import { Settings, Building2, Percent, ShieldCheck, Database, Bell, Globe, Save, HelpCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

const SettingsScreen: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Configuración del Sistema</h1>
          <p className="text-slate-400">Control total sobre los datos de la tienda y seguridad</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-2xl text-sm font-bold glow-shadow hover:scale-105 transition-all">
          <Save size={20} />
          Guardar Configuración
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Section Navigation */}
        <div className="space-y-6">
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 px-4">Secciones</h3>
            <nav className="space-y-2">
              <SettingsNavItem icon={<Building2 size={20} />} label="Datos de la Tienda" active />
              <SettingsNavItem icon={<Percent size={20} />} label="Impuestos y Moneda" />
              <SettingsNavItem icon={<ShieldCheck size={20} />} label="Seguridad y Roles" />
              <SettingsNavItem icon={<Database size={20} />} label="Base de Datos" />
              <SettingsNavItem icon={<Bell size={20} />} label="Notificaciones" />
              <SettingsNavItem icon={<Globe size={20} />} label="Integraciones" />
            </nav>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="text-primary" size={24} />
              <h4 className="text-lg font-bold text-white">¿Necesitas ayuda?</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Consulta nuestra documentación técnica o contacta con soporte para configuraciones avanzadas.
            </p>
            <button className="w-full py-3 bg-background-dark border border-primary/20 rounded-xl text-sm font-bold text-primary hover:bg-primary hover:text-background-dark transition-all">
              Contactar Soporte
            </button>
          </div>
        </div>

        {/* Right: Section Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Store Info */}
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-10 backdrop-blur-sm space-y-8">
            <div className="flex items-center gap-3">
              <Building2 className="text-primary" size={24} />
              <h3 className="text-2xl font-bold text-white">Datos de la Tienda</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SettingsInput label="Nombre de la Tienda" value="TechStore Pro - Matriz" />
              <SettingsInput label="RFC / Tax ID" value="TSP123456789" />
              <SettingsInput label="Correo de Contacto" value="contacto@techstore.com" />
              <SettingsInput label="Teléfono de Soporte" value="+52 55 1234 5678" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Dirección Fiscal</label>
              <textarea 
                className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all h-24 resize-none"
                defaultValue="Av. Insurgentes Sur 123, Col. Roma Norte, CDMX, CP 06700"
              ></textarea>
            </div>
          </div>

          {/* Taxes & Currency */}
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-10 backdrop-blur-sm space-y-8">
            <div className="flex items-center gap-3">
              <Percent className="text-primary" size={24} />
              <h3 className="text-2xl font-bold text-white">Impuestos y Moneda</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Moneda Principal</label>
                <select className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all">
                  <option>MXN - Peso Mexicano</option>
                  <option>USD - Dólar Estadounidense</option>
                  <option>EUR - Euro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">IVA / Tax Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue="16"
                    className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
              <Info className="text-primary" size={20} />
              <p className="text-xs text-slate-400">Los cambios en los impuestos afectarán a todas las ventas nuevas procesadas en el POS.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsNavItem = ({ icon, label, active }: any) => (
  <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
    active ? 'bg-primary text-background-dark font-bold glow-shadow' : 'text-slate-400 hover:bg-primary/10 hover:text-primary'
  }`}>
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const SettingsInput = ({ label, value }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <input 
      type="text" 
      defaultValue={value}
      className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all"
    />
  </div>
);

export default SettingsScreen;
