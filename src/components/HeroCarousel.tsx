
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { desktopImages, mobileImages } from './hero/CarouselImages';
import CarouselControls from './hero/CarouselControls';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Use the appropriate image set based on device type
  const images = isMobile ? mobileImages : desktopImages;

  // Remove initial placeholder once component is mounted
  useEffect(() => {
    const heroPlaceholder = document.querySelector('.hero-placeholder');
    if (heroPlaceholder) {
      heroPlaceholder.classList.add('fade-out');
      setTimeout(() => {
        heroPlaceholder.remove();
        setIsLoaded(true);
      }, 300); // Reduced the transition time for faster display
    } else {
      setIsLoaded(true);
    }
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(() => setCurrent(prevIndex => (prevIndex + 1) % images.length), 5000);
    return () => {
      resetTimeout();
    };
  }, [current, images.length]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent((current + 1) % images.length);
  };

  const scrollToDiscoverSection = () => {
    const discoverSection = document.querySelector('#discover-spiti-valley');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Don't wait for isMobile to be defined before rendering
  if (!isLoaded) {
    return null; // Return null instead of using the HTML placeholder
  }

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
