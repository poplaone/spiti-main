
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { desktopImages, mobileImages } from './hero/CarouselImages';
import CarouselControls from './hero/CarouselControls';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Use the appropriate image set based on device type
  const images = isMobile ? mobileImages : desktopImages;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    // Set a longer timeout for better performance - 6 seconds instead of 5
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      6000
    );
    
    return resetTimeout;
  }, [current, images.length]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent((current + 1) % images.length);
  };

  const scrollToDiscoverSection = () => {
    document.querySelector('#discover-spiti-valley')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CarouselImages current={current} />
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <CarouselControls goToPrevious={goToPrevious} goToNext={goToNext} />
      <CarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default HeroCarousel;
