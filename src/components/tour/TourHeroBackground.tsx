
import React, { memo } from 'react';

interface TourHeroBackgroundProps {
  heroImage: string;
}

// Memoize the background component as it rarely changes
const TourHeroBackground: React.FC<TourHeroBackgroundProps> = memo(({ heroImage }) => {
  return (
    <>
      {/* Optimized gradient overlay - simplified for better performance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
      
      {/* Bottom gradient for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
    </>
  );
});

TourHeroBackground.displayName = 'TourHeroBackground';
export default TourHeroBackground;
