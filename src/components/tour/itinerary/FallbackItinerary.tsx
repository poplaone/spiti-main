
import React from 'react';
import { TourNightStay } from "@/data/types/tourTypes";

interface FallbackItineraryProps {
  duration: {
    nights: number;
    days: number;
  };
  nightStays: TourNightStay[];
}

const FallbackItinerary: React.FC<FallbackItineraryProps> = ({ 
  duration, 
  nightStays 
}) => {
  return (
    <div className="border-l-2 border-spiti-blue pl-4 space-y-6">
      {Array.from({length: duration.days}).map((_, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-bold text-spiti-forest flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-spiti-forest text-white rounded-full mr-2">
              {index + 1}
            </span>
            Day {index + 1}: {nightStays[index]?.location || "Tour End"}
          </h3>
          <p className="mt-2 text-gray-600">
            {index === 0 ? 
              "Start your journey from your pickup location and drive to your first destination. Enjoy the scenic beauty as you enter the highland regions." : 
              index === duration.days - 1 ? 
                "After breakfast, check out from the hotel and end your journey with beautiful memories of Spiti Valley that will last a lifetime." : 
                `Explore the beautiful landscapes of ${nightStays[index]?.location || "the region"} and visit local attractions, ancient monasteries, and experience the unique culture of this Himalayan region.`
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default FallbackItinerary;
