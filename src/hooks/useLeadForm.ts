
import { useState } from 'react';
import { format } from "date-fns";
import { useFormValidation, FormData } from './useFormValidation';

interface FormState extends FormData {
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
  [key: string]: string | boolean | number;
}

export const useLeadForm = () => {
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
  const [showThankYou, setShowThankYou] = useState(false);
  const { validateForm } = useFormValidation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, duration: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = () => {
    if (!validateForm(formData)) return;

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
    
    // Show thank you dialog - guaranteed to open
    setShowThankYou(true);
  };

  const sendWhatsApp = () => {
    if (!validateForm(formData)) return;

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
    const whatsappURL = `https://wa.me/918353040008?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return {
    date,
    setDate,
    formData,
    showThankYou,
    setShowThankYou,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    sendWhatsApp
  };
};
