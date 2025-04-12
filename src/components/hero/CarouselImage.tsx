
import { memo, useState } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ src, alt, width, height, index, isCurrent }: CarouselImageProps) => {
  const [isLoaded, setIsLoaded] = useState(index === 0); // Consider first image as pre-loaded
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-500 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Simplified rendering approach with better performance characteristics */}
      <img 
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={index === 0 ? "eager" : "lazy"}
        decoding={index === 0 ? "sync" : "async"}
        fetchPriority={index === 0 ? "high" : "auto"}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
      {/* Only add overlay if loaded to prevent unnecessary repaints */}
      {isLoaded && <div className="absolute inset-0 bg-black opacity-30"></div>}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
