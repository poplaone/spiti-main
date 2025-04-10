
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
  // Use the appropriate image URL based on device
  const imageUrl = isMobile ? photo.mobileUrl : photo.url;
  
  return (
    <div 
      className="relative w-full h-full"
      style={{ aspectRatio: `${photo.width}/${photo.height}` }}
    >
      <img 
        src={imageUrl}
        alt={photo.alt} 
        className="w-full h-full object-cover"
        loading="lazy" 
        width={photo.width} 
        height={photo.height} 
        decoding="async" 
        fetchPriority={index < 2 ? "high" : "auto"}
        onLoad={() => onLoad(index)} 
      />
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';
export default GalleryImage;
