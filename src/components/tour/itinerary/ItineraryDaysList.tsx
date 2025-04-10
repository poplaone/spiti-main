
import React, { memo } from 'react';
import { TourItineraryDay, TourNightStay } from "@/data/types/tourTypes";
import ItineraryDay from './ItineraryDay';

interface ItineraryDaysListProps {
  itinerary: TourItineraryDay[];
  nightStays: TourNightStay[];
}

// Using memo to prevent unnecessary re-renders
const ItineraryDaysList: React.FC<ItineraryDaysListProps> = memo(({ 
  itinerary, 
  nightStays 
}) => {
  // Create a map for faster lookups of nightStays
  const locationMap = new Map();
  nightStays.forEach((stay, index) => {
    locationMap.set(index, stay.location);
  });

  return (
    <>
      {itinerary.map((day, index) => (
        <ItineraryDay 
          key={day.day || index} 
          day={day} 
          location={locationMap.get(day.day - 1) || "Journey"} 
        />
      ))}
    </>
  );
});

ItineraryDaysList.displayName = 'ItineraryDaysList';

export default ItineraryDaysList;
