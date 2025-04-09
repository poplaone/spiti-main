
import { memo, useState, useEffect, useRef } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ 
  src, 
  alt,
  width,
  height,
  index, 
  isCurrent
}: CarouselImageProps) => {
  const [isLoaded, setIsLoaded] = useState(index === 0);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Implement Intersection Observer for more efficient lazy loading
  useEffect(() => {
    // Always load the first image immediately
    if (index === 0 && !isLoaded) {
      setIsLoaded(true);
      return;
    }
    
    // For non-first images, use Intersection Observer for better performance
    if (!isLoaded) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || isCurrent) {
            // Load the image when it comes into viewport or becomes the current slide
            const img = new Image();
            img.onload = () => setIsLoaded(true);
            img.src = src;
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
    }
  }, [src, index, isLoaded, isCurrent]);

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
        isCurrent ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
    >
      <img 
        ref={imgRef}
        src={isLoaded ? src : (index === 0 ? src : '')} 
        alt={alt}
        className="w-full h-full object-cover"
        loading={index === 0 ? "eager" : "lazy"}
        width={width}
        height={height}
        decoding={index === 0 ? "sync" : "async"}
        style={{ 
          contentVisibility: isCurrent ? 'visible' : 'auto',
          // Add blur-up effect for smoother loading experience
          filter: isLoaded ? 'none' : 'blur(10px)',
          transition: 'filter 0.3s ease'
        }}
      />
      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
