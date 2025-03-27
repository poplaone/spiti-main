
import React from 'react';
import { BedDouble, Home } from 'lucide-react';
import { TourPackageProps } from "@/components/TourPackage";

interface TourAccommodationProps {
  tour: TourPackageProps;
}

const TourAccommodation: React.FC<TourAccommodationProps> = ({ tour }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <BedDouble className="text-spiti-forest w-6 h-6 mr-2" />
        Accommodations
      </h2>
      <p className="text-gray-700 mb-6">
        Relax and unwind in carefully chosen accommodations that enhance your experience with comfort and local hospitality.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tour.nightStays.map((stay, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Home className="text-spiti-blue w-5 h-5 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold text-spiti-forest">{stay.location}</h3>
                <p className="text-gray-600 text-sm">
                  {stay.nights} {stay.nights === 1 ? 'Night' : 'Nights'} accommodation
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourAccommodation;
