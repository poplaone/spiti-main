
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const SoulfulSpitiGateway = () => {
  const { tours } = useToursContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Find the tour with this specific title
    const tourTitle = "SOULFUL SPITI GATEWAY";
    const tour = tours.find(t => t.title === tourTitle);
    
    if (!tour) {
      navigate('/not-found');
    }
  }, [tours, navigate]);

  return (
    <BaseTourDetailPage 
      tourType="unexplored"
      heroImage="/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png"
      tourId={tours.find(t => t.title === "SOULFUL SPITI GATEWAY")?.id}
    />
  );
};

export default SoulfulSpitiGateway;
