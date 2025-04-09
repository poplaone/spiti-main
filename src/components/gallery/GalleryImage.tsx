
import { memo, useState, useRef, useEffect } from 'react';

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
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use Intersection Observer for more efficient lazy loading
  useEffect(() => {
    if (!isVisible || imageLoaded) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start loading the image
          if (imgRef.current) {
            imgRef.current.src = isMobile ? photo.mobileUrl : photo.url;
          }
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px', // Start loading before the image is visible
      threshold: 0.01
    });
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [isVisible, imageLoaded, photo.url, photo.mobileUrl, isMobile]);

  if (!isVisible) {
    return (
      <div 
        className="w-full h-full bg-gray-200 animate-pulse" 
        style={{ aspectRatio: `${photo.width}/${photo.height}` }}
      />
    );
  }
  
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
        ref={imgRef}
        src={isPriority ? (isMobile ? photo.mobileUrl : photo.url) : ''}
        alt={photo.alt} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={isPriority ? "eager" : "lazy"} 
        width={photo.width} 
        height={photo.height} 
        decoding={isPriority ? "sync" : "async"} 
        onLoad={handleImageLoad} 
        style={{
          // Add blur-up effect for smoother loading experience
          filter: imageLoaded ? 'none' : 'blur(5px)',
          transition: 'filter 0.3s ease, opacity 0.3s ease'
        }}
      />
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';
export default GalleryImage;
