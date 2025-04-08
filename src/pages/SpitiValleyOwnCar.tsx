
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SpitiValleyOwnCar = () => {
  const { tours } = useToursContext();
  const tourTitle = "SPITI VALLEY TOUR IN YOUR OWN CAR";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="owncar"
      heroImage={tour?.image || "/lovable-uploads/b619b7ac-daf4-4da4-8ebc-f30d0c9d883f.png"}
    />
  );
};

export default SpitiValleyOwnCar;
