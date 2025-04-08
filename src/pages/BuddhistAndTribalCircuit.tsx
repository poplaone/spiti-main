
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
      heroImage={tour?.image || "/lovable-uploads/f8e55e6b-8b70-4f27-a84d-ee09e7e3550c.png"}
    />
  );
};

export default BuddhistAndTribalCircuit;
