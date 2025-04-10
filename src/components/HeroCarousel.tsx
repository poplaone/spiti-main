
import { useRef, useState, useCallback, memo, useEffect } from 'react';
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
  const isPaused = useRef(false);
  
  // Set content as immediately visible
  const [contentVisible, setContentVisible] = useState(true);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Make sure the hero carousel starts with immediate content visibility
  useEffect(() => {
    // Force immediate rendering of carousel content
    document.documentElement.style.setProperty('--carousel-opacity', '1');
    document.documentElement.style.setProperty('--hero-content-opacity', '1');
    
    // Ensure content is displayed right away
    setContentVisible(true);
    
    return () => {
      resetTimeout();
    };
  }, [resetTimeout]);

  // Use a longer interval on mobile to reduce resource usage and battery drain
  useEffect(() => {
    // Don't start animation if user has manually paused
    if (isPaused.current) return;
    
    resetTimeout();
    
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
      {contentVisible && (
        <>
          <MemoizedHeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
          <MemoizedCarouselIndicators 
            images={images} 
            current={current} 
            setCurrent={handleManualChange} 
          />
        </>
      )}
    </div>
  );
};

export default memo(HeroCarousel);
