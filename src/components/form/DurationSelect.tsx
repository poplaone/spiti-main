
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DurationSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const DurationSelect = ({ value, onValueChange, className }: DurationSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder="Select Duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="3-5 days">3-5 days</SelectItem>
        <SelectItem value="6-8 days">6-8 days</SelectItem>
        <SelectItem value="9-12 days">9-12 days</SelectItem>
        <SelectItem value="13+ days">13+ days</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DurationSelect;
