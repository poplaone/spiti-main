
import { useState, useEffect, useCallback, useRef } from 'react';

export function useIsMobile() {
  // Cache the initial value to prevent repeated calculations
  const initialValueRef = useRef<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 769;
  });
  
  // Initialize state with the calculated initial value
  const [isMobile, setIsMobile] = useState(() => {
    return initialValueRef.current();
  });
  
  // Use throttling to prevent excessive resize calculations
  const throttleTimeout = useRef<number | null>(null);
  
  const handleResize = useCallback(() => {
    if (throttleTimeout.current) return;
    
    throttleTimeout.current = window.setTimeout(() => {
      const isMobileView = window.innerWidth < 769;
      if (isMobile !== isMobileView) {
        setIsMobile(isMobileView);
      }
      throttleTimeout.current = null;
    }, 100); // Throttle resize events to once every 100ms
  }, [isMobile]);

  useEffect(() => {
    // Use more efficient resize observer if supported
    if (typeof ResizeObserver !== 'undefined') {
      // Only observe document.documentElement changes
      const resizeObserver = new ResizeObserver(() => {
        // Check if device width actually crossed our breakpoint
        const isMobileView = window.innerWidth < 769;
        if (isMobile !== isMobileView) {
          setIsMobile(isMobileView);
        }
      });
      
      resizeObserver.observe(document.documentElement);
      
      return () => {
        resizeObserver.disconnect();
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current);
        }
      };
    } else {
      // Fallback to throttled window resize with passive listener
      window.addEventListener('resize', handleResize, { passive: true });
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current);
        }
      };
    }
  }, [handleResize, isMobile]);

  return isMobile;
}
