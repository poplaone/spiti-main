
import { memo, useEffect, useState } from 'react';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ src, alt, width, height, index, isCurrent }: CarouselImageProps) => {
  // Implement progressive image loading with LQIP (Low Quality Image Placeholder)
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // Only load current and next image
  const shouldLoad = index === 0 || isCurrent || index === 1;
  
  // Determine loading priority
  const loadingPriority = index === 0 ? "eager" : "lazy";
  const fetchPriority = index === 0 ? "high" as const : "auto" as const;
  
  // Handle visibility updates with a slight delay to prioritize first image
  useEffect(() => {
    if (isCurrent && loaded) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, index === 0 ? 0 : 100);
      
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isCurrent, loaded, index]);
  
  // Use a background color placeholder before image loads to prevent layout shifts
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isCurrent}
      style={{ 
        backgroundColor: '#2c5282', // Placeholder color matching the brand
        contain: 'content',
        willChange: isCurrent ? 'opacity' : 'auto'
      }}
    >
      {shouldLoad && (
        <>
          <img 
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loadingPriority}
            fetchPriority={fetchPriority}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className="w-full h-full object-cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          {/* Simplified overlay with better performance */}
          <div className="absolute inset-0 bg-black opacity-50" style={{ contain: 'strict' }}></div>
        </>
      )}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
