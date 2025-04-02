
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
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-120px] md:mt-0">
      <img 
        alt="Spiti Valley Travels Logo" 
        className="w-40 h-40 mb-2 md:mb-4 mt-[-90px] md:mt-0" 
        src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
      />
      
      {/* Google Ratings Badge */}
      <GoogleRatingBadge />
      
      <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6">Spiti Valley Travels</h1>
      <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">Begin your Spiti adventure with us – your local guides to explore more...</p>
      
      {/* Weather Display for Mobile is handled in Header.tsx */}
      
      <div className="relative w-full flex justify-center">
        <Button 
          variant="outline" 
          className="bg-transparent border border-white text-white hover:bg-white/20 mt-2"
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
