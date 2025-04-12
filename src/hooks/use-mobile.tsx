
import { useState, useEffect, useCallback, useRef } from 'react';

export function useIsMobile() {
  // Initialize with proper mobile check (smaller breakpoint to catch more devices)
  const [isMobile, setIsMobile] = useState(() => {
    // Safe check for SSR
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 768;
  });
  
  // Use throttling to prevent excessive resize calculations
  const throttleTimeout = useRef<number | null>(null);
  const lastWidth = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const handleResize = useCallback(() => {
    if (throttleTimeout.current) return;
    
    throttleTimeout.current = window.setTimeout(() => {
      // Only update state if width crosses the breakpoint boundary
      const currentWidth = window.innerWidth;
      const wasMobile = lastWidth.current < 768;
      const isMobileNow = currentWidth < 768;
      
      if (wasMobile !== isMobileNow) {
        setIsMobile(isMobileNow);
      }
      
      lastWidth.current = currentWidth;
      throttleTimeout.current = null;
    }, 150); // Increased throttle to 150ms for better performance
  }, []);

  useEffect(() => {
    // Add event listener with passive option for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [handleResize]);

  return isMobile;
}
