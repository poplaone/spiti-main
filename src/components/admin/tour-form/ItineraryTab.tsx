
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface ItineraryTabProps {
  formData: TourPackageProps;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>;
}

const ItineraryTab = ({ formData, setFormData }: ItineraryTabProps) => {
  const { toast } = useToast();
  
  const [newItineraryDay, setNewItineraryDay] = useState<ItineraryDay>({
    day: 1,
    title: "",
    description: ""
  });

  // Add itinerary day
  const addItineraryDay = () => {
    if (!newItineraryDay.title || !newItineraryDay.description) {
      toast({
        description: "Please fill in all itinerary day fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedItinerary = [
      ...(formData.itinerary || []),
      { ...newItineraryDay }
    ].sort((a, b) => a.day - b.day);
    
    setFormData({
      ...formData,
      itinerary: updatedItinerary
    });
    
    setNewItineraryDay({
      day: Math.max(...updatedItinerary.map(d => d.day), 0) + 1,
      title: "",
      description: ""
    });
  };
  
  // Remove itinerary day
  const removeItineraryDay = (day: number) => {
    const updatedItinerary = (formData.itinerary || [])
      .filter(item => item.day !== day)
      .map((item, idx) => ({ ...item, day: idx + 1 }));
    
    setFormData({
      ...formData,
      itinerary: updatedItinerary
    });
    
    // Reset new day count
    if (updatedItinerary.length > 0) {
      setNewItineraryDay({
        ...newItineraryDay,
        day: Math.max(...updatedItinerary.map(d => d.day)) + 1
      });
    } else {
      setNewItineraryDay({
        ...newItineraryDay,
        day: 1
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Current Itinerary Days</h3>
          {formData.itinerary && formData.itinerary.length > 0 ? (
            <div className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border p-4 rounded-md relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeItineraryDay(day.day)}
                  >
                    Remove
                  </Button>
                  <div className="font-medium">Day {day.day}: {day.title}</div>
                  <div className="text-sm text-gray-700 mt-2">{day.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No itinerary days added yet</p>
          )}
        </div>
        
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Add New Day</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="newDay">Day</Label>
              <Input
                id="newDay"
                type="number"
                min="1"
                value={newItineraryDay.day}
                onChange={(e) => setNewItineraryDay({
                  ...newItineraryDay,
                  day: parseInt(e.target.value) || 1
                })}
              />
            </div>
            <div className="md:col-span-5">
              <Label htmlFor="newDayTitle">Title</Label>
              <Input
                id="newDayTitle"
                value={newItineraryDay.title}
                onChange={(e) => setNewItineraryDay({
                  ...newItineraryDay,
                  title: e.target.value
                })}
                placeholder="e.g., Arrival in Spiti Valley"
              />
            </div>
            <div className="md:col-span-6">
              <Label htmlFor="newDayDescription">Description</Label>
              <Textarea
                id="newDayDescription"
                value={newItineraryDay.description}
                onChange={(e) => setNewItineraryDay({
                  ...newItineraryDay,
                  description: e.target.value
                })}
                placeholder="Describe the day's activities and experiences"
                className="min-h-24"
              />
            </div>
            <div className="md:col-span-6">
              <Button
                type="button"
                onClick={addItineraryDay}
                className="bg-spiti-forest hover:bg-spiti-forest/90"
              >
                Add Itinerary Day
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItineraryTab;
