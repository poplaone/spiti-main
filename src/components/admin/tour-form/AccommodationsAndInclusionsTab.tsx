
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { TourPackageProps } from "@/components/TourPackage";
import ItemListInput from "./ItemListInput";

interface AccommodationsAndInclusionsTabProps {
  formData: TourPackageProps;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>;
}

const AccommodationsAndInclusionsTab = ({ formData, setFormData }: AccommodationsAndInclusionsTabProps) => {
  // Add a new night stay
  const addNightStay = () => {
    setFormData({
      ...formData,
      nightStays: [
        ...formData.nightStays,
        { location: '', nights: 1 }
      ]
    });
  };

  // Remove a night stay
  const removeNightStay = (index: number) => {
    const updatedNightStays = [...formData.nightStays];
    updatedNightStays.splice(index, 1);
    setFormData({
      ...formData,
      nightStays: updatedNightStays
    });
  };

  // Update night stay
  const updateNightStay = (index: number, field: string, value: string | number) => {
    const updatedNightStays = [...formData.nightStays];
    updatedNightStays[index] = {
      ...updatedNightStays[index],
      [field]: field === 'nights' ? Number(value) : value
    };
    setFormData({
      ...formData,
      nightStays: updatedNightStays
    });
  };

  // Handle inclusions update
  const handleInclusionsUpdate = (inclusions: string[]) => {
    setFormData({
      ...formData,
      inclusions
    });
  };

  // Handle exclusions update
  const handleExclusionsUpdate = (exclusions: string[]) => {
    setFormData({
      ...formData,
      exclusions: exclusions
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accommodations & Inclusions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="accommodations">
          <TabsList>
            <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
            <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
            <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
          </TabsList>

          {/* Accommodations Tab */}
          <TabsContent value="accommodations" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Night Stays</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addNightStay}
                className="flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Stay
              </Button>
            </div>
            
            {formData.nightStays.length === 0 ? (
              <p className="text-sm text-muted-foreground">No accommodations added yet.</p>
            ) : (
              formData.nightStays.map((stay, index) => (
                <div key={index} className="flex flex-wrap gap-4 items-end border rounded-md p-4">
                  <div className="flex-1">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      value={stay.location}
                      onChange={(e) => updateNightStay(index, 'location', e.target.value)}
                      placeholder="e.g., Manali"
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`nights-${index}`}>Nights</Label>
                    <Input
                      id={`nights-${index}`}
                      type="number"
                      min="1"
                      value={stay.nights}
                      onChange={(e) => updateNightStay(index, 'nights', e.target.value)}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeNightStay(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              ))
            )}
          </TabsContent>

          {/* Inclusions Tab */}
          <TabsContent value="inclusions" className="mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Inclusions</h3>
              </div>
              <p className="text-sm text-gray-500">List all items included in the package price</p>
              
              <ItemListInput
                label="Inclusion"
                items={formData.inclusions}
                setItems={handleInclusionsUpdate}
                placeholder="e.g., Hotel accommodations, All meals"
              />
            </div>
          </TabsContent>

          {/* Exclusions Tab */}
          <TabsContent value="exclusions" className="mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Exclusions</h3>
              </div>
              <p className="text-sm text-gray-500">List all items not included in the package price</p>
              
              <ItemListInput
                label="Exclusion"
                items={formData.exclusions || []}
                setItems={handleExclusionsUpdate}
                placeholder="e.g., Flight tickets, Personal expenses"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccommodationsAndInclusionsTab;
