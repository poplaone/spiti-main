
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
  const isFirstRender = useRef(true);
  const isVisible = useRef(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Use a longer interval and only start rotation after initial render
  useEffect(() => {
    // Skip animation if not visible, on first render, or in prerender
    if (!isVisible.current || isFirstRender.current || typeof window === 'undefined') {
      isFirstRender.current = false;
      return;
    }
    
    resetTimeout();
    
    // Set a longer timeout for better performance
    const interval = isMobile ? 15000 : 12000; // 15 seconds on mobile, 12 seconds on desktop
    
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % images.length), 
      interval
    );
    
    return resetTimeout;
  }, [current, images.length, resetTimeout, isMobile]);

  // Optimize visibility observer to pause animations when not visible
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only update if visibility changes
        if (entries[0]?.isIntersecting !== isVisible.current) {
          isVisible.current = !!entries[0]?.isIntersecting;
        }
      },
      { threshold: 0.1 }
    );
    
    const heroElement = heroRef.current;
    if (heroElement) {
      observer.observe(heroElement);
    }
    
    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
      observer.disconnect();
    };
  }, []);

  const scrollToDiscoverSection = useCallback(() => {
    const element = document.querySelector('#discover-spiti-valley');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Fixed dimensions for the hero container
  const heroHeight = isMobile ? '500px' : '600px';

  return (
    <div 
      ref={heroRef}
      className="relative w-full overflow-hidden bg-gray-900 hero-carousel"
      style={{ 
        height: '100vh', 
        minHeight: heroHeight,
        maxHeight: '100vh',
        aspectRatio: '16/9' 
      }}
    >
      <div className="w-full h-full">
        <MemoizedCarouselImages current={current} />
      </div>
      <MemoizedHeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <MemoizedCarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default memo(HeroCarousel);
