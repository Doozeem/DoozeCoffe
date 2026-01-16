import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star, Flame, Search, X } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { Category, MenuItem } from '../types';
import { useCart } from '../context/CartContext';

const CATEGORIES: Category[] = ['All', 'Coffee', 'Non-Coffee', 'Food'];

const MotionDiv = motion.div as any;

// Sub-component to handle individual image loading state
const MenuItemCard: React.FC<{ item: MenuItem; qty: number }> = ({ item, qty }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart, decreaseQuantity } = useCart();
  const isBestSeller = [1, 6].includes(item.id);

  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl p-4 border border-stone-100 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex gap-4 md:gap-6 items-start md:items-center"
    >
      {/* Image Section with Skeleton Loader */}
      <div className="relative shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
        )}
        <motion.img 
          src={item.image} 
          alt={item.name}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
        
        {isBestSeller && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm z-20 border border-orange-100">
            <Flame size={10} className="text-orange-500 fill-orange-500" /> 
            <span className="text-[9px] font-bold tracking-wider uppercase text-charcoal">Best</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 h-full py-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif text-lg md:text-xl font-bold text-charcoal leading-tight group-hover:text-coffee transition-colors">
              {item.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
              <Star size={12} className="text-gold fill-gold" />
              <span className="text-xs font-bold text-gray-400">4.9</span>
          </div>
        </div>
        
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-auto flex justify-between items-center border-t border-dashed border-gray-100 pt-3">
            <p className="text-gold font-bold font-sans text-lg">{item.price}</p>
            
            {/* Action Buttons */}
            <div className="flex items-center">
                {qty === 0 ? (
                  <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-stone-100 text-charcoal rounded-full text-xs font-bold hover:bg-gold hover:text-white transition-all active:scale-95 flex items-center gap-2 group/btn"
                  >
                      <span>Pesan</span>
                      <div className="bg-white rounded-full p-0.5 group-hover/btn:text-gold text-charcoal transition-colors">
                          <Plus size={12} />
                      </div>
                  </button>
              ) : (
                    <div className="flex items-center gap-3 bg-charcoal rounded-full p-1 pl-3 shadow-lg">
                      <span className="font-bold text-white text-sm tabular-nums">{qty}</span>
                      <div className="flex items-center gap-1">
                          <button 
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          >
                              <Minus size={14} />
                          </button>
                          <button 
                              onClick={() => addToCart(item)}
                              className="w-7 h-7 bg-white text-charcoal rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                              <Plus size={14} />
                          </button>
                      </div>
                  </div>
              )}
            </div>
        </div>
      </div>
    </MotionDiv>
  );
};

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useCart();
  
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getQuantity = (id: number) => items.find(i => i.id === id)?.quantity || 0;

  return (
    <section id="menu" className="py-24 relative bg-[#FDFBF7]">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
                <span className="h-[1px] w-8 bg-coffee"></span>
                <span className="text-coffee font-bold tracking-[0.2em] text-xs uppercase">Daftar Menu</span>
                <span className="h-[1px] w-8 bg-coffee"></span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-8">
                Pilihan <span className="text-gold italic">Terbaik.</span>
            </h2>

            {/* Search Bar */}
            <div className="relative w-full max-w-md mb-6 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                </div>
                <input 
                    type="text" 
                    placeholder="Cari kopi, mie, atau camilan..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-10 py-3 rounded-full bg-white border border-stone-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all shadow-sm placeholder:text-gray-400 text-charcoal"
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-charcoal"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            
            {/* Elegant Sticky Filter */}
            <div className="sticky top-24 z-30 inline-flex flex-wrap gap-1 p-1.5 bg-white/80 backdrop-blur-md border border-stone-200 shadow-lg rounded-full">
                {CATEGORIES.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat
                        ? 'bg-charcoal text-white shadow-md'
                        : 'bg-transparent text-gray-500 hover:text-coffee hover:bg-stone-100'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* List Grid Menu (2 Column Layout) */}
        <MotionDiv 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto min-h-[400px]"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} qty={getQuantity(item.id)} />
                ))
            ) : (
                <MotionDiv 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-charcoal">Menu tidak ditemukan</p>
                    <p className="text-gray-500">Coba kata kunci lain atau ganti kategori.</p>
                    <button 
                        onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                        className="mt-4 text-gold font-bold hover:underline"
                    >
                        Reset Filter
                    </button>
                </MotionDiv>
            )}
          </AnimatePresence>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Menu;