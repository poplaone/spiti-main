
import { memo } from 'react';
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
  
  return (
    <div className="relative w-full h-full">
      <img 
        src={imageUrl} 
        alt={photo.alt} 
        className="w-full h-full object-cover" 
        loading={isPriority ? "eager" : "lazy"} 
        width={photo.width} 
        height={photo.height} 
        decoding={isPriority ? "sync" : "async"} 
        onLoad={() => onLoad(index)} 
        fetchPriority={isPriority ? "high" : "auto"}
      />
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';
export default GalleryImage;
