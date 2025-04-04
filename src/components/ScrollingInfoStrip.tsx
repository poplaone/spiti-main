
import React, { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from 'embla-carousel-autoplay';

const ScrollingInfoStrip = () => {
  const infoItems = [
    "Customize your Spiti Valley Holiday in 2025",
    "Spiti Valley Tours from INR 18,900",
    "Full Circuit Spiti Valley Group Departures 2025",
    "Road Trips to Zanskar & Ladakh"
  ];

  const isMobile = useIsMobile();
  
  // Fix the plugin type issue by ensuring we're using it properly
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

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
          <Carousel 
            className="w-full"
            plugins={[autoplayPlugin.current]}
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
        </div>
      </div>
    </div>
  );
};

export default ScrollingInfoStrip;
