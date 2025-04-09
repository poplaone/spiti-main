
import { useState, useEffect, useCallback } from 'react';

export function useIsMobile() {
  // Using mobile-first approach with synchronous initial check for SSR compatibility
  const [isMobile, setIsMobile] = useState(() => {
    // During SSR or before mount, use viewport size
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 769;
  });

  // Memoized resize handler for better performance
  const handleResize = useCallback(() => {
    // Use direct comparison for efficiency
    const isMobileView = window.innerWidth < 769;
    if (isMobile !== isMobileView) {
      setIsMobile(isMobileView);
    }
  }, [isMobile]);

  useEffect(() => {
    // Use more efficient resize observer if supported
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      resizeObserver.observe(document.documentElement);
      
      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback to window resize with passive listener
      window.addEventListener('resize', handleResize, { passive: true });
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize]);

  return isMobile;
}
