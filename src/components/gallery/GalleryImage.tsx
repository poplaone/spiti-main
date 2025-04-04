
import { memo } from 'react';

interface GalleryImageProps {
  photo: {
    url: string;
    mobileUrl: string;
    alt: string;
    width: number;
    height: number;
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
    return <div className="w-full h-full bg-gray-200 animate-pulse" />;
  }
  
  const imageUrl = isMobile ? photo.mobileUrl : photo.url;
  const priority = index <= 1;
  
  return (
    <img 
      src={imageUrl}
      alt={photo.alt} 
      className="w-full h-full object-cover" 
      loading={priority ? "eager" : "lazy"} 
      width={photo.width} 
      height={photo.height}
      decoding={priority ? "sync" : "async"}
      onLoad={() => onLoad(index)}
    />
  );
});

GalleryImage.displayName = 'GalleryImage';

export default GalleryImage;
