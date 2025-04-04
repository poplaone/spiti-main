
import { useState, useEffect } from 'react';
import { useToursContext } from '@/context/ToursContext';
import { TourPackageProps } from '@/data/types/tourTypes';

interface UseTourDataResult {
  tour: TourPackageProps | null;
  otherTours: TourPackageProps[];
  isLoading: boolean;
}

export const useTourData = (tourType: string, tourId?: string): UseTourDataResult => {
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tours, loading } = useToursContext();

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    if (tours.length === 0) {
      setIsLoading(false);
      return;
    }

    // If we have a specific tour ID, use that to find the tour
    if (tourId) {
      const foundTour = tours.find(t => t.id === tourId);
      if (foundTour) {
        setTour(foundTour);
        
        // Get ALL other tours except the current one for related tours section
        // No longer limiting the related tours to just 3
        const relatedTours = tours.filter(t => t.id !== tourId);
        setOtherTours(relatedTours);
        setIsLoading(false);
        return;
      }
    }

    // Filter tours based on tour type if no specific tourId is provided
    let filteredTours: TourPackageProps[] = [];
    
    switch (tourType) {
      case 'bike':
        filteredTours = tours.filter(t => t.transportType.toLowerCase() === 'bike');
        break;
      case 'women':
        filteredTours = tours.filter(t => t.isWomenOnly);
        break;
      case 'buddhist':
        filteredTours = tours.filter(t => 
          t.title.toLowerCase().includes('buddhist') || 
          t.title.toLowerCase().includes('tribal')
        );
        break;
      case 'owncar':
        filteredTours = tours.filter(t => 
          t.title.toLowerCase().includes('own car') || 
          t.title.toLowerCase().includes('self drive')
        );
        break;
      case 'hiddenheaven':
        filteredTours = tours.filter(t => t.title.toLowerCase().includes('hidden'));
        break;
      case 'unexplored':
      default:
        filteredTours = tours.filter(t => 
          t.transportType.toLowerCase() !== 'bike' && 
          !t.isWomenOnly && 
          !t.title.toLowerCase().includes('buddhist') && 
          !t.title.toLowerCase().includes('tribal') && 
          !t.title.toLowerCase().includes('own car') && 
          !t.title.toLowerCase().includes('self drive') && 
          !t.title.toLowerCase().includes('hidden')
        );
        break;
    }

    if (filteredTours.length > 0) {
      setTour(filteredTours[0]);
      
      // Get ALL other tours of the same type, no longer limiting to 3
      setOtherTours(filteredTours.slice(1));
    } else {
      // Fallback to first tour if no tours match the type
      setTour(tours[0]);
      // Get all other tours, not just 3
      setOtherTours(tours.slice(1));
    }
    
    setIsLoading(false);
  }, [tours, loading, tourType, tourId]);

  return { tour, otherTours, isLoading };
};
