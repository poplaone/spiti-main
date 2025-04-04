
import React from 'react';
import { Calendar } from 'lucide-react';

const EmptyDepartureDates: React.FC = () => {
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
};

export default EmptyDepartureDates;
