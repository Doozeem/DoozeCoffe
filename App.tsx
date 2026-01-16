import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import CartDrawer from './components/CartDrawer';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { CartProvider, useCart } from './context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

const MotionDiv = motion.div as any;

const ToastNotification = () => {
  const { lastAddedItem, clearNotification } = useCart();

  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearNotification]);

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <MotionDiv
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] bg-charcoal text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px]"
        >
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
             <Check size={14} className="text-white stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Berhasil</span>
            <span className="font-medium text-sm truncate max-w-[200px]">{lastAddedItem}</span>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <CartProvider>
      <div className="antialiased text-charcoal bg-cream min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Testimonials />
          <Menu />
          <Contact />
        </main>
        <Footer />
        <FloatingCTA />
        <CartDrawer />
        <ToastNotification />
        <PWAInstallPrompt />
      </div>
    </CartProvider>
  );
}

export default App;