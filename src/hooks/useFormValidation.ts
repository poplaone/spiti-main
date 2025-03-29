
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  [key: string]: string | boolean;
}

export const useFormValidation = () => {
  const validateForm = (formData: FormData): boolean => {
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

  return { validateForm };
};
