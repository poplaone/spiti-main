
import { useState, useEffect, useCallback } from 'react';
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

  // Memoized filter function to avoid recalculating on every render
  const filterTours = useCallback((allTours: TourPackageProps[], type: string, id?: string) => {
    // Add debug log to see what's happening
    console.log("useTourData filterTours called with:", { type, id });
    console.log("Available tour IDs:", allTours.map(t => ({ id: t.id, title: t.title })));
    
    // If we have a specific tour ID, use that to find the tour
    if (id) {
      console.log("Looking for tour with ID:", id);
      const foundTour = allTours.find(t => t.id === id);
      
      // If we didn't find a tour by ID, log this and proceed to other matching methods
      if (!foundTour) {
        console.log("No tour found with ID:", id);
        console.log("Will try to match by other criteria...");
      } else {
        console.log("Found tour by ID:", foundTour?.title);
        // Get ALL other tours except the current one for related tours section
        const relatedTours = allTours.filter(t => t.id !== id);
        return { selectedTour: foundTour, relatedTours };
      }
    }

    // Filter tours based on tour type if no specific tourId is provided
    let filteredTours: TourPackageProps[] = [];
    
    switch (type) {
      case 'bike':
        filteredTours = allTours.filter(t => t.transportType.toLowerCase() === 'bike');
        break;
      case 'women':
        filteredTours = allTours.filter(t => t.isWomenOnly);
        break;
      case 'buddhist':
        filteredTours = allTours.filter(t => 
          t.title.toLowerCase().includes('buddhist') || 
          t.title.toLowerCase().includes('tribal')
        );
        break;
      case 'owncar':
        filteredTours = allTours.filter(t => 
          t.title.toLowerCase().includes('own car') || 
          t.title.toLowerCase().includes('self drive')
        );
        break;
      case 'hiddenheaven':
        filteredTours = allTours.filter(t => t.title.toLowerCase().includes('hidden'));
        break;
      case 'unexplored':
      default:
        filteredTours = allTours.filter(t => 
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
      console.log(`Found ${filteredTours.length} tours of type ${type}:`, 
        filteredTours.map(t => t.title));
      return { 
        selectedTour: filteredTours[0], 
        relatedTours: filteredTours.slice(1)
      };
    } else {
      // Fallback to first tour if no tours match the type
      console.log("No tours match type, falling back to first tour");
      return { 
        selectedTour: allTours[0], 
        relatedTours: allTours.slice(1)
      };
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    if (tours.length === 0) {
      setIsLoading(false);
      return;
    }

    // Use the memoized filter function
    const { selectedTour, relatedTours } = filterTours(tours, tourType, tourId);
    
    setTour(selectedTour || null);
    setOtherTours(relatedTours || []);
    setIsLoading(false);
    
  }, [tours, loading, tourType, tourId, filterTours]);

  return { tour, otherTours, isLoading };
};
