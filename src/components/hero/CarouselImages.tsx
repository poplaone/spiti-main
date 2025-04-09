
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useCallback } from 'react';
import CarouselImage from './CarouselImage';

// Highly optimized mobile images at smaller file sizes
const mobileImages = [
  {
    src: "/lovable-uploads/77160f74-955b-48e1-a67a-23a220f55ad7.png",
    alt: "Snow-covered Key Monastery in winter",
    width: 540,
    height: 810
  },
  {
    src: "/lovable-uploads/4c671f64-f143-4e1d-9875-5e9aaaa33ca7.png",
    alt: "Key Monastery with snow-capped mountains in Spiti Valley",
    width: 540,
    height: 810
  }
];

// Desktop images with higher resolution
const desktopImages = [
  {
    src: "/lovable-uploads/8edf4fb0-5e63-4e88-8ca8-0d0d40eb7626.png",
    alt: "Key Monastery with snow-capped mountains",
    width: 1280,
    height: 720
  },
  {
    src: "/lovable-uploads/84853251-2ed0-409f-aee1-a9b4e9a7f41e.png",
    alt: "Suspension bridge in Spiti Valley with mountains in background",
    width: 1280,
    height: 720
  }
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = ({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // Use appropriate image set based on device
  const images = isMobile ? mobileImages : desktopImages;
  
  const handleImageLoad = useCallback(() => {
    setImagesLoaded(prev => prev + 1);
  }, []);

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
          onLoad={handleImageLoad}
        />
      ))}
    </>
  );
};

export { desktopImages, mobileImages };
export default CarouselImages;
