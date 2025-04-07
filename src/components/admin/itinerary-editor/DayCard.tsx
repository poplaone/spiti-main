
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import TextFormattingToolbar from './TextFormattingToolbar';
import { ItineraryDay } from "../package-form/types";

interface DayCardProps {
  day: ItineraryDay;
  index: number;
  updateDay: (index: number, field: keyof ItineraryDay, value: string | number) => void;
  removeDay: (index: number) => void;
  applyFormatting: (index: number, format: string) => void;
  addBulletPoint: (index: number) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  index,
  updateDay,
  removeDay,
  applyFormatting,
  addBulletPoint
}) => {
  return (
    <Card className="relative">
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
          <TextFormattingToolbar 
            index={index} 
            applyFormatting={applyFormatting} 
            addBulletPoint={addBulletPoint} 
          />
          <Textarea
            id={`day-${index}-description`}
            placeholder="Describe the day's activities and experiences. Use formatting buttons for rich text. Add bullet points with the list button."
            value={day.description}
            onChange={(e) => updateDay(index, 'description', e.target.value)}
            rows={6}
            className="font-mono text-sm"
          />
          <div className="mt-2 text-xs text-gray-500">
            Tip: Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline, and Ctrl+L for bullet points. Or select text and use formatting buttons.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayCard;
