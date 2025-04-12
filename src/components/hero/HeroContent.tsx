
import { Button } from "@/components/ui/button";
import GoogleRatingBadge from './GoogleRatingBadge';
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroContentProps {
  scrollToDiscoverSection: () => void;
}

const HeroContent = ({
  scrollToDiscoverSection
}: HeroContentProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-60px] md:mt-0">
      {/* Fixed dimensions for logo container */}
      <div className="w-24 h-24 md:w-40 md:h-40 mb-1 md:mb-2">
        <img 
          alt="Spiti Valley Travels Logo" 
          className="w-full h-full object-contain" 
          src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
          width={isMobile ? 96 : 160} 
          height={isMobile ? 96 : 160} 
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </div>
      
      {/* Google Ratings Badge - Fixed height */}
      <div className="h-8 flex items-center justify-center">
        <GoogleRatingBadge />
      </div>
      
      {/* Fixed height for title */}
      <h1 className="md:text-5xl text-white mb-2 max-w-2xl font-thin text-2xl h-8 md:h-14 flex items-center justify-center">
        Spiti Valley Travels
      </h1>
      
      {/* Fixed height for subheading */}
      <div className="h-10 flex items-center justify-center mb-4">
        <p className="text-white text-sm md:text-base max-w-lg">
          Begin your Spiti adventure with us – your local guides to explore more...
        </p>
      </div>
      
      <Button 
        variant="outline" 
        className="bg-transparent border border-white text-white hover:bg-white/20" 
        onClick={scrollToDiscoverSection}
      >
        Explore Tours
      </Button>
    </div>
  );
};

export default HeroContent;
