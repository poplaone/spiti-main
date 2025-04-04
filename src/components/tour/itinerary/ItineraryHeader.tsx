
import React from 'react';
import { Calendar } from 'lucide-react';

const ItineraryHeader: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <Calendar className="text-spiti-forest w-6 h-6 mr-2" />
        Tour Itinerary
      </h2>
      <p className="text-gray-700 mb-6">
        Follow our carefully crafted day-by-day itinerary through the magnificent landscapes of Spiti Valley. 
        From ancient monasteries to quaint villages and breathtaking lakes, each day offers unique experiences in this Himalayan paradise.
      </p>
    </>
  );
};

export default ItineraryHeader;
