
import React from 'react';
import { Users } from 'lucide-react';
import { TourPackageDetailsProps } from "@/data/types/tourTypes";

const TourPackageDetails: React.FC<TourPackageDetailsProps> = ({
  transportType,
  getTransportIcon,
  isWomenOnly,
  isFixedDeparture = false,
  isCustomizable = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-heading font-bold text-spiti-forest">
        Tour Options
      </h2>

      <div className="space-y-4">
        {isWomenOnly && (
          <div className="flex items-center gap-3">
            <Users className="text-pink-500 w-6 h-6" />
            <div>
              <h3 className="font-medium">Group Type</h3>
              <p className="text-gray-600">Women Only Tour</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isFixedDeparture ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className={isFixedDeparture ? 'text-gray-800' : 'text-gray-500'}>
                Fixed Departure Dates Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isCustomizable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className={isCustomizable ? 'text-gray-800' : 'text-gray-500'}>
                Customizable Itinerary
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackageDetails;
