
import { useState, useEffect, useCallback } from 'react';

// Moved outside the hook to avoid recreation on each render
const mobileBreakpoint = 768;

export function useIsMobile() {
  // Initialize with value based on window size, defaulting to mobile for SSR
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth <= mobileBreakpoint;
  });

  // Memoized handler to reduce re-renders
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= mobileBreakpoint);
  }, []);
  
  useEffect(() => {
    // Check once on mount to ensure correct value after SSR
    handleResize();
    
    // Use passive event listener for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return isMobile;
}
