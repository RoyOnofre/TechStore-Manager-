import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Trash2, History, Plus, Minus, Save, Package, Info, BarChart } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import { api } from '../api';

interface ProductDetailScreenProps {
  productId: string;
  userRole: UserRole;
  onBack: () => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ productId, userRole, onBack }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stockAdjustment, setStockAdjustment] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await api.getProductos();
        const found = products.find((p: any) => p.id === productId);
        setProduct(found);
      } catch (error) {
        console.error("Error cargando detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleUpdateStock = async () => {
    if (stockAdjustment === 0) return;
    try {
      await api.reordenarStock(productId, stockAdjustment);
      setProduct({ ...product, stock: (product.stock || 0) + stockAdjustment });
      setStockAdjustment(0);
      alert("¡Inventario actualizado con éxito!");
    } catch (error) {
      alert("Error al actualizar inventario");
    }
  };

  const isClient = userRole === 'cliente';

  if (loading) return <div className="p-8 flex items-center justify-center h-full"><div className="text-primary font-bold">Cargando detalles master...</div></div>;
  if (!product) return <div className="p-8 text-center text-white">Producto no encontrado</div>;

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
                  src={product.imagen || product.image || 'https://via.placeholder.com/600'} 
                  alt={product.nombre || product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {product.categoria || product.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{product.sku}</span>
                  </div>
                  <h1 className="text-4xl font-black text-white leading-tight">{product.nombre || product.name}</h1>
                  <p className="text-slate-400 mt-4 text-lg leading-relaxed">
                    {product.descripcion || 'Potente dispositivo de última generación diseñado para profesionales que buscan el máximo rendimiento y portabilidad.'}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Precio Unitario</p>
                    <p className="text-3xl font-black text-white">${(product.precio || product.price || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-background-dark/50 border border-primary/10 rounded-3xl">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Disponibilidad</p>
                    <p className={`text-3xl font-black ${(product.stock || 0) <= 10 ? 'text-amber-400' : 'text-primary'}`}>{product.stock > 0 ? 'En Stock' : 'Agotado'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      onClick={() => setStockAdjustment(stockAdjustment - 1)}
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

                <button 
                  onClick={handleUpdateStock}
                  className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 glow-shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Save size={20} />
                  Guardar Ajuste
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
