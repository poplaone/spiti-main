
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

interface NightStay {
  id?: string;
  location: string;
  nights: number;
  order?: number;
}

interface NightStaysEditorProps {
  nightStays: NightStay[];
  setNightStays: React.Dispatch<React.SetStateAction<NightStay[]>>;
}

const NightStaysEditor: React.FC<NightStaysEditorProps> = ({ nightStays, setNightStays }) => {
  const addNightStay = () => {
    // Get the highest order value and add 1, or start with 1
    const nextOrder = nightStays.length > 0 
      ? Math.max(...nightStays.map(stay => stay.order || 0)) + 1 
      : 1;
      
    setNightStays([...nightStays, { location: '', nights: 1, order: nextOrder }]);
  };

  const updateNightStay = (index: number, field: keyof NightStay, value: string | number) => {
    const updatedStays = [...nightStays];
    updatedStays[index] = { 
      ...updatedStays[index], 
      [field]: field === 'nights' ? parseInt(value.toString()) : value 
    };
    setNightStays(updatedStays);
  };

  const removeNightStay = (index: number) => {
    const updatedStays = [...nightStays];
    updatedStays.splice(index, 1);
    setNightStays(updatedStays);
  };

  const moveNightStay = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === nightStays.length - 1)) {
      return;
    }

    const updatedStays = [...nightStays];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order values
    const currentOrder = updatedStays[index].order || index + 1;
    const targetOrder = updatedStays[targetIndex].order || targetIndex + 1;
    
    updatedStays[index].order = targetOrder;
    updatedStays[targetIndex].order = currentOrder;
    
    // Swap positions in array
    [updatedStays[index], updatedStays[targetIndex]] = [updatedStays[targetIndex], updatedStays[index]];
    
    setNightStays(updatedStays);
  };

  // Sort night stays by order
  const sortedNightStays = [...nightStays].sort((a, b) => {
    const orderA = a.order !== undefined ? a.order : 999;
    const orderB = b.order !== undefined ? b.order : 999;
    return orderA - orderB;
  });

  return (
    <div className="space-y-4">
      {sortedNightStays.map((stay, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex flex-col space-y-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => moveNightStay(index, 'up')}
              disabled={index === 0}
              className="h-8 w-8"
            >
              <MoveUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => moveNightStay(index, 'down')}
              disabled={index === sortedNightStays.length - 1}
              className="h-8 w-8"
            >
              <MoveDown className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Location (e.g., Kaza)"
            value={stay.location}
            onChange={(e) => updateNightStay(index, 'location', e.target.value)}
            className="flex-grow"
          />
          <div className="w-24">
            <Input
              type="number"
              min="1"
              placeholder="Nights"
              value={stay.nights}
              onChange={(e) => updateNightStay(index, 'nights', e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeNightStay(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addNightStay}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Night Stay
      </Button>
    </div>
  );
};

export default NightStaysEditor;
