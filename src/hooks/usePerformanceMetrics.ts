
import { useEffect, useRef } from 'react';

/**
 * Hook to track and report performance metrics
 * @returns Object with methods for measuring performance
 */
export const usePerformanceMetrics = () => {
  const markTimings = useRef<Record<string, number>>({});
  
  useEffect(() => {
    // Report initial page load metrics when the component mounts
    if (window.performance && 'getEntriesByType' in window.performance) {
      try {
        // Wait for the page to be fully loaded
        if (document.readyState === 'complete') {
          reportPageLoadMetrics();
        } else {
          window.addEventListener('load', reportPageLoadMetrics, { once: true });
        }
      } catch (error) {
        console.error('Error collecting performance metrics:', error);
      }
    }

    return () => {
      window.removeEventListener('load', reportPageLoadMetrics);
    };
  }, []);

  // Function to report core web vitals and other metrics
  const reportPageLoadMetrics = () => {
    if (!window.performance || !('getEntriesByType' in window.performance)) {
      return;
    }

    // Get navigation timing data
    const navigationEntries = window.performance.getEntriesByType('navigation');
    if (navigationEntries.length === 0) return;

    const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming;
    
    // Calculate basic metrics
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    const fcp = getFCP();
    const lcp = getLCP();
    const cls = getCLS();
    
    // Log the metrics
    console.info('Performance Metrics:', {
      TTFB: `${ttfb.toFixed(2)}ms`,
      FCP: fcp ? `${fcp.toFixed(2)}ms` : 'Not available',
      LCP: lcp ? `${lcp.toFixed(2)}ms` : 'Not available',
      CLS: cls ?? 'Not available'
    });
    
    // You could send these metrics to an analytics service
    // sendMetricsToAnalytics({ ttfb, fcp, lcp, cls });
  };

  // Get First Contentful Paint
  const getFCP = () => {
    const paintEntries = window.performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : null;
  };

  // Get approximation of Largest Contentful Paint from PerformanceObserver entries
  const getLCP = () => {
    // This is just a placeholder - LCP normally requires PerformanceObserver
    // which we might not have access to all entries at this point
    return null;
  };

  // Get approximation of Cumulative Layout Shift
  const getCLS = () => {
    // This is just a placeholder - CLS normally requires PerformanceObserver
    return null;
  };

  // Method to mark the start of a performance measurement
  const markStart = (id: string) => {
    markTimings.current[`${id}_start`] = performance.now();
  };

  // Method to mark the end of a performance measurement and return the duration
  const markEnd = (id: string) => {
    const startKey = `${id}_start`;
    if (!markTimings.current[startKey]) {
      console.warn(`No start mark found for ${id}`);
      return null;
    }
    
    const endTime = performance.now();
    const duration = endTime - markTimings.current[startKey];
    
    // Clean up the start mark
    delete markTimings.current[startKey];
    
    return duration;
  };

  return {
    markStart,
    markEnd,
    reportPageLoadMetrics
  };
};

export default usePerformanceMetrics;
