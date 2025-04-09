
import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Initialize with mobile by default for server-side rendering
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Use a more efficient check with matchMedia
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Set initial value
    setIsMobile(mobileMediaQuery.matches);
    
    // Use modern event listener for better performance
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    mobileMediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mobileMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
}
