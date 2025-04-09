
import { useState, useEffect } from 'react';

// Moved outside the hook to avoid recreation on each render
const mobileBreakpoint = 768;

export function useIsMobile() {
  // Initialize with null to prevent hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Immediate check function
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };
    
    // Initial check on mount
    checkMobile();
    
    // Use passive event listener for better performance
    window.addEventListener('resize', checkMobile, { passive: true });
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For SSR safety, default to false (desktop) if not determined yet
  return isMobile === null ? false : isMobile;
}
