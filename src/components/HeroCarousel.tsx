
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages from './hero/CarouselImages';
import CarouselControls from './hero/CarouselControls';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Get images directly from CarouselImages
  const { mobileImages, desktopImages } = CarouselImages;
  const images = isMobile ? mobileImages : desktopImages;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    // Increased timeout for better performance
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      8000 // Increased from 6s to 8s to reduce CPU usage
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
