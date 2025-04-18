import React from 'react';
import { Home, MapPin } from 'lucide-react';
import { TourAccommodationProps } from "@/data/types/tourTypes";

const TourAccommodation: React.FC<TourAccommodationProps> = ({ nightStays }) => {
  // Sort night stays by order if it exists, otherwise keep original order
  const sortedStays = [...nightStays].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0; // Keep original order if no order property
  });
  
  return (
    <div>
      <p className="text-gray-700 mb-6">
        Relax and unwind in carefully chosen accommodations that enhance your experience with comfort and local hospitality.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStays.map((stay, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <MapPin className="text-spiti-blue w-5 h-5 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">{stay.location}</p>
                <p className="text-sm text-gray-600">{stay.nights} {stay.nights === 1 ? 'night' : 'nights'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourAccommodation;
