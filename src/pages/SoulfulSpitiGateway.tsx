
import React, { useEffect } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SoulfulSpitiGateway = () => {
  const { tours } = useToursContext();
  
  // Look for the tour with the exact title or with variations of the name
  // Find the exact tour by ID or by exact title match
  const tour = tours.find(t => 
    t.id === "d9fee2b8-8050-429f-b195-b2b13d591029" || // First try to match by ID
    t.title === "SOULFUL SPITI GATEWAY" ||
    t.title === "SOULFUL  SPITI GATEWAY" // Double space between words
  );
  
  // Debug logging to see what's happening
  useEffect(() => {
    if (tours.length > 0) {
      console.log("SOULFUL GATEWAY PAGE: Available tours:", tours.map(t => ({ id: t.id, title: t.title })));
      console.log("SOULFUL GATEWAY PAGE: Found Soulful Spiti Gateway tour:", tour);
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

export default SoulfulSpitiGateway;
