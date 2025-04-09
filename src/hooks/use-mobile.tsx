
import { useState, useEffect, useCallback } from 'react';

export function useIsMobile() {
  // Initialize with server-side value based on initial window size
  const [isMobile, setIsMobile] = useState(() => {
    // Default to true for SSR, but immediately check on client if available
    if (typeof window === 'undefined') return true;
    return window.innerWidth <= 768;
  });

  // Memoized handler to reduce re-renders
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);
  
  useEffect(() => {
    // Add event listener for resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return isMobile;
}
