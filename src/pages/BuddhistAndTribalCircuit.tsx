
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const BuddhistAndTribalCircuit = () => {
  const { tours } = useToursContext();
  const tourTitle = "BUDDHIST AND TRIBAL CIRCUIT–SPITI";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="buddhist"
      heroImage={tour?.image}
    />
  );
};

export default BuddhistAndTribalCircuit;
