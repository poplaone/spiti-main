import { memo, useRef, useEffect } from 'react';
import { createLazyLoadObserver } from '@/utils/lazyLoading';

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
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Use proper intersection observer for lazy loading
  useEffect(() => {
    if (!isVisible || !imageRef.current) return;
    
    const observer = createLazyLoadObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Image is now visible, load it
          const img = entry.target as HTMLImageElement;
          
          // If it's already loaded, just trigger the callback
          if (img.complete) {
            onLoad(index);
          } else {
            // Otherwise wait for load event
            img.onload = () => onLoad(index);
          }
          
          // Stop observing once it's in view
          observer.unobserve(imageRef.current!);
        }
      });
    });
    
    observer.observe(imageRef.current);
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [isVisible, index, onLoad]);
  
  // Avoid rendering images that aren't visible to save memory
  if (!isVisible && index > 4) return null;
  
  return (
    <div className="relative w-full h-full">
      <img 
        ref={imageRef}
        src={isVisible ? imageUrl : ''}
        alt={photo.alt} 
        className="w-full h-full object-cover"
        loading={index < 4 ? "eager" : "lazy"}
        width={photo.width} 
        height={photo.height} 
        decoding={index < 4 ? "sync" : "async"}
        fetchpriority={index < 2 ? "high" : "low"}
      />
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';
export default GalleryImage;
