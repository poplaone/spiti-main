
import { memo, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import GoogleRatingBadge from './GoogleRatingBadge';
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroContentProps {
  scrollToDiscoverSection: () => void;
}

const HeroContent = memo(({
  scrollToDiscoverSection
}: HeroContentProps) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true); // Set to true by default to avoid flicker
  
  // Optimized logo dimensions for faster loading
  const logoSize = isMobile ? 64 : 96;
  
  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4"
      style={{ willChange: 'opacity' }}
    >
      {/* Pre-sized logo container to prevent layout shifts */}
      <div 
        className="w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4"
        style={{ contain: 'size layout' }}
      >
        <img 
          alt="Spiti Valley Travels Logo" 
          className="w-full h-full object-contain" 
          src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
          width={logoSize} 
          height={logoSize} 
          loading="eager"
          decoding="async"
        />
      </div>
      
      {/* Fixed-size Google Rating Badge container */}
      <div className="mb-2 md:mb-3 flex justify-center h-8 w-full">
        <GoogleRatingBadge />
      </div>
      
      {/* Fixed height heading to prevent layout shifts */}
      <h1 
        className="text-2xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 max-w-3xl font-normal leading-tight h-10 md:h-14 lg:h-16"
      >
        Spiti Valley Travels
      </h1>
      
      {/* Fixed height paragraph */}
      <p 
        className="text-white text-sm md:text-base lg:text-lg max-w-xl font-medium mb-4 md:mb-6 px-4 h-6 md:h-8"
      >
        Begin your Spiti adventure with us
      </p>
      
      <Button 
        variant="outline" 
        className="bg-transparent border border-white text-white hover:bg-white/20" 
        onClick={scrollToDiscoverSection}
      >
        Explore Tours
      </Button>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';
export default HeroContent;
