
import { useState, useEffect, useCallback, useRef } from 'react';

// Using a global variable to optimize first load and avoid React state
let cachedIsMobile: boolean | null = null;

export function useIsMobile() {
  // Initialize state with globally cached value or calculate if first time
  const [isMobile, setIsMobile] = useState(() => {
    if (cachedIsMobile !== null) return cachedIsMobile;
    if (typeof window === 'undefined') return true;
    
    const mobileCheck = window.innerWidth < 769;
    cachedIsMobile = mobileCheck;
    return mobileCheck;
  });
  
  // Use superthrottling to prevent excessive resize calculations
  const throttleTimeout = useRef<number | null>(null);
  const lastWidth = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const handleResize = useCallback(() => {
    // Skip if already in a throttle period
    if (throttleTimeout.current) return;
    
    // Only calculate again if width actually crossed our breakpoint boundary
    const currentWidth = window.innerWidth;
    const wasMobile = lastWidth.current < 769;
    const isMobileNow = currentWidth < 769;
    
    // Skip unnecessary updates when staying in the same size category
    if (wasMobile === isMobileNow) {
      lastWidth.current = currentWidth;
      return;
    }
    
    // Apply longer throttle on mobile for better performance
    const throttleTime = isMobileNow ? 300 : 150;
    
    throttleTimeout.current = window.setTimeout(() => {
      lastWidth.current = currentWidth;
      setIsMobile(isMobileNow);
      cachedIsMobile = isMobileNow; // Update global cache
      throttleTimeout.current = null;
    }, throttleTime);
  }, []);

  useEffect(() => {
    // Skip attaching listeners for SSR
    if (typeof window === 'undefined') return;
    
    // Use most efficient method available in browser
    if (typeof window.matchMedia === 'function') {
      // Use matchMedia for better performance
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      
      // Modern browsers support addEventListener
      const handleMediaChange = (e: MediaQueryListEvent) => {
        const isMobileNow = e.matches;
        if (isMobile !== isMobileNow) {
          setIsMobile(isMobileNow);
          cachedIsMobile = isMobileNow; // Update global cache
        }
      };

      // Add the appropriate listener based on browser support
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaChange);
      } else {
        // Fallback to throttled resize
        window.addEventListener('resize', handleResize, { passive: true });
      }
      
      // Initial check
      if (mediaQuery.matches !== isMobile) {
        setIsMobile(mediaQuery.matches);
        cachedIsMobile = mediaQuery.matches; // Update global cache
      }
      
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMediaChange);
        } else {
          window.removeEventListener('resize', handleResize);
        }
        
        if (throttleTimeout.current) {
          clearTimeout(throttleTimeout.current);
        }
      };
    } else {
      // Fallback to resize event with passive listener
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
