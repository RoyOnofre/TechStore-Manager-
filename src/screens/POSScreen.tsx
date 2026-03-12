import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Banknote, User, Tag, Package, Printer, X, CheckCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const POSScreen: React.FC = () => {
  const [cart, setCart] = useState<{product: any, quantity: number}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProcessPayment = () => {
    if (cart.length === 0) return;
    
    const data = {
      id: `INV-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal,
      tax,
      total,
      customer: 'Venta de Mostrador'
    };
    
    setInvoiceData(data);
    setShowInvoice(true);
    setCart([]);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden relative">
      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoice && invoiceData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col text-slate-900"
            >
              <div className="bg-emerald-500 p-8 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">¡Venta Exitosa!</h2>
                    <p className="text-emerald-100 text-sm font-medium">Factura generada correctamente</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInvoice(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto max-h-[60vh] space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-xl font-black text-emerald-600">TechStorePro</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Soluciones Tecnológicas</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{invoiceData.id}</p>
                    <p className="text-xs text-slate-500">{invoiceData.date}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Detalle de Compra</h4>
                  <div className="space-y-3">
                    {invoiceData.items.map((item: any) => (
                      <div key={item.product.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center font-bold text-xs text-slate-600">{item.quantity}x</span>
                          <span className="font-medium text-slate-700">{item.product.name}</span>
                        </div>
                        <span className="font-bold">${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold">${invoiceData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">IVA (16%)</span>
                    <span className="font-bold">${invoiceData.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl pt-4 border-t-2 border-dashed border-slate-100">
                    <span className="font-black">Total</span>
                    <span className="font-black text-emerald-600">${invoiceData.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Método de Pago</p>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Banknote size={16} />
                    <span className="text-sm font-bold">Efectivo</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 flex gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                >
                  <Printer size={20} />
                  Imprimir
                </button>
                <button 
                  onClick={() => setShowInvoice(false)}
                  className="flex-1 bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all"
                >
                  Nueva Venta
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Product Selection */}
      <div className="flex-1 flex flex-col p-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Venta Nueva</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Escanear código o buscar..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-dark border border-primary/10 rounded-2xl py-3 pl-12 pr-4 w-96 focus:outline-none focus:border-primary transition-all text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
          <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.button
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`bg-surface-dark/50 border border-primary/10 p-4 rounded-3xl text-left transition-all hover:border-primary/40 flex flex-col ${product.stock === 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-primary/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-sm font-bold text-white mt-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-black text-white">${product.price.toLocaleString()}</p>
                    <p className={`text-[10px] font-bold px-2 py-1 rounded-md ${product.stock <= 5 ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'}`}>
                      {product.stock} uds
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Cart & Checkout */}
      <div className="w-full lg:w-[450px] bg-surface-dark border-l border-primary/10 flex flex-col z-10 shadow-2xl">
        <div className="p-8 border-b border-primary/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShoppingCart className="text-primary" size={24} />
              Carrito
            </h2>
            <span className="bg-primary text-background-dark text-xs font-black px-3 py-1 rounded-full glow-shadow">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-background-dark/50 border border-primary/10 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Cliente</p>
              <p className="text-sm font-bold text-white">Venta de Mostrador</p>
            </div>
            <button className="text-primary text-xs font-bold hover:underline">Cambiar</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          <AnimatePresence>
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
                <ShoppingCart size={64} className="mb-4" />
                <p className="text-lg font-bold">El carrito está vacío</p>
                <p className="text-sm">Selecciona productos para comenzar</p>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div 
                  key={item.product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 bg-background-dark/30 border border-primary/5 rounded-2xl flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-primary/10 shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-xs text-primary font-bold mt-1">${item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-md bg-surface-dark border border-primary/10 flex items-center justify-center text-slate-400 hover:text-primary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-md bg-surface-dark border border-primary/10 flex items-center justify-center text-slate-400 hover:text-primary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-sm font-black text-white">${(item.product.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-background-dark/50 border-t border-primary/10 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-white font-bold">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">IVA (16%)</span>
              <span className="text-white font-bold">${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl pt-2 border-t border-primary/10">
              <span className="text-white font-black">Total</span>
              <span className="text-primary font-black">${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 bg-surface-dark border border-primary/10 rounded-2xl hover:bg-primary/10 hover:border-primary/30 transition-all group">
              <Banknote className="text-slate-400 group-hover:text-primary" size={24} />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Efectivo</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-surface-dark border border-primary/10 rounded-2xl hover:bg-primary/10 hover:border-primary/30 transition-all group">
              <CreditCard className="text-slate-400 group-hover:text-primary" size={24} />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Tarjeta</span>
            </button>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={handleProcessPayment}
            className="w-full bg-primary text-background-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 glow-shadow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            Procesar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSScreen;
