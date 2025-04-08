
import { memo } from 'react';
import { getCarouselImageAlt } from '@/utils/imageUtils';

interface CarouselImageProps {
  src: string;
  index: number;
  isCurrent: boolean;
  onLoad: () => void;
}

const CarouselImage = memo(({ src, index, isCurrent, onLoad }: CarouselImageProps) => {
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
        isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isCurrent}
    >
      {isCurrent || index === 0 ? (
        <>
          <img 
            src={src} 
            alt={getCarouselImageAlt(src, index)}
            className="w-full h-full object-cover" 
            loading={index === 0 ? "eager" : "lazy"} 
            onLoad={onLoad}
            fetchPriority={index === 0 ? "high" : "auto"}
            width={1920}
            height={1080}
            decoding={index === 0 ? "sync" : "async"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </>
      ) : null}
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
