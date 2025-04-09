
import { useFormState } from './useFormState';
import { useFormSubmission } from './useFormSubmission';
import { useFormValidation } from '../useFormValidation';
import { UseLeadFormReturn } from './types';

export const useLeadForm = (tourId?: string, tourName?: string): UseLeadFormReturn => {
  const { 
    date, 
    setDate, 
    formData, 
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange
  } = useFormState();
  
  const { validateForm } = useFormValidation();
  
  const { 
    handleFormSubmit,
    sendWhatsAppMessage
  } = useFormSubmission(formData, date, setIsSubmitting, tourId, tourName);

  const handleSubmit = async () => {
    await handleFormSubmit(validateForm);
  };

  const sendWhatsApp = () => {
    sendWhatsAppMessage(validateForm);
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

export * from './types';
