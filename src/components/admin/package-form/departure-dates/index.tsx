
import React, { useEffect, useState } from 'react';
import { Calendar, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { DepartureDateProps, DepartureDatesTabProps } from './types';
import DepartureDateForm from './DepartureDateForm';
import DepartureDatesList from './DepartureDatesList';
import EmptyDepartureDates from './EmptyDepartureDates';

const DepartureDatesTab: React.FC<DepartureDatesTabProps> = ({ 
  tourId, 
  isFixedDeparture 
}) => {
  const [loading, setLoading] = useState(false);
  const [departureDates, setDepartureDates] = useState<DepartureDateProps[]>([]);
  
  useEffect(() => {
    if (tourId && isFixedDeparture) {
      fetchDepartureDates();
    }
  }, [tourId, isFixedDeparture]);
  
  const fetchDepartureDates = async () => {
    if (!tourId) return;
    
    try {
      setLoading(true);
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase
        .from('tour_departure_dates')
        .select('*')
        .eq('tour_package_id', tourId)
        .order('start_date');
      
      if (error) {
        console.error("Error fetching dates:", error);
        throw error;
      }
      
      if (!data) {
        console.warn("No data returned when fetching departure dates");
        setDepartureDates([]);
        return;
      }
      
      console.log("Fetched departure dates:", data);
      
      const formattedDates = data.map(date => ({
        id: date.id,
        startDate: new Date(date.start_date),
        endDate: new Date(date.end_date),
        status: date.status as 'Available' | 'Limited' | 'Full'
      }));
      
      setDepartureDates(formattedDates);
    } catch (error: any) {
      console.error("Full error details:", error);
      toast.error(`Error loading departure dates: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDateAdded = (newDate: DepartureDateProps) => {
    console.log("New date added:", newDate);
    setDepartureDates(prevDates => [...prevDates, newDate]);
  };
  
  const updateDateStatus = async (id: string, status: 'Available' | 'Limited' | 'Full') => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
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
      const { supabase } = await import('@/integrations/supabase/client');
      
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
    return <EmptyDepartureDates />;
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
        
        <DepartureDateForm 
          tourId={tourId} 
          onDateAdded={handleDateAdded}
        />
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium">Departure Dates</h3>
        </div>
        
        <DepartureDatesList 
          dates={departureDates}
          loading={loading}
          onUpdateStatus={updateDateStatus}
          onDeleteDate={deleteDepartureDate}
        />
      </div>
    </div>
  );
};

export default DepartureDatesTab;
