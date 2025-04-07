
import { useState } from 'react';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { useFormValidation, FormData } from './useFormValidation';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FormState extends FormData {
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
  [key: string]: string | boolean | number;
}

export const useLeadForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    duration: '',
    guests: '1',
    isCustomized: false,
    isFixedDeparture: false
  });
  const { validateForm } = useFormValidation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Add specific validation for phone field - only allow numbers, +, (, and )
    if (id === 'phone') {
      const validPhoneRegex = /^[+()0-9]*$/;
      if (value && !validPhoneRegex.test(value)) {
        return; // Reject invalid input
      }
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, duration: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const submitLeadForm = async (leadData: any) => {
    try {
      setIsSubmitting(true);
      
      // Call the Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: leadData
      });

      if (error) {
        console.error("Error sending lead form:", error);
        toast.error("Failed to send your request. Please try again later.");
        return false;
      }

      console.log("Lead form submitted successfully:", data);
      return true;
    } catch (err) {
      console.error("Exception sending lead form:", err);
      toast.error("Failed to send your request. Please try again later.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) {
      return;
    }

    // Prepare data for submission
    const leadData = {
      ...formData,
      travelDate: date ? format(date, "PPP") : undefined
    };

    // In a real application, you would send this data to a server
    console.log("Form submission:", leadData);

    toast.loading("Submitting your request...");
    
    // Send email via our edge function
    const success = await submitLeadForm(leadData);
    
    toast.dismiss();

    if (success) {
      toast.success("Your request has been submitted!");
      
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

  const sendWhatsApp = () => {
    if (!validateForm(formData)) {
      return;
    }

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
    date,
    setDate,
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    sendWhatsApp
  };
};
