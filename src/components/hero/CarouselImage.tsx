
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

  // Critical optimization: Only load the current image and next image
  // This significantly improves performance on mobile
  const shouldLoad = index === 0 || isCurrent || index === (index + 1) % 3;
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      {shouldLoad && (
        <>
          {/* Use proper image loading attributes for performance */}
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
          {/* Simplified overlay gradient for better performance */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        </>
      )}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
