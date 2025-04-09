
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
    // Set a longer timeout for better performance - 6 seconds instead of 5
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      6000
    );
    
    return resetTimeout;
  }, [current, images.length, resetTimeout]);

  // Removed the goToPrevious and goToNext functions since we're removing the arrows

  const scrollToDiscoverSection = () => {
    document.querySelector('#discover-spiti-valley')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CarouselImages current={current} />
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      {/* Removed CarouselControls component which contained the arrows */}
      <CarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default HeroCarousel;
