import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Package, AlertTriangle, Calendar, Download, ChevronRight } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const SALES_DATA = [
  { name: 'Lun', sales: 4000 },
  { name: 'Mar', sales: 3000 },
  { name: 'Mie', sales: 2000 },
  { name: 'Jue', sales: 2780 },
  { name: 'Vie', sales: 1890 },
  { name: 'Sab', sales: 2390 },
  { name: 'Dom', sales: 3490 },
];

const CATEGORY_DATA = [
  { name: 'Laptops', value: 400, color: '#0df2eb' },
  { name: 'Phones', value: 300, color: '#3b82f6' },
  { name: 'Audio', value: 300, color: '#8b5cf6' },
  { name: 'Accesorios', value: 200, color: '#f43f5e' },
];

const ReportsScreen: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Análisis y Reportes</h1>
          <p className="text-slate-400">Visión estratégica de tu negocio</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-primary/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
            <Calendar size={18} />
            Últimos 30 días
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark rounded-xl text-sm font-bold glow-shadow hover:scale-105 transition-all">
            <Download size={18} />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportMetricCard 
          label="Ingresos Totales" 
          value="$128,450.00" 
          trend="+14.5%" 
          isPositive={true} 
          icon={<TrendingUp size={20} />} 
        />
        <ReportMetricCard 
          label="Órdenes Procesadas" 
          value="842" 
          trend="+8.2%" 
          isPositive={true} 
          icon={<Package size={20} />} 
        />
        <ReportMetricCard 
          label="Tasa de Conversión" 
          value="3.2%" 
          trend="-0.4%" 
          isPositive={false} 
          icon={<TrendingDown size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Rendimiento de Ventas</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs text-slate-400">Ventas actuales</span>
              </div>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0df2eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0df2eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2e2e" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a2e2e', 
                    border: '1px solid rgba(13, 242, 235, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#0df2eb' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#0df2eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm flex flex-col">
          <h3 className="text-xl font-bold text-white mb-8">Ventas por Categoría</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a2e2e', 
                      border: '1px solid rgba(13, 242, 235, 0.2)',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-6">
              {CATEGORY_DATA.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm text-slate-400">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{cat.value} uds</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Critical Alerts */}
        <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="text-amber-400" size={24} />
            <h3 className="text-xl font-bold text-white">Alertas de Inventario Crítico</h3>
          </div>
          <div className="space-y-4">
            <AlertItem 
              product="iPhone 15 Pro" 
              status="Stock Bajo" 
              qty="2 uds" 
              color="text-amber-400" 
              bg="bg-amber-400/10" 
            />
            <AlertItem 
              product="Dell UltraSharp 40" 
              status="Agotado" 
              qty="0 uds" 
              color="text-rose-500" 
              bg="bg-rose-500/10" 
            />
            <AlertItem 
              product="Logitech G Pro" 
              status="Stock Bajo" 
              qty="5 uds" 
              color="text-amber-400" 
              bg="bg-amber-400/10" 
            />
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-primary" size={24} />
            <h3 className="text-xl font-bold text-white">Productos Más Vendidos</h3>
          </div>
          <div className="space-y-6">
            <TopProductItem name="MacBook Pro M3" sales="124" growth="+12%" />
            <TopProductItem name="iPad Air M2" sales="98" growth="+5%" />
            <TopProductItem name="Sony WH-1000XM5" sales="76" growth="+18%" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportMetricCard = ({ label, value, trend, isPositive, icon }: any) => (
  <div className="bg-surface-dark/50 border border-primary/10 p-8 rounded-[32px] backdrop-blur-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-background-dark rounded-2xl text-primary">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
        {trend}
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{label}</p>
    <h3 className="text-3xl font-black text-white mt-1">{value}</h3>
  </div>
);

const AlertItem = ({ product, status, qty, color, bg }: any) => (
  <div className={`flex items-center justify-between p-4 ${bg} border border-white/5 rounded-2xl`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-white/5`}>
        <Package size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{product}</p>
        <p className={`text-xs font-bold ${color}`}>{status}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-black text-white">{qty}</p>
      <button className="text-[10px] font-bold text-primary uppercase hover:underline flex items-center gap-1">
        Reordenar <ChevronRight size={10} />
      </button>
    </div>
  </div>
);

const TopProductItem = ({ name, sales, growth }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-background-dark border border-primary/10 flex items-center justify-center text-primary">
        <Package size={24} />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{name}</p>
        <p className="text-xs text-slate-500">{sales} ventas este mes</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-emerald-400">{growth}</p>
      <div className="w-24 h-1.5 bg-background-dark rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-primary" style={{ width: growth.replace('+', '') }}></div>
      </div>
    </div>
  </div>
);

export default ReportsScreen;
