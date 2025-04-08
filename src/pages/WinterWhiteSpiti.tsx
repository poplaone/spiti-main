
import React from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const WinterWhiteSpiti = () => {
  const { tours } = useToursContext();
  const tourTitle = "WINTER WHITE SPITI";
  const tour = tours.find(t => t.title === tourTitle);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="unexplored"
      heroImage={tour?.image || "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png"}
    />
  );
};

export default WinterWhiteSpiti;
