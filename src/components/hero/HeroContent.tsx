
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
  const [isVisible, setIsVisible] = useState(false);
  
  // Fade in content after a short delay to prioritize image LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Optimized logo dimensions for faster loading
  const logoSize = isMobile ? 64 : 96;
  
  return (
    <div 
      className={`absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
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
          fetchPriority="high"
          decoding="async"
        />
      </div>
      
      {/* Pre-sized ratings badge container */}
      <div className="mb-2 md:mb-3 h-[32px]" style={{ contain: 'size layout' }}>
        <GoogleRatingBadge />
      </div>
      
      {/* Pre-sized heading container */}
      <h1 
        className="text-2xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 max-w-3xl font-normal leading-tight"
        style={{ contain: 'layout paint', maxHeight: isMobile ? '4rem' : '6rem' }}
      >
        Spiti Valley Travels
      </h1>
      
      {/* Simplified text with reduced paint complexity */}
      <p 
        className="text-white text-sm md:text-base lg:text-lg max-w-xl font-medium mb-4 md:mb-6 px-4"
        style={{ contain: 'content', maxHeight: isMobile ? '3rem' : '4rem' }}
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
