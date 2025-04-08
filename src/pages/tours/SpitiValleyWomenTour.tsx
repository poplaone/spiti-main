
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SpitiValleyWomenTour = () => {
  const { tours } = useToursContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Find the tour with this specific title
    const tourTitle = "SPITI VALLEY WOMEN ONLY TOUR";
    const tour = tours.find(t => t.title === tourTitle);
    
    if (!tour) {
      navigate('/not-found');
    }
  }, [tours, navigate]);

  return (
    <BaseTourDetailPage 
      tourType="women"
      heroImage="/lovable-uploads/bc21cc57-f972-4cd7-af1f-ca1542135c90.png"
      tourId={tours.find(t => t.title === "SPITI VALLEY WOMEN ONLY TOUR")?.id}
    />
  );
};

export default SpitiValleyWomenTour;
