
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Calendar, HelpCircle } from 'lucide-react';
import DatePickerInput from '@/components/form/DatePickerInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DepartureDateProps {
  id?: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: 'Available' | 'Limited' | 'Full';
}

interface DepartureDatesTabProps {
  tourId: string | undefined;
  isFixedDeparture: boolean;
}

const DepartureDatesTab: React.FC<DepartureDatesTabProps> = ({ 
  tourId,
  isFixedDeparture
}) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [departureDates, setDepartureDates] = useState<DepartureDateProps[]>([]);
  
  // Form state for adding a new date
  const [newDate, setNewDate] = useState<DepartureDateProps>({
    startDate: undefined,
    endDate: undefined,
    status: 'Available'
  });
  
  useEffect(() => {
    if (tourId && isFixedDeparture) {
      fetchDepartureDates();
    }
  }, [tourId, isFixedDeparture]);
  
  const fetchDepartureDates = async () => {
    if (!tourId) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('tour_departure_dates')
        .select('*')
        .eq('tour_package_id', tourId)
        .order('start_date');
      
      if (error) throw error;
      
      const formattedDates = data.map(date => ({
        id: date.id,
        startDate: new Date(date.start_date),
        endDate: new Date(date.end_date),
        status: date.status as 'Available' | 'Limited' | 'Full'
      }));
      
      setDepartureDates(formattedDates);
    } catch (error: any) {
      toast.error(`Error loading departure dates: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const addDepartureDate = async () => {
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
    
    try {
      setSaving(true);
      
      const { data, error } = await supabase
        .from('tour_departure_dates')
        .insert({
          tour_package_id: tourId,
          start_date: newDate.startDate.toISOString().split('T')[0],
          end_date: newDate.endDate.toISOString().split('T')[0],
          status: newDate.status
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      // Add the new date to the list with its ID
      setDepartureDates([...departureDates, {
        ...newDate,
        id: data.id
      }]);
      
      // Reset the form
      setNewDate({
        startDate: undefined,
        endDate: undefined,
        status: 'Available'
      });
      
      toast.success("Departure date added successfully");
    } catch (error: any) {
      toast.error(`Error adding departure date: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  const updateDateStatus = async (id: string, status: 'Available' | 'Limited' | 'Full') => {
    try {
      const { error } = await supabase
        .from('tour_departure_dates')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the local state
      setDepartureDates(departureDates.map(date => 
        date.id === id ? { ...date, status } : date
      ));
      
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.error(`Error updating status: ${error.message}`);
    }
  };
  
  const deleteDepartureDate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tour_departure_dates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Remove the deleted date from the list
      setDepartureDates(departureDates.filter(date => date.id !== id));
      
      toast.success("Departure date deleted successfully");
    } catch (error: any) {
      toast.error(`Error deleting departure date: ${error.message}`);
    }
  };
  
  if (!isFixedDeparture) {
    return (
      <div className="p-6 border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium">Departure Dates</h3>
        </div>
        <p className="text-gray-500">
          Departure dates can only be added to fixed departure tours. 
          Please enable "Fixed Departure" in the Basic Info tab to manage departure dates.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h3 className="text-lg font-medium mr-2">Add Departure Date</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[220px]">
                    Add specific departure dates for this tour. These dates will be displayed to users on the tour details page.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
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
              onClick={addDepartureDate} 
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
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium">Departure Dates</h3>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full mr-2"></div>
            <span>Loading dates...</span>
          </div>
        ) : departureDates.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No departure dates have been added. Add your first departure date above.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departureDates.map((date) => (
                <TableRow key={date.id}>
                  <TableCell>{format(date.startDate, 'dd MMM yyyy')}</TableCell>
                  <TableCell>{format(date.endDate, 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <Select 
                      value={date.status} 
                      onValueChange={(value: 'Available' | 'Limited' | 'Full') => 
                        date.id && updateDateStatus(date.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                        <SelectItem value="Full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => date.id && deleteDepartureDate(date.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default DepartureDatesTab;
