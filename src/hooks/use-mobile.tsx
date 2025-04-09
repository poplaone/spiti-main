
import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Start with true for mobile-first rendering
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Function to update based on window width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Only add listener if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Use resize event with throttling for better performance
      let resizeTimer: number;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(checkMobile, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
      };
    }
  }, []);

  return isMobile;
}
