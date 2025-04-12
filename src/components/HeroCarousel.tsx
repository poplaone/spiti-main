
import { useEffect, useRef, useState, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages from './hero/CarouselImages';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';
import { carouselImages } from './hero/CarouselImages';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track if component is visible to pause animations when not visible
  const isVisible = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Use intersection observer to only animate when visible
  useEffect(() => {
    // Skip animation setup for first render to prioritize initial paint
    if (document.readyState !== 'complete') return;
    
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && timeoutRef.current === null) {
          resetTimeout();
          const interval = 15000; // Longer interval for better performance
          timeoutRef.current = window.setTimeout(() => 
            setCurrent(prev => (prev + 1) % carouselImages.length), 
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
  }, []);

  // Start carousel after the page is fully loaded
  useEffect(() => {
    const handleLoad = () => {
      const interval = 15000;
      timeoutRef.current = window.setTimeout(() => 
        setCurrent(prev => (prev + 1) % carouselImages.length), 
        interval
      );
    };
    
    // Defer carousel start until page is fully loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
      resetTimeout();
    };
  }, []);

  const scrollToDiscoverSection = () => {
    const element = document.querySelector('#discover-spiti-valley');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      style={{ height: '100vh', minHeight: isMobile ? '500px' : '600px' }}
    >
      <div className="w-full h-full">
        <CarouselImages current={current} />
      </div>
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <CarouselIndicators images={carouselImages} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default memo(HeroCarousel);
