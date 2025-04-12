
import React, { useEffect, useState, useMemo } from 'react';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';
import usePerformanceMetrics from '@/hooks/usePerformanceMetrics';

// Preloaded image path for instant display
const fallbackImage = "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png";

const RoyalSpitiValleyWholeCircuit = () => {
  const { tours } = useToursContext();
  const { markStart, markEnd } = usePerformanceMetrics();
  const [heroImage, setHeroImage] = useState(fallbackImage);
  
  // Use memo to avoid recomputing on every render
  const tour = useMemo(() => 
    tours.find(t => 
      t.title === "ROYAL SPITI VALLEY WHOLE CIRCUIT" || 
      t.title === "ROYAL SPITI VALLEY (WHOLE CIRCUIT)"
    ), 
    [tours]
  );
  
  // Mark performance metrics for component rendering
  useEffect(() => {
    markStart('royal-spiti-render');
    
    if (tour?.image) {
      // Only update image if we found a tour with an image
      setHeroImage(tour.image);
    }
    
    return () => {
      // Measure render performance when component unmounts
      const duration = markEnd('royal-spiti-render');
      if (duration) {
        console.info(`Royal Spiti Valley page render time: ${duration.toFixed(2)}ms`);
      }
    };
  }, [tour, markStart, markEnd]);
  
  return (
    <BaseTourDetailPage 
      tourId={tour?.id}
      tourType="unexplored"
      heroImage={heroImage}
    />
  );
};

export default RoyalSpitiValleyWholeCircuit;
