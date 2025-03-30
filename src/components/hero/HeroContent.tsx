
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
        alt="Spiti Logo" 
        className="w-40 h-40 mb-2 md:mb-4 mt-[-90px] md:mt-0" 
        src="/lovable-uploads/d1018c3e-5c41-4572-8712-cb63ee049342.png" 
      />
      
      {/* Google Ratings Badge */}
      <GoogleRatingBadge />
      
      {/* Weather Display for Desktop */}
      {!isMobile && <WeatherDisplay className="mt-3 mb-4 w-auto" />}
      
      <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6">Spiti Valley Travels</h1>
      <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">Begin your Spiti adventure with us – your local guides to explore more...</p>
      
      <Button 
        variant="outline" 
        className="bg-transparent border border-white text-white hover:bg-white/20 mt-2"
        onClick={scrollToDiscoverSection}
      >
        Explore Tours
      </Button>
    </div>
  );
};

export default HeroContent;
