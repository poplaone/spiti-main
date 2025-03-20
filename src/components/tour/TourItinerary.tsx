
import React from 'react';
import { TourPackageProps } from "@/components/TourPackage";

interface TourItineraryProps {
  tour: TourPackageProps;
}

const TourItinerary: React.FC<TourItineraryProps> = ({ tour }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4">Tour Itinerary</h2>
      <p className="text-gray-700 mb-6">
        Follow our carefully crafted day-by-day itinerary through the magnificent landscapes of Spiti Valley. 
        From ancient monasteries to quaint villages and breathtaking lakes, each day offers unique experiences in this Himalayan paradise.
      </p>
      <div className="border-l-2 border-spiti-blue pl-4 space-y-6">
        {Array.from({length: tour.duration.days}).map((_, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold text-spiti-forest flex items-center">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-spiti-forest text-white rounded-full mr-2">
                {index + 1}
              </span>
              Day {index + 1}: {tour.nightStays[index]?.location || "Tour End"}
            </h3>
            <p className="mt-2 text-gray-600">
              {index === 0 ? 
                "Start your journey from your pickup location and drive to your first destination. Enjoy the scenic beauty as you enter the highland regions." : 
                index === tour.duration.days - 1 ? 
                  "After breakfast, check out from the hotel and end your journey with beautiful memories of Spiti Valley that will last a lifetime." : 
                  `Explore the beautiful landscapes of ${tour.nightStays[index]?.location || "the region"} and visit local attractions, ancient monasteries, and experience the unique culture of this Himalayan region.`
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourItinerary;
