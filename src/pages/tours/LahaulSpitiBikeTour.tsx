
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const LahaulSpitiBikeTour = () => {
  const { tours } = useToursContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Find the tour with this specific title
    const tourTitle = "LAHAUL SPITI - BIKE TOUR";
    const tour = tours.find(t => t.title === tourTitle);
    
    if (!tour) {
      navigate('/not-found');
    }
  }, [tours, navigate]);

  return (
    <BaseTourDetailPage 
      tourType="bike"
      heroImage="/lovable-uploads/5b82c4c3-e5f4-4752-8825-2aaa8634642a.png"
      tourId={tours.find(t => t.title === "LAHAUL SPITI - BIKE TOUR")?.id}
    />
  );
};

export default LahaulSpitiBikeTour;
