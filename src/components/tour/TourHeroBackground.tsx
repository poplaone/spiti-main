
import React, { memo } from 'react';

interface TourHeroBackgroundProps {
  heroImage: string;
}

// Memoize the background component as it rarely changes
const TourHeroBackground: React.FC<TourHeroBackgroundProps> = memo(({ heroImage }) => {
  return (
    <>
      {/* Simplified overlay with reduced CSS complexity */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Bottom gradient for better text readability - simplified */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
    </>
  );
});

TourHeroBackground.displayName = 'TourHeroBackground';
export default TourHeroBackground;
