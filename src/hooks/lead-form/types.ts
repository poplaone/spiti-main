
import { Date } from "date-fns";

export interface FormState {
  name: string;
  email: string;
  phone: string;
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
  [key: string]: string | boolean | number;
}

export interface UseLeadFormReturn {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  formData: FormState;
  isSubmitting: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleSubmit: () => Promise<void>;
  sendWhatsApp: () => void;
}
