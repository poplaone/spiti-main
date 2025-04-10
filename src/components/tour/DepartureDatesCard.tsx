
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';

interface DepartureDateProps {
  id?: string;
  startDate: string;
  endDate: string;
  status: 'Available' | 'Limited' | 'Full';
}

interface DepartureDatesCardProps {
  className?: string;
  tourId?: string;
  hideTitle?: boolean;
}

const DepartureDatesCard: React.FC<DepartureDatesCardProps> = ({
  className = "",
  tourId,
  hideTitle = false
}) => {
  const [loading, setLoading] = useState(false);
  const [departureDatesByMonth, setDepartureDatesByMonth] = useState<Record<string, DepartureDateProps[]>>({});
  
  useEffect(() => {
    if (tourId) {
      fetchDepartureDates();
    } else {
      // Use dummy data if no tourId is provided (for demonstration)
      setDummyData();
    }
  }, [tourId]);

  const fetchDepartureDates = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('tour_departure_dates')
        .select('id, start_date, end_date, status')
        .eq('tour_package_id', tourId)
        .order('start_date');
      
      if (error) throw error;
      
      // Format and organize dates by month
      const datesByMonth: Record<string, DepartureDateProps[]> = {};
      
      if (data && data.length > 0) {
        data.forEach(dateItem => {
          // Use parseISO to correctly parse ISO date strings without timezone issues
          const startDate = parseISO(dateItem.start_date);
          const endDate = parseISO(dateItem.end_date);
          
          // Format them for display
          const formattedStartDate = format(startDate, 'dd MMM');
          const formattedEndDate = format(endDate, 'dd MMM yyyy');
          
          // Get month name for grouping
          const monthName = format(startDate, 'MMMM');
          
          if (!datesByMonth[monthName]) {
            datesByMonth[monthName] = [];
          }
          
          datesByMonth[monthName].push({
            id: dateItem.id,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            status: dateItem.status as 'Available' | 'Limited' | 'Full'
          });
        });
      }
      
      setDepartureDatesByMonth(datesByMonth);
    } catch (error) {
      console.error('Error fetching departure dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const setDummyData = () => {
    // Dummy data for departure dates (for preview only)
    const dummyData: Record<string, DepartureDateProps[]> = {
      "May": [{
        startDate: "12 May",
        endDate: "16 May 2025",
        status: "Available"
      }],
      "June": [{
        startDate: "09 Jun",
        endDate: "13 Jun 2025",
        status: "Available"
      }, {
        startDate: "23 Jun",
        endDate: "27 Jun 2025",
        status: "Available"
      }],
      "July": [{
        startDate: "14 Jul",
        endDate: "18 Jul 2025",
        status: "Available"
      }],
      "August": [{
        startDate: "11 Aug",
        endDate: "15 Aug 2025",
        status: "Available"
      }],
      "September": [{
        startDate: "08 Sep",
        endDate: "12 Sep 2025",
        status: "Available"
      }, {
        startDate: "29 Sep",
        endDate: "03 Oct 2025",
        status: "Available"
      }],
      "October": [{
        startDate: "27 Oct",
        endDate: "31 Oct 2025",
        status: "Available"
      }]
    };
    
    setDepartureDatesByMonth(dummyData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600';
      case 'Limited':
        return 'text-amber-600';
      case 'Full':
        return 'text-red-600';
      default:
        return 'text-green-600';
    }
  };
  
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      {/* Only show the title if hideTitle is false */}
      {!hideTitle && (
        <h2 className="text-xl font-heading font-bold text-spiti-forest mb-4">
          Departure dates
        </h2>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin h-5 w-5 border-2 border-spiti-forest border-t-transparent rounded-full mr-2"></div>
          <span>Loading dates...</span>
        </div>
      ) : Object.keys(departureDatesByMonth).length === 0 ? (
        <p className="text-gray-500">No departure dates available.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(departureDatesByMonth).map(([month, dates]) => (
            <div key={month}>
              <h3 className={`text-sm font-medium ${dates.length > 0 ? 'text-gray-700' : 'text-gray-400'}`}>
                {month}
              </h3>
              <div className="space-y-1 mt-1">
                {dates.map((date, index) => (
                  <div key={date.id || index} className="text-sm">
                    {date.startDate} - {date.endDate} <span className={`${getStatusColor(date.status)}`}>({date.status})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartureDatesCard;
