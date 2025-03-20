
import React, { useRef, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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

  useEffect(() => {
    // Auto scroll functionality for mobile
    const startAutoScroll = () => {
      if (window.innerWidth < 768) { // Only for mobile
        let currentIndex = 0;
        
        autoScrollInterval.current = setInterval(() => {
          if (carouselRef.current) {
            currentIndex = (currentIndex + 1) % infoItems.length;
            const scrollAmount = currentIndex * (carouselRef.current.scrollWidth / infoItems.length);
            carouselRef.current.scrollTo({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
        }, 3000); // Scroll every 3 seconds
      }
    };

    startAutoScroll();

    // Clean up interval on unmount
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

  return (
    <div className="bg-spiti-forest text-white py-2 overflow-hidden">
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
