
import { useState, useCallback, RefObject } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UseGalleryNavigationProps {
  galleryRef: RefObject<HTMLDivElement>;
  updateVisibleRange: (direction: 'left' | 'right') => void;
}

export function useGalleryNavigation({ galleryRef, updateVisibleRange }: UseGalleryNavigationProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  
  // Memoized scroll function to improve performance
  const scroll = useCallback((direction: 'left' | 'right') => {
    const gallery = galleryRef.current;
    if (gallery) {
      // Adaptive scroll amount based on device
      const scrollAmount = isMobile ? 200 : 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      gallery.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
      
      // Update visible range in the direction of scrolling
      updateVisibleRange(direction);
    }
  }, [scrollPosition, isMobile, updateVisibleRange, galleryRef]);

  return {
    scrollPosition,
    scroll,
    canScrollLeft: scrollPosition > 0
  };
}
