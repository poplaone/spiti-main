
import { useEffect, useRef, useState, useCallback } from 'react';
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

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    // Only set timeout if images have loaded
    if (images.length > 0) {
      timeoutRef.current = window.setTimeout(() => setCurrent(prevIndex => (prevIndex + 1) % images.length), 5000);
    }
    return resetTimeout;
  }, [current, images.length, resetTimeout]);

  const goToPrevious = useCallback(() => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }, [current, images.length]);

  const goToNext = useCallback(() => {
    setCurrent((current + 1) % images.length);
  }, [current, images.length]);

  const scrollToDiscoverSection = useCallback(() => {
    const discoverSection = document.querySelector('#discover-spiti-valley');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Images */}
      <CarouselImages current={current} />
      
      {/* Hero Content */}
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      
      {/* Navigation Controls */}
      <CarouselControls goToPrevious={goToPrevious} goToNext={goToNext} />
      
      {/* Indicator Dots */}
      <CarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default HeroCarousel;
