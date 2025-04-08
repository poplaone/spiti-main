
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SpitiValleyOwnCar = () => {
  const { tours } = useToursContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Find the tour with this specific title
    const tourTitle = "SPITI VALLEY TOUR IN YOUR OWN CAR";
    const tour = tours.find(t => t.title === tourTitle);
    
    if (!tour) {
      navigate('/not-found');
    }
  }, [tours, navigate]);

  return (
    <BaseTourDetailPage 
      tourType="owncar"
      heroImage="/lovable-uploads/b619b7ac-daf4-4da4-8ebc-f30d0c9d883f.png"
      tourId={tours.find(t => t.title === "SPITI VALLEY TOUR IN YOUR OWN CAR")?.id}
    />
  );
};

export default SpitiValleyOwnCar;
