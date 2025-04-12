
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

  // Adjusted height for better mobile experience
  const heroHeight = isMobile ? '100vh' : '100vh';

  return (
    <CarouselContainer ref={heroRef} heroHeight={heroHeight}>
      {/* Add a placeholder solid color background for fast initial render */}
      <div className="w-full h-full bg-spiti-forest bg-opacity-20"></div>
      <div className="w-full h-full">
        <CarouselImages current={current} />
      </div>
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
      <CarouselIndicators images={carouselImages} current={current} setCurrent={setCurrent} />
    </CarouselContainer>
  );
};

export default memo(HeroCarousel);
