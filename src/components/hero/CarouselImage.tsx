
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
  const [imageLoaded, setImageLoaded] = useState(index === 0); // Assume first image is loaded

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad();
  };

  // Eagerly load the first/current image
  const loadingStrategy = (index === 0 || isCurrent) ? "eager" : "lazy";
  const priorityAttr = (index === 0 || isCurrent) ? "high" : "auto";

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading={loadingStrategy}
        onLoad={handleLoad}
        fetchpriority={priorityAttr}
        width={width}
        height={height}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
