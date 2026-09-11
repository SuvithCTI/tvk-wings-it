import React from 'react';

export const TVKFlag = ({ className = "w-20 h-14", animated = true }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-xl inline-block ${animated ? 'loader-flag-img' : ''} ${className}`}>
      {/* Official TVK Flag Image uploaded by user */}
      <img
        src="/tvk_official_flag.png"
        alt="Official TVK Flag - Tamilaga Vettri Kazhagam"
        className="w-full h-full object-cover rounded-lg filter drop-shadow-md"
      />
      {/* Silk Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/20 pointer-events-none rounded-lg"></div>
    </div>
  );
};
