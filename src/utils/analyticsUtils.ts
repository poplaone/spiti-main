
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
 * Tracks form submission events
 * 
 * @param data Form submission data
 */
export const trackFormSubmission = (data: {
  name?: string;
  email?: string;
  tourId?: string;
}) => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission',
        form_type: 'lead',
        form_data: {
          name: data.name,
          email_domain: data.email ? data.email.split('@')[1] : undefined,
          tour_id: data.tourId
        }
      });
    }
    console.log('Form submission tracked:', data);
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
};

/**
 * Tracks form attempt events
 */
export const trackFormAttempt = () => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_attempt',
        form_type: 'lead'
      });
    }
    console.log('Form attempt tracked');
  } catch (error) {
    console.error('Error tracking form attempt:', error);
  }
};

/**
 * Tracks form error events
 * 
 * @param errorMessage Error message
 */
export const trackFormError = (errorMessage: string) => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_error',
        form_type: 'lead',
        error_message: errorMessage
      });
    }
    console.log('Form error tracked:', errorMessage);
  } catch (error) {
    console.error('Error tracking form error:', error);
  }
};

/**
 * Tracks button click events
 * 
 * @param buttonName Name of the button
 * @param location Location of the button on the page
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        button_name: buttonName,
        button_location: location
      });
    }
    console.log(`Button click tracked: ${buttonName} at ${location}`);
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
};

/**
 * Tracks WhatsApp contact events
 * 
 * @param data WhatsApp contact data
 */
export const trackWhatsAppContact = (data: {
  name?: string;
}) => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_contact',
        contact_data: {
          name: data.name
        }
      });
    }
    console.log('WhatsApp contact tracked:', data);
  } catch (error) {
    console.error('Error tracking WhatsApp contact:', error);
  }
};

/**
 * Tracks phone call events
 * 
 * @param phone Phone number being called
 * @param location Location of the call button on the page
 */
export const trackPhoneCall = (phone: string, location: string) => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_call',
        phone_number: phone,
        call_location: location
      });
    }
    console.log(`Phone call tracked: ${phone} from ${location}`);
  } catch (error) {
    console.error('Error tracking phone call:', error);
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
