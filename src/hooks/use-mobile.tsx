
import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Using mobile-first approach for SSR compatibility
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Performance optimized check function
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 769);
    };
    
    // Initial check
    checkMobile();
    
    // Use a more efficient event listener with RAF for better performance
    let frameId: number;
    const handleResize = () => {
      // Cancel any pending frames
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      // Schedule a new frame
      frameId = requestAnimationFrame(() => {
        checkMobile();
      });
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return isMobile;
}
