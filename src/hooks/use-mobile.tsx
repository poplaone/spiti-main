
import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Using mobile-first approach for SSR compatibility
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Performance optimized check function with debounce
    let timeoutId: number;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 769);
    };
    
    // Initial check
    checkMobile();
    
    // Debounced resize handler
    const handleResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        checkMobile();
      }, 150); // 150ms debounce
    };
    
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
