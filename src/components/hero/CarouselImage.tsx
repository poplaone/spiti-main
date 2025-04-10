
import { memo, useEffect, useRef, useState } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ src, alt, width, height, index, isCurrent }: CarouselImageProps) => {
  // Always load first image immediately
  const isFirstImage = index === 0;
  const [loaded, setLoaded] = useState(isFirstImage);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Use intersection observer for non-current images to lazy load them
  useEffect(() => {
    // Skip for first image or already loaded images
    if (isFirstImage || loaded) return;
    
    // Immediate load for current image or nearby images (for smooth transitions)
    if (isCurrent || index <= 1) {
      setLoaded(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [isCurrent, loaded, index, isFirstImage]);
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-1000 ${
        isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      aria-hidden={!isCurrent}
    >
      {(isCurrent || loaded) && (
        <>
          <img 
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={isFirstImage ? "eager" : "lazy"}
            decoding={isFirstImage ? "sync" : "async"}
            fetchPriority={isFirstImage ? "high" : "auto"}
            className="w-full h-full object-cover"
            onLoad={() => setLoaded(true)}
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </>
      )}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
