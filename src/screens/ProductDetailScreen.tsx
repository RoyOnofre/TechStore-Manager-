import React, { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, History, Plus, Minus, Save, Package, Info, BarChart } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_MOVEMENTS } from '../constants';
import { motion } from 'motion/react';
import { UserRole } from '../types';

interface ProductDetailScreenProps {
  productId: string;
  userRole: UserRole;
  onBack: () => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ productId, userRole, onBack }) => {
  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
  const [stockAdjustment, setStockAdjustment] = useState(0);

  const isClient = userRole === 'cliente';

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          {isClient ? 'Volver al catálogo' : 'Volver al inventario'}
        </button>
        {!isClient && (
          <div className="flex items-center gap-3">
            <button className="p-3 bg-surface-dark border border-primary/10 rounded-2xl text-slate-300 hover:text-primary transition-all">
              <Edit3 size={20} />
            </button>
            <button className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 ${isClient ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
        {/* Left Column: Image and Main Info */}
        <div className={`${isClient ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-8`}>
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[40px] p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden border border-primary/10">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{product.sku}</span>
                  </div>
                  <h1 className="text-4xl font-black text-white leading-tight">{product.name}</h1>
                  <p className="text-slate-400 mt-4 text-lg leading-relaxed">
                    Potente dispositivo de última generación diseñado para profesionales que buscan el máximo rendimiento y portabilidad.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Precio Unitario</p>
                    <p className="text-3xl font-black text-white">${product.price.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Disponibilidad</p>
                    <p className={`text-3xl font-black ${product.stock <= 10 ? 'text-amber-400' : 'text-primary'}`}>{product.stock > 0 ? 'En Stock' : 'Agotado'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isClient && (
            /* Movements History */
            <div className="bg-surface-dark/50 border border-primary/10 rounded-[40px] p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <History className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold text-white">Historial de Movimientos</h2>
                </div>
                <button className="text-sm text-primary font-bold hover:underline">Ver todo el historial</button>
              </div>

              <div className="space-y-4">
                {MOCK_MOVEMENTS.map((move) => (
                  <div key={move.id} className="flex items-center justify-between p-5 bg-background-dark/30 border border-primary/5 rounded-2xl hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        move.type === 'ENTRADA' ? 'bg-emerald-400/10 text-emerald-400' :
                        move.type === 'SALIDA' ? 'bg-rose-400/10 text-rose-400' :
                        'bg-amber-400/10 text-amber-400'
                      }`}>
                        {move.type === 'ENTRADA' ? <Plus size={20} /> : move.type === 'SALIDA' ? <Minus size={20} /> : <Edit3 size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{move.type}</span>
                          <span className="text-xs text-slate-500">• {move.date}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{move.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-black ${
                        move.type === 'ENTRADA' ? 'text-emerald-400' :
                        move.type === 'SALIDA' ? 'text-rose-400' :
                        'text-amber-400'
                      }`}>
                        {move.type === 'ENTRADA' ? '+' : '-'}{move.quantity}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{move.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isClient && (
          /* Right Column: Quick Actions */
          <div className="space-y-8">
            <div className="bg-surface-dark/50 border border-primary/10 rounded-[40px] p-8 backdrop-blur-sm sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-8">Ajuste de Stock</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl text-center">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">Cantidad a ajustar</p>
                  <div className="flex items-center justify-center gap-6">
                    <button 
                      onClick={() => setStockAdjustment(Math.max(-product.stock, stockAdjustment - 1))}
                      className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-all"
                    >
                      <Minus size={24} />
                    </button>
                    <span className="text-5xl font-black text-white w-20">{stockAdjustment > 0 ? `+${stockAdjustment}` : stockAdjustment}</span>
                    <button 
                      onClick={() => setStockAdjustment(stockAdjustment + 1)}
                      className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-background-dark transition-all"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Motivo del ajuste</label>
                  <select className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all">
                    <option>Entrada por Compra</option>
                    <option>Salida por Venta</option>
                    <option>Devolución Cliente</option>
                    <option>Ajuste por Daño</option>
                    <option>Inventario Físico</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Notas adicionales</label>
                  <textarea 
                    placeholder="Escribe una breve descripción..."
                    className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all h-24 resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 glow-shadow hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Save size={20} />
                  Guardar Cambios
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-primary/10 grid grid-cols-2 gap-4">
                <QuickAction icon={<BarChart size={20} />} label="Analíticas" />
                <QuickAction icon={<Package size={20} />} label="Etiquetas" />
                <QuickAction icon={<Info size={20} />} label="Ficha Técnica" />
                <QuickAction icon={<Plus size={20} />} label="Duplicar" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex flex-col items-center gap-2 p-4 bg-background-dark/30 border border-primary/5 rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
    <div className="text-slate-500 group-hover:text-primary transition-colors">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
  </button>
);

export default ProductDetailScreen;
