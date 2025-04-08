
import React, { useEffect } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const RoyalSpitiValleyWholeCircuit = () => {
  const { tours } = useToursContext();
  
  // Look for the tour with the exact title or with variations of the name
  const tour = tours.find(t => 
    t.title === "ROYAL SPITI VALLEY WHOLE CIRCUIT" || 
    t.title === "ROYAL SPITI VALLEY (WHOLE CIRCUIT)"
  );
  
  // Debug logging to see what's happening
  useEffect(() => {
    if (tours.length > 0) {
      console.log("Available tours:", tours.map(t => ({ id: t.id, title: t.title })));
      console.log("Found Royal Spiti Valley tour:", tour);
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

export default RoyalSpitiValleyWholeCircuit;
