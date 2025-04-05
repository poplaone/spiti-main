
import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoplayPlugin from 'embla-carousel-autoplay';

interface MobileInfoStripProps {
  items: string[];
}

const MobileInfoStrip = ({ items }: MobileInfoStripProps) => {
  // Use a ref to store the autoplay plugin instance
  const autoplayRef = useRef<any>(null);
  
  // Create the autoplay plugin with options, safely handling initialization
  useEffect(() => {
    try {
      // Create the plugin instance but don't assign to ref yet
      const plugin = AutoplayPlugin({ 
        delay: 3000, 
        stopOnInteraction: false,
        stopOnMouseEnter: false, // Continue even when hovering for better UX
      });
      
      // Now assign to ref
      autoplayRef.current = plugin;
    } catch (error) {
      console.error('Error creating autoplay plugin:', error);
      autoplayRef.current = null;
    }
    
    // Clean up plugin on unmount - with proper null checking
    return () => {
      if (autoplayRef.current && 
          typeof autoplayRef.current === 'object' && 
          autoplayRef.current.destroy && 
          typeof autoplayRef.current.destroy === 'function') {
        try {
          autoplayRef.current.destroy();
        } catch (error) {
          console.error('Error destroying autoplay plugin:', error);
        }
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
