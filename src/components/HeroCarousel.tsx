
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
  
  // Use the carouselImages directly instead of separate desktop/mobile sets
  const images = carouselImages;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Use a longer interval on mobile to reduce resource usage
  useEffect(() => {
    resetTimeout();
    // Set a longer timeout for better performance
    const interval = isMobile ? 15000 : 12000; // 15 seconds on mobile, 12 seconds on desktop
    
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      interval
    );
    
    return resetTimeout;
  }, [current, images.length, resetTimeout, isMobile]);

  const scrollToDiscoverSection = useCallback(() => {
    const element = document.querySelector('#discover-spiti-valley');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

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

export default memo(HeroCarousel); // Memoize the entire component
