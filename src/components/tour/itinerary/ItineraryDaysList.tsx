
import React, { memo, useMemo } from 'react';
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
  // Create a map for faster lookups of nightStays - using useMemo to avoid recreating on every render
  const locationMap = useMemo(() => {
    const map = new Map();
    nightStays.forEach((stay, index) => {
      map.set(index, stay.location);
    });
    return map;
  }, [nightStays]);

  // Only render days that have complete data to avoid unnecessary UI elements
  const validItineraryDays = useMemo(() => 
    itinerary.filter(day => day && day.day && day.title && day.description),
  [itinerary]);

  return (
    <>
      {validItineraryDays.map((day, index) => (
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
