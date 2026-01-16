import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const MotionDiv = motion.div as any;

const REVIEWS = [
  {
    id: 1,
    name: "Arief Muhammad",
    role: "Food Blogger",
    text: "Gila sih, Sanger-nya bener-bener authentic! Rasa kopinya kuat tapi creamy banget. Salah satu yang terbaik di Bireuen.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Amalia",
    role: "Coffee Enthusiast",
    text: "Suasananya nyaman banget buat ngerjain tugas. Mie Aceh-nya juga pedesnya pas, dagingnya empuk. Recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Local Guide",
    text: "Pelayanan ramah, tempat bersih. Roti canai kuah karinya juara dunia. Wajib mampir kalau lagi di Kota Santri.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gold rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-coffee rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                    Kata Mereka Tentang <span className="text-gold italic">Doozee.</span>
                </h2>
                <p className="text-gray-400 font-sans max-w-lg mx-auto">
                    Kepuasan pelanggan adalah bumbu rahasia terbaik kami.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {REVIEWS.map((review, idx) => (
                    <MotionDiv
                        key={review.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2, duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative hover:bg-white/10 transition-colors group"
                    >
                        <Quote className="absolute top-8 right-8 text-gold/20 group-hover:text-gold/40 transition-colors" size={40} />
                        
                        <div className="flex gap-1 mb-6">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} className="fill-gold text-gold" />
                            ))}
                        </div>

                        <p className="text-gray-300 font-sans leading-relaxed mb-8 italic">
                            "{review.text}"
                        </p>

                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-coffee flex items-center justify-center text-charcoal font-bold font-serif text-lg">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                <p className="text-xs text-gold uppercase tracking-wider">{review.role}</p>
                            </div>
                        </div>
                    </MotionDiv>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Testimonials;