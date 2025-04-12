
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
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 mt-[-60px] md:mt-0">
      {/* Fixed dimensions for logo container to prevent layout shifts */}
      <div className="w-24 h-24 md:w-40 md:h-40 mb-1 md:mb-4 mt-[-30px] md:mt-0"
           style={{ width: isMobile ? '96px' : '160px', height: isMobile ? '96px' : '160px' }}>
        <img 
          alt="Spiti Valley Travels Logo" 
          className="w-full h-full object-contain" 
          src="/lovable-uploads/1baa95d9-8696-4505-ae05-c0b4a0e805ed.png" 
          width={isMobile ? 96 : 160} 
          height={isMobile ? 96 : 160} 
          loading="eager"
        />
      </div>
      
      {/* Google Ratings Badge - Fixed height to prevent shifts */}
      <div className="h-8 md:h-10 flex items-center justify-center" 
           style={{ height: isMobile ? '32px' : '40px' }}>
        <GoogleRatingBadge />
      </div>
      
      {/* Fixed height for title to prevent shifts */}
      <h1 className="md:text-6xl font-display text-white mb-3 md:mb-4 max-w-3xl font-thin text-2xl h-8 md:h-16 flex items-center justify-center"
          style={{ height: isMobile ? '32px' : '64px', fontSize: isMobile ? '24px' : '48px' }}>
        Spiti Valley Travels
      </h1>
      
      {/* Fixed height for subheading to prevent shifts */}
      <div className="h-12 md:h-14 flex items-center justify-center mb-4 md:mb-6"
           style={{ height: isMobile ? '48px' : '56px' }}>
        <p className="text-white text-sm md:text-lg max-w-xl font-medium">
          Begin your Spiti adventure with us – your local guides to explore more...
        </p>
      </div>
      
      <Button variant="outline" className="bg-transparent border border-white text-white hover:bg-white/20 mt-1" onClick={scrollToDiscoverSection}>
        Explore Tours
      </Button>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';
export default HeroContent;
