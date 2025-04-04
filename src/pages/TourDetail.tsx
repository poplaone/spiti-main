
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseTourDetailPage from "@/components/tour/BaseTourDetailPage";
import { useToursContext } from '@/context/ToursContext';
import { TourPackageProps } from '@/data/types/tourTypes';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tourType, setTourType] = useState<string>('');
  const [heroImage, setHeroImage] = useState<string>('');
  const { tours } = useToursContext();
  
  // Array of hero images for different tour types
  const heroImages = [
    "/lovable-uploads/96c75803-78e2-4f53-a67c-b14d8e80d30f.png", // Bike tour
    "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png", // Unexplored
    "/lovable-uploads/f8e55e6b-8b70-4f27-a84d-ee09e7e3550c.png", // Buddhist
    "/lovable-uploads/bc21cc57-f972-4cd7-af1f-ca1542135c90.png", // Women
    "/lovable-uploads/b619b7ac-daf4-4da4-8ebc-f30d0c9d883f.png", // Own Car
    "/lovable-uploads/e375b837-c930-402e-8fd0-0ea3280c7540.png", // Hidden Heaven
    "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png", // Default
  ];
  
  useEffect(() => {
    if (id && tours.length > 0) {
      const tour = tours.find(t => t.id === id);
      
      if (tour) {
        // Determine tour type and set appropriate hero image
        if (tour.transportType.toLowerCase() === 'bike') {
          setTourType('bike');
          setHeroImage(heroImages[0]);
        } else if (tour.isWomenOnly) {
          setTourType('women');
          setHeroImage(heroImages[3]);
        } else if (tour.title.toLowerCase().includes('buddhist') || tour.title.toLowerCase().includes('tribal')) {
          setTourType('buddhist');
          setHeroImage(heroImages[2]);
        } else if (tour.title.toLowerCase().includes('own car') || tour.title.toLowerCase().includes('self drive')) {
          setTourType('owncar');
          setHeroImage(heroImages[4]);
        } else if (tour.title.toLowerCase().includes('hidden')) {
          setTourType('hiddenheaven');
          setHeroImage(heroImages[5]);
        } else {
          setTourType('unexplored');
          setHeroImage(heroImages[1]);
        }
      } else {
        setTourType('unexplored');
        setHeroImage(heroImages[1]);
      }
    } else {
      setTourType('unexplored');
      setHeroImage(heroImages[1]);
    }
  }, [id, tours]);

  return (
    <BaseTourDetailPage 
      tourId={id}
      tourType={tourType}
      heroImage={heroImage}
    />
  );
};

export default TourDetail;
