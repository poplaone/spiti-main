
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SpitiCompleteCircuit = () => {
  const { tours } = useToursContext();
  const tourTitle = "SPITI COMPLETE CIRCUIT - MOST POPULAR";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="unexplored"
      heroImage={tour?.image}
    />
  );
};

export default SpitiCompleteCircuit;
