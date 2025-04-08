
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const RoyalSpitiValleyWholeCircuit = () => {
  const { tours } = useToursContext();
  const tourTitle = "ROYAL SPITI VALLEY - WHOLE CIRCUIT";
  const tour = tours.find(t => t.title === tourTitle);
  const tourId = "e1119418-f05f-4c69-985e-b1f47d31d29b"; // Set the specific tour ID
  
  return (
    <BaseTourDetailPage 
      tourId={tourId}
      tourType="unexplored"
      heroImage={tour?.image || "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png"}
    />
  );
};

export default RoyalSpitiValleyWholeCircuit;
