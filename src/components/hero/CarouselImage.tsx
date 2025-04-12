
import { memo } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ src, alt, width, height, index, isCurrent }: CarouselImageProps) => {
  // Only load the first image eagerly, load the rest on demand
  const loadingPriority = index === 0 ? "eager" : "lazy";
  const fetchPriority = index === 0 ? "high" as const : "auto" as const;
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-700 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      <img 
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingPriority}
        fetchPriority={fetchPriority}
        className="w-full h-full object-cover"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      {/* Darker overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
