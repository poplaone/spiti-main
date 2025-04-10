
import { Button } from "@/components/ui/button";
import GoogleRatingBadge from './GoogleRatingBadge';
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroContentProps {
  scrollToDiscoverSection: () => void;
}

const HeroContent = ({ scrollToDiscoverSection }: HeroContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-60px] md:mt-0">
      {/* Optimized logo image with specific width/height */}
      <img 
        alt="Spiti Valley Travels Logo" 
        className="w-24 h-24 mb-1 md:w-40 md:h-40 md:mb-4 mt-[-30px] md:mt-0 object-contain" 
        src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
        width={isMobile ? 96 : 160}
        height={isMobile ? 96 : 160}
      />
      
      {/* Google Ratings Badge */}
      <GoogleRatingBadge />
      
      <h1 className="text-2xl md:text-6xl font-display font-bold text-white mb-3 md:mb-4 max-w-3xl">
        Spiti Valley Travels
      </h1>
      
      {/* New subheading */}
      <p className="text-white text-sm md:text-lg mb-4 md:mb-6 max-w-xl">
        Begin your Spiti adventure with us – your local guides to explore more...
      </p>
      
      <Button 
        variant="outline" 
        className="bg-transparent border border-white text-white hover:bg-white/20 mt-1"
        onClick={scrollToDiscoverSection}
      >
        Explore Tours
      </Button>
    </div>
  );
};

export default HeroContent;
