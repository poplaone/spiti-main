
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Plus, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { TourFormValues } from '@/hooks/tour-form/useTourEditForm';

interface DetailsTabProps {
  form: UseFormReturn<TourFormValues>;
  duration: { days: number; nights: number };
  setDuration: React.Dispatch<React.SetStateAction<{ days: number; nights: number }>>;
  nightStays: { location: string; nights: number }[];
  addNightStay: () => void;
  updateNightStay: (index: number, field: 'location' | 'nights', value: string | number) => void;
  removeNightStay: (index: number) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  form,
  duration,
  setDuration,
  nightStays,
  addNightStay,
  updateNightStay,
  removeNightStay
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Days</label>
            <Input
              type="number"
              min="1"
              value={duration.days}
              onChange={(e) => setDuration({ ...duration, days: parseInt(e.target.value) || 0 })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Nights</label>
            <Input
              type="number"
              min="0"
              value={duration.nights}
              onChange={(e) => setDuration({ ...duration, nights: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="availableDates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Dates</FormLabel>
              <FormControl>
                <Input placeholder="e.g., June to October" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bestTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Best Time to Visit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., June to September" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Size</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2-10 People" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="terrain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terrain</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Himalayan Mountain Passes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="elevation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Elevation</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2,000 - 4,550 meters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="accommodationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accommodation Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Hotels & Homestays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Night Stays</h3>
            <Button 
              type="button" 
              size="sm" 
              onClick={addNightStay}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Location
            </Button>
          </div>
          
          {nightStays.map((stay, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-3">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={stay.location}
                  onChange={(e) => updateNightStay(index, 'location', e.target.value)}
                  placeholder="Location name"
                />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-medium">Nights</label>
                <Input
                  type="number"
                  min="1"
                  value={stay.nights}
                  onChange={(e) => updateNightStay(index, 'nights', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="flex items-end justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNightStay(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          
          {nightStays.length === 0 && (
            <div className="text-sm text-gray-500 py-2">
              No night stays added. Click "Add Location" to add one.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
