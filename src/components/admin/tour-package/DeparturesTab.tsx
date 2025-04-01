import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { DepartureDateField } from '@/components/TourPackage.d';

interface DeparturesTabProps {
  formData: any;
  handleSwitchChange: (name: string, checked: boolean) => void;
  departureDatesFields: DepartureDateField[];
  handleDepartureDateChange: (index: number, field: keyof DepartureDateField, value: string | number | boolean) => void;
  addDepartureDate: () => void;
  removeDepartureDate: (index: number) => void;
}

const DeparturesTab = ({
  formData,
  handleSwitchChange,
  departureDatesFields,
  handleDepartureDateChange,
  addDepartureDate,
  removeDepartureDate
}: DeparturesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <h3 className="font-medium flex items-center text-amber-800">
            <Calendar className="h-5 w-5 mr-2" />
            Tour Availability Settings
          </h3>
          <p className="text-amber-700 text-sm mt-1">
            Configure whether this tour has fixed departure dates, is customizable, or both.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isFixedDepartureDates"
                checked={formData.isFixedDeparture || false}
                onCheckedChange={(checked) => handleSwitchChange('isFixedDeparture', checked)}
              />
              <div>
                <Label htmlFor="isFixedDepartureDates">Fixed Departure Dates</Label>
                <p className="text-xs text-amber-700">Tour departs on specific dates only</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isCustomizableDates"
                checked={formData.isCustomizable !== false}
                onCheckedChange={(checked) => handleSwitchChange('isCustomizable', checked)}
              />
              <div>
                <Label htmlFor="isCustomizableDates">Customizable Dates</Label>
                <p className="text-xs text-amber-700">Customers can choose their own dates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {formData.isFixedDeparture && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Fixed Departure Dates
            </h3>
            <Button type="button" variant="outline" onClick={addDepartureDate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Date
            </Button>
          </div>

          {departureDatesFields.map((date, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4">
              <div className="md:col-span-4 space-y-2">
                <Label htmlFor={`date-${index}`}>Departure Date</Label>
                <Input
                  id={`date-${index}`}
                  type="date"
                  value={date.date}
                  onChange={(e) => handleDepartureDateChange(index, 'date', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor={`price-${index}`}>Special Price (optional)</Label>
                <Input
                  id={`price-${index}`}
                  type="number"
                  min="0"
                  value={date.price || ''}
                  onChange={(e) => handleDepartureDateChange(index, 'price', e.target.value)}
                  placeholder="Regular price if empty"
                />
              </div>
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center h-10">
                  <Switch
                    id={`available-${index}`}
                    checked={date.available}
                    onCheckedChange={(checked) => handleDepartureDateChange(index, 'available', checked)}
                  />
                  <Label htmlFor={`available-${index}`} className="ml-2">
                    {date.available ? 'Available' : 'Sold Out'}
                  </Label>
                </div>
              </div>
              <div className="md:col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDepartureDate(index)}
                  disabled={departureDatesFields.length <= 1}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeparturesTab;
