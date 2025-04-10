
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { carouselImages } from './hero/CarouselImages';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';

// Memoize components for better performance
const MemoizedCarouselImages = memo(CarouselImages);
const MemoizedCarouselIndicators = memo(CarouselIndicators);
const MemoizedHeroContent = memo(HeroContent);

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Use the carouselImages directly
  const images = carouselImages;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // On mobile, use an even longer timeout to save battery and resources
  useEffect(() => {
    resetTimeout();
    
    // Prevent unnecessary animation on mobile to save resources
    const interval = isMobile ? 20000 : 12000; // 20 seconds on mobile, 12 on desktop
    
    // Use requestIdleCallback where available for better mobile performance
    if (window.requestIdleCallback && isMobile) {
      window.requestIdleCallback(() => {
        timeoutRef.current = window.setTimeout(() => 
          setCurrent(prevIndex => (prevIndex + 1) % images.length), 
          interval
        );
      });
    } else {
      timeoutRef.current = window.setTimeout(() => 
        setCurrent(prevIndex => (prevIndex + 1) % images.length), 
        interval
      );
    }
    
    return resetTimeout;
  }, [current, images.length, resetTimeout, isMobile]);

  const scrollToDiscoverSection = useCallback(() => {
    const element = document.querySelector('#discover-spiti-valley');
    if (element) {
      // Smooth scroll for desktop, instant for mobile to save resources
      element.scrollIntoView({ 
        behavior: isMobile ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="w-full h-full">
        <MemoizedCarouselImages current={current} />
      </div>
      <MemoizedHeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <MemoizedCarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default memo(HeroCarousel);
