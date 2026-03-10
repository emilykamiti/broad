import React from 'react';

interface BroadTechLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BroadTechLogo({ className = '', size = 'md' }: BroadTechLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="broadtech-gradient" x1="0%" y1="0%" x2="100%"  y2="100%">
              <stop offset="0%" stopColor="#0A7AFF" />
              <stop offset="50%" stopColor="#0062CC" />
              <stop offset="100%"  stopColor="#004A99" />
            </linearGradient>
            <linearGradient id="broadtech-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#E65A2B" />
            </linearGradient>
          </defs>
          
          {/* Hexagonal tech badge background */}
          <path
            d="M20 2L35 11V29L20 38L5 29V11L20 2Z"
            fill="url(#broadtech-gradient)"
            stroke="#0A7AFF"
            strokeWidth="1.5"
          />
          
          {/* Electric plug prongs */}
          <rect x="15" y="12" width="2.5" height="6" rx="1" fill="white" />
          <rect x="22.5" y="12" width="2.5" height="6" rx="1" fill="white" />
          
          {/* Plug socket */}
          <rect x="13" y="19" width="14" height="10" rx="2" fill="white" />
          <circle cx="17" cy="24" r="1.5" fill="url(#broadtech-gradient)" />
          <circle cx="23" cy="24" r="1.5" fill="url(#broadtech-gradient)" />
          
          {/* Power wave */}
          <path
            d="M9 24 Q12 20, 15 24 T21 24 T27 24 T31 24"
            stroke="url(#broadtech-orange)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          
          {/* Tech circuit accents */}
          <circle cx="8" cy="15" r="1" fill="#FF6B35" opacity="0.8" />
          <circle cx="32" cy="15" r="1" fill="#FF6B35" opacity="0.8" />
          <circle cx="8" cy="25" r="1" fill="#0A7AFF" opacity="0.8" />
          <circle cx="32" cy="25" r="1" fill="#0A7AFF" opacity="0.8" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${textSizeClasses[size]} font-bold tracking-wide`} style={{ color: '#0A7AFF' }}>
          BroadTech
        </span>
        {size !== 'sm' && (
          <span className="text-xs tracking-widest font-semibold -mt-0.5" style={{ color: '#FF6B35' }}>
            PLUG
          </span>
        )}
      </div>
    </div>
  );
}
