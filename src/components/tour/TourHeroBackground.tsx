
import React from 'react';

interface TourHeroBackgroundProps {
  heroImage: string;
}

const TourHeroBackground: React.FC<TourHeroBackgroundProps> = ({ heroImage }) => {
  return (
    <>
      {/* Background gradient overlay - darker to improve text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 sm:from-black/70 sm:via-black/50 sm:to-black/30"></div>
      
      {/* Bottom gradient for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
    </>
  );
};

export default TourHeroBackground;
