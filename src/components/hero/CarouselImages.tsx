
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

const mobileImages = [
  {
    src: "/lovable-uploads/fa13766a-c062-495a-bbe3-ba96893628e0.png",
    alt: "Snowy temple/monastery",
    width: 768,
    height: 1024
  },
  {
    src: "/lovable-uploads/fe95c61b-1c4d-48be-9e18-1d3b19b7c41e.png",
    alt: "River valley",
    width: 768,
    height: 1024
  },
  {
    src: "/lovable-uploads/5b82c4c3-e5f4-4752-8825-2aaa8634642a.png",
    alt: "Person looking at Chandrataal lake",
    width: 768,
    height: 1024
  }
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = ({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const [imagesToShow, setImagesToShow] = useState<typeof desktopImages>(isMobile === undefined ? [] : (isMobile ? mobileImages : desktopImages));
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({0: false});
  
  // Immediately show images once we know device type
  useEffect(() => {
    if (isMobile !== undefined) {
      const appropriateImages = isMobile ? mobileImages : desktopImages;
      setImagesToShow(appropriateImages);
      setIsLoaded(true);
    }
  }, [isMobile]);

  // Memoize the image load handler to prevent unnecessary re-renders
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => ({...prev, [index]: true}));
  }, []);

  // Preload the next image when current changes
  useEffect(() => {
    if (imagesToShow.length > 0 && current !== undefined) {
      // Preload the next image (circular)
      const nextIdx = (current + 1) % imagesToShow.length;
      
      if (!loadedImages[nextIdx]) {
        const img = new Image();
        img.src = imagesToShow[nextIdx].src;
        img.onload = () => handleImageLoad(nextIdx);
      }
    }
  }, [current, imagesToShow, loadedImages, handleImageLoad]);

  // Don't render anything until we know which device type we're on
  if (!isLoaded) {
    return null; // No loading placeholder - will use the HTML fallback
  }

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
