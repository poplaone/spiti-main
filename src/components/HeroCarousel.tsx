
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

  // Fixed dimensions for the hero container
  const heroHeight = isMobile ? '500px' : '600px';

  return (
    <CarouselContainer ref={heroRef} heroHeight={heroHeight}>
      <div className="w-full h-full">
        <CarouselImages current={current} />
      </div>
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <CarouselIndicators images={carouselImages} current={current} setCurrent={setCurrent} />
    </CarouselContainer>
  );
};

export default memo(HeroCarousel);
