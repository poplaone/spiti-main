
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const CheckboxOption = ({ id, label, checked, onCheckedChange }: CheckboxOptionProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
      />
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
    </div>
  );
};

export default CheckboxOption;
