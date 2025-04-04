
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import AutoplayPlugin from 'embla-carousel-autoplay';

const ScrollingInfoStrip = () => {
  const infoItems = [
    "Customize your Spiti Valley Holiday in 2025",
    "Spiti Valley Tours from INR 18,900",
    "Full Circuit Spiti Valley Group Departures 2025",
    "Road Trips to Zanskar & Ladakh"
  ];

  const isMobile = useIsMobile();
  const [autoplayPlugin, setAutoplayPlugin] = useState<any>(null);

  // Initialize the plugin after component mount to avoid type errors
  useEffect(() => {
    // Only create the plugin if we're on mobile
    if (isMobile) {
      // Create a new instance of the plugin with options
      const plugin = AutoplayPlugin({ 
        delay: 3000, 
        stopOnInteraction: false 
      });
      
      setAutoplayPlugin(plugin);
      
      // Safe cleanup function that checks if plugin exists before destroying
      return () => {
        if (plugin && typeof plugin.destroy === 'function') {
          try {
            plugin.destroy();
          } catch (error) {
            console.error('Error destroying autoplay plugin:', error);
          }
        }
      };
    }
    
    // No cleanup needed if plugin wasn't created
    return undefined;
  }, [isMobile]); // Re-initialize when mobile status changes

  return (
    <div className="bg-spiti-forest text-white py-1 overflow-hidden">
      <div className="relative">
        {/* Desktop version - static */}
        <div className="hidden md:flex justify-between items-center container mx-auto px-4">
          {infoItems.map((item, index) => (
            <div key={index} className="text-center text-sm px-4">
              {item}
            </div>
          ))}
        </div>
        
        {/* Mobile version - with auto-scrolling */}
        <div className="md:hidden">
          {isMobile && (
            <Carousel 
              className="w-full"
              plugins={autoplayPlugin ? [autoplayPlugin] : undefined} 
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="py-1">
                {infoItems.map((item, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="text-center text-xs px-2 py-1">
                      {item}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollingInfoStrip;
