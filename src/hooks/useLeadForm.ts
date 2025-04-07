
import { useState } from 'react';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { useFormValidation, FormData } from './useFormValidation';
import { toast } from "sonner";

interface FormState extends FormData {
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
  [key: string]: string | boolean | number;
}

export const useLeadForm = () => {
  const navigate = useNavigate();
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

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    // In a real application, you would send this data to a server
    console.log("Form submission:", {
      ...formData,
      date: date ? format(date, "PPP") : undefined
    });

    // Email submission details (would be handled by a backend)
    const emailDetails = {
      to: ["Spitivalleytravels@gmail.com", "Himalayanfootslog@gmail.com"],
      subject: "New Tour Inquiry from Website",
      body: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Duration: ${formData.duration}
        Travel Date: ${date ? format(date, "PPP") : "Not specified"}
        Guests: ${formData.guests}
        Type: ${formData.isCustomized ? 'Customized' : ''} ${formData.isFixedDeparture ? 'Fixed Departure' : ''}
      `
    };
    
    console.log("Email would be sent to:", emailDetails);
    
    // Instead of showing dialog, navigate to thank you page with form data
    navigate('/thank-you', { 
      state: { 
        formData: {
          ...formData,
          date: date ? format(date, "PPP") : "Not specified"
        } 
      }
    });
  };

  const sendWhatsApp = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
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
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    sendWhatsApp
  };
};
