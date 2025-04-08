
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const BuddhistTribalCircuit = () => {
  const { tours } = useToursContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Find the tour with this specific title
    const tourTitle = "BUDDHIST AND TRIBAL CIRCUIT–SPITI";
    const tour = tours.find(t => t.title === tourTitle);
    
    if (!tour) {
      navigate('/not-found');
    }
  }, [tours, navigate]);

  return (
    <BaseTourDetailPage 
      tourType="buddhist"
      heroImage="/lovable-uploads/f8e55e6b-8b70-4f27-a84d-ee09e7e3550c.png"
      tourId={tours.find(t => t.title === "BUDDHIST AND TRIBAL CIRCUIT–SPITI")?.id}
    />
  );
};

export default BuddhistTribalCircuit;
