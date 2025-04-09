
import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Using mobile-first approach with synchronous initial check for SSR compatibility
  const [isMobile, setIsMobile] = useState(() => {
    // During SSR or before mount, use viewport size
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 769;
  });

  useEffect(() => {
    // Performance optimized check function with debounce
    let timeoutId: number;
    
    const handleResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        setIsMobile(window.innerWidth < 769);
      }, 150); // 150ms debounce
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return isMobile;
}
