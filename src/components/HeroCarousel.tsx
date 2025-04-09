
import { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { desktopImages, mobileImages } from './hero/CarouselImages';
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
    }
  }, []);

  // Remove hero placeholder after component mounts
  useEffect(() => {
    const placeholder = document.querySelector('.hero-placeholder');
    if (placeholder) {
      placeholder.classList.add('fade-out');
      // Remove from DOM after fade completes
      setTimeout(() => {
        placeholder.remove();
      }, 500);
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

  const scrollToDiscoverSection = () => {
    document.querySelector('#discover-spiti-valley')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div className="w-full h-full">
        <CarouselImages current={current} />
      </div>
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <CarouselIndicators images={images} current={current} setCurrent={setCurrent} />
    </div>
  );
};

export default HeroCarousel;
