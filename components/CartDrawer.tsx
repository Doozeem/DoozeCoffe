import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Plus, Minus, User, MapPin, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
const MotionP = motion.p as any;

const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    removeFromCart, 
    addToCart, 
    decreaseQuantity, 
    totalPrice, 
    checkoutViaWhatsApp,
    customerName,
    setCustomerName,
    tableNumber,
    setTableNumber
  } = useCart();

  const [nameError, setNameError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice);
  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const handleCheckout = () => {
      if (!customerName.trim()) {
          setNameError(true);
          nameInputRef.current?.focus();
          return;
      }
      checkoutViaWhatsApp();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomerName(e.target.value);
      if (e.target.value.trim()) setNameError(false);
  };

  const handleStartOrdering = () => {
    setIsCartOpen(false);
    setTimeout(() => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // SVG Data URI for jagged paper edge
  const jaggedEdge = "data:image/svg+xml,%3Csvg width='20' height='10' viewBox='0 0 20 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L10 10 L20 0 Z' fill='%23FFFDF5'/%3E%3C/svg%3E";

  // Mock Barcode Lines
  const Barcode = () => (
    <div className="flex justify-center items-end h-12 gap-[2px] mt-4 opacity-70 overflow-hidden px-4">
      {[...Array(40)].map((_, i) => (
        <div 
            key={i} 
            className="bg-charcoal" 
            style={{ 
                width: Math.random() > 0.5 ? '2px' : '4px', 
                height: Math.random() > 0.5 ? '100%' : '80%' 
            }}
        ></div>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />

          {/* Drawer */}
          <MotionDiv
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#EBEBEB] z-[70] shadow-2xl flex flex-col"
          >
            {/* Nav Header (Close Button) */}
            <div className="p-5 flex justify-between items-center bg-[#EBEBEB]/80 backdrop-blur border-b border-gray-300/50">
               <div className="flex flex-col">
                   <h2 className="font-bold text-charcoal text-lg uppercase tracking-wider">Pesanan</h2>
                   <span className="text-xs text-gray-500 font-mono">Doozee Thermal Print v1.0</span>
               </div>
               <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Receipt Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-hide bg-[#EBEBEB] flex justify-center">
                <MotionDiv 
                    initial={{ y: 50, opacity: 0, rotate: -2 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.2 }}
                    className="relative w-full max-w-[360px]"
                >
                    {/* The Receipt Paper */}
                    <div 
                        className="bg-[#FFFDF5] shadow-[0_5px_15px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden"
                        style={{
                            // Subtle noise texture for paper realism
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`
                        }}
                    >
                        {/* Receipt Header */}
                        <div className="p-6 pb-2 text-center border-b-2 border-dashed border-gray-300">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-charcoal text-white rounded-full flex items-center justify-center border-4 border-double border-white shadow-sm overflow-hidden p-2">
                                    <Logo className="w-full h-full" variant="light" />
                                </div>
                            </div>
                            <h2 className="font-mono font-black text-2xl tracking-widest text-charcoal mb-1 scale-y-90">DOOZEE</h2>
                            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Authentic Gayo Coffee</p>
                            <p className="font-mono text-[9px] text-gray-400">Jl. Raya Samalanga, Kota Santri</p>
                            
                            <div className="flex justify-between mt-4 font-mono text-[10px] text-gray-500 border-t border-b border-gray-200 py-1">
                                <span>{date}</span>
                                <span>{time}</span>
                            </div>
                        </div>

                        {items.length > 0 && (
                            <div className="px-6 py-4">
                                <div className="space-y-3">
                                    <MotionDiv 
                                        className="group relative"
                                        animate={nameError ? { x: [-5, 5, -5, 5, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className={`flex items-center gap-3 pb-1 border-b transition-colors ${nameError ? 'border-red-500' : 'border-gray-300 group-focus-within:border-charcoal'}`}>
                                            <User size={14} className={`${nameError ? 'text-red-500' : 'text-gray-400 group-focus-within:text-charcoal'}`} />
                                            <input 
                                                ref={nameInputRef}
                                                type="text" 
                                                placeholder="Nama Pemesan... (Wajib)" 
                                                value={customerName}
                                                onChange={handleNameChange}
                                                className="w-full bg-transparent font-mono text-sm focus:outline-none text-charcoal placeholder:text-gray-300 uppercase"
                                            />
                                        </div>
                                        {nameError && <p className="text-[9px] text-red-500 font-mono mt-1">* Wajib diisi</p>}
                                    </MotionDiv>
                                    <div className="group relative">
                                        <div className="flex items-center gap-3 pb-1 border-b border-gray-300 group-focus-within:border-charcoal transition-colors">
                                            <MapPin size={14} className="text-gray-400 group-focus-within:text-charcoal" />
                                            <input 
                                                type="text" 
                                                placeholder="No. Meja..." 
                                                value={tableNumber}
                                                onChange={(e) => setTableNumber(e.target.value)}
                                                className="w-full bg-transparent font-mono text-sm focus:outline-none text-charcoal placeholder:text-gray-300 uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Receipt Items */}
                        <div className="px-6 py-2 min-h-[150px]">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 opacity-60 font-mono text-center">
                                    <Coffee size={40} strokeWidth={1} className="mb-4 text-gray-400" />
                                    <p className="mb-2 text-xl font-bold tracking-widest text-charcoal">KOSONG</p>
                                    <p className="text-[10px] uppercase max-w-[150px]">Belum ada kopi yang diseduh untukmu hari ini.</p>
                                    <button 
                                        onClick={handleStartOrdering}
                                        className="mt-6 px-6 py-2 border border-charcoal rounded-full text-[10px] uppercase font-bold hover:bg-charcoal hover:text-white transition-colors"
                                    >
                                        Lihat Menu
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => {
                                        const unitPrice = parseInt(item.price.replace(/[^0-9]/g, '')) * 1000;
                                        const subtotal = unitPrice * item.quantity;
                                        const formattedSubtotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(subtotal);

                                        return (
                                            <div key={item.id} className="font-mono text-xs text-charcoal">
                                                {/* Item Name */}
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold uppercase max-w-[70%] leading-tight">{item.name}</span>
                                                    <span className="font-bold">{formattedSubtotal}</span>
                                                </div>
                                                
                                                {/* Qty & Controls */}
                                                <div className="flex justify-between items-center text-gray-500 pl-2 border-l-2 border-gray-200">
                                                    <div className="flex items-center gap-2">
                                                        <span>@{item.price}</span>
                                                        <span>x</span>
                                                        <span className="text-charcoal font-bold">{item.quantity}</span>
                                                    </div>
                                                    
                                                    {/* Hidden controls until hover/focus could be an option, but keeping visible for UX */}
                                                    <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                                                        <button onClick={() => decreaseQuantity(item.id)} className="p-1 hover:text-red-500 bg-gray-100 rounded"><Minus size={10} /></button>
                                                        <button onClick={() => addToCart(item)} className="p-1 hover:text-green-500 bg-gray-100 rounded"><Plus size={10} /></button>
                                                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:text-red-600 ml-1"><Trash2 size={10} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Receipt Footer/Total */}
                        {items.length > 0 && (
                            <div className="p-6 pt-2">
                                <div className="border-t-2 border-dashed border-gray-300 py-3 space-y-1 font-mono text-xs">
                                    <div className="flex justify-between text-gray-500">
                                        <span>SUBTOTAL</span>
                                        <span>{formattedTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>TAX (10%)</span>
                                        <span>INCLUDED</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>SERVICE</span>
                                        <span>INCLUDED</span>
                                    </div>
                                </div>
                                
                                <div className="border-t-2 border-dashed border-charcoal pt-3 pb-1">
                                    <div className="flex justify-between font-mono font-black text-xl text-charcoal">
                                        <span>TOTAL</span>
                                        <span>{formattedTotal}</span>
                                    </div>
                                </div>
                                
                                <div className="text-center mt-6 font-mono text-[9px] text-gray-400 uppercase leading-relaxed">
                                    <p>Thank you for visiting</p>
                                    <p>PWD: doozeecoffee</p>
                                    <Barcode />
                                    <p className="mt-1 tracking-[0.3em]">0012938421</p>
                                </div>
                            </div>
                        )}

                        {/* Jagged Edge Effect */}
                        <div 
                            className="absolute -bottom-3 left-0 w-full h-4 bg-repeat-x bg-bottom"
                            style={{ 
                                backgroundImage: `url("${jaggedEdge}")`,
                                backgroundSize: '20px 10px'
                            }}
                        ></div>
                    </div>
                </MotionDiv>
            </div>

            {/* Bottom Actions - Floating outside the paper */}
            <div className="p-6 bg-[#EBEBEB] border-t border-gray-300">
                <MotionButton
                  whileTap={items.length > 0 && customerName ? { scale: 0.95 } : { x: [0, -10, 10, -10, 10, 0] }}
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="w-full bg-charcoal text-white py-4 rounded-xl font-bold font-mono uppercase text-lg flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span>Pesan Sekarang</span>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                     <ArrowRight size={18} />
                  </div>
                </MotionButton>
                {!customerName && items.length > 0 && !nameError && (
                    <MotionP 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xs text-gray-500 mt-3 font-mono"
                    >
                        * Harap isi nama sebelum memesan
                    </MotionP>
                )}
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;