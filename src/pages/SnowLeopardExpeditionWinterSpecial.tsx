
import React, { useEffect } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SnowLeopardExpeditionWinterSpecial = () => {
  const { tours } = useToursContext();
  
  // Look for the tour with the exact title or with variations of the name
  // Find the exact tour by ID or by exact title match with proper spacing
  const tour = tours.find(t => 
    t.id === "6c7a433e-5860-4f91-8ffd-6649b01581c0" || // First try to match by ID
    t.title === "SNOW LEOPARD EXPEDITION (WINTER SPECIAL)" ||
    t.title === "SNOW LEOPARD EXPEDITION (WINTER SPECIAL) " || // With space at end
    t.title === "SNOW LEOPARD EXPEDITION WINTER SPECIAL"
  );
  
  // Debug logging to see what's happening
  useEffect(() => {
    if (tours.length > 0) {
      console.log("SNOW LEOPARD PAGE: Available tours:", tours.map(t => ({ id: t.id, title: t.title })));
      console.log("SNOW LEOPARD PAGE: Found Snow Leopard tour:", tour);
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

export default SnowLeopardExpeditionWinterSpecial;
