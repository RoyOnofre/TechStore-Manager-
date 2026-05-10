import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, Calendar, ShoppingBag, CreditCard, User, TrendingUp, Loader2 } from 'lucide-react';
import { UserRole } from '../types';
import { api } from '../api';

interface SalesHistoryScreenProps {
  userRole: UserRole;
}

const SalesHistoryScreen: React.FC<SalesHistoryScreenProps> = ({ userRole }) => {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ count: 0, revenue: 0 });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const data = await api.getVentas();
        
        if (!Array.isArray(data)) {
          setSales([]);
          return;
        }

        // Mapeo ultra-seguro (Blindado)
        const formatted = data.map((v: any) => ({
          id: v?.id || 'N/A',
          date: v?.fecha || 'Fecha desconocida',
          customer: v?.vendedor || 'Vendedor/Cliente',
          items: v?.items || 0,
          total: Number(v?.total) || 0,
          paymentMethod: 'Efectivo',
          status: v?.estado || 'Completada'
        }));

        setSales(formatted);

        const revenue = formatted.reduce((sum: number, s: any) => sum + s.total, 0);
        setTotals({ count: formatted.length, revenue });

      } catch (error) {
        console.error("Error crítico en historial:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [userRole]);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <div className="text-primary font-black text-xl animate-pulse">SINCRONIZANDO CON SUPABASE...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">{userRole === 'cliente' ? 'MIS COMPRAS' : 'HISTORIAL DE VENTAS'}</h1>
          <p className="text-slate-400 font-medium">Auditoría en tiempo real de transacciones tecnológicas.</p>
        </div>
        {userRole !== 'cliente' && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-surface-dark border border-primary/10 rounded-2xl text-sm font-bold text-slate-300 hover:text-primary transition-all">
              <Download size={18} /> Exportar
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark rounded-2xl text-sm font-black glow-shadow hover:scale-105 transition-all">
              <Calendar size={18} /> Filtrar
            </button>
          </div>
        )}
      </div>

      {/* Stats - Protegidos contra NaN */}
      {userRole !== 'cliente' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SaleStatCard label="Ventas" value={totals.count} trend="+12%" icon={<ShoppingBag size={20} />} />
          <SaleStatCard label="Ingresos" value={`$${totals.revenue.toLocaleString()}`} trend="+15%" icon={<CreditCard size={20} />} />
          <SaleStatCard label="Promedio" value={`$${(totals.revenue / (totals.count || 1)).toFixed(2)}`} trend="+3%" icon={<TrendingUp size={20} />} />
          <SaleStatCard label="Estado" value="ONLINE" trend="100%" icon={<User size={20} />} />
        </div>
      )}

      {/* Table Section */}
      <div className="bg-surface-dark/50 border border-primary/10 rounded-[40px] overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="p-8 border-b border-primary/10">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por ID o vendedor..." 
              className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 text-sm font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background-dark/30 border-b border-primary/5">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ID Transacción</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Fecha y Hora</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Usuario</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Total</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Estado</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-500 font-bold italic">No se han encontrado registros en la base de datos.</td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-primary/5 transition-all group">
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono text-primary font-black bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                        {String(sale.id).substring(0, 8)}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-400 font-bold">{sale.date}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-white">{sale.customer}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-lg font-black text-white">${sale.total.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        sale.status === 'COMPLETADA' || sale.status === 'Completada' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' :
                        'bg-amber-400/10 text-amber-400 border-amber-400/20'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="p-3 bg-background-dark/50 rounded-xl text-slate-500 hover:text-primary hover:scale-110 transition-all">
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SaleStatCard = ({ label, value, trend, icon }: any) => (
  <div className="bg-surface-dark/50 border border-primary/10 p-6 rounded-[32px] backdrop-blur-sm hover:border-primary/30 transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-background-dark rounded-2xl text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-xs font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">{trend}</span>
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
    <h3 className="text-3xl font-black text-white mt-2">{value}</h3>
  </div>
);

export default SalesHistoryScreen;
