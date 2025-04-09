
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

  // More efficient image loading strategy
  useEffect(() => {
    if (index !== 0 && !isLoaded) {
      // Only create the Image object if not already loaded
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = src; // Set src after onload to ensure event fires
    }
    // Clean up function to prevent memory leaks
    return () => {
      if (index !== 0 && !isLoaded) {
        // Clear any pending operations
        setIsLoaded(false);
      }
    };
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
        style={{ contentVisibility: index === 0 ? 'visible' : 'auto' }}
      />
      {/* Simplified gradient overlay for better performance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
