
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface NightStay {
  id?: string;
  location: string;
  nights: number;
}

interface NightStaysEditorProps {
  nightStays: NightStay[];
  setNightStays: React.Dispatch<React.SetStateAction<NightStay[]>>;
}

const NightStaysEditor: React.FC<NightStaysEditorProps> = ({ nightStays, setNightStays }) => {
  const addNightStay = () => {
    setNightStays([...nightStays, { location: '', nights: 1 }]);
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

  return (
    <div className="space-y-4">
      {nightStays.map((stay, index) => (
        <div key={index} className="flex items-center gap-3">
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
