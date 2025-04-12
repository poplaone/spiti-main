
import { memo } from 'react';
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
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
      {/* Fixed dimensions for logo container to prevent layout shifts */}
      <div className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-4">
        <img 
          alt="Spiti Valley Travels Logo" 
          className="w-full h-full object-contain" 
          src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
          width={isMobile ? 48 : 64} 
          height={isMobile ? 48 : 64} 
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      {/* Google Ratings Badge - Fixed height to prevent shifts */}
      <div className="mb-2 md:mb-3">
        <GoogleRatingBadge />
      </div>
      
      {/* Title with responsive sizing */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 max-w-3xl font-normal leading-tight">
        Spiti Valley Travels
      </h1>
      
      {/* Subheading with responsive sizing */}
      <p className="text-white text-sm md:text-base lg:text-lg max-w-xl font-medium mb-4 md:mb-6 px-4">
        Begin your Spiti adventure with us – your local guides to explore more...
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
