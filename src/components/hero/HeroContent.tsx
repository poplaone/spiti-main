
import { Button } from "@/components/ui/button";
import GoogleRatingBadge from './GoogleRatingBadge';
import { useIsMobile } from "@/hooks/use-mobile";
import { memo, useState, useEffect } from 'react';

interface HeroContentProps {
  scrollToDiscoverSection: () => void;
}

const HeroContent = memo(({ scrollToDiscoverSection }: HeroContentProps) => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use a visibility effect to delay rendering for better performance
  useEffect(() => {
    // Use requestIdleCallback if available, or setTimeout as fallback
    const requestIdleCallback = 
      window.requestIdleCallback || 
      ((callback) => setTimeout(callback, 1));
    
    const idleId = requestIdleCallback(() => {
      setIsLoaded(true);
    });
    
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);
  
  // Pre-calculate sizes for better layout stability
  const logoSize = isMobile ? 96 : 160;
  const logoClasses = `w-24 h-24 mb-1 md:w-40 md:h-40 md:mb-4 mt-[-30px] md:mt-0 object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-60px] md:mt-0">
      {/* Optimized logo image with specific width/height */}
      <img 
        alt="Spiti Valley Travels Logo" 
        className={logoClasses} 
        src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
        width={logoSize}
        height={logoSize}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Google Ratings Badge - only render when logo is loaded */}
      {isLoaded && <GoogleRatingBadge />}
      
      <h1 className="text-2xl md:text-6xl font-display font-bold text-white mb-3 md:mb-8 max-w-3xl">
        Spiti Valley Travels
      </h1>
      
      <Button 
        variant="outline" 
        className="bg-transparent border border-white text-white hover:bg-white/20 mt-1"
        onClick={scrollToDiscoverSection}
      >
        Explore Tours
      </Button>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';
export default HeroContent;
