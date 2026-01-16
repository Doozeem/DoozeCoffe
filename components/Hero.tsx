import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const Hero: React.FC = () => {
  const ref = useRef(null);
  const [greeting, setGreeting] = useState('Selamat Datang');
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) setGreeting("Selamat Pagi,");
    else if (hour >= 11 && hour < 15) setGreeting("Selamat Siang,");
    else if (hour >= 15 && hour < 18) setGreeting("Selamat Sore,");
    else setGreeting("Selamat Malam,");
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="home" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
        {/* Background with Overlay */}
        <MotionDiv 
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop" 
            alt="Coffee Atmosphere" 
            className="w-full h-full object-cover opacity-80 scale-105"
          />
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
        </MotionDiv>

        {/* Content */}
        <MotionDiv 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 container mx-auto px-6 pt-20"
        >
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-2 mb-6"
            >
              <span className="text-white/80 text-xs md:text-sm font-sans tracking-[0.3em] uppercase border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  Est. Aceh 2018
              </span>
              <span className="text-gold font-serif italic text-xl md:text-2xl mt-4">
                  {greeting}
              </span>
            </MotionDiv>

            <MotionH1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-6xl md:text-9xl font-medium text-white mb-6 leading-[0.9] tracking-tight drop-shadow-2xl"
            >
              The Art of <br />
              <span className="italic font-light text-[#EBEBEB]">Saring.</span>
            </MotionH1>
            
            <MotionP 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-sans text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed max-w-2xl"
            >
              Menghadirkan keaslian Kopi Gayo dengan teknik tarik tradisional, 
              menciptakan rasa yang tak lekang oleh waktu.
            </MotionP>
            
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <a 
                href="#menu" 
                onClick={scrollToMenu}
                className="group relative px-8 py-4 bg-gold text-charcoal rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(197,160,89,0.4)] min-w-[200px]"
              >
                <div className="relative flex items-center justify-center gap-2 font-bold text-lg uppercase tracking-wider">
                  <span>Pesan Sekarang</span>
                </div>
              </a>
              
              <button 
                onClick={() => setShowVideo(true)}
                className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all backdrop-blur-sm group"
              >
                  <Play size={20} className="ml-1 fill-current" />
              </button>
            </MotionDiv>
          </div>
        </MotionDiv>

        {/* Elegant Scroll Indicator */}
        <MotionDiv 
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 z-20 cursor-pointer flex flex-col items-center gap-2"
          onClick={() => document.getElementById('menu')?.scrollIntoView({behavior: 'smooth'})}
        >
          <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 via-white to-transparent"></div>
        </MotionDiv>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
             <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors">
               <X size={32} />
             </button>
             
             <MotionDiv 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
               onClick={(e: any) => e.stopPropagation()}
             >
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&start=15" 
                  title="Doozee Coffee Brewing" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                {/* Note: Using Rick Roll merely as a placeholder video ID since I don't have a real coffee video ID. Replace with actual coffee b-roll ID */}
             </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;