
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface MobileInfoStripProps {
  items: string[];
}

const MobileInfoStrip = ({ items }: MobileInfoStripProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  // Use a simpler autoplay implementation to avoid the plugin errors
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Set up a new interval
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5000);
    
    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [items.length]);

  return (
    <div className="md:hidden">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          startIndex: currentIndex
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
