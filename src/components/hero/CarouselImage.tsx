
import { memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CarouselImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  isCurrent: boolean;
}

const CarouselImage = memo(({ src, alt, width, height, index, isCurrent }: CarouselImageProps) => {
  const isMobile = useIsMobile();
  
  // Reduce transition duration on mobile for better performance
  const transitionDuration = isMobile ? 500 : 1000;
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transform transition-opacity duration-${transitionDuration}`}
      style={{
        opacity: isCurrent ? 1 : 0,
        // Use will-change only for the active slide to optimize GPU acceleration
        willChange: isCurrent ? 'opacity' : 'auto',
        // Reduce transition on mobile for better performance
        transitionDuration: `${transitionDuration}ms`
      }}
      aria-hidden={!isCurrent}
    >
      <img 
        src={src}
        alt={alt}
        width={width}
        height={height}
        // Only eagerly load the first image
        loading={index === 0 ? "eager" : "lazy"}
        // Async decode for non-first images to prevent main thread blocking
        decoding={index === 0 ? "sync" : "async"}
        // Set explicit width/height to prevent layout shifts
        className="w-full h-full object-cover"
        // Add fetchpriority hint for browsers that support it
        fetchpriority={index === 0 ? "high" : "low"}
      />
      {/* Simplified overlay with reduced opacity on mobile */}
      <div className="absolute inset-0 bg-black" style={{ opacity: isMobile ? 0.3 : 0.4 }}></div>
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';
export default CarouselImage;
