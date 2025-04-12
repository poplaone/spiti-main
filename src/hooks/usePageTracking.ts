
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analyticsUtils';
import { usePerformanceMetrics } from './usePerformanceMetrics';

/**
 * Hook to track page views across the application
 * This should be used in the App component to track all page navigations
 */
export const usePageTracking = () => {
  const location = useLocation();
  const { reportPageLoadMetrics } = usePerformanceMetrics();
  
  useEffect(() => {
    // Get the page title
    const pageTitle = document.title;
    
    // Track the page view
    trackPageView(location.pathname, pageTitle);
    
    // Report performance metrics after navigation
    setTimeout(() => {
      reportPageLoadMetrics();
    }, 1000);
    
    // Additional tracking for specific pages if needed
    if (location.pathname === '/thank-you') {
      // Special tracking for thank you page if needed
      console.log('Thank you page viewed - additional tracking');
    }
  }, [location, reportPageLoadMetrics]);
};

export default usePageTracking;
