
import { useState, useEffect, useCallback, useRef } from 'react';

export function useIsMobile() {
  // Use CSS media query for initial value to avoid layout shift
  const getIsMobile = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(max-width: 767px)').matches;
  };
  
  // Initialize with proper mobile check
  const [isMobile, setIsMobile] = useState(getIsMobile);
  
  // Cache window width to avoid unnecessary updates
  const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Debounce resize handler for better performance
  const handleResize = useCallback(() => {
    // Only check if necessary based on breakpoint crossing
    const currentWidth = window.innerWidth;
    const wasMobile = lastWidth.current < 768;
    const isMobileNow = currentWidth < 768;
    
    if (wasMobile !== isMobileNow) {
      setIsMobile(isMobileNow);
    }
    
    lastWidth.current = currentWidth;
  }, []);

  useEffect(() => {
    // Use matchMedia for more efficient listeners
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(max-width: 767px)');
      
      // Modern browsers: use matchMedia event listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', () => {
          setIsMobile(mediaQuery.matches);
        });
        
        return () => {
          mediaQuery.removeEventListener('change', () => {
            setIsMobile(mediaQuery.matches);
          });
        };
      } 
      // Fallback for older browsers
      else {
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
      }
    }
  }, [handleResize]);

  return isMobile;
}
