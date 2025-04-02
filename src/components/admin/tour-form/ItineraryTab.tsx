
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface ItineraryTabProps {
  itinerary: { day: number; title: string; description: string }[];
  addItineraryDay: () => void;
  updateItineraryDay: (index: number, field: 'day' | 'title' | 'description', value: any) => void;
  removeItineraryDay: (index: number) => void;
}

const ItineraryTab: React.FC<ItineraryTabProps> = ({
  itinerary,
  addItineraryDay,
  updateItineraryDay,
  removeItineraryDay
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Add day-by-day itinerary details</p>
          <Button 
            type="button" 
            onClick={addItineraryDay}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Day
          </Button>
        </div>
        
        {itinerary.map((day, index) => (
          <div key={index} className="space-y-3 border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Day</h4>
                <Input
                  type="number"
                  min="1"
                  value={day.day}
                  onChange={(e) => updateItineraryDay(index, 'day', parseInt(e.target.value) || 0)}
                  className="w-16"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItineraryDay(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={day.title}
                onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                placeholder="Day title"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={day.description}
                onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                placeholder="Day description"
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}
        
        {itinerary.length === 0 && (
          <div className="text-sm text-gray-500 py-2">
            No itinerary days added. Click "Add Day" to add one.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItineraryTab;
