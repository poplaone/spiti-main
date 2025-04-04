
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  min?: string;
  className?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
}

const FormInput = ({ 
  id, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  min,
  className,
  required,
  pattern,
  title
}: FormInputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
        <Icon size={18} />
      </div>
      <Input
        id={id}
        type={type}
        min={min}
        className={cn("pl-10", className)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        title={title}
      />
    </div>
  );
};

export default FormInput;
