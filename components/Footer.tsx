import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8 mb-8">
            <a href="#home" className="flex items-center gap-3 group">
                <Logo className="w-10 h-10" variant="light" />
                <span className="font-serif text-2xl font-bold tracking-wide">Doozee</span>
            </a>
            
            <div className="flex gap-6">
                <a href="#" onClick={preventDefault} className="hover:text-coffee transition-colors" aria-label="Instagram"><Instagram size={24} /></a>
                <a href="#" onClick={preventDefault} className="hover:text-coffee transition-colors" aria-label="Facebook"><Facebook size={24} /></a>
                <a href="#" onClick={preventDefault} className="hover:text-coffee transition-colors" aria-label="Twitter"><Twitter size={24} /></a>
            </div>
        </div>
        
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Doozee Coffee Aceh. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-start mt-4 md:mt-0">
                <a href="#" onClick={preventDefault} className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" onClick={preventDefault} className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;