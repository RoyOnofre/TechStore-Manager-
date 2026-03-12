import React from 'react';
import { Package, AlertTriangle, TrendingUp, DollarSign, Search, Filter, MoreHorizontal, Eye } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

interface InventoryScreenProps {
  onSelectProduct: (id: string) => void;
  onAddProduct: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ onSelectProduct, onAddProduct }) => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventario de Productos</h1>
          <p className="text-slate-400">Control total de stock y disponibilidad</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onAddProduct}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-2xl text-sm font-bold glow-shadow hover:scale-105 transition-all"
          >
            + Agregar Producto
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InventoryStatCard icon={<Package className="text-blue-400" />} label="Total SKUs" value="1,240" />
        <InventoryStatCard icon={<AlertTriangle className="text-amber-400" />} label="Stock Bajo" value="18" />
        <InventoryStatCard icon={<TrendingUp className="text-emerald-400" />} label="Valor Inventario" value="$245,800" />
        <InventoryStatCard icon={<DollarSign className="text-primary" />} label="Ventas Hoy" value="$12,450" />
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-dark/50 border border-primary/10 p-4 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              className="bg-background-dark/50 border border-primary/10 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-primary/50 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-background-dark/50 border border-primary/10 rounded-xl text-sm text-slate-300 hover:text-primary transition-colors">
            <Filter size={18} />
            Filtros
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Categoría:</span>
            <select className="bg-background-dark/50 border border-primary/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none">
              <option>Todas</option>
              <option>Laptops</option>
              <option>Smartphones</option>
              <option>Audio</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Estado:</span>
            <select className="bg-background-dark/50 border border-primary/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none">
              <option>Todos</option>
              <option>Disponible</option>
              <option>Stock Bajo</option>
              <option>Agotado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="bg-surface-dark/50 border border-primary/10 rounded-3xl overflow-hidden group hover:border-primary/40 transition-all backdrop-blur-sm flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                  product.status === 'In Stock' ? 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30' :
                  product.status === 'Low Stock' ? 'bg-amber-400/20 text-amber-400 border-amber-400/30' :
                  'bg-rose-400/20 text-rose-400 border-rose-400/30'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-primary font-medium uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-lg font-bold text-white mt-1">{product.name}</h3>
                </div>
                <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <p className="text-xs text-slate-500 font-mono">SKU: {product.sku}</p>
              
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Precio</p>
                  <p className="text-xl font-black text-white">${product.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Stock</p>
                  <p className={`text-xl font-black ${product.stock <= 10 ? 'text-amber-400' : 'text-white'}`}>{product.stock}</p>
                </div>
              </div>

              <button 
                onClick={() => onSelectProduct(product.id)}
                className="w-full mt-6 py-3 bg-background-dark border border-primary/20 rounded-2xl text-sm font-bold text-primary hover:bg-primary hover:text-background-dark transition-all flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InventoryStatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-surface-dark/50 border border-primary/10 p-6 rounded-3xl backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-background-dark rounded-2xl">
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-black text-white">{value}</h3>
      </div>
    </div>
  </div>
);

export default InventoryScreen;
