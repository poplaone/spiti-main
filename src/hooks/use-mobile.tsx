
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
  
  const handleResize = useCallback(() => {
    if (throttleTimeout.current) return;
    
    throttleTimeout.current = window.setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
      throttleTimeout.current = null;
    }, 100); // Throttle resize events to once every 100ms
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
