
import { useState, useRef, useCallback, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function useCarousel(imagesLength: number) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const isFirstRender = useRef(true);
  const isVisible = useRef(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Use a longer interval and only start rotation after initial render
  useEffect(() => {
    // Skip animation if not visible, or in prerender
    if (!isVisible.current || typeof window === 'undefined') {
      return;
    }
    
    // On first render, wait longer before starting animations to prioritize initial content
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      // Delay first transition to improve initial load performance
      setTimeout(() => {
        resetTimeout();
        
        // Set a longer timeout for better performance
        const interval = isMobile ? 20000 : 15000; // 20 seconds on mobile, 15 seconds on desktop
        
        timeoutRef.current = window.setTimeout(() => 
          setCurrent(prevIndex => (prevIndex + 1) % imagesLength), 
          interval
        );
      }, 3000); // 3 second delay on first load
      
      return resetTimeout;
    }
    
    resetTimeout();
    
    // Set a longer timeout for better performance
    const interval = isMobile ? 15000 : 12000; // 15 seconds on mobile, 12 seconds on desktop
    
    timeoutRef.current = window.setTimeout(() => 
      setCurrent(prevIndex => (prevIndex + 1) % imagesLength), 
      interval
    );
    
    return resetTimeout;
  }, [current, imagesLength, resetTimeout, isMobile]);

  // Optimize visibility observer to pause animations when not visible
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only update if visibility changes
        if (entries[0]?.isIntersecting !== isVisible.current) {
          isVisible.current = !!entries[0]?.isIntersecting;
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
