
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analyticsUtils';

/**
 * Hook to track page views across the application
 * This should be used in the App component to track all page navigations
 */
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the page title
    const pageTitle = document.title;
    
    // Track the page view
    trackPageView(location.pathname, pageTitle);
    
    // Additional tracking for specific pages if needed
    if (location.pathname === '/thank-you') {
      // Special tracking for thank you page if needed
      console.log('Thank you page viewed - additional tracking');
    }
  }, [location]);
};
