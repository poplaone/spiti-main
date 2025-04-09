
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
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value immediately
    checkMobile();
    
    // Use resize event for better performance
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}
