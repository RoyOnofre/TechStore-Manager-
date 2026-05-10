import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, UserCheck, UserMinus, Clock, Search, Filter,
  Plus, Edit2, Trash2, ToggleLeft, ToggleRight, X,
  ShieldCheck, Eye, EyeOff, RefreshCw, AlertTriangle,
  CheckCircle2, Loader2, Download
} from 'lucide-react';
import { api } from '../api';

// ─── Tipos locales ────────────────────────────────────
interface UsuarioAPI {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
  iniciales: string;
  avatar?: string;
  ultimo_login: string;
}

type ModalMode = 'crear' | 'editar' | 'eliminar' | 'reset' | null;

const ROL_COLORES: Record<string, string> = {
  admin:   'bg-violet-500/10 text-violet-400 border-violet-500/20',
  cajero:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cliente: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
};

// ─── Componente principal ─────────────────────────────
const UserManagementScreen: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [buscar, setBuscar] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Modal
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioAPI | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  // Formulario crear/editar
  const [form, setForm] = useState({ nombre: '', correo: '', rol: 'cajero', estado: 'Activo', contrasena: '', confirmar: '' });
  const [mostrarPass, setMostrarPass] = useState(false);
  const [resetCorreo, setResetCorreo] = useState('');
  const [resetNueva, setResetNueva] = useState('');

  // ── Cargar usuarios ──────────────────────────────────
  const cargarUsuarios = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getUsuarios({ buscar, rol: filtroRol, estado: filtroEstado });
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e.message || 'Error al conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  }, [buscar, filtroRol, filtroEstado]);

  useEffect(() => {
    const timer = setTimeout(() => cargarUsuarios(), 300);
    return () => clearTimeout(timer);
  }, [cargarUsuarios]);

  // ── Stats ────────────────────────────────────────────
  const total    = usuarios.length;
  const activos  = usuarios.filter(u => u.estado === 'Activo').length;
  const inactivos= usuarios.filter(u => u.estado === 'Inactivo').length;
  const admins   = usuarios.filter(u => u.rol === 'admin').length;

  const cerrarModal = () => { setModalMode(null); setUsuarioSeleccionado(null); };

  const handleToggleEstado = async (u: UsuarioAPI) => {
    try {
      await api.cambiarEstadoUsuario(u.id);
      cargarUsuarios();
    } catch (e: any) { setError(e.message); }
  };

  // ── Render ────────────────────────────────────────────
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">GESTIÓN DE <span className="text-primary">USUARIOS</span></h1>
          <p className="text-slate-400 font-medium">Administra accesos y roles vinculados a Supabase.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => api.descargarReporteUsuarios()}
            className="flex items-center gap-2 px-4 py-3 bg-surface-dark border border-primary/10 rounded-2xl text-sm font-bold text-slate-300 hover:text-primary transition-all"
          >
            <Download size={18} /> Exportar
          </button>
          <button
            onClick={() => setModalMode('crear')}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-2xl text-sm font-black glow-shadow hover:scale-105 transition-all"
          >
            <Plus size={18} /> Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-400" size={24}/>} label="Total" value={total} color="blue" />
        <StatCard icon={<UserCheck className="text-emerald-400" size={24}/>} label="Activos" value={activos} color="emerald" />
        <StatCard icon={<UserMinus className="text-rose-400" size={24}/>} label="Inactivos" value={inactivos} color="rose" />
        <StatCard icon={<ShieldCheck className="text-violet-400" size={24}/>} label="Admins" value={admins} color="violet" />
      </div>

      {/* Filtros */}
      <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-6 flex flex-col lg:flex-row gap-4 backdrop-blur-sm shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={buscar}
            onChange={e => setBuscar(e.target.value)}
            className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 text-white transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filtroRol}
            onChange={e => setFiltroRol(e.target.value)}
            className="bg-background-dark/50 border border-primary/10 rounded-2xl px-6 py-4 text-sm font-bold text-slate-300 outline-none focus:border-primary/50"
          >
            <option value="todos">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="cajero">Cajeros</option>
            <option value="cliente">Clientes</option>
          </select>
          <button onClick={cargarUsuarios} className="p-4 bg-background-dark/50 border border-primary/10 rounded-2xl text-slate-400 hover:text-primary transition-all">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Tabla Blindada */}
      <div className="bg-surface-dark/50 border border-primary/10 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
            <Loader2 className="animate-spin text-primary" size={48}/>
            <p className="font-black text-xl animate-pulse text-primary uppercase tracking-widest">Sincronizando Usuarios...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-dark/30 border-b border-primary/10">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Usuario</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Privilegios</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Estado</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actividad</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-slate-500 font-bold italic">No se encontraron registros vinculados.</td>
                  </tr>
                ) : (
                  usuarios.map(u => (
                    <tr key={u.id} className="hover:bg-primary/5 transition-all group border-b border-primary/5">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-lg">
                            {u?.iniciales || '??'}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white uppercase tracking-tight">{u?.nombre || 'N/A'}</p>
                            <p className="text-xs text-slate-500 font-medium">{u?.correo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${ROL_COLORES[u.rol] || 'border-slate-500/20 text-slate-400'}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${u.estado === 'Activo' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-rose-400/10 text-rose-400 border-rose-400/20'}`}>
                          {u.estado}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                          <Clock size={14} className="text-primary"/> {u?.ultimo_login || 'Nunca'}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggleEstado(u)} className="p-3 bg-background-dark/50 rounded-xl text-slate-500 hover:text-primary transition-all">
                            {u.estado === 'Activo' ? <ToggleRight size={20}/> : <ToggleLeft size={20}/>}
                          </button>
                          <button className="p-3 bg-background-dark/50 rounded-xl text-slate-500 hover:text-rose-500 transition-all">
                            <Trash2 size={20}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-surface-dark/50 border border-primary/10 p-6 rounded-[32px] backdrop-blur-sm group hover:border-primary/30 transition-all shadow-xl">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-background-dark rounded-[24px] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
      </div>
    </div>
  </div>
);

export default UserManagementScreen;
