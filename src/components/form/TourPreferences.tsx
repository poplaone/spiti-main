
import { Dispatch, SetStateAction } from 'react';
import { CalendarClock, Users } from 'lucide-react';

import FormInput from './FormInput';
import FormSection from './FormSection';
import DatePickerInput from './DatePickerInput';
import DurationSelect from './DurationSelect';
import CheckboxOption from './CheckboxOption';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TourPreferencesProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  onCheckboxChange: (id: string, checked: boolean) => void;
  hideTourTypeHeading?: boolean;
}

const TourPreferences = ({ 
  date,
  setDate,
  duration,
  guests,
  isCustomized,
  isFixedDeparture,
  onInputChange,
  onSelectChange,
  onCheckboxChange,
  hideTourTypeHeading = false
}: TourPreferencesProps) => {
  const handleGuestsChange = (value: string) => {
    const fakeEvent = {
      target: {
        id: 'guests',
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInputChange(fakeEvent);
  };

  return (
    <div className="space-y-4">
      <FormSection title="Tour Details">
        <div className="space-y-4">
          <DatePickerInput 
            date={date}
            setDate={setDate}
            icon={CalendarClock}
          />

          <DurationSelect 
            value={duration}
            onValueChange={onSelectChange}
          />

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <Users size={18} />
            </div>
            <Select value={guests} onValueChange={handleGuestsChange}>
              <SelectTrigger className="pl-10 bg-white/70">
                <SelectValue placeholder="Number of Guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num === 10 ? "10+" : num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      <FormSection title="Tour Type" hideTitle={hideTourTypeHeading}>
        <div className="space-y-2">
          <CheckboxOption
            id="isCustomized"
            label="Customized Tour"
            checked={isCustomized}
            onChange={onCheckboxChange}
          />
          
          <CheckboxOption
            id="isFixedDeparture"
            label="Fixed Departure Tour"
            checked={isFixedDeparture}
            onChange={onCheckboxChange}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default TourPreferences;
