
import DurationSelect from './DurationSelect';
import DatePickerInput from './DatePickerInput';
import CheckboxOption from './CheckboxOption';
import FormInput from './FormInput';
import FormSection from './FormSection';
import { Users } from 'lucide-react';

interface TourPreferencesProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  duration: string;
  guests: string;
  isCustomized: boolean;
  isFixedDeparture: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
  onCheckboxChange: (id: string, checked: boolean) => void;
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
  onCheckboxChange
}: TourPreferencesProps) => {
  return (
    <>
      <FormSection leftLabel="Tour Duration" rightLabel="Number of Guests">
        <div className="grid grid-cols-2 gap-4">
          <DurationSelect onValueChange={onSelectChange} className="bg-white/70" />
          
          <FormInput 
            id="guests"
            type="number"
            min="1"
            placeholder="Guests"
            value={guests}
            onChange={onInputChange}
            icon={Users}
            className="bg-white/70"
          />
        </div>
      </FormSection>

      <FormSection leftLabel="Travel Date" rightLabel="Tour Type">
        <div className="grid grid-cols-2 gap-4">
          <DatePickerInput date={date} setDate={setDate} className="bg-white/70" />
          
          <div className="flex flex-col space-y-2 p-2 rounded bg-white/70">
            <CheckboxOption 
              id="isCustomized"
              label="Customized"
              checked={isCustomized}
              onCheckedChange={(checked) => onCheckboxChange('isCustomized', checked)}
            />
            
            <CheckboxOption 
              id="isFixedDeparture"
              label="Fixed Departure"
              checked={isFixedDeparture}
              onCheckedChange={(checked) => onCheckboxChange('isFixedDeparture', checked)}
            />
          </div>
        </div>
      </FormSection>
    </>
  );
};

export default TourPreferences;
