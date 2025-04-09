
import { memo, useState } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
  onLoad: () => void;
}

const CarouselImage = memo(({ 
  src, 
  alt,
  width,
  height,
  index, 
  isCurrent, 
  onLoad 
}: CarouselImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  // Always load both images since we only have two now
  // This simplifies the logic and ensures smoother transitions
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      {/* Simplified image with proper loading attributes */}
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading={index === 0 ? "eager" : "lazy"}
        onLoad={handleLoad}
        width={width}
        height={height}
        fetchPriority={index === 0 ? "high" : "auto"}
      />
      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
