
/**
 * Utility functions for Google Tag Manager tracking
 */

/**
 * Track a form submission event in Google Tag Manager
 */
export const trackFormSubmission = (formData: Record<string, any>, formType: string = 'tourInquiry') => {
  console.log(`Tracking form submission - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'formSubmission',
      'formType': formType,
      'formData': {
        'name': formData.name || 'Not provided',
        'email': formData.email || 'Not provided',
        'phone': formData.phone || 'Not provided',
        'duration': formData.duration || 'Not specified',
        'travelDate': formData.date || 'Not specified',
        'guests': formData.guests || '1',
        'isCustomized': formData.isCustomized || false,
        'isFixedDeparture': formData.isFixedDeparture || false
      }
    });
    
    console.log("Form submission tracked in GTM dataLayer");
  }
};

/**
 * Track a form submission attempt in Google Tag Manager
 */
export const trackFormAttempt = (formType: string = 'tourInquiry') => {
  console.log(`Tracking form attempt - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'formSubmissionAttempt',
      'formType': formType
    });
    console.log("Form attempt tracked in GTM dataLayer");
  }
};

/**
 * Track a form submission error in Google Tag Manager
 */
export const trackFormError = (errorMessage: string, formType: string = 'tourInquiry') => {
  console.log(`Tracking form error - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'formSubmissionError',
      'formType': formType,
      'errorMessage': errorMessage
    });
    console.log("Form error tracked in GTM dataLayer");
  }
};

/**
 * Track a button click in Google Tag Manager
 */
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  console.log(`Tracking button click: ${buttonName} - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'buttonClick',
      'buttonName': buttonName,
      'buttonLocation': buttonLocation
    });
    console.log(`Button click (${buttonName}) tracked in GTM dataLayer`);
  }
};

/**
 * Track a WhatsApp contact attempt in Google Tag Manager
 */
export const trackWhatsAppContact = (formData?: Record<string, any>) => {
  console.log(`Tracking WhatsApp contact - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    const eventData: Record<string, any> = {
      'event': 'whatsAppContact'
    };
    
    if (formData) {
      eventData.formData = {
        'name': formData.name || 'Not provided',
        'email': formData.email || 'Not provided',
        'phone': formData.phone || 'Not provided'
      };
    }
    
    window.dataLayer.push(eventData);
    console.log("WhatsApp contact tracked in GTM dataLayer");
  }
};

/**
 * Track a phone call in Google Tag Manager
 */
export const trackPhoneCall = (phoneNumber: string) => {
  console.log(`Tracking phone call to ${phoneNumber} - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'phoneCall',
      'phoneNumber': phoneNumber
    });
    console.log("Phone call tracked in GTM dataLayer");
  }
};

/**
 * Track a page view in Google Tag Manager
 * This is usually handled automatically by GTM, but can be triggered manually when needed
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  console.log(`Tracking page view: ${pagePath} - GTM dataLayer available:`, !!window.dataLayer);
  
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'virtualPageView',
      'pagePath': pagePath,
      'pageTitle': pageTitle
    });
    console.log(`Page view for ${pagePath} tracked in GTM dataLayer`);
  }
};
