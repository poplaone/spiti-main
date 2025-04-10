
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
  
  const images = carouselImages;
  const isFirstRender = useRef(true);
  const isPaused = useRef(false);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Use a longer interval on mobile to reduce resource usage and battery drain
  useEffect(() => {
    // Don't start animation if user has manually paused
    if (isPaused.current) return;
    
    resetTimeout();
    
    // Skip animation on first render for better performance
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Set a longer timeout for better performance on mobile
    const interval = isMobile ? 18000 : 12000; // 18 seconds on mobile, 12 seconds on desktop
    
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      interval
    );
    
    return resetTimeout;
  }, [current, images.length, resetTimeout, isMobile]);

  // Manually change slide and pause auto-rotation when user interacts
  const handleManualChange = useCallback((index: number) => {
    setCurrent(index);
    isPaused.current = true;
    
    // Resume auto-rotation after 30 seconds of inactivity
    resetTimeout();
    timeoutRef.current = window.setTimeout(() => {
      isPaused.current = false;
      setCurrent(prevIndex => (prevIndex + 1) % images.length);
    }, 30000);
  }, [images.length, resetTimeout]);
  
  const scrollToDiscoverSection = useCallback(() => {
    const element = document.querySelector('#discover-spiti-valley');
    if (!element) return;
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="w-full h-full">
        <MemoizedCarouselImages current={current} />
      </div>
      <MemoizedHeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <MemoizedCarouselIndicators 
        images={images} 
        current={current} 
        setCurrent={handleManualChange} 
      />
    </div>
  );
};

export default memo(HeroCarousel);
