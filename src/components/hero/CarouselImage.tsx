
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad();
  };

  // If this is the first image and it's current, eagerly load
  const loadingStrategy = (index === 0 || isCurrent) ? "eager" : "lazy";
  const priorityStrategy = (index === 0 || isCurrent) ? "high" : "auto";
  const decodingStrategy = (index === 0 || isCurrent) ? "sync" : "async";

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      {/* Show image placeholder until loaded */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
      )}
      
      <img 
        src={src} 
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={loadingStrategy}
        onLoad={handleLoad}
        fetchPriority={priorityStrategy}
        width={width}
        height={height}
        decoding={decodingStrategy}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
