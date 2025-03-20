
import React, { useRef, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollingInfoStrip = () => {
  const infoItems = [
    "Customize your Spiti Valley Holiday in 2025",
    "Spiti Valley Treks from INR 14,750",
    "Full Circuit Spiti Valley Group Departures 2025",
    "Winter Road Trips for 2025",
    "Road Trips to Zanskar & Ladakh"
  ];

  // For auto scrolling on mobile carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto scroll functionality for mobile
    const startAutoScroll = () => {
      if (isMobile) {
        autoScrollInterval.current = setInterval(() => {
          const nextIndex = (currentIndex + 1) % infoItems.length;
          setCurrentIndex(nextIndex);
          
          if (carouselRef.current) {
            const scrollAmount = nextIndex * (carouselRef.current.scrollWidth / infoItems.length);
            carouselRef.current.scrollTo({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
        }, 1000); // Scroll every 1 second
      }
    };

    startAutoScroll();

    // Clean up interval on unmount
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [currentIndex, isMobile, infoItems.length]);

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
        
        {/* Mobile version - manual swipeable and auto-scrolling */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent className="py-1" ref={carouselRef}>
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
