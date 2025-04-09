
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState, useCallback } from 'react';
import CarouselImage from './CarouselImage';

// Different sets of optimized images for mobile and desktop
const desktopImages = [
  {
    src: "/lovable-uploads/84853251-2ed0-409f-aee1-a9b4e9a7f41e.png",
    alt: "Suspension bridge in Spiti Valley",
    width: 1280,
    height: 720
  },
  {
    src: "/lovable-uploads/8edf4fb0-5e63-4e88-8ca8-0d0d40eb7626.png",
    alt: "Key Monastery with snow-capped mountains",
    width: 1280,
    height: 720
  }
];

// Updated mobile images with optimized dimensions and new images
const mobileImages = [
  {
    src: "/lovable-uploads/4c671f64-f143-4e1d-9875-5e9aaaa33ca7.png",
    alt: "Buddha statue under starry night sky in Spiti Valley",
    width: 640,
    height: 960
  },
  {
    src: "/lovable-uploads/77160f74-955b-48e1-a67a-23a220f55ad7.png",
    alt: "Snow-covered Key Monastery in winter",
    width: 640,
    height: 960
  },
  {
    src: "/lovable-uploads/835ac6dc-55c3-49d5-8e8f-78369e09cc19.png",
    alt: "Person overlooking Chandrataal lake with mountains",
    width: 640,
    height: 960
  }
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = ({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const [imagesToShow, setImagesToShow] = useState<typeof desktopImages>([]);
  
  // Set images as soon as possible
  useEffect(() => {
    // Default to mobile images if we don't know yet (better mobile experience)
    setImagesToShow(isMobile === undefined ? mobileImages : (isMobile ? mobileImages : desktopImages));
  }, [isMobile]);

  // Only render images that are current or next in sequence
  const shouldRender = (index: number) => {
    return index === current || index === (current + 1) % imagesToShow.length;
  };

  const handleImageLoad = useCallback((index: number) => {
    // Nothing to do on load anymore - we're optimizing for immediate display
  }, []);

  return (
    <>
      {imagesToShow.map((img, index) => (
        <CarouselImage 
          key={index} 
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          index={index} 
          isCurrent={index === current}
          onLoad={() => handleImageLoad(index)}
        />
      ))}
    </>
  );
};

export { desktopImages, mobileImages };
export default CarouselImages;
