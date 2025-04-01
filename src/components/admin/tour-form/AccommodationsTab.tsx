
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";

interface NightStay {
  location: string;
  nights: number;
}

interface AccommodationsTabProps {
  formData: TourPackageProps;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>;
}

const AccommodationsTab = ({ formData, setFormData }: AccommodationsTabProps) => {
  const { toast } = useToast();
  
  const [newNightStay, setNewNightStay] = useState<NightStay>({
    location: "",
    nights: 1
  });
  
  // Add night stay
  const addNightStay = () => {
    if (!newNightStay.location) {
      toast({
        description: "Please enter a location",
        variant: "destructive"
      });
      return;
    }
    
    setFormData({
      ...formData,
      nightStays: [...formData.nightStays, { ...newNightStay }]
    });
    
    setNewNightStay({
      location: "",
      nights: 1
    });
  };
  
  // Remove night stay
  const removeNightStay = (index: number) => {
    const updatedNightStays = [...formData.nightStays];
    updatedNightStays.splice(index, 1);
    
    setFormData({
      ...formData,
      nightStays: updatedNightStays
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accommodations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Night Stays</h3>
          {formData.nightStays.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.nightStays.map((stay, index) => (
                <div key={index} className="border p-4 rounded-md relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeNightStay(index)}
                  >
                    Remove
                  </Button>
                  <div className="font-medium">{stay.location}</div>
                  <div className="text-sm text-gray-700">
                    {stay.nights} {stay.nights === 1 ? 'night' : 'nights'} stay
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No accommodations added yet</p>
          )}
        </div>
        
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Add Accommodation</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3">
              <Label htmlFor="newStayLocation">Location</Label>
              <Input
                id="newStayLocation"
                value={newNightStay.location}
                onChange={(e) => setNewNightStay({
                  ...newNightStay,
                  location: e.target.value
                })}
                placeholder="e.g., Kaza Homestay"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="newStayNights">Number of Nights</Label>
              <Input
                id="newStayNights"
                type="number"
                min="1"
                value={newNightStay.nights}
                onChange={(e) => setNewNightStay({
                  ...newNightStay,
                  nights: parseInt(e.target.value) || 1
                })}
              />
            </div>
            <div className="md:col-span-5">
              <Button
                type="button"
                onClick={addNightStay}
                className="bg-spiti-forest hover:bg-spiti-forest/90"
              >
                Add Accommodation
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationsTab;
