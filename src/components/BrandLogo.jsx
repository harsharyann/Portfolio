import React from 'react';

const BrandLogo = ({ size = 24, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle Container */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
      
      {/* Structural H */}
      <path 
        d="M35 25V75M65 25V75M35 50H65" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="square"
        className="text-[var(--cmd-yellow)]"
      />
      
      {/* Tech Accents */}
      <rect x="30" y="20" width="10" height="2" fill="currentColor" className="text-[var(--cmd-yellow)]" />
      <rect x="60" y="20" width="10" height="2" fill="currentColor" className="text-[var(--cmd-yellow)]" />
      <rect x="30" y="78" width="10" height="2" fill="currentColor" className="text-[var(--cmd-yellow)]" />
      <rect x="60" y="78" width="10" height="2" fill="currentColor" className="text-[var(--cmd-yellow)]" />
      
      {/* Terminal Dot */}
      <circle cx="50" cy="50" r="3" fill="white" className="animate-pulse" />
    </svg>
  );
};

export default BrandLogo;
