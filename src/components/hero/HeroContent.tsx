
import { Button } from "@/components/ui/button";
import GoogleRatingBadge from './GoogleRatingBadge';
import WeatherDisplay from '../weather/WeatherDisplay';
import { useIsMobile } from "@/hooks/use-mobile";
import { memo } from 'react';

interface HeroContentProps {
  scrollToDiscoverSection: () => void;
}

const HeroContent = memo(({ scrollToDiscoverSection }: HeroContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-70px] md:mt-0">
      {/* Preloaded logo with explicit width/height for layout stability */}
      <img 
        alt="Spiti Valley Travels Logo" 
        className="w-24 h-24 mb-1 md:w-32 md:h-32 md:mb-2 mt-[-40px] md:mt-0 object-contain" 
        src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
        width="96"
        height="96"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      
      {/* Google Ratings Badge - Simplified for performance */}
      <GoogleRatingBadge />
      
      {/* Critical text content - Simplified for LCP */}
      <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-1 md:mb-2">Spiti Valley Travels</h1>
      
      <div className="relative w-full flex justify-center">
        <Button 
          variant="outline" 
          className="bg-transparent border border-white text-white hover:bg-white/20"
          onClick={scrollToDiscoverSection}
        >
          Explore Tours
        </Button>
        
        {/* Weather Display for Desktop - Lazy loaded */}
        {!isMobile && (
          <div className="absolute bottom-0 right-0 md:right-4 lg:right-8">
            <WeatherDisplay className="animate-fade-in-up" />
          </div>
        )}
      </div>
    </div>
  );
});

// Add display name for React DevTools and debugging
HeroContent.displayName = 'HeroContent';

export default HeroContent;
