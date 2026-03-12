import React from 'react';
import { Users, UserCheck, UserMinus, Clock, MoreVertical, Search, Filter, Download } from 'lucide-react';
import { MOCK_USERS } from '../constants';

const UserManagementScreen: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
          <p className="text-slate-400">Administra los accesos y roles de tu equipo</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-primary/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-background-dark rounded-xl text-sm font-bold glow-shadow hover:scale-105 transition-all">
            + Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-400" />} label="Total Usuarios" value="124" trend="+12%" />
        <StatCard icon={<UserCheck className="text-emerald-400" />} label="Activos" value="98" trend="+5%" />
        <StatCard icon={<UserMinus className="text-rose-400" />} label="Inactivos" value="12" trend="-2%" />
        <StatCard icon={<Clock className="text-amber-400" />} label="Pendientes" value="14" trend="+3" />
      </div>

      {/* Table Section */}
      <div className="bg-surface-dark/50 border border-primary/10 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o email..." 
                className="bg-background-dark/50 border border-primary/10 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-primary/50 text-sm"
              />
            </div>
            <button className="p-2 bg-background-dark/50 border border-primary/10 rounded-xl text-slate-400 hover:text-primary transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Filtrar por:</span>
            <select className="bg-background-dark/50 border border-primary/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none">
              <option>Todos los roles</option>
              <option>Manager</option>
              <option>Vendedor</option>
              <option>Soporte</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-dark/30">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Última Conexión</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'Activo' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                      user.status === 'Inactivo' ? 'bg-rose-400/10 text-rose-400 border border-rose-400/20' :
                      'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-primary/10 flex items-center justify-between">
          <p className="text-sm text-slate-500">Mostrando 4 de 124 usuarios</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-background-dark/50 border border-primary/10 rounded-xl text-sm text-slate-400 hover:text-primary disabled:opacity-50" disabled>Anterior</button>
            <button className="px-4 py-2 bg-primary text-background-dark rounded-xl text-sm font-bold">1</button>
            <button className="px-4 py-2 bg-background-dark/50 border border-primary/10 rounded-xl text-sm text-slate-400 hover:text-primary">2</button>
            <button className="px-4 py-2 bg-background-dark/50 border border-primary/10 rounded-xl text-sm text-slate-400 hover:text-primary">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend }) => (
  <div className="bg-surface-dark/50 border border-primary/10 p-6 rounded-3xl backdrop-blur-sm hover:border-primary/30 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-background-dark rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend}
      </span>
    </div>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
  </div>
);

export default UserManagementScreen;
