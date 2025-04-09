
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
  const [isLoaded, setIsLoaded] = useState(index === 0); // Assume first image is already loaded

  // Load all images immediately but only show the current one
  useEffect(() => {
    // Create an image object to preload
    if (index !== 0 && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [index, isLoaded, src]);

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading={index === 0 ? "eager" : "lazy"}
        width={width}
        height={height}
        fetchPriority={index === 0 ? "high" : "auto"}
        decoding={index === 0 ? "sync" : "async"}
      />
      {/* Optimized gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
