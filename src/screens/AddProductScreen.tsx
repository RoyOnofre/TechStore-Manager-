import React, { useState } from 'react';
import { ArrowLeft, Upload, Save, X, Package, Tag, DollarSign, Layers, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AddProductScreenProps {
  onBack: () => void;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ onBack }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto glow-shadow">
            <CheckCircle2 className="text-background-dark" size={48} />
          </div>
          <h2 className="text-4xl font-black text-white">¡Producto Agregado!</h2>
          <p className="text-slate-400 text-lg">El inventario se ha actualizado correctamente.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          Cancelar y volver
        </button>
        <h1 className="text-3xl font-bold text-white">Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Info className="text-primary" size={20} />
                Información General
              </h3>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre del Producto</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input 
                    type="text" 
                    placeholder="Ej: MacBook Pro M3 Max" 
                    className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">SKU / Código</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <input 
                      type="text" 
                      placeholder="TECH-001" 
                      className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Categoría</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <select className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary appearance-none transition-all">
                      <option>Laptops</option>
                      <option>Smartphones</option>
                      <option>Accesorios</option>
                      <option>Audio</option>
                      <option>Monitores</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Descripción</label>
                <textarea 
                  placeholder="Describe las características principales..." 
                  className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all h-32 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/10 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="text-primary" size={20} />
                Precios e Inventario
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Precio de Venta</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Stock Inicial</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full bg-background-dark/50 border border-primary/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image Upload & Actions */}
        <div className="space-y-6">
          <div className="bg-surface-dark/50 border border-primary/10 rounded-[32px] p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6">Imagen del Producto</h3>
            <div className="aspect-square bg-background-dark/50 border-2 border-dashed border-primary/20 rounded-3xl flex flex-col items-center justify-center p-6 text-center group hover:border-primary/50 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="text-primary" size={32} />
              </div>
              <p className="text-sm font-bold text-white">Subir Imagen</p>
              <p className="text-xs text-slate-500 mt-2">JPG, PNG o WEBP (Máx. 5MB)</p>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-3">
              <Info className="text-primary" size={18} />
              <p className="text-[10px] text-slate-400 leading-tight">Se recomienda usar imágenes con fondo blanco o transparente para una mejor visualización.</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              type="submit"
              className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 glow-shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Save size={20} />
              Guardar Producto
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full bg-background-dark border border-primary/10 text-slate-400 font-bold py-5 rounded-2xl hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all"
            >
              Descartar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductScreen;
