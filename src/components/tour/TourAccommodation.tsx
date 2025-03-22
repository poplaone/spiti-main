
import React from 'react';
import { Bed, Hotel, Tent, Home } from 'lucide-react';
import { TourPackageProps } from "@/components/TourPackage";

interface TourAccommodationProps {
  tour: TourPackageProps;
}

const TourAccommodation: React.FC<TourAccommodationProps> = ({ tour }) => {
  const getAccommodationIcon = (location: string) => {
    if (location.toLowerCase().includes('camp') || location.toLowerCase() === 'chandrataal') {
      return <Tent className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />;
    } else if (
      location.toLowerCase().includes('village') || 
      location.toLowerCase() === 'mudh' || 
      location.toLowerCase() === 'langza'
    ) {
      return <Home className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />;
    } else if (
      location.toLowerCase() === 'manali' || 
      location.toLowerCase() === 'shimla'
    ) {
      return <Hotel className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />;
    } else {
      return <Bed className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <Hotel className="text-spiti-forest w-6 h-6 mr-2" />
        Accommodation
      </h2>
      <p className="text-gray-600 mb-4">
        Stay in comfortable accommodations throughout your Spiti Valley journey, experiencing the warm hospitality 
        of this Himalayan region while enjoying stunning mountain views:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tour.nightStays.map((stay, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
            {getAccommodationIcon(stay.location)}
            <span>
              <span className="font-medium">{stay.nights} night{stay.nights > 1 ? 's' : ''} in {stay.location}</span>
              <p className="text-xs text-gray-500 mt-0.5">Experience the unique charm of this Himalayan destination</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourAccommodation;
