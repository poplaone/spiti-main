
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { TourItineraryDay } from '@/data/types/tourTypes';

interface ItineraryTabProps {
  itineraryFields: TourItineraryDay[];
  handleItineraryChange: (index: number, field: keyof TourItineraryDay, value: string | number) => void;
  addItineraryDay: () => void;
  removeItineraryDay: (index: number) => void;
}

const ItineraryTab = ({
  itineraryFields,
  handleItineraryChange,
  addItineraryDay,
  removeItineraryDay
}: ItineraryTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Itinerary</h3>
        <Button type="button" variant="outline" onClick={addItineraryDay}>
          <Plus className="mr-2 h-4 w-4" />
          Add Day
        </Button>
      </div>

      {itineraryFields.map((day, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Day {day.day}</h4>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItineraryDay(index)}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`day-${index}`}>Day Number</Label>
              <Input
                id={`day-${index}`}
                type="number"
                min="1"
                value={day.day}
                onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                value={day.title}
                onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                placeholder="Enter day title"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={day.description}
              onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
              placeholder="Enter day description"
              rows={3}
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTab;
