
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';
import { slugToTourTitle } from '@/utils/routeUtils';

const TourDetailBySlug = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tourType, setTourType] = useState<string>('');
  const [heroImage, setHeroImage] = useState<string>('');
  const [tourId, setTourId] = useState<string | undefined>(undefined);
  const { tours } = useToursContext();
  
  useEffect(() => {
    if (slug && tours.length > 0) {
      // Find the tour title based on the slug
      const title = slugToTourTitle[slug];
      
      if (title) {
        const tour = tours.find(t => t.title === title);
        
        if (tour) {
          setTourId(tour.id);
          setHeroImage(tour.image);
          
          // Determine tour type directly
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
          setHeroImage("/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png");
        }
      } else {
        setTourType('unexplored');
        setHeroImage("/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png");
      }
    }
  }, [slug, tours]);

  return (
    <BaseTourDetailPage 
      tourId={tourId}
      tourType={tourType}
      heroImage={heroImage}
    />
  );
};

export default TourDetailBySlug;
