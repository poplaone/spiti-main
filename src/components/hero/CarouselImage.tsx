
import { memo } from 'react';

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
  // Simplified loading strategy - only first image is eager
  const loadingStrategy = index === 0 ? "eager" : "lazy";
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isCurrent}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading={loadingStrategy}
        onLoad={onLoad}
        width={width}
        height={height}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
