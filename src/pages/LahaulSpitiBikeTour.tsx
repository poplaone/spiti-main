
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const LahaulSpitiBikeTour = () => {
  const { tours } = useToursContext();
  const tourTitle = "LAHAUL SPITI - BIKE TOUR";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="bike"
      heroImage={tour?.image || "/lovable-uploads/5b82c4c3-e5f4-4752-8825-2aaa8634642a.png"}
    />
  );
};

export default LahaulSpitiBikeTour;
