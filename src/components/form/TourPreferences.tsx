
import { Dispatch, SetStateAction } from 'react';
import { CalendarClock, Users } from 'lucide-react';

import FormInput from './FormInput';
import FormSection from './FormSection';
import DatePickerInput from './DatePickerInput';
import DurationSelect from './DurationSelect';
import CheckboxOption from './CheckboxOption';

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

          <FormInput 
            id="guests"
            type="number"
            placeholder="Number of Guests"
            value={guests}
            onChange={onInputChange}
            icon={Users}
            min="1"
            className="bg-white/70"
          />
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
