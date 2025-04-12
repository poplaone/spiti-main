
import { memo, forwardRef, CSSProperties } from 'react';

interface CarouselContainerProps {
  children: React.ReactNode;
  heroHeight: string;
}

const CarouselContainer = memo(forwardRef<HTMLDivElement, CarouselContainerProps>(
  ({ children, heroHeight }, ref) => {
    // Reserve exact space for hero section to prevent layout shifts
    const containerStyle: CSSProperties = { 
      height: heroHeight, 
      minHeight: heroHeight,
      maxHeight: '100vh', 
      width: '100%',
      contain: 'layout size paint',
      aspectRatio: '16/9',
      willChange: 'opacity, transform',
    };

    return (
      <div 
        ref={ref}
        className="relative w-full overflow-hidden bg-transparent hero-carousel content-visibility-auto"
        style={containerStyle}
        data-lcp-candidate="true" // Hint for performance monitoring
      >
        {children}
      </div>
    );
  }
));

CarouselContainer.displayName = 'CarouselContainer';
export default CarouselContainer;
