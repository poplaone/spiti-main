
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
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-1000 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <img 
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={index <= 1 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        decoding="async"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
