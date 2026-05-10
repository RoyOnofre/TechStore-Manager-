import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Save, X, Package, Tag, DollarSign, Layers, Info, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { api } from '../api';

interface AddProductScreenProps {
  onBack: () => void;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ onBack }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
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
    if (error) setError(''); // Limpiar error al escribir
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    
    try {
      await api.crearProducto({
        nombre: formData.name,
        sku: formData.sku,
        categoria: formData.category,
        precio: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        imagen: productImage || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
        estado: 'En Stock'
      });
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err: any) {
      console.error("Error al guardar:", err);
      setError(err.message || "Hubo un problema al conectar con Supabase. Verifica tu conexión.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto glow-shadow shadow-primary/40">
          <CheckCircle2 className="text-background-dark" size={48} />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">¡Producto Agregado!</h2>
        <p className="text-slate-400 text-lg font-medium">El inventario se ha sincronizado con la nube exitosamente.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Cancelar y volver
        </button>
        <h1 className="text-3xl font-black text-white tracking-tight">NUEVO <span className="text-primary">PRODUCTO</span></h1>
      </div>

      {error && (
        <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-[24px] text-rose-400 flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="p-2 bg-rose-500/20 rounded-xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-wider">Error de Sincronización</p>
            <p className="text-xs opacity-80 font-bold">{error}</p>
          </div>
          <button onClick={() => setError('')} className="ml-auto p-2 hover:bg-rose-500/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-dark/50 border border-primary/10 p-8 rounded-[40px] space-y-8 backdrop-blur-sm shadow-2xl">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Info size={20} />
                </div>
                Información del Producto
              </h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Comercial</label>
                <div className="relative">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: Laptop Gamer Razer Blade" 
                    className="w-full bg-background-dark/50 border border-primary/10 rounded-[24px] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">SKU / Código Único</label>
                  <div className="relative">
                    <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <input 
                      type="text" 
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="TECH-999-PRO" 
                      className="w-full bg-background-dark/50 border border-primary/10 rounded-[24px] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold placeholder:text-slate-700"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoría</label>
                  <div className="relative">
                    <Layers className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-background-dark/50 border border-primary/10 rounded-[24px] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-primary appearance-none transition-all font-bold"
                    >
                      <option>Laptops</option>
                      <option>Smartphones</option>
                      <option>Accesorios</option>
                      <option>Componentes</option>
                      <option>Consolas</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Especificaciones Técnicas</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detalla procesador, RAM, almacenamiento..." 
                  className="w-full bg-background-dark/50 border border-primary/10 rounded-[24px] py-5 px-6 text-white focus:outline-none focus:border-primary transition-all h-32 resize-none placeholder:text-slate-700 font-bold"
                ></textarea>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/10 space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <DollarSign size={20} />
                </div>
                Valores Financieros
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Precio Unitario</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-black">$</span>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00" 
                      className="w-full bg-background-dark/50 border border-primary/10 rounded-[24px] py-5 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-all font-bold"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Unidades Iniciales</label>
                  <input 
                    type="number" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0" 
                    className="w-full bg-background-dark/50 border border-primary/10 rounded-[24px] py-5 px-6 text-white focus:outline-none focus:border-primary transition-all font-bold"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
          <div className="bg-surface-dark/50 border border-primary/10 p-8 rounded-[40px] shadow-xl backdrop-blur-sm">
            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tighter">Imagen Principal</h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square bg-background-dark/50 border-2 border-dashed border-primary/20 rounded-[32px] flex flex-col items-center justify-center p-6 text-center group hover:border-primary/50 transition-all cursor-pointer overflow-hidden relative shadow-inner"
            >
              {productImage ? (
                <img src={productImage} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <p className="text-sm font-black text-white uppercase tracking-tight">Cargar Foto</p>
                  <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase tracking-widest">Dimensiones sugeridas: 800x800</p>
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
          </div>

          <div className="space-y-4">
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-background-dark font-black py-6 rounded-[24px] flex items-center justify-center gap-3 glow-shadow hover:scale-[1.03] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Save size={24} />
              )}
              <span className="uppercase tracking-tighter text-lg">{isSaving ? 'Sincronizando...' : 'Guardar Producto'}</span>
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full bg-background-dark/50 border border-primary/10 text-slate-500 font-bold py-5 rounded-[24px] hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all uppercase tracking-widest text-[10px]"
            >
              Cancelar Operación
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductScreen;
