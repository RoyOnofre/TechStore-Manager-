import React from 'react';
import { Search, Filter, Download, MoreVertical, Eye, Calendar, ShoppingBag, CreditCard, User, TrendingUp } from 'lucide-react';
import { MOCK_SALES } from '../constants';
import { UserRole } from '../types';

interface SalesHistoryScreenProps {
  userRole: UserRole;
}

const SalesHistoryScreen: React.FC<SalesHistoryScreenProps> = ({ userRole }) => {
  // Filter sales if user is a client (simulation)
  const filteredSales = userRole === 'cliente' 
    ? MOCK_SALES.filter(s => s.customer === 'Alejandro Moreno') // Assuming the logged in user is Alejandro
    : MOCK_SALES;

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{userRole === 'cliente' ? 'Mis Compras' : 'Historial de Ventas'}</h1>
          <p className="text-slate-400">
            {userRole === 'cliente' ? 'Consulta el detalle de tus adquisiciones tecnológicas' : 'Auditoría detallada de todas las transacciones'}
          </p>
        </div>
        {userRole !== 'cliente' && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-primary/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
              <Download size={18} />
              Exportar Reporte
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-background-dark rounded-xl text-sm font-bold glow-shadow hover:scale-105 transition-all">
              <Calendar size={18} />
              Filtrar Fecha
            </button>
          </div>
        )}
      </div>

      {/* Summary Stats - Only for staff */}
      {userRole !== 'cliente' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SaleStatCard label="Ventas Totales" value="1,245" trend="+12%" icon={<ShoppingBag size={20} />} />
          <SaleStatCard label="Ingresos" value="$245,800" trend="+15%" icon={<CreditCard size={20} />} />
          <SaleStatCard label="Ticket Promedio" value="$197.42" trend="+3%" icon={<TrendingUp size={20} />} />
          <SaleStatCard label="Clientes Nuevos" value="42" trend="+8%" icon={<User size={20} />} />
        </div>
      )}

      {/* Table Section */}
      <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por ID, producto..." 
                className="bg-background-dark/50 border border-primary/10 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-primary/50 text-sm"
              />
            </div>
            <button className="p-2 bg-background-dark/50 border border-primary/10 rounded-xl text-slate-400 hover:text-primary transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Estado:</span>
            <select className="bg-background-dark/50 border border-primary/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none">
              <option>Todos</option>
              <option>Completada</option>
              <option>Cancelada</option>
              <option>Reembolsada</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-dark/30">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Venta</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                {userRole !== 'cliente' && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pago</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-primary font-bold">{sale.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {sale.date}
                  </td>
                  {userRole !== 'cliente' && (
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-white">{sale.customer}</p>
                    </td>
                  )}
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {sale.items}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-white">${sale.total.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <CreditCard size={14} className="text-primary" />
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      sale.status === 'Completada' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                      sale.status === 'Cancelada' ? 'bg-rose-400/10 text-rose-400 border border-rose-400/20' :
                      'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SaleStatCard = ({ label, value, trend, icon }: any) => (
  <div className="bg-surface-dark/50 border border-primary/10 p-6 rounded-[32px] backdrop-blur-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-background-dark rounded-2xl text-primary">
        {icon}
      </div>
      <span className="text-xs font-bold text-emerald-400">{trend}</span>
    </div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
  </div>
);

export default SalesHistoryScreen;
