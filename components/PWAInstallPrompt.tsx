import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';
import Logo from './Logo';

const MotionDiv = motion.div as any;

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Standard PWA install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Delay showing the prompt slightly so it doesn't clash with hero load
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If iOS and not in standalone mode, show instructions
    if (isIosDevice && !(window.navigator as any).standalone) {
        setTimeout(() => setIsVisible(true), 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center"
      >
        <div className="bg-charcoal text-white rounded-2xl shadow-2xl p-4 w-full max-w-md border border-white/10 relative">
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white"
            >
                <X size={18} />
            </button>

            <div className="flex gap-4 items-center">
                <div className="bg-white/10 p-2 rounded-xl">
                    <Logo className="w-10 h-10" variant="light" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm">Install Doozee App</h4>
                    <p className="text-xs text-gray-400">Pesan lebih cepat, hemat kuota.</p>
                </div>
                
                {isIOS ? (
                    <div className="text-[10px] text-gray-400 text-right pr-6">
                        Tap <Share size={10} className="inline mx-1" /> lalu <br/> "Add to Home Screen"
                    </div>
                ) : (
                    <button
                        onClick={handleInstallClick}
                        className="bg-gold text-charcoal px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-white transition-colors"
                    >
                        <Download size={14} /> Install
                    </button>
                )}
            </div>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;