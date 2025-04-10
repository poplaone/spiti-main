
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FormState } from "./types";
import { 
  trackFormSubmission, 
  trackFormAttempt, 
  trackFormError, 
  trackWhatsAppContact 
} from '@/utils/analyticsUtils';

export const useFormSubmission = (
  formData: FormState, 
  date: Date | undefined,
  setIsSubmitting: (value: boolean) => void,
  tourId?: string,
  tourName?: string
) => {
  const navigate = useNavigate();
  
  const submitLeadForm = async (leadData: any) => {
    try {
      setIsSubmitting(true);
      
      // Create a minimized version of the form data to reduce payload size
      const minimizedData = {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || '',
        formType: leadData.formType || 'Lead Form',
        travelDate: leadData.travelDate,
        // Only include essential fields
        duration: leadData.duration,
        guests: leadData.guests,
        tourId: leadData.tourId,
        tourName: leadData.tourName ? leadData.tourName.substring(0, 50) : undefined, // Limit string length
        // Skip other fields
      };
      
      // Track form submission start
      trackFormAttempt();
      
      // Call the Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: minimizedData
      });

      if (error) {
        console.error("Error sending lead form:", error);
        toast.error("Failed to send your request. Please try again later.");
        
        // Track form submission failure
        trackFormError(error.message || 'Unknown error');
        return false;
      }

      if (!data || !data.success) {
        console.error("Lead form submission failed:", data);
        toast.error("Failed to send your request. Please try again later.");
        
        // Track form submission failure
        trackFormError('API returned unsuccessful response');
        return false;
      }

      // Track successful form submission with minimal data
      trackFormSubmission({
        name: formData.name,
        email: formData.email,
        date: date ? format(date, "PPP") : undefined,
        tourId,
        tourName
      });
      
      return true;
    } catch (err) {
      console.error("Exception sending lead form:", err);
      toast.error("Failed to send your request. Please try again later.");
      
      // Track form submission exception
      trackFormError(err instanceof Error ? err.message : 'Unknown exception');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (validateForm: (data: FormState) => boolean) => {
    if (!validateForm(formData)) {
      // Track validation failure
      trackFormError('Validation error');
      return;
    }

    // Prepare data for submission
    const leadData = {
      ...formData,
      travelDate: date ? format(date, "PPP") : undefined
    };

    const toastId = toast.loading("Submitting your request...");
    
    // Send email via our edge function
    const success = await submitLeadForm(leadData);
    
    toast.dismiss(toastId);

    if (success) {
      toast.success("Your request has been submitted! We've sent you a confirmation email.");
      
      // Navigate to thank you page with minimal form data
      navigate('/thank-you', { 
        state: { 
          formData: {
            name: formData.name,
            email: formData.email,
            date: date ? format(date, "PPP") : "Not specified",
            tourId,
            tourName
          } 
        }
      });
    }
  };

  const sendWhatsAppMessage = (validateForm: (data: FormState) => boolean) => {
    if (!validateForm(formData)) {
      return;
    }

    // Track WhatsApp contact method with minimal data
    trackWhatsAppContact({
      name: formData.name,
      email: formData.email
    });

    const message = `
*New Tour Inquiry*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Duration: ${formData.duration || 'Not specified'}
Travel Date: ${date ? format(date, "PPP") : "Not specified"}
Guests: ${formData.guests || 'Not specified'}
${tourName ? `Tour: ${tourName}` : ''}
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
