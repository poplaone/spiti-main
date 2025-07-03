
import React, { useMemo } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

// Fixed fallback image path for instant display
const fallbackImage = "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png";

const RoyalSpitiValleyWholeCircuit = () => {
  const { tours } = useToursContext();
  
  // Use memo to avoid recomputing on every render
  const tour = useMemo(() => 
    tours.find(t => 
      t.title === "ROYAL SPITI VALLEY WHOLE CIRCUIT" || 
      t.title === "ROYAL SPITI VALLEY (WHOLE CIRCUIT)"
    ), 
    [tours]
  );
  
  // Use tour image if available, fallback otherwise
  const heroImage = tour?.image || fallbackImage;
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="unexplored"
      heroImage={heroImage}
    />
  );
};

export default RoyalSpitiValleyWholeCircuit;
