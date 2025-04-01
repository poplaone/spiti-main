
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { TourNightStay } from '@/data/types/tourTypes';

interface DetailsTabProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inclusionsText: string;
  handleInclusionsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  exclusionsText: string;
  handleExclusionsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  nightStaysFields: TourNightStay[];
  handleNightStayChange: (index: number, field: keyof TourNightStay, value: string | number) => void;
  addNightStay: () => void;
  removeNightStay: (index: number) => void;
}

const DetailsTab = ({
  formData,
  handleInputChange,
  inclusionsText,
  handleInclusionsChange,
  exclusionsText,
  handleExclusionsChange,
  nightStaysFields,
  handleNightStayChange,
  addNightStay,
  removeNightStay
}: DetailsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="overview">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            value={formData.overview || ''}
            onChange={handleInputChange}
            placeholder="Enter tour package overview"
            rows={6}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inclusions">Inclusions (one per line)</Label>
          <Textarea
            id="inclusions"
            value={inclusionsText}
            onChange={handleInclusionsChange}
            placeholder="Enter inclusions, one per line"
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exclusions">Exclusions (one per line)</Label>
          <Textarea
            id="exclusions"
            value={exclusionsText}
            onChange={handleExclusionsChange}
            placeholder="Enter exclusions, one per line"
            rows={5}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Night Stays</h3>
          <Button type="button" variant="outline" onClick={addNightStay}>
            <Plus className="mr-2 h-4 w-4" />
            Add Stay
          </Button>
        </div>

        {nightStaysFields.map((stay, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end border-b pb-4">
            <div className="md:col-span-4 space-y-2">
              <Label htmlFor={`location-${index}`}>Location</Label>
              <Input
                id={`location-${index}`}
                value={stay.location}
                onChange={(e) => handleNightStayChange(index, 'location', e.target.value)}
                placeholder="Enter location name"
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor={`nights-${index}`}>Nights</Label>
              <Input
                id={`nights-${index}`}
                type="number"
                min="1"
                value={stay.nights}
                onChange={(e) => handleNightStayChange(index, 'nights', e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeNightStay(index)}
                disabled={nightStaysFields.length <= 1}
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsTab;
