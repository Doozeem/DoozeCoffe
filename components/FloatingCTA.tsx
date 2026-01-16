import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';
import { useCart } from '../context/CartContext';

const MotionButton = motion.button as any;

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show main button after hero
      setIsVisible(window.scrollY > 300);
      // Show back to top after scrolling further down (approx 2 screens)
      setShowScrollTop(window.scrollY > 1200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
     e.preventDefault();
     
     if (totalItems > 0) {
         setIsCartOpen(true);
     } else {
         const message = encodeURIComponent("Halo Doozee Coffee, saya ingin bertanya...");
         const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`;
         window.open(url, '_blank', 'noopener,noreferrer');
     }
  };

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Back To Top Button */}
        <AnimatePresence>
            {showScrollTop && (
                <MotionButton
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    onClick={scrollToTop}
                    className="p-3 bg-white text-charcoal rounded-full shadow-lg border border-gray-100 hover:bg-stone-100 transition-colors"
                >
                    <ArrowUp size={20} />
                </MotionButton>
            )}
        </AnimatePresence>

        {/* Main CTA */}
        <AnimatePresence>
        {isVisible && (
            <MotionButton
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl transition-colors font-bold group cursor-pointer ${
                totalItems > 0 ? 'bg-coffee text-white hover:bg-coffee/90' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            >
            {totalItems > 0 ? (
                <>
                    <div className="relative">
                        <ShoppingBag size={24} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-coffee"></span>
                    </div>
                    <span className="whitespace-nowrap">
                        Lihat Pesanan ({totalItems})
                    </span>
                </>
            ) : (
                <>
                    <MessageCircle size={24} className="animate-pulse" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
                        Hubungi Kami
                    </span>
                </>
            )}
            </MotionButton>
        )}
        </AnimatePresence>
    </div>
  );
};

export default FloatingCTA;