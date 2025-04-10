
import { memo, useEffect, useState } from 'react';
import CarouselImage from './CarouselImage';
import { useIsMobile } from '@/hooks/use-mobile';

// Optimize image dimensions for mobile
const carouselImages = [
  {
    src: "/lovable-uploads/f602fe0d-f0de-4c62-bde1-8886b56d9783.png",
    alt: "Snow-covered monastery with mountains in Spiti Valley",
    width: 1280,
    height: 720,
    mobileSrc: "/lovable-uploads/f602fe0d-f0de-4c62-bde1-8886b56d9783.png", // Same image but could be optimized
    mobileWidth: 640,
    mobileHeight: 360
  },
  {
    src: "/lovable-uploads/895a39e1-0ac0-46b3-b0b3-a2efbcaa3157.png",
    alt: "Person overlooking the blue Chandrataal Lake with mountains in Spiti Valley",
    width: 1280,
    height: 720,
    mobileSrc: "/lovable-uploads/895a39e1-0ac0-46b3-b0b3-a2efbcaa3157.png", // Same image but could be optimized
    mobileWidth: 640,
    mobileHeight: 360
  }
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = memo(({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 1 });
  
  // Calculate visible range based on current image
  useEffect(() => {
    const start = Math.max(0, current - 1);
    const end = Math.min(carouselImages.length - 1, current + 1);
    setVisibleRange({ start, end });
  }, [current]);
  
  // Only render images that are close to the current one
  return (
    <>
      {carouselImages.map((img, index) => {
        const inRange = index >= visibleRange.start && index <= visibleRange.end;
        // Skip rendering images far from current view for better performance
        if (!inRange && index !== current) return null;
        
        return (
          <CarouselImage 
            key={index} 
            src={isMobile ? img.mobileSrc : img.src}
            alt={img.alt}
            width={isMobile ? img.mobileWidth : img.width}
            height={isMobile ? img.mobileHeight : img.height}
            index={index} 
            isCurrent={index === current}
          />
        );
      })}
    </>
  );
});

CarouselImages.displayName = 'CarouselImages';

export { carouselImages };
export default CarouselImages;
