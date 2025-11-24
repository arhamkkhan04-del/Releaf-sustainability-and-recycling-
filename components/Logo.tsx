import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 24, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Releaf Logo"
    >
      {/* Bulb Base - Green */}
      <path 
        d="M38 84H62V89C62 92.3 59.3 95 56 95H44C40.7 95 38 92.3 38 89V84Z" 
        className="fill-releaf-600 dark:fill-releaf-500" 
      />
      <rect 
        x="36" 
        y="76" 
        width="28" 
        height="8" 
        rx="2" 
        className="fill-releaf-600 dark:fill-releaf-500" 
      />

      {/* Bulb Glass Outline - Orange/Amber */}
      <path 
        d="M36 78C36 78 15 62 15 42C15 22 30 5 50 5C70 5 85 20 85 40C85 48 80 55 74 60" 
        className="stroke-amber-400 dark:stroke-amber-300" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />

      {/* Large Leaf Inside - Emerald Green */}
      <path 
        d="M50 76C50 76 50 35 85 15C85 15 92 45 70 65C60 75 50 76 50 76Z" 
        className="fill-releaf-500 dark:fill-releaf-400" 
      />
      
      {/* Leaf Vein/Detail */}
      <path 
        d="M50 76C50 76 65 52 85 15" 
        className="stroke-releaf-700 dark:stroke-releaf-300" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};