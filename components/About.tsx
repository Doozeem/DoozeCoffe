import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Coffee, Award, Users, CheckCircle, ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });
  
    useEffect(() => {
      if (isInView) {
        motionValue.set(value);
      }
    }, [isInView, value, motionValue]);
  
    useEffect(() => {
      return springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix;
        }
      });
    }, [springValue, suffix]);
  
    return <span ref={ref} />;
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-cream relative overflow-hidden scroll-mt-20">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Collage Image Side */}
          <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
                {/* Main Image */}
                <div className="relative z-20 rounded-[2.5rem] overflow-hidden shadow-2xl w-[90%] border-4 border-white">
                    <img 
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" 
                        alt="Coffee Beans and Cup" 
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Secondary Image - Floating */}
                <div className="absolute -bottom-10 -right-4 z-30 w-1/2 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                     <img 
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
                        alt="Coffee Shop Detail" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-full h-full border-2 border-gold/30 rounded-[3rem] z-10 transform -rotate-3"></div>
                <div className="absolute top-1/2 -left-16 bg-white p-4 rounded-2xl shadow-xl z-40 hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full text-green-700">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-charcoal text-sm">100% Halal</p>
                            <p className="text-xs text-gray-500">Certified Quality</p>
                        </div>
                    </div>
                </div>
            </div>
          </MotionDiv>

          {/* Text Content */}
          <MotionDiv 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 pl-0 lg:pl-10"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-coffee/10 text-coffee text-xs font-bold tracking-widest uppercase mb-4">
                Since 2018
            </span>
            
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-8 leading-[1.1]">
              Warisan <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee to-gold">Aceh</span> <br/>
              Modern Vibe.
            </h2>
            
            <p className="font-sans text-lg text-gray-500 mb-6 leading-relaxed">
              Doozee Coffee bukan sekadar kedai kopi. Ini adalah ruang tamu modern di mana tradisi Gayo bertemu dengan kenyamanan urban. 
            </p>
            <p className="font-sans text-lg text-gray-500 mb-10 leading-relaxed border-l-4 border-gold pl-6">
              "Kami menyeduh cerita di setiap cangkir, memastikan rasa rindu akan tanah rencong terobati dengan sempurna."
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                <div>
                    <h4 className="font-serif text-3xl font-bold text-charcoal mb-1 flex items-center">
                        <Counter value={10000} suffix="+" />
                    </h4>
                    <p className="text-sm text-gray-400 font-medium">Happy Customers</p>
                </div>
                <div>
                    <h4 className="font-serif text-3xl font-bold text-charcoal mb-1 flex items-center">
                        4.9
                    </h4>
                    <p className="text-sm text-gray-400 font-medium">Average Rating</p>
                </div>
            </div>
            
            <div className="mt-10">
                <a href="#menu" className="text-charcoal font-bold border-b-2 border-gold hover:text-gold hover:border-charcoal transition-all pb-1 inline-flex items-center gap-2 group">
                    Explore Our Story <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
          </MotionDiv>

        </div>
      </div>
    </section>
  );
};

export default About;