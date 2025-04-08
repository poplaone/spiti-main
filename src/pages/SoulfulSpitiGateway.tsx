
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SoulfulSpitiGateway = () => {
  const { tours } = useToursContext();
  const tourTitle = "SOULFUL SPITI GATEWAY";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="unexplored"
      heroImage={tour?.image}
    />
  );
};

export default SoulfulSpitiGateway;
