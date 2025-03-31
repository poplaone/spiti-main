import React from 'react';
interface DepartureDateProps {
  startDate: string;
  endDate: string;
  status: 'Available' | 'Full' | 'Limited';
}
interface DepartureDatesCardProps {
  className?: string;
}
const DepartureDatesCard: React.FC<DepartureDatesCardProps> = ({
  className = ""
}) => {
  // Dummy data for departure dates
  const departureDatesByMonth: Record<string, DepartureDateProps[]> = {
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
  return <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <h2 className="text-xl font-heading font-bold text-spiti-forest mb-4">
        Departure dates
      </h2>
      
      <div className="space-y-4">
        {Object.entries(departureDatesByMonth).map(([month, dates]) => <div key={month}>
            <h3 className={`text-sm font-medium ${dates.length > 0 ? 'text-gray-700' : 'text-gray-400'}`}>
              {month}
            </h3>
            <div className="space-y-1 mt-1">
              {dates.map((date, index) => <div key={index} className="text-sm">
                  {date.startDate} - {date.endDate} <span className={`${getStatusColor(date.status)}`}>({date.status})</span>
                </div>)}
            </div>
          </div>)}
      </div>
      
      
    </div>;
};
export default DepartureDatesCard;