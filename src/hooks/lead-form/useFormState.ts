
import { useState } from 'react';
import { FormState } from './types';

export const useFormState = () => {
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
  
  return {
    date,
    setDate,
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange
  };
};
