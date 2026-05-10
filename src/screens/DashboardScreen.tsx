import React, { useState, useEffect } from 'react';
import {
  TrendingUp, ShoppingCart, Users, Package,
  ArrowUpRight, ArrowDownRight, Clock, AlertTriangle,
  RefreshCw, DollarSign,
  CheckCircle2
} from 'lucide-react';
import { api } from '../api';

interface DashboardScreenProps {
  userRole: string;
  onNavigate: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ userRole, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await api.getProductos();
        const products = Array.isArray(data) ? data : [];
        const critical = products.filter((p: any) => (p.stock || 0) < 10);
        setLowStockProducts(critical.slice(0, 3));
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleReorder = async (productId: string) => {
    try {
      await api.reordenarStock(productId, 50);
      alert("¡Reordenado con éxito!");
      const data = await api.getProductos();
      const products = Array.isArray(data) ? data : [];
      setLowStockProducts(products.filter((p: any) => (p.stock || 0) < 10).slice(0, 3));
    } catch (error) {
      alert("Error al reordenar stock");
    }
  };

  if (loading) return (
    <div className="p-12 flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <div className="text-primary font-black uppercase tracking-widest animate-pulse">Sincronizando Operaciones...</div>
    </div>
  );

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Centro de <span className="text-primary">Mando</span></h1>
          <p className="text-slate-400 mt-2 font-bold tracking-widest text-xs uppercase opacity-70">Operaciones en tiempo real / Supabase Cloud</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-primary text-background-dark rounded-[24px] text-sm font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group">
          <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={20} /> ACTUALIZAR DATOS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Ventas Hoy" value="$12,450" trend="+12.5%" icon={<DollarSign size={28} />} color="primary" />
        <StatCard title="Órdenes" value="48" trend="+8.2%" icon={<ShoppingCart size={28} />} color="blue" />
        <StatCard title="Clientes" value="1,240" trend="+2.4%" icon={<Users size={28} />} color="purple" />
        <StatCard title="Inventario" value="845" trend="-1.2%" icon={<Package size={28} />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-panel p-10 rounded-[48px] border border-primary/10 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Rendimiento <span className="text-primary">Master</span></h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">En Vivo</span>
            </div>
          </div>
          <div className="h-[350px] flex flex-col items-center justify-center border-4 border-dashed border-primary/5 rounded-[32px] bg-background-dark/30 group-hover:border-primary/20 transition-colors duration-500">
            <TrendingUp className="text-primary/10 mb-4" size={100} />
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Gráfico de Tendencias de Mercado</p>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[48px] border border-primary/10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter text-rose-500">Alertas</h3>
            <AlertTriangle className="text-rose-500 animate-pulse" size={28} />
          </div>
          <div className="space-y-4 flex-1">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((p) => (
                <div key={p.id} className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-3xl hover:bg-rose-500/10 transition-colors group">
                  <p className="text-md font-black text-white mb-3 uppercase tracking-tighter">{p.nombre || p.name}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span className="text-xs font-bold text-rose-400">STOCK: {p.stock}</span>
                    </div>
                    <button onClick={() => handleReorder(p.id)} className="px-4 py-2 bg-background-dark border border-primary/20 text-primary text-[10px] font-black rounded-xl hover:bg-primary hover:text-background-dark transition-all">REORDENAR</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
                <CheckCircle2 size={64} className="mb-4 text-primary" />
                <p className="font-black uppercase tracking-widest text-[10px]">Sin alertas de stock</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, color }: any) => {
  const isUp = trend.startsWith('+');
  const colorClass = color === 'primary' ? 'text-primary' : color === 'blue' ? 'text-blue-400' : color === 'purple' ? 'text-purple-400' : 'text-orange-400';
  const bgClass = color === 'primary' ? 'bg-primary/10' : color === 'blue' ? 'bg-blue-400/10' : color === 'purple' ? 'bg-purple-400/10' : 'bg-orange-400/10';

  return (
    <div className="glass-panel p-8 rounded-[40px] border border-primary/10 relative overflow-hidden group hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-default shadow-xl">
      <div className="flex items-center justify-between relative z-10 mb-8">
        <div className={`p-4 rounded-2xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform duration-500`}>{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-black ${isUp ? 'text-emerald-400' : 'text-rose-400'} bg-black/30 px-3 py-1.5 rounded-full`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-4xl font-black text-white tracking-tighter">{value}</h3>
      </div>
      <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${bgClass} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
    </div>
  );
};

export default DashboardScreen;
