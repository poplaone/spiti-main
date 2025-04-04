
import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoplayPlugin from 'embla-carousel-autoplay';

interface MobileInfoStripProps {
  items: string[];
}

const MobileInfoStrip = ({ items }: MobileInfoStripProps) => {
  // Use a ref to store the autoplay plugin instance
  const autoplayRef = useRef<ReturnType<typeof AutoplayPlugin> | null>(null);
  
  // Create the autoplay plugin with options
  useEffect(() => {
    // Only create the plugin once when the component mounts
    try {
      autoplayRef.current = AutoplayPlugin({ 
        delay: 3000, 
        stopOnInteraction: false,
        stopOnMouseEnter: false, // Continue even when hovering for better UX
      });
    } catch (error) {
      console.error('Error creating autoplay plugin:', error);
    }
    
    // Clean up plugin on unmount
    return () => {
      if (autoplayRef.current && typeof autoplayRef.current.destroy === 'function') {
        autoplayRef.current.destroy();
        autoplayRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="md:hidden">
      <Carousel 
        className="w-full"
        plugins={autoplayRef.current ? [autoplayRef.current] : undefined} 
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="py-1">
          {items.map((item, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="text-center text-xs px-2 py-1">
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileInfoStrip;
