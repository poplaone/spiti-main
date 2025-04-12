
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
      backgroundColor: '#2c5282', // Match placeholder color
      aspectRatio: '16/9',
      willChange: 'opacity, transform',
    };

    return (
      <div 
        ref={ref}
        className="relative w-full overflow-hidden bg-gray-900 hero-carousel"
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
