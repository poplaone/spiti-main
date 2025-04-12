
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
      {/* Optimized logo for faster rendering */}
      <div className="w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4">
        <img 
          alt="Spiti Valley Travels Logo" 
          className="w-full h-full object-contain" 
          src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
          width={isMobile ? 64 : 96} 
          height={isMobile ? 64 : 96} 
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      
      {/* Simplified Google Ratings Badge */}
      <div className="mb-2 md:mb-3 h-[32px]">
        <GoogleRatingBadge />
      </div>
      
      {/* Simplified text content for faster rendering */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 max-w-3xl font-normal leading-tight">
        Spiti Valley Travels
      </h1>
      
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
