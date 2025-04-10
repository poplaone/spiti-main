
import { useState, useEffect, useCallback, useRef } from 'react';

export function useIsMobile() {
  // Use a ref to store previous value to prevent unnecessary rerenders
  const isMobileRef = useRef<boolean | null>(null);
  
  // Initialize state with a function to calculate the initial value only once
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Safe check for SSR
    if (typeof window === 'undefined') return true;
    const mobileCheck = window.innerWidth < 769;
    isMobileRef.current = mobileCheck;
    return mobileCheck;
  });
  
  // Use debouncing to prevent excessive resize calculations
  const debounceTimeout = useRef<number | null>(null);
  
  // Last check timestamp to avoid excessive processing
  const lastCheckRef = useRef<number>(0);
  
  const handleResize = useCallback(() => {
    // Skip if we've checked recently (within 100ms)
    const now = Date.now();
    if (now - lastCheckRef.current < 100) return;
    
    // Clear existing timeout if it exists
    if (debounceTimeout.current) {
      window.clearTimeout(debounceTimeout.current);
    }
    
    // Set a debounce timeout
    debounceTimeout.current = window.setTimeout(() => {
      const newIsMobile = window.innerWidth < 769;
      
      // Only update state if the value actually changed
      if (newIsMobile !== isMobileRef.current) {
        isMobileRef.current = newIsMobile;
        setIsMobile(newIsMobile);
      }
      
      lastCheckRef.current = now;
      debounceTimeout.current = null;
    }, 150); // Slightly longer debounce time for better performance
  }, []);

  useEffect(() => {
    // Use more efficient passive listener
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial check
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (debounceTimeout.current) {
        window.clearTimeout(debounceTimeout.current);
      }
    };
  }, [handleResize]);

  return isMobile;
}
