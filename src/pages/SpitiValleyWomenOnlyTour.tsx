
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SpitiValleyWomenOnlyTour = () => {
  const { tours } = useToursContext();
  const tourTitle = "SPITI VALLEY WOMEN ONLY TOUR";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="women"
      heroImage={tour?.image || "/lovable-uploads/bc21cc57-f972-4cd7-af1f-ca1542135c90.png"}
    />
  );
};

export default SpitiValleyWomenOnlyTour;
