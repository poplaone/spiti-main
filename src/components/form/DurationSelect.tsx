
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DurationSelectProps {
  onValueChange: (value: string) => void;
}

const DurationSelect = ({ onValueChange }: DurationSelectProps) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="h-12">
        <SelectValue placeholder="Select duration" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(15)].map((_, i) => (
          <SelectItem key={i + 1} value={`${i + 1}`}>
            {i + 1} {i + 1 === 1 ? 'Night' : 'Nights'} / {i + 2} {i + 2 === 1 ? 'Day' : 'Days'}
          </SelectItem>
        ))}
        <SelectItem value="custom">Custom Duration</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DurationSelect;
