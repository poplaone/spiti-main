
import React from 'react';
import { format } from 'date-fns';

interface DepartureDateProps {
  id: string;
  startDate?: Date;
  endDate?: Date;
  status: 'Available' | 'Full' | 'Limited';
}

interface DepartureDatesCardProps {
  className?: string;
  departureDates?: DepartureDateProps[];
}

const DepartureDatesCard: React.FC<DepartureDatesCardProps> = ({
  className = "",
  departureDates = []
}) => {
  // Group dates by month
  const groupDeparturesByMonth = (dates: DepartureDateProps[]) => {
    const datesByMonth: Record<string, DepartureDateProps[]> = {};
    
    // Initialize all months
    const allMonths = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
    allMonths.forEach(month => {
      datesByMonth[month] = [];
    });
    
    // Add dates to their respective months
    dates.forEach(date => {
      if (date.startDate) {
        const monthName = format(new Date(date.startDate), 'MMMM');
        if (!datesByMonth[monthName]) {
          datesByMonth[monthName] = [];
        }
        datesByMonth[monthName].push(date);
      }
    });
    
    return datesByMonth;
  };
  
  const departureDatesByMonth = departureDates && departureDates.length > 0 
    ? groupDeparturesByMonth(departureDates)
    : {
        "May": [{
          id: "1",
          startDate: new Date("2025-05-12"),
          endDate: new Date("2025-05-16"),
          status: "Available" as const
        }],
        "June": [{
          id: "2",
          startDate: new Date("2025-06-09"),
          endDate: new Date("2025-06-13"),
          status: "Available" as const
        }, {
          id: "3",
          startDate: new Date("2025-06-23"),
          endDate: new Date("2025-06-27"),
          status: "Available" as const
        }],
        "July": [{
          id: "4",
          startDate: new Date("2025-07-14"),
          endDate: new Date("2025-07-18"),
          status: "Available" as const
        }],
        "August": [{
          id: "5",
          startDate: new Date("2025-08-11"),
          endDate: new Date("2025-08-15"),
          status: "Available" as const
        }],
        "September": [{
          id: "6",
          startDate: new Date("2025-09-08"),
          endDate: new Date("2025-09-12"),
          status: "Available" as const
        }, {
          id: "7",
          startDate: new Date("2025-09-29"),
          endDate: new Date("2025-10-03"),
          status: "Available" as const
        }],
        "October": [{
          id: "8",
          startDate: new Date("2025-10-27"),
          endDate: new Date("2025-10-31"),
          status: "Available" as const
        }]
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

  const formatDateRange = (date: DepartureDateProps) => {
    if (!date.startDate) return "";
    
    const startDateFormatted = format(new Date(date.startDate), "dd MMM");
    let endDateFormatted = "";
    
    if (date.endDate) {
      endDateFormatted = format(new Date(date.endDate), "dd MMM yyyy");
    } else {
      endDateFormatted = format(new Date(date.startDate), "yyyy");
    }
    
    return `${startDateFormatted} - ${endDateFormatted}`;
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <h2 className="text-xl font-heading font-bold text-spiti-forest mb-4">
        Departure dates
      </h2>
      
      <div className="space-y-4">
        {Object.entries(departureDatesByMonth).map(([month, dates]) => (
          <div key={month}>
            <h3 className={`text-sm font-medium ${dates.length > 0 ? 'text-gray-700' : 'text-gray-400'}`}>
              {month}
            </h3>
            <div className="space-y-1 mt-1">
              {dates.map((date) => (
                <div key={date.id} className="text-sm">
                  {formatDateRange(date)} <span className={`${getStatusColor(date.status)}`}>({date.status})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartureDatesCard;
