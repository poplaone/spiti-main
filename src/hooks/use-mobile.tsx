
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the user's device is mobile
 * Uses a default value based on window size during SSR
 */
export function useIsMobile() {
  // Initialize with a check if we're in the browser
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    // Default to mobile during SSR to prioritize mobile optimization
    return true;
  };

  const [isMobile, setIsMobile] = useState(getInitialState);

  useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(mobile);
    };

    // Set initial value immediately
    checkMobile();
    
    // Create media query list and add listener
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Use the appropriate event based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMobile);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(checkMobile);
    }
    
    // Clean up listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', checkMobile);
      } else {
        // Fallback cleanup
        mediaQuery.removeListener(checkMobile);
      }
    };
  }, []);

  return isMobile;
}
