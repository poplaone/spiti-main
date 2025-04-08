
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';
import { TourPackageProps } from '@/data/types/tourTypes';
import { slugToTourTitle, getTourTypeFromTitle, getHeroImageForTourType } from '@/utils/routeUtils';

const TourDetailBySlug = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tourType, setTourType] = useState<string>('unexplored');
  const [heroImage, setHeroImage] = useState<string>('');
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const { tours } = useToursContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!slug || tours.length === 0) return;
    
    // Get the tour title from the slug
    const tourTitle = slugToTourTitle[slug];
    
    if (!tourTitle) {
      // If we can't find a matching tour title, navigate to the 404 page
      navigate('/not-found');
      return;
    }
    
    // Find the tour with the matching title
    const matchedTour = tours.find(t => t.title === tourTitle);
    
    if (matchedTour) {
      setTour(matchedTour);
      
      // Determine the tour type and set the hero image
      const type = getTourTypeFromTitle(matchedTour.title);
      setTourType(type);
      setHeroImage(getHeroImageForTourType(type));
    } else {
      // If we can't find a matching tour in our data, navigate to the 404 page
      navigate('/not-found');
    }
  }, [slug, tours, navigate]);

  if (!tour) {
    return <div className="p-10 text-center">Loading tour details...</div>;
  }

  return (
    <BaseTourDetailPage 
      tourId={tour.id}
      tourType={tourType}
      heroImage={heroImage}
    />
  );
};

export default TourDetailBySlug;
