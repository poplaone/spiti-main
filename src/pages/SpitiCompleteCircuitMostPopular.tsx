
import React, { useEffect } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SpitiCompleteCircuitMostPopular = () => {
  const { tours } = useToursContext();
  
  // Look for the tour with the exact title or with variations of the name
  // Find the exact tour by ID or by exact title match
  const tour = tours.find(t => 
    t.id === "86ee2362-f5dd-4aed-90d2-856fed8c91af" || // First try to match by ID
    t.title === "SPITI COMPLETE CIRCUIT(MOST POPULAR)" ||
    t.title === "SPITI COMPLETE CIRCUIT (MOST POPULAR)"
  );
  
  // Debug logging to see what's happening
  useEffect(() => {
    if (tours.length > 0) {
      console.log("COMPLETE CIRCUIT PAGE: Available tours:", tours.map(t => ({ id: t.id, title: t.title })));
      console.log("COMPLETE CIRCUIT PAGE: Found Spiti Complete Circuit tour:", tour);
    }
  }, [tours, tour]);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="unexplored"
      heroImage={tour?.image || "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png"}
    />
  );
};

export default SpitiCompleteCircuitMostPopular;
