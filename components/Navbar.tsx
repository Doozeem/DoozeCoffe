import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const MotionDiv = motion.div as any;
const MotionA = motion.a as any;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setIsCartOpen(true);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-center ${
          scrolled ? 'pt-4' : 'pt-6'
        }`}
      >
        <div 
          className={`flex justify-between items-center transition-all duration-500 ${
            scrolled 
              ? 'w-[90%] md:w-[85%] max-w-6xl bg-white/80 backdrop-blur-xl shadow-lg border border-white/40 rounded-full px-6 py-3' 
              : 'w-full container px-6 bg-transparent py-2'
          }`}
        >
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group cursor-pointer relative z-50"
            onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Logo 
                className="w-8 h-8 transition-transform group-hover:scale-110" 
                variant={scrolled ? 'dark' : 'light'} 
            />
            <span className={`font-serif text-xl font-bold tracking-wide transition-colors ${
              scrolled ? 'text-charcoal' : 'text-cream'
            }`}>
              Doozee
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`font-sans text-sm font-medium transition-colors hover:text-gold ${
                   scrolled ? 'text-charcoal/80' : 'text-white/90'
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={handleOpenCart}
              className={`px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer relative ${
                scrolled 
                 ? 'bg-charcoal text-white hover:bg-coffee' 
                 : 'bg-gold text-charcoal hover:bg-white'
              }`}
            >
              <ShoppingBag size={14} /> Pesanan
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] border-2 border-white">
                    {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
              <button
                 onClick={handleOpenCart}
                 className={`relative p-2 rounded-full ${scrolled ? 'bg-gray-100 text-charcoal' : 'bg-white/10 text-white'}`}
              >
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] border-2 border-white">
                        {totalItems}
                    </span>
                  )}
              </button>
              
              <button 
                className={`focus:outline-none p-1 relative z-50 transition-colors ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col pt-28 px-6"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <MotionA 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  key={link.name} 
                  href={link.href}
                  className="text-4xl font-serif font-bold text-charcoal hover:text-coffee transition-colors"
                  onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setIsOpen(false);
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.name}
                </MotionA>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;