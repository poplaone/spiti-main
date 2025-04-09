
/**
 * Utility functions for Google Tag Manager and analytics
 */

/**
 * Push an event to the Google Tag Manager dataLayer
 * @param eventName Name of the event
 * @param eventData Additional data to send with the event
 */
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
      console.log(`Tracked event: ${eventName}`, eventData);
    } else {
      console.warn('GTM dataLayer not available. Event not tracked:', eventName);
    }
  } catch (error) {
    console.error('Error tracking GTM event:', error);
  }
};

/**
 * Track page views
 * @param pagePath Path of the page being viewed
 * @param pageTitle Title of the page
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('pageView', {
    pagePath,
    pageTitle
  });
};

/**
 * Track button clicks
 * @param buttonName Identifier for the button
 * @param buttonLocation Location on the page where the button appears
 */
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  trackEvent('buttonClick', {
    buttonName,
    buttonLocation
  });
};

/**
 * Track phone calls
 * @param phoneNumber The phone number that was called
 * @param callLocation Where on the site the call was initiated
 */
export const trackPhoneCall = (phoneNumber: string, callLocation: string) => {
  trackEvent('phoneCall', {
    phoneNumber,
    callLocation
  });
};

/**
 * Track form submissions
 * @param formType Type of form (inquiry, booking, etc)
 * @param formData Optional form data to track
 */
export const trackFormSubmission = (formType: string, formData: Record<string, any> = {}) => {
  trackEvent('formSubmission', {
    formType,
    formData
  });
};

/**
 * Track tour package views
 * @param tourId ID of the tour package
 * @param tourName Name of the tour package
 */
export const trackTourView = (tourId: string, tourName: string) => {
  trackEvent('tourView', {
    tourId,
    tourName
  });
};
