
import { memo } from 'react';
import CarouselImage from './CarouselImage';

// Define optimized image sizes
const carouselImages = [
  {
    src: "/lovable-uploads/f602fe0d-f0de-4c62-bde1-8886b56d9783.png",
    alt: "Snow-covered monastery with mountains in Spiti Valley",
    width: 1280,
    height: 720
  },
  {
    src: "/lovable-uploads/895a39e1-0ac0-46b3-b0b3-a2efbcaa3157.png",
    alt: "Person overlooking the blue Chandrataal Lake with mountains in Spiti Valley",
    width: 1280,
    height: 720
  }
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = memo(({ current }: CarouselImagesProps) => {
  return (
    <>
      {carouselImages.map((img, index) => {
        // Only render the current image and the next one (with wrap-around)
        const nextIndex = (current + 1) % carouselImages.length;
        const shouldRender = index === current || index === nextIndex;
        
        if (!shouldRender && index !== 0) return null;
        
        return (
          <CarouselImage 
            key={index} 
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            index={index} 
            isCurrent={index === current}
          />
        );
      })}
    </>
  );
});

CarouselImages.displayName = 'CarouselImages';

export default CarouselImages;
export { carouselImages };
