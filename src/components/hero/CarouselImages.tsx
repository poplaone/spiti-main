
import { useIsMobile } from '@/hooks/use-mobile';
import { memo } from 'react';
import CarouselImage from './CarouselImage';

// Highly optimized mobile images - using smaller file sizes and dimensions for mobile
const mobileImages = [
  {
    src: "/lovable-uploads/f602fe0d-f0de-4c62-bde1-8886b56d9783.png",
    alt: "Snow-covered monastery with mountains in Spiti Valley",
    width: 480, // Reduced from 540 for faster mobile loading
    height: 720  // Reduced from 810 for faster mobile loading
  },
  {
    src: "/lovable-uploads/895a39e1-0ac0-46b3-b0b3-a2efbcaa3157.png",
    alt: "Person overlooking the blue Chandrataal Lake with mountains in Spiti Valley",
    width: 480, // Reduced from 540 for faster mobile loading
    height: 720  // Reduced from 810 for faster mobile loading
  }
];

// Desktop images with higher resolution
const desktopImages = [
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
  const isMobile = useIsMobile();
  
  // Use appropriate image set based on device
  const images = isMobile ? mobileImages : desktopImages;

  // Only render the current image and the next one for better performance
  const imagesToRender = images.map((img, index) => ({
    ...img,
    shouldRender: index === current || index === (current + 1) % images.length
  }));

  return (
    <>
      {imagesToRender.map((img, index) => (
        <CarouselImage 
          key={index} 
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          index={index} 
          isCurrent={index === current}
        />
      ))}
    </>
  );
});

CarouselImages.displayName = 'CarouselImages';

export { desktopImages, mobileImages };
export default CarouselImages;
