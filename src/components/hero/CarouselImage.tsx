
import { memo, useState, useEffect } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ 
  src, 
  alt,
  width,
  height,
  index, 
  isCurrent
}: CarouselImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(index === 0);

  // Optimize image loading strategy
  useEffect(() => {
    // When an image becomes current, make it visible
    if (isCurrent) {
      setIsVisible(true);
    }
  }, [isCurrent]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Only render the actual image element when needed
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      {isVisible && (
        <>
          <img 
            src={src} 
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={handleLoad}
            width={width}
            height={height}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding={index === 0 ? "sync" : "async"}
          />
          {/* Optimized gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </>
      )}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
