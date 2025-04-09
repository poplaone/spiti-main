
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselImages, { mobileImages, desktopImages } from './hero/CarouselImages';
import HeroContent from './hero/HeroContent';

const HeroCarousel = () => {
  const [current] = useState(0);
  const isMobile = useIsMobile();
  
  // Use simplified single-image arrays
  const images = isMobile ? mobileImages : desktopImages;

  const scrollToDiscoverSection = () => {
    document.querySelector('#discover-spiti-valley')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CarouselImages current={current} />
      <HeroContent scrollToDiscoverSection={scrollToDiscoverSection} />
    </div>
  );
};

export default HeroCarousel;
