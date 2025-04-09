
import React, { useEffect } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';

const BuddhistAndTribalCircuit = () => {
  const { tours } = useToursContext();
  
  // Find the Buddhist tour by ID or title - adding a debug check for all available tour titles
  const tour = tours.find(t => 
    t.id === "22f0b97e-3d5f-46e0-adae-c3f9e66b2a53" || // Primary ID
    t.id === "90268253-3324-41df-8db8-4e2c975f7e68" || // Also check this ID
    t.title === "BUDDHIST AND TRIBAL CIRCUIT–SPITI" ||
    t.title === "BUDDHIST AND TRIBAL CIRCUIT SPITI" ||
    t.title.includes("BUDDHIST AND TRIBAL CIRCUIT")
  );
  
  // Debug logging
  useEffect(() => {
    if (tours.length > 0) {
      console.log("BUDDHIST CIRCUIT PAGE: Available tours:", tours.map(t => ({ id: t.id, title: t.title })));
      console.log("BUDDHIST CIRCUIT PAGE: Found Buddhist tour:", tour);
    }
  }, [tours, tour]);
  
  return (
    <BaseTourDetailPage 
      tourType="buddhist"
      tourId={tour?.id}
      heroImage="/lovable-uploads/59bb7f11-6d3a-42d4-87de-0057328b53ee.png"
    />
  );
};

export default BuddhistAndTribalCircuit;
