import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-charcoal text-white relative overflow-hidden scroll-mt-32">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-coffee/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Kunjungi Kami
                </h2>
                <div className="w-16 h-1 bg-gold rounded-full mb-6"></div>
                <p className="text-gray-300 text-lg leading-relaxed">
                Kami menunggumu dengan cangkir hangat di kota santri. Datanglah untuk kopi, tinggallah untuk persaudaraan.
                </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-white/10 rounded-xl text-gold backdrop-blur-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Lokasi</h4>
                  <p className="text-gray-400">Jl. Raya Samalanga,<br/>Kota Santri, Bireuen, Aceh</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 bg-white/10 rounded-xl text-gold backdrop-blur-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Jam Operasional</h4>
                  <p className="text-gray-400">Senin - Jumat: 08:00 - 23:00</p>
                  <p className="text-gray-400">Sabtu - Minggu: 08:00 - 00:00</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3 bg-white/10 rounded-xl text-gold backdrop-blur-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Reservasi</h4>
                  <p className="text-gray-400">+62 852 7717 6389</p>
                  <p className="text-gray-400">salam@doozeecoffee.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:col-span-3 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5">
             {/* Map Overlay Card */}
             <div className="absolute top-4 left-4 bg-white text-charcoal p-4 rounded-xl shadow-lg z-10 max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-600 uppercase">Buka Sekarang</span>
                </div>
                <p className="text-sm font-serif italic">"Suasana sejuk Kota Santri, parkir luas & nyaman."</p>
             </div>

             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3975.3289064123!2d96.36625807425835!3d5.214431933256087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMTInNTIuMCJOIDk2wrAyMSc1OC41IkU!5e0!3m2!1sen!2sid!4v1709195000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.2)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;