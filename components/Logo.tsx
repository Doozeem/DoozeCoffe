import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", variant = 'dark' }) => {
  // Variant 'light' (untuk background gelap): Stem Putih, Daun Emas
  // Variant 'dark' (untuk background terang): Stem Charcoal, Daun Emas
  
  const stemColor = variant === 'light' ? '#FFFFFF' : '#1F1F1F'; 
  const leafColor = '#C5A059'; // Gold selalu memberikan aksen elegan

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Doozee Coffee Logo"
    >
      {/* 
        DESIGN: "The Golden Leaf D"
        A sophisticated monogram where the letter 'D' is formed by a strong stem 
        and a flowing coffee leaf shape.
      */}
      
      {/* 1. The Stem (Foundation) - Solid Vertical Bar */}
      <path 
        d="M22 15H36V85H22V15Z" 
        fill={stemColor} 
      />
      
      {/* 2. The Leaf (Aroma/Nature) - Elegant Curve forming the 'D' bowl */}
      {/* The inner curve (Q 55 50 44 15) creates a beautiful organic negative space */}
      <path 
        d="M44 15C75 15 92 32 92 50C92 68 75 85 44 85Q58 50 44 15Z" 
        fill={leafColor} 
      />
    </svg>
  );
};

export default Logo;