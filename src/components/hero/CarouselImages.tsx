
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
