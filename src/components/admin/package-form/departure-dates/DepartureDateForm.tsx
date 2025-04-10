
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DatePickerInput from '@/components/form/DatePickerInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DepartureDateProps } from './types';

interface DepartureDateFormProps {
  tourId: string | undefined;
  onDateAdded: (newDate: DepartureDateProps) => void;
}

const DepartureDateForm: React.FC<DepartureDateFormProps> = ({ tourId, onDateAdded }) => {
  const [saving, setSaving] = useState(false);
  const [newDate, setNewDate] = useState<DepartureDateProps>({
    startDate: undefined,
    endDate: undefined,
    status: 'Available'
  });

  const handleAddDate = async () => {
    if (!tourId) {
      toast.error("You must save the tour package first before adding departure dates");
      return;
    }
    
    if (!newDate.startDate || !newDate.endDate) {
      toast.error("Both start date and end date are required");
      return;
    }
    
    if (newDate.startDate > newDate.endDate) {
      toast.error("Start date cannot be later than end date");
      return;
    }
    
    setSaving(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Create a new date with time set to noon UTC to avoid timezone issues
      const formatDateToUTC = (date: Date) => {
        const d = new Date(date);
        d.setUTCHours(12, 0, 0, 0);
        return d.toISOString().split('T')[0];
      };
      
      const formattedStartDate = formatDateToUTC(newDate.startDate);
      const formattedEndDate = formatDateToUTC(newDate.endDate);
      
      console.log('Saving dates to database:', {
        start: formattedStartDate,
        end: formattedEndDate
      });
      
      const { data, error } = await supabase
        .from('tour_departure_dates')
        .insert({
          tour_package_id: tourId,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          status: newDate.status
        })
        .select('id')
        .single();
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      if (!data || !data.id) {
        throw new Error("Failed to get ID from inserted record");
      }
      
      // Pass the new date up to the parent component
      onDateAdded({
        ...newDate,
        id: data.id
      });
      
      // Reset the form
      setNewDate({
        startDate: undefined,
        endDate: undefined,
        status: 'Available'
      });
      
      toast.success("Departure date added successfully");
    } catch (error: any) {
      console.error("Full error details:", error);
      toast.error(`Error adding departure date: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <DatePickerInput
          date={newDate.startDate}
          setDate={(date) => setNewDate({...newDate, startDate: date})}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <DatePickerInput
          date={newDate.endDate}
          setDate={(date) => setNewDate({...newDate, endDate: date})}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select 
          value={newDate.status} 
          onValueChange={(value: 'Available' | 'Limited' | 'Full') => 
            setNewDate({...newDate, status: value})
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Limited">Limited</SelectItem>
            <SelectItem value="Full">Full</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Button 
          onClick={handleAddDate} 
          disabled={saving || !newDate.startDate || !newDate.endDate}
          className="w-full"
        >
          {saving ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Date
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DepartureDateForm;
