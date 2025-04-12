
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
  
  // Directly reference carouselImages instead of computing it
  const images = carouselImages;
  const isFirstRender = useRef(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track if component is visible to pause animations when not visible
  const isVisible = useRef(true);
  
  // Only run carousel when in viewport
  const observerRef = useRef<IntersectionObserver | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Use intersection observer to only animate when visible
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        // Only start carousel when visible
        if (entry.isIntersecting && timeoutRef.current === null) {
          resetTimeout();
          
          // Use a longer interval for better performance
          const interval = isMobile ? 15000 : 12000;
          
          timeoutRef.current = window.setTimeout(() => 
            setCurrent(prev => (prev + 1) % images.length), 
            interval
          );
        } else if (!entry.isIntersecting) {
          resetTimeout();
        }
      },
      { threshold: 0.1 }
    );
    
    const heroElement = heroRef.current;
    if (heroElement && observerRef.current) {
      observerRef.current.observe(heroElement);
    }
    
    return () => {
      if (heroElement && observerRef.current) {
        observerRef.current.unobserve(heroElement);
      }
      resetTimeout();
    };
  }, [images.length, isMobile, resetTimeout]);

  // Start carousel on first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initial timeout to start carousel
      const interval = isMobile ? 15000 : 12000;
      timeoutRef.current = window.setTimeout(() => 
        setCurrent(prev => (prev + 1) % images.length), 
        interval
      );
    }
    
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
    <div 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900 hero-carousel"
      style={{ 
        height: '100vh', 
        minHeight: isMobile ? '500px' : '600px',
        // Set fixed dimensions to prevent layout shifts
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
