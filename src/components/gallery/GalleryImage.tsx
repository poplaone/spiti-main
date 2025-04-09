
import { memo, useState } from 'react';

interface GalleryImageProps {
  photo: {
    url: string;
    mobileUrl: string;
    alt: string;
    width: number;
    height: number;
    location?: string;
    priority?: boolean;
  };
  index: number;
  isVisible: boolean;
  isMobile: boolean;
  onLoad: (index: number) => void;
}

// Memoized component to prevent unnecessary re-renders
const GalleryImage = memo(({
  photo,
  index,
  isVisible,
  isMobile,
  onLoad
}: GalleryImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isVisible) {
    return (
      <div 
        className="w-full h-full bg-gray-200 animate-pulse" 
        style={{ aspectRatio: `${photo.width}/${photo.height}` }}
      />
    );
  }
  
  const imageUrl = isMobile ? photo.mobileUrl : photo.url;
  const isPriority = photo.priority || index === 0;
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad(index);
  };
  
  return (
    <div className="relative w-full h-full">
      {/* Show skeleton until image loads */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <img 
        src={imageUrl} 
        alt={photo.alt} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={isPriority ? "eager" : "lazy"} 
        width={photo.width} 
        height={photo.height} 
        decoding={isPriority ? "sync" : "async"} 
        onLoad={handleImageLoad} 
        fetchPriority={isPriority ? "high" : "auto"}
      />
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';
export default GalleryImage;
