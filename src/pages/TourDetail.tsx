
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';
import { extractIdFromSlug } from '@/utils/slugUtils';

const TourDetail = () => {
  const params = useParams<{ id: string; slug?: string }>();
  const [tourType, setTourType] = useState<string>('');
  const [heroImage, setHeroImage] = useState<string>('');
  const { tours } = useToursContext();
  
  // Get the actual ID, whether from the slug or directly from URL
  const actualId = params.id;
  
  useEffect(() => {
    if (actualId && tours.length > 0) {
      const tour = tours.find(t => t.id === actualId);
      
      if (tour) {
        // Always use the exact same image that was uploaded by admin
        setHeroImage(tour.image);
        
        // Set tour type based on characteristics
        if (tour.transportType.toLowerCase() === 'bike') {
          setTourType('bike');
        } else if (tour.isWomenOnly) {
          setTourType('women');
        } else if (tour.title.toLowerCase().includes('buddhist') || tour.title.toLowerCase().includes('tribal')) {
          setTourType('buddhist');
        } else if (tour.title.toLowerCase().includes('own car') || tour.title.toLowerCase().includes('self drive')) {
          setTourType('owncar');
        } else if (tour.title.toLowerCase().includes('hidden')) {
          setTourType('hiddenheaven');
        } else {
          setTourType('unexplored');
        }
      } else {
        setTourType('unexplored');
        // Use a fallback image if tour not found
        setHeroImage("/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png");
      }
    } else {
      setTourType('unexplored');
      setHeroImage("/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png");
    }
  }, [actualId, tours]);

  return (
    <BaseTourDetailPage 
      tourId={actualId}
      tourType={tourType}
      heroImage={heroImage}
    />
  );
};

export default TourDetail;
