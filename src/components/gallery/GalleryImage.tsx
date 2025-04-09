
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
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad(index);
  };
  
  // Load the image directly regardless of visibility
  const imageUrl = isMobile ? photo.mobileUrl : photo.url;
  
  return (
    <div className="relative w-full h-full">
      <img 
        src={imageUrl}
        alt={photo.alt} 
        className="w-full h-full object-cover"
        loading={index < 4 ? "eager" : "lazy"} 
        width={photo.width} 
        height={photo.height} 
        decoding={index < 4 ? "sync" : "async"} 
        onLoad={handleImageLoad} 
      />
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';
export default GalleryImage;
