
import { useState } from 'react';
import { toast } from "sonner";
import { format } from "date-fns";
import { User, Mail, Phone, Users } from 'lucide-react';

import FormInput from './form/FormInput';
import DatePickerInput from './form/DatePickerInput';
import DurationSelect from './form/DurationSelect';
import CheckboxOption from './form/CheckboxOption';
import FormActions from './form/FormActions';

const LeadForm = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
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
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, duration: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

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
    
    toast.success("Thank you for your inquiry! We'll contact you soon.");
  };

  const sendWhatsApp = () => {
    if (!validateForm()) return;

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

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md bg-white/80 backdrop-blur-sm p-6 md:p-6 shadow-lg rounded-lg">
      <h3 className="text-lg md:text-xl mb-6 font-semibold text-center">Get Free Tour Plan</h3>
      
      <div className="space-y-4">
        <FormInput 
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          icon={User}
        />

        <FormInput 
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          icon={Mail}
        />

        <FormInput 
          id="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          icon={Phone}
        />

        <div className="grid grid-cols-2 gap-4">
          <DurationSelect onValueChange={handleSelectChange} />
          
          <FormInput 
            id="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            icon={Phone}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePickerInput date={date} setDate={setDate} />
          
          <FormInput 
            id="guests"
            type="number"
            min="1"
            placeholder="Guests"
            value={formData.guests}
            onChange={handleInputChange}
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <CheckboxOption 
            id="isCustomized"
            label="Customized"
            checked={formData.isCustomized}
            onCheckedChange={(checked) => handleCheckboxChange('isCustomized', checked)}
          />
          
          <CheckboxOption 
            id="isFixedDeparture"
            label="Fixed Departure"
            checked={formData.isFixedDeparture}
            onCheckedChange={(checked) => handleCheckboxChange('isFixedDeparture', checked)}
          />
        </div>

        <FormActions 
          onSubmit={handleSubmit}
          onWhatsApp={sendWhatsApp}
        />
      </div>
    </form>
  );
};

export default LeadForm;
