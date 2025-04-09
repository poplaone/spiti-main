
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
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-100px] md:mt-0">
      <img 
        alt="Spiti Valley Travels Logo" 
        className="w-32 h-32 mb-1 md:w-40 md:h-40 md:mb-4 mt-[-70px] md:mt-0 object-contain" 
        src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
      />
      
      {/* Google Ratings Badge */}
      <GoogleRatingBadge />
      
      <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-4 md:mb-8">Spiti Valley Travels</h1>
      
      {/* Removed the tagline paragraph */}
      
      {/* Weather Display for Mobile is handled in Header.tsx */}
      
      <div className="relative w-full flex justify-center">
        <Button 
          variant="outline" 
          className="bg-transparent border border-white text-white hover:bg-white/20 mt-1"
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
