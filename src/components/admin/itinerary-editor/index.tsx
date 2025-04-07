
import React from 'react';
import DayCard from './DayCard';
import AddDayButton from './AddDayButton';
import useTextFormatting from './useTextFormatting';
import { ItineraryDay } from "../package-form/types";

interface ItineraryEditorProps {
  itineraryDays: ItineraryDay[];
  setItineraryDays: React.Dispatch<React.SetStateAction<ItineraryDay[]>>;
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({ 
  itineraryDays, 
  setItineraryDays 
}) => {
  const addDay = () => {
    const nextDayNumber = itineraryDays.length > 0
      ? Math.max(...itineraryDays.map(day => day.day_number)) + 1
      : 1;
    
    setItineraryDays([
      ...itineraryDays, 
      { 
        day_number: nextDayNumber, 
        title: '', 
        description: '' 
      }
    ]);
  };

  const updateDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    const updatedDays = [...itineraryDays];
    updatedDays[index] = { 
      ...updatedDays[index], 
      [field]: field === 'day_number' ? parseInt(value.toString()) : value 
    };
    setItineraryDays(updatedDays);
  };

  const removeDay = (index: number) => {
    const updatedDays = [...itineraryDays];
    updatedDays.splice(index, 1);
    
    // Re-number days to ensure sequential numbering
    const renumberedDays = updatedDays.map((day, idx) => ({
      ...day,
      day_number: idx + 1
    }));
    
    setItineraryDays(renumberedDays);
  };

  const { applyFormatting, addBulletPoint } = useTextFormatting(updateDay, itineraryDays);

  // Sort days by day_number
  const sortedDays = [...itineraryDays].sort((a, b) => a.day_number - b.day_number);
  const nextDayNumber = sortedDays.length + 1;

  return (
    <div className="space-y-6">
      {sortedDays.map((day, index) => (
        <DayCard
          key={index}
          day={day}
          index={index}
          updateDay={updateDay}
          removeDay={removeDay}
          applyFormatting={applyFormatting}
          addBulletPoint={addBulletPoint}
        />
      ))}
      
      <AddDayButton onAddDay={addDay} nextDayNumber={nextDayNumber} />
    </div>
  );
};

export default ItineraryEditor;
