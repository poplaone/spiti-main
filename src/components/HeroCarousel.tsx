
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { desktopImages, mobileImages } from './hero/CarouselImages';
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
  const mounted = useRef(false);
  
  // Use the appropriate image set based on device type
  const images = isMobile ? mobileImages : desktopImages;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Remove hero placeholder after component mounts
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      const placeholder = document.querySelector('.hero-placeholder');
      if (placeholder) {
        // Short delay before starting the fade to ensure smooth transition
        requestAnimationFrame(() => {
          placeholder.classList.add('fade-out');
          // Remove from DOM after fade completes
          setTimeout(() => {
            placeholder.remove();
          }, 500);
        });
      }
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    // Set a longer timeout for better performance - 12 seconds
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      12000
    );
    
    return resetTimeout;
  }, [current, images.length, resetTimeout]);

  const scrollToDiscoverSection = useCallback(() => {
    document.querySelector('#discover-spiti-valley')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
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

export default HeroCarousel;
