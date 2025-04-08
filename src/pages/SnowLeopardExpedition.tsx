
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SnowLeopardExpedition = () => {
  const { tours } = useToursContext();
  const tourTitle = "SNOW LEOPARD EXPEDITION - WINTER SPECIAL";
  const tour = tours.find(t => t.title === tourTitle);
  const tourId = "42131320-1b5f-4ae0-856f-398a2a778ec8"; // Set the specific tour ID
  
  return (
    <BaseTourDetailPage 
      tourId={tourId}
      tourType="unexplored"
      heroImage={tour?.image || "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png"}
    />
  );
};

export default SnowLeopardExpedition;
