
import { Button } from "@/components/ui/button";
import GoogleRatingBadge from './GoogleRatingBadge';
import WeatherDisplay from '../weather/WeatherDisplay';
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroContentProps {
  scrollToDiscoverSection: () => void;
}

const HeroContent = ({ scrollToDiscoverSection }: HeroContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-70px] md:mt-0">
      {/* Preloaded logo image */}
      <img 
        alt="Spiti Valley Travels Logo" 
        className="w-28 h-28 mb-1 md:w-36 md:h-36 md:mb-3 mt-[-50px] md:mt-0 object-contain" 
        src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
        width="144"
        height="144"
      />
      
      {/* Google Ratings Badge */}
      <GoogleRatingBadge />
      
      {/* Critical text content - optimized for LCP */}
      <h1 className="text-2xl md:text-5xl font-display font-bold text-white mb-2 md:mb-4">Spiti Valley Travels</h1>
      <p className="text-base md:text-lg text-white/90 mb-3 md:mb-6 max-w-xl">
        Begin your Spiti adventure with us – your local guides to explore more...
      </p>
      
      <div className="relative w-full flex justify-center">
        <Button 
          variant="outline" 
          className="bg-transparent border border-white text-white hover:bg-white/20"
          onClick={scrollToDiscoverSection}
        >
          Explore Tours
        </Button>
        
        {/* Weather Display for Desktop - positioned at bottom right */}
        {!isMobile && (
          <div className="absolute bottom-0 right-0 md:right-4 lg:right-8">
            <WeatherDisplay className="animate-fade-in-up" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroContent;
