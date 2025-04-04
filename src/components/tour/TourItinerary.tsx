
import React, { useState } from 'react';
import { TourPackageProps } from "@/data/types/tourTypes";
import { Calendar } from 'lucide-react';
import { Accordion } from "@/components/ui/accordion";
import ItineraryHeader from './itinerary/ItineraryHeader';
import ItineraryDaysList from './itinerary/ItineraryDaysList';
import FallbackItinerary from './itinerary/FallbackItinerary';

interface TourItineraryProps {
  tour: TourPackageProps;
}

const TourItinerary: React.FC<TourItineraryProps> = ({ tour }) => {
  return (
    <div className="bg-white/90 p-6 rounded-lg shadow-sm tour-itinerary">
      <ItineraryHeader />
      
      {tour.itinerary && tour.itinerary.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          <ItineraryDaysList 
            itinerary={tour.itinerary} 
            nightStays={tour.nightStays} 
          />
        </Accordion>
      ) : (
        <FallbackItinerary 
          duration={tour.duration} 
          nightStays={tour.nightStays} 
        />
      )}
    </div>
  );
};

export default TourItinerary;
