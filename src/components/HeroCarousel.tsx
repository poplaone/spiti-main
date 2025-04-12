
import { memo, useCallback } from 'react';
import { useCarousel } from '@/hooks/useCarousel';
import CarouselContainer from './hero/CarouselContainer';
import CarouselImages, { carouselImages } from './hero/CarouselImages';
import CarouselIndicators from './hero/CarouselIndicators';
import HeroContent from './hero/HeroContent';

const HeroCarousel = () => {
  const { current, setCurrent, heroRef, isMobile } = useCarousel(carouselImages.length);
  
  const scrollToDiscoverSection = useCallback(() => {
    const element = document.querySelector('#discover-spiti-valley');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Set an explicit height for better mobile experience and to prevent CLS
  const heroHeight = isMobile ? '100vh' : '100vh';

  return (
    <CarouselContainer ref={heroRef} heroHeight={heroHeight}>
      {/* Image carousel */}
      <div className="absolute inset-0 w-full h-full">
        <CarouselImages current={current} />
      </div>
      
      {/* Hero content with fixed dimensions to prevent CLS */}
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      
      {/* Indicators for carousel navigation */}
      <CarouselIndicators images={carouselImages} current={current} setCurrent={setCurrent} />
    </CarouselContainer>
  );
};

export default memo(HeroCarousel);
