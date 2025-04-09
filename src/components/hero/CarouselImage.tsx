
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
  const [isLoaded, setIsLoaded] = useState(index === 0); // Only consider first image as pre-loaded

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  // Only load images when they're either the first one or about to be displayed
  // This prevents loading all images at once on mobile
  const shouldLoad = index === 0 || isCurrent || index === ((isCurrent ? 1 : 0) + index) % 3;
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      {shouldLoad && (
        <>
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </>
      )}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
