
/**
 * Tracks a page view in analytics tools
 * 
 * @param path Current page path
 * @param title Page title
 */
export const trackPageView = (path: string, title: string) => {
  try {
    // Send to Google Analytics if available
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: path,
        page_title: title
      });
    }
    
    // Send to Google Tag Manager dataLayer if available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'virtualPageview',
        virtualPagePath: path,
        virtualPageTitle: title
      });
    }
    
    // Log for debugging
    console.log(`Page view tracked: ${path} - ${title}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Tracks performance metrics in analytics
 */
export const trackPerformanceMetrics = (metrics: {
  ttfb?: number;
  fcp?: number | null;
  lcp?: number | null;
  cls?: number | null;
}) => {
  try {
    // Only track if we have a dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'performance_metrics',
        performance_metrics: metrics
      });
    }
  } catch (error) {
    console.error('Error tracking performance metrics:', error);
  }
};

/**
 * Declare window type extensions for global analytics variables
 */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
