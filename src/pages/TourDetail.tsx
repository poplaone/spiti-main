
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';
import { extractIdFromSlug, createSlug, createTourUrl } from '@/utils/slugUtils';

const TourDetail = () => {
  const params = useParams<{ id: string; slug?: string }>();
  const navigate = useNavigate();
  const [tourType, setTourType] = useState<string>('unexplored');
  const [heroImage, setHeroImage] = useState<string>('/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png');
  const { tours, loading } = useToursContext();
  
  // Get the actual ID from the slug parameter
  const actualId = params.id ? extractIdFromSlug(params.id) : null;
  
  useEffect(() => {
    // Wait for tours to load before processing
    if (loading) return;
    
    if (actualId && tours.length > 0) {
      const tour = tours.find(t => t.id === actualId);
      
      if (tour) {
        // Check if we need to redirect to the correct URL format with slug
        const currentPath = window.location.pathname;
        
        // Try to get custom slug from meta data
        let customSlug = '';
        try {
          if (tour.meta) {
            if (typeof tour.meta === 'object') {
              customSlug = tour.meta.custom_slug || '';
            } else if (typeof tour.meta === 'string' && tour.meta) {
              const metaObj = JSON.parse(tour.meta);
              customSlug = metaObj.custom_slug || '';
            }
          }
        } catch (e) {
          console.error("Error parsing meta field:", e);
        }
        
        // Use custom slug if available, otherwise generate from title
        const correctSlug = customSlug || createSlug(tour.title);
        const correctPath = `/tour/${correctSlug}/${actualId}`;
        
        // If current URL doesn't match the correct format, redirect
        if (currentPath !== correctPath && !currentPath.includes(`/${correctSlug}/`)) {
          navigate(correctPath, { replace: true });
          return;
        }
        
        // Set hero image and tour type
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
      }
    }
  }, [actualId, tours, navigate, loading]);

  return (
    <BaseTourDetailPage 
      tourId={actualId || ''}
      tourType={tourType}
      heroImage={heroImage}
    />
  );
};

export default TourDetail;
