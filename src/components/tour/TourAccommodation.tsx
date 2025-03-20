
import React from 'react';
import { Check } from 'lucide-react';
import { TourPackageProps } from "@/components/TourPackage";

interface TourAccommodationProps {
  tour: TourPackageProps;
}

const TourAccommodation: React.FC<TourAccommodationProps> = ({ tour }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4">Accommodation</h2>
      <p className="text-gray-600 mb-4">
        Stay in comfortable accommodations throughout your Spiti Valley journey, experiencing the warm hospitality 
        of this Himalayan region while enjoying stunning mountain views:
      </p>
      <div className="space-y-2">
        {tour.nightStays.map((stay, index) => (
          <div key={index} className="flex items-center">
            <Check className="text-green-500 w-5 h-5 mr-2" />
            <span>{stay.nights} night{stay.nights > 1 ? 's' : ''} in {stay.location} - Experience the unique charm of this Himalayan destination</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourAccommodation;
