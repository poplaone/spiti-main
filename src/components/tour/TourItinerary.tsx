
import React from 'react';
import { TourItineraryProps } from "@/data/types/tourTypes";
import { Calendar } from 'lucide-react';
import { Accordion } from "@/components/ui/accordion";
import ItineraryHeader from './itinerary/ItineraryHeader';
import ItineraryDaysList from './itinerary/ItineraryDaysList';
import FallbackItinerary from './itinerary/FallbackItinerary';

const TourItinerary: React.FC<TourItineraryProps> = ({ itinerary, nightStays, duration }) => {
  return (
    <div className="bg-white/90 p-6 rounded-lg shadow-sm tour-itinerary">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <Calendar className="text-spiti-forest w-6 h-6 mr-2" />
        Itinerary
      </h2>
      
      {itinerary && itinerary.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          <ItineraryDaysList 
            itinerary={itinerary} 
            nightStays={nightStays} 
          />
        </Accordion>
      ) : (
        <FallbackItinerary 
          duration={duration} 
          nightStays={nightStays} 
        />
      )}
    </div>
  );
};

export default TourItinerary;
