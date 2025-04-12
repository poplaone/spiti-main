
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
  // Preload the first two images, load the rest normally
  const loadingPriority = index <= 1 ? "eager" : "lazy";
  const fetchPriority = index === 0 ? "high" : "auto";
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-1000 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
      style={{ 
        aspectRatio: `${width}/${height}`,
        height: '100%'
      }}
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
          aspectRatio: `${width}/${height}`,
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      {/* Use a separate div for overlay to avoid repaints on image load */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
