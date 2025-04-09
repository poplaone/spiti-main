
import { useIsMobile } from '@/hooks/use-mobile';
import { memo } from 'react';
import CarouselImage from './CarouselImage';

// Define image arrays that will be used throughout the component
export const desktopImages = [
  {
    src: "/lovable-uploads/84853251-2ed0-409f-aee1-a9b4e9a7f41e.png",
    alt: "Suspension bridge in Spiti Valley",
    width: 1280,
    height: 720
  }
];

export const mobileImages = [
  {
    src: "/lovable-uploads/4c671f64-f143-4e1d-9875-5e9aaaa33ca7.png",
    alt: "Buddha statue under starry night sky in Spiti Valley",
    width: 640,
    height: 960
  }
];

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CarouselImagesProps {
  current: number;
}

const CarouselImages = memo(({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const images = isMobile ? mobileImages : desktopImages;

  return (
    <>
      {images.map((img, index) => (
        <CarouselImage 
          key={index} 
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          index={index} 
          isCurrent={index === current}
          onLoad={() => {
            // Mark the LCP as complete with an empty callback
            if (index === 0) {
              window.performance?.mark?.('hero-image-loaded');
            }
          }}
        />
      ))}
    </>
  );
});

CarouselImages.displayName = 'CarouselImages';

// Removed duplicate exports here - they were already exported at the top of the file
export default CarouselImages;
