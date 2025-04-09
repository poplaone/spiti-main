
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analyticsUtils';

/**
 * Hook to automatically track page views when the route changes
 * @param pageTitle Optional custom page title
 */
export const usePageTracking = (pageTitle?: string) => {
  const location = useLocation();
  
  useEffect(() => {
    // Get page title from document if not provided
    const title = pageTitle || document.title;
    
    // Track the page view
    trackPageView(location.pathname, title);
    
    // Log for debugging
    console.log(`Page tracked: ${location.pathname} - ${title}`);
  }, [location, pageTitle]);
};
