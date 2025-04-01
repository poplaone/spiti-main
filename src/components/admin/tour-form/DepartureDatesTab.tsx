
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import DatePickerInput from "@/components/form/DatePickerInput";
import { TourPackageProps } from "@/components/TourPackage";

interface DepartureDatesTabProps {
  formData: TourPackageProps;
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>;
}

interface DepartureDate {
  id: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: 'Available' | 'Limited' | 'Full';
}

const DepartureDatesTab = ({ formData, setFormData }: DepartureDatesTabProps) => {
  // Initialize departure dates from formData or create empty array
  const [departureDates, setDepartureDates] = useState<DepartureDate[]>(
    formData.departureDates || []
  );

  // Add a new departure date
  const addDepartureDate = () => {
    const newDate: DepartureDate = {
      id: Date.now().toString(), // Simple unique ID
      startDate: undefined,
      endDate: undefined,
      status: 'Available'
    };
    
    const updatedDates = [...departureDates, newDate];
    setDepartureDates(updatedDates);
    
    // Update the form data
    setFormData({
      ...formData,
      departureDates: updatedDates
    });
  };

  // Remove a departure date
  const removeDepartureDate = (idToRemove: string) => {
    const updatedDates = departureDates.filter(date => date.id !== idToRemove);
    setDepartureDates(updatedDates);
    
    // Update the form data
    setFormData({
      ...formData,
      departureDates: updatedDates
    });
  };

  // Update a departure date
  const updateDepartureDate = (id: string, field: keyof DepartureDate, value: any) => {
    const updatedDates = departureDates.map(date => {
      if (date.id === id) {
        return { ...date, [field]: value };
      }
      return date;
    });
    
    setDepartureDates(updatedDates);
    
    // Update the form data
    setFormData({
      ...formData,
      departureDates: updatedDates
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Departure Dates</CardTitle>
        <Button 
          type="button" 
          variant="outline"
          onClick={addDepartureDate}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Date
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departureDates.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No departure dates added. Click "Add Date" to add fixed departure dates.
            </p>
          )}
          
          {departureDates.map((date) => (
            <div key={date.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-200 rounded-md p-4">
              <div>
                <Label>Start Date</Label>
                <DatePickerInput 
                  date={date.startDate} 
                  setDate={(newDate) => updateDepartureDate(date.id, 'startDate', newDate)} 
                  className="w-full"
                />
              </div>
              
              <div>
                <Label>End Date</Label>
                <DatePickerInput 
                  date={date.endDate} 
                  setDate={(newDate) => updateDepartureDate(date.id, 'endDate', newDate)} 
                  className="w-full"
                />
              </div>
              
              <div>
                <Label>Status</Label>
                <Select 
                  value={date.status} 
                  onValueChange={(value) => updateDepartureDate(date.id, 'status', value as 'Available' | 'Limited' | 'Full')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeDepartureDate(date.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="ml-1">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartureDatesTab;
