
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import CarouselImage from './CarouselImage';

// Different sets of images for mobile and desktop
const desktopImages = [
  "/lovable-uploads/19314897-9ee9-4163-83f6-c3e10cec290f.png", // Chandrataal Lake with mountains
  "/lovable-uploads/9b3798e9-cc2d-469e-b579-f362903a5f9d.png", // Milky Way night sky over mountains
  "/lovable-uploads/84853251-2ed0-409f-aee1-a9b4e9a7f41e.png", // Suspension bridge in Spiti Valley
  "/lovable-uploads/8edf4fb0-5e63-4e88-8ca8-0d0d40eb7626.png"  // Key Monastery with snow-capped mountains
];

const mobileImages = [
  "/lovable-uploads/fa13766a-c062-495a-bbe3-ba96893628e0.png", // Snowy temple/monastery
  "/lovable-uploads/fe95c61b-1c4d-48be-9e18-1d3b19b7c41e.png", // River valley
  "/lovable-uploads/adad2c0d-065d-4ed9-a5f6-70262700ac90.png"  // Motorcycles on mountain road
];

interface CarouselImagesProps {
  current: number;
}

const CarouselImages = ({ current }: CarouselImagesProps) => {
  const isMobile = useIsMobile();
  const [imagesToShow, setImagesToShow] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({0: false});
  
  // Wait for the isMobile value to be determined before showing any images
  useEffect(() => {
    if (isMobile !== undefined) {
      const appropriateImages = isMobile ? mobileImages : desktopImages;
      setImagesToShow(appropriateImages);
      setIsLoaded(true);
    }
  }, [isMobile]);

  // Track image loading state
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({...prev, [index]: true}));
  };

  // Preload the next image when current changes
  useEffect(() => {
    if (imagesToShow.length > 0) {
      // Preload the next image (circular)
      const nextIdx = (current + 1) % imagesToShow.length;
      
      if (!loadedImages[nextIdx]) {
        const img = new Image();
        img.src = imagesToShow[nextIdx];
        img.onload = () => handleImageLoad(nextIdx);
      }
    }
  }, [current, imagesToShow, loadedImages]);

  // Don't render anything until we know which device type we're on
  if (!isLoaded) {
    return <div className="absolute inset-0 bg-gray-900"></div>; // Placeholder while loading
  }

  return (
    <>
      {imagesToShow.map((src, index) => (
        <CarouselImage 
          key={index} 
          src={src} 
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
