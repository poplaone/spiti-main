
import { useState, useRef, useCallback, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function useCarousel(imagesLength: number) {
  const [current, setCurrent] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const isVisible = useRef(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Handle initial load - delay first transition to improve LCP
  useEffect(() => {
    if (isInitialLoad) {
      // Wait until after LCP before starting any animations
      const initialTimer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 2500); // Wait for LCP to complete before transitions
      
      return () => clearTimeout(initialTimer);
    }
  }, [isInitialLoad]);

  // Optimize carousel rotation timing for better performance
  useEffect(() => {
    // Skip animation during initial load or if not visible
    if (isInitialLoad || !isVisible.current) {
      return;
    }
    
    resetTimeout();
    
    // Use longer intervals to reduce processing overhead
    const interval = isMobile ? 30000 : 25000; // 30s on mobile, 25s on desktop
    
    // Defer carousel transitions to requestIdleCallback when available
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      timeoutRef.current = setTimeout(() => {
        window.requestIdleCallback(() => {
          setCurrent(prevIndex => (prevIndex + 1) % imagesLength);
        }, { timeout: 1000 });
      }, interval);
    } else if (typeof window !== 'undefined') {
      timeoutRef.current = setTimeout(() => 
        setCurrent(prevIndex => (prevIndex + 1) % imagesLength), 
        interval
      );
    }
    
    return resetTimeout;
  }, [current, imagesLength, resetTimeout, isMobile, isInitialLoad]);

  // Optimize visibility observer to pause animations when not visible
  useEffect(() => {
    // Only run in browser with IntersectionObserver support
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible.current = entries[0].isIntersecting;
        }
      },
      { threshold: 0.1 }
    );
    
    const heroElement = heroRef.current;
    if (heroElement) {
      observer.observe(heroElement);
    }
    
    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
      observer.disconnect();
    };
  }, []);

  return {
    current,
    setCurrent,
    heroRef,
    isMobile
  };
}
