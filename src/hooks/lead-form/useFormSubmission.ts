import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FormState } from "./types";
import { trackFormSubmission, trackFormAttempt, trackFormError, trackWhatsAppContact } from '@/utils/analyticsUtils';

const recentSubmissions = new Set<string>();

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
      
      const submissionKey = `${leadData.email}-${Date.now().toString().substring(0, 8)}`;
      if (recentSubmissions.has(submissionKey)) {
        console.log("Preventing duplicate submission");
        return true;
      }
      
      const minimizedData = {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || '',
        formType: 'Lead Form',
        travelDate: leadData.travelDate,
        duration: leadData.duration,
        guests: leadData.guests,
        tourId: tourId,
        tourName: tourName ? tourName.substring(0, 30) : undefined,
      };
      
      trackFormAttempt();
      
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: minimizedData
      });

      if (error) {
        console.error("Error sending lead form:", error.message || "Unknown error");
        toast.error("Request failed. Please try again.");
        trackFormError(error.message || 'Unknown error');
        return false;
      }

      if (!data || !data.success) {
        console.error("Lead form submission failed");
        toast.error("Request failed. Please try again.");
        trackFormError('API returned unsuccessful response');
        return false;
      }

      recentSubmissions.add(submissionKey);
      if (recentSubmissions.size > 10) {
        const iterator = recentSubmissions.values();
        recentSubmissions.delete(iterator.next().value);
      }
      
      trackFormSubmission({
        name: formData.name.substring(0, 20),
        email: formData.email,
        tourId
      });
      
      return true;
    } catch (err) {
      console.error("Exception sending lead form:", err instanceof Error ? err.message : 'Unknown exception');
      toast.error("Request failed. Please try again.");
      trackFormError(err instanceof Error ? err.message : 'Unknown exception');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (validateForm: (data: FormState) => boolean) => {
    if (!validateForm(formData)) {
      trackFormError('Validation error');
      return;
    }

    const leadData = {
      ...formData,
      travelDate: date ? format(date, "PPP") : undefined
    };

    const toastId = toast.loading("Submitting...");
    
    const success = await submitLeadForm(leadData);
    
    toast.dismiss(toastId);

    if (success) {
      toast.success("Request submitted! Confirmation email sent.");
      
      navigate('/thank-you', { 
        state: { 
          formData: {
            name: formData.name,
            email: formData.email,
          } 
        }
      });
    }
  };

  const sendWhatsAppMessage = (validateForm: (data: FormState) => boolean) => {
    if (!validateForm(formData)) {
      return;
    }

    trackWhatsAppContact({
      name: formData.name
    });

    const message = `
*Tour Inquiry*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Guests: ${formData.guests || '1'}
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
