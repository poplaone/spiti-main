
import React from 'react';
import { TourItineraryDay, TourNightStay } from "@/data/types/tourTypes";
import ItineraryDay from './ItineraryDay';

interface ItineraryDaysListProps {
  itinerary: TourItineraryDay[];
  nightStays: TourNightStay[];
}

const ItineraryDaysList: React.FC<ItineraryDaysListProps> = ({ 
  itinerary, 
  nightStays 
}) => {
  return (
    <>
      {itinerary.map((day, index) => (
        <ItineraryDay 
          key={index} 
          day={day} 
          location={nightStays.find((stay, i) => i === day.day - 1)?.location || "Journey"} 
        />
      ))}
    </>
  );
};

export default ItineraryDaysList;
