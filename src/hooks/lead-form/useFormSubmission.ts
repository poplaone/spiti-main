
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FormState } from "./types";
import { trackEvent } from "@/utils/analyticsUtils";

export const useFormSubmission = (
  formData: FormState, 
  date: Date | undefined,
  setIsSubmitting: (value: boolean) => void
) => {
  const navigate = useNavigate();

  const trackFormEvent = (eventName: string, extraData?: Record<string, any>) => {
    trackEvent(eventName, {
      formType: 'tourInquiry',
      ...extraData
    });
  };
  
  const submitLeadForm = async (leadData: any) => {
    try {
      setIsSubmitting(true);
      
      console.log("Submitting lead form to edge function:", leadData);
      
      // Track form submission start
      trackFormEvent('formSubmissionAttempt');
      
      // Call the Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: leadData
      });

      if (error) {
        console.error("Error sending lead form:", error);
        toast.error("Failed to send your request. Please try again later.");
        
        // Track form submission failure
        trackFormEvent('formSubmissionError', {
          'errorMessage': error.message || 'Unknown error'
        });
        return false;
      }

      if (!data || !data.success) {
        console.error("Lead form submission failed:", data);
        toast.error("Failed to send your request. Please try again later.");
        
        // Track form submission failure
        trackFormEvent('formSubmissionError', {
          'errorMessage': 'API returned unsuccessful response'
        });
        return false;
      }

      // Track successful form submission
      trackFormEvent('formSubmissionSuccess');
      
      console.log("Lead form submitted successfully:", data);
      return true;
    } catch (err) {
      console.error("Exception sending lead form:", err);
      toast.error("Failed to send your request. Please try again later.");
      
      // Track form submission exception
      trackFormEvent('formSubmissionError', {
        'errorMessage': err instanceof Error ? err.message : 'Unknown exception'
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (validateForm: (data: FormState) => boolean) => {
    if (!validateForm(formData)) {
      // Track validation failure
      trackFormEvent('formValidationError');
      return;
    }

    // Prepare data for submission
    const leadData = {
      ...formData,
      travelDate: date ? format(date, "PPP") : undefined
    };

    // In a real application, you would send this data to a server
    console.log("Form submission:", leadData);

    const toastId = toast.loading("Submitting your request...");
    
    // Send email via our edge function
    const success = await submitLeadForm(leadData);
    
    toast.dismiss(toastId);

    if (success) {
      toast.success("Your request has been submitted! We've sent you a confirmation email.");
      
      // Track conversion
      trackEvent('conversion', {
        formType: 'tourInquiry',
        formData: {
          ...formData,
          date: date ? format(date, "PPP") : "Not specified"
        },
        conversionValue: 1
      });
      
      // Navigate to thank you page with form data
      navigate('/thank-you', { 
        state: { 
          formData: {
            ...formData,
            date: date ? format(date, "PPP") : "Not specified"
          } 
        }
      });
    }
  };

  const sendWhatsAppMessage = (validateForm: (data: FormState) => boolean) => {
    if (!validateForm(formData)) {
      return;
    }

    // Track WhatsApp contact method
    trackEvent('whatsAppContact', {
      formType: 'tourInquiry'
    });

    const message = `
*New Tour Inquiry*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Duration: ${formData.duration}
Travel Date: ${date ? format(date, "PPP") : "Not specified"}
Guests: ${formData.guests}
Type: ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918894216348?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return {
    handleFormSubmit,
    sendWhatsAppMessage
  };
};
