
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface ItineraryDay {
  id?: string;
  day_number: number;
  title: string;
  description: string;
}

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

  // Sort days by day_number
  const sortedDays = [...itineraryDays].sort((a, b) => a.day_number - b.day_number);

  return (
    <div className="space-y-6">
      {sortedDays.map((day, index) => (
        <Card key={index} className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => removeDay(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Day</label>
                <div className="flex items-center justify-center h-10 bg-spiti-forest text-white rounded-md">
                  {day.day_number}
                </div>
              </div>
              
              <div className="col-span-10">
                <label className="text-sm font-medium mb-1 block">Day Title</label>
                <Input
                  placeholder="Day title (e.g., Shimla to Kalpa - Mountain Journey)"
                  value={day.title}
                  onChange={(e) => updateDay(index, 'title', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                placeholder="Describe the day's activities and experiences"
                value={day.description}
                onChange={(e) => updateDay(index, 'description', e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addDay}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Day {itineraryDays.length + 1}
      </Button>
    </div>
  );
};

export default ItineraryEditor;
