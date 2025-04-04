
import { User, Mail, Phone } from 'lucide-react';
import FormInput from './FormInput';
import FormSection from './FormSection';

interface ContactFormProps {
  name: string;
  email: string;
  phone: string;
  guests: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactForm = ({ name, email, phone, guests, onChange }: ContactFormProps) => {
  return (
    <FormSection title="Contact Information">
      <div className="space-y-4">
        <FormInput 
          id="name"
          placeholder="Name *"
          value={name}
          onChange={onChange}
          icon={User}
          className="bg-white/70"
          required
        />

        <FormInput 
          id="email"
          type="email"
          placeholder="Email *"
          value={email}
          onChange={onChange}
          icon={Mail}
          className="bg-white/70"
          required
        />

        <FormInput 
          id="phone"
          type="tel"
          placeholder="Phone Number *"
          value={phone}
          onChange={onChange}
          icon={Phone}
          className="bg-white/70"
          pattern="[+()0-9]+"
          title="Only numbers, plus sign, and brackets allowed"
          required
        />
      </div>
    </FormSection>
  );
};

export default ContactForm;
