import React, { useState, useEffect } from 'react';
import { 
  Store, CreditCard, Shield, Database, Bell, 
  Globe, Save, RefreshCw, CheckCircle2, AlertTriangle,
  Mail, Phone, MapPin, DollarSign, Percent, Lock, HardDrive, Loader2, Clock
} from 'lucide-react';
import { api } from '../api';

const SettingsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'tienda' | 'finanzas' | 'seguridad' | 'db'>('tienda');

  // Estado de configuración real
  const [config, setConfig] = useState<any>({
    tienda_nombre: '',
    tienda_nit: '',
    tienda_direccion: '',
    tienda_telefono: '',
    tienda_moneda: 'BOB',
    tienda_iva: '13',
    seguridad_sesion_tiempo: '60',
    db_backup_frecuencia: 'diaria'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const data = await api.getConfiguracion();
        // Mezclar con valores por defecto por si faltan claves
        setConfig((prev: any) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error al cargar config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await api.updateConfiguracionBulk(config);
      setSuccess(true);
      // Grito de aviso al sistema para actualización instantánea
      window.dispatchEvent(new Event('configUpdated'));
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (clave: string, valor: string) => {
    setConfig((prev: any) => ({ ...prev, [clave]: valor }));
  };

  if (loading) return (
    <div className="p-12 flex flex-col items-center justify-center h-full space-y-4">
      <Loader2 className="animate-spin text-primary" size={48} />
      <div className="text-primary font-black uppercase tracking-widest">Cargando Configuración Master...</div>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Configuración del <span className="text-primary">Sistema</span></h1>
          <p className="text-slate-400 font-bold">Panel de control administrativo de TechStore Pro.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark rounded-2xl text-sm font-black glow-shadow hover:scale-105 transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl text-emerald-400 font-bold flex items-center gap-2 animate-in zoom-in duration-300">
          <CheckCircle2 size={20} /> ¡Configuración actualizada y sincronizada con Supabase!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar de navegación interna */}
        <div className="lg:col-span-1 space-y-2">
          <TabButton active={activeTab === 'tienda'} onClick={() => setActiveTab('tienda')} icon={<Store size={20} />} label="Datos de la Tienda" />
          <TabButton active={activeTab === 'finanzas'} onClick={() => setActiveTab('finanzas')} icon={<CreditCard size={20} />} label="Impuestos y Moneda" />
          <TabButton active={activeTab === 'seguridad'} onClick={() => setActiveTab('seguridad')} icon={<Shield size={20} />} label="Seguridad y Roles" />
          <TabButton active={activeTab === 'db'} onClick={() => setActiveTab('db')} icon={<Database size={20} />} label="Base de Datos" />
          <TabButton active={false} onClick={() => {}} icon={<Bell size={20} />} label="Notificaciones" />
          <TabButton active={false} onClick={() => {}} icon={<Globe size={20} />} label="Integraciones" />
        </div>

        {/* Panel de Contenido */}
        <div className="lg:col-span-3">
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[40px] p-10 backdrop-blur-sm shadow-2xl min-h-[600px]">
            
            {activeTab === 'tienda' && (
              <div className="space-y-8">
                <SectionHeader icon={<Store size={24} />} title="Identidad de la Tienda" subtitle="Información que aparecerá en facturas y reportes." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ConfigInput label="Nombre de la Tienda" icon={<Store size={18}/>} value={config.tienda_nombre} onChange={(v) => handleChange('tienda_nombre', v)} />
                  <ConfigInput label="NIT / Registro Fiscal" icon={<Shield size={18}/>} value={config.tienda_nit} onChange={(v) => handleChange('tienda_nit', v)} />
                  <ConfigInput label="Teléfono de Contacto" icon={<Phone size={18}/>} value={config.tienda_telefono} onChange={(v) => handleChange('tienda_telefono', v)} />
                  <ConfigInput label="Dirección Física" icon={<MapPin size={18}/>} value={config.tienda_direccion} onChange={(v) => handleChange('tienda_direccion', v)} />
                </div>
              </div>
            )}

            {activeTab === 'finanzas' && (
              <div className="space-y-8">
                <SectionHeader icon={<CreditCard size={24} />} title="Impuestos y Moneda" subtitle="Configura el motor financiero de tus ventas." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Moneda del Sistema</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <select 
                        value={config.tienda_moneda}
                        onChange={(e) => handleChange('tienda_moneda', e.target.value)}
                        className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-6 text-white font-bold outline-none focus:border-primary/50 appearance-none"
                      >
                        <option value="BOB">BOB - Bolivianos</option>
                        <option value="USD">USD - Dólares Americanos</option>
                        <option value="MXN">MXN - Pesos Mexicanos</option>
                      </select>
                    </div>
                  </div>
                  <ConfigInput label="Impuesto IVA (%)" icon={<Percent size={18}/>} value={config.tienda_iva} onChange={(v) => handleChange('tienda_iva', v)} />
                </div>
              </div>
            )}

            {activeTab === 'seguridad' && (
              <div className="space-y-8">
                <SectionHeader icon={<Shield size={24} />} title="Seguridad y Sesiones" subtitle="Controla los tiempos de acceso y políticas de seguridad." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ConfigInput label="Tiempo de Sesión (Minutos)" icon={<Clock size={18}/>} value={config.seguridad_sesion_tiempo} onChange={(v) => handleChange('seguridad_sesion_tiempo', v)} />
                  <div className="p-6 bg-background-dark/30 border border-primary/10 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Autenticación 2FA</p>
                      <p className="text-xs text-slate-500">Requerir código extra para admins.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-not-allowed opacity-50">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'db' && (
              <div className="space-y-8">
                <SectionHeader icon={<Database size={24} />} title="Base de Datos y Backups" subtitle="Gestión de integridad y copias de seguridad." />
                <div className="space-y-6">
                  <div className="p-8 bg-background-dark/50 border border-primary/10 rounded-[32px] flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                        <HardDrive size={32} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white uppercase tracking-tight">Supabase Cloud Connection</p>
                        <p className="text-sm text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 size={14} /> Conectado - Latencia: 45ms
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-surface-dark border border-primary/20 rounded-2xl text-xs font-black text-slate-300 uppercase tracking-widest hover:text-primary transition-all">
                      Test Connection
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-componentes Master
const TabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
      active 
        ? 'bg-primary text-background-dark font-black glow-shadow' 
        : 'text-slate-400 hover:bg-primary/10 hover:text-primary font-bold'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const SectionHeader = ({ icon, title, subtitle }: any) => (
  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-primary/10">
    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
      {icon}
    </div>
    <div>
      <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
      <p className="text-slate-500 font-medium">{subtitle}</p>
    </div>
  </div>
);

const ConfigInput = ({ label, icon, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
        {icon}
      </div>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-6 text-white font-bold outline-none focus:border-primary/50 transition-all"
      />
    </div>
  </div>
);

export default SettingsScreen;
