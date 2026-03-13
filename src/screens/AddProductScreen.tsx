import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Save, X, Package, Tag, DollarSign, Layers, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AddProductScreenProps {
  onBack: () => void;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ onBack }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [productImage, setProductImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Laptops',
    description: '',
    price: '',
    stock: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save to local storage so it can be "persistent" for the session
      const newProduct = {
        ...formData,
        image: productImage,
        id: Date.now().toString()
      };
      const existingProducts = JSON.parse(localStorage.getItem('added_products') || '[]');
      localStorage.setItem('added_products', JSON.stringify([...existingProducts, newProduct]));

      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 1500);
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
        <h1 className="text-3xl font-black text-white tracking-tight">Nuevo <span className="text-primary">Producto</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 rounded-[40px] border border-primary/10 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Info size={20} />
                </div>
                Información General
              </h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Nombre del Producto</label>
                <div className="relative">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: MacBook Pro M3 Max" 
                    className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">SKU / Código</label>
                  <div className="relative">
                    <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <input 
                      type="text" 
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="TECH-001" 
                      className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Categoría</label>
                  <div className="relative">
                    <Layers className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary appearance-none transition-all font-bold"
                    >
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
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Descripción</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe las características principales..." 
                  className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 px-6 text-white focus:outline-none focus:border-primary transition-all h-40 resize-none placeholder:text-slate-600 font-bold"
                ></textarea>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/10 space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <DollarSign size={20} />
                </div>
                Precios e Inventario
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Precio de Venta</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-black">$</span>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00" 
                      className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Stock Inicial</label>
                  <input 
                    type="number" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0" 
                    className="w-full bg-background-dark/30 border border-primary/10 rounded-3xl py-5 px-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image Upload & Actions */}
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-[40px] border border-primary/10">
            <h3 className="text-lg font-black text-white mb-6">Imagen del Producto</h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square bg-background-dark/30 border-2 border-dashed border-primary/20 rounded-[32px] flex flex-col items-center justify-center p-6 text-center group hover:border-primary/50 transition-all cursor-pointer overflow-hidden relative"
            >
              {productImage ? (
                <img src={productImage} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <p className="text-sm font-black text-white">Subir Imagen</p>
                  <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">JPG, PNG o WEBP</p>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </div>
            
            <div className="mt-6 p-5 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-4">
              <div className="text-primary shrink-0">
                <Info size={20} />
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold">Se recomienda usar imágenes con fondo blanco o transparente para una mejor visualización.</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 glow-shadow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-6 h-6 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
              ) : (
                <Save size={20} />
              )}
              {isSaving ? 'Guardando...' : 'Guardar Producto'}
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full bg-background-dark border border-primary/10 text-slate-400 font-black py-5 rounded-2xl hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all uppercase tracking-widest text-xs"
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
