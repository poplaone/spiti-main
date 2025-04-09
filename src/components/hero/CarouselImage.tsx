
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
  // First image loads eagerly with high priority, others lazy load
  const loadingStrategy = index === 0 ? "eager" : "lazy";
  const priorityAttr = index === 0 ? "high" : "auto";
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isCurrent}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading={loadingStrategy}
        fetchPriority={priorityAttr as "high" | "auto"}
        onLoad={onLoad}
        width={width}
        height={height}
        decoding="async"
      />
      {/* Simplified gradient overlay for performance */}
      {isCurrent && <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
