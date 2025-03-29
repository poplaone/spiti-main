
import React from 'react';
import { Input } from "@/components/ui/input";
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  min?: string;
  className?: string;
}

const FormInput = ({ 
  id, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  min,
  className 
}: FormInputProps) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input 
        id={id} 
        type={type} 
        className={`pl-10 h-12 ${className}`} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  );
};

export default FormInput;
