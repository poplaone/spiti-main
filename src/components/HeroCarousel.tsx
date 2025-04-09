
import { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { desktopImages, mobileImages } from './hero/CarouselImages';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Use the appropriate image set based on device type
  const images = isMobile ? mobileImages : desktopImages;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    // Set a longer timeout for better performance - 8 seconds instead of 6
    // This reduces CPU usage for animations on mobile
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      8000
    );
    
    return resetTimeout;
  }, [current, images.length, resetTimeout]);

  const scrollToDiscoverSection = () => {
    document.querySelector('#discover-spiti-valley')?.scrollIntoView({ 
      behavior: 'smooth',
      // Add block: 'start' for better scrolling
      block: 'start'
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CarouselImages current={current} />
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <CarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default HeroCarousel;
