
import { memo, forwardRef, CSSProperties } from 'react';

interface CarouselContainerProps {
  children: React.ReactNode;
  heroHeight: string;
}

const CarouselContainer = memo(forwardRef<HTMLDivElement, CarouselContainerProps>(
  ({ children, heroHeight }, ref) => {
    const containerStyle: CSSProperties = { 
      height: heroHeight, 
      minHeight: heroHeight,
      maxHeight: '100vh', 
      width: '100%',
      contain: 'layout size paint'
    };

    return (
      <div 
        ref={ref}
        className="relative w-full overflow-hidden bg-gray-900 hero-carousel"
        style={containerStyle}
      >
        {children}
      </div>
    );
  }
));

CarouselContainer.displayName = 'CarouselContainer';
export default CarouselContainer;
