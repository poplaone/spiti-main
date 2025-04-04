
import { useState, useEffect } from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { useToursContext } from '@/context/ToursContext';
import { tourPackagesData } from "@/data/tourPackagesData";

export const useTourData = (tourType: string, tourId?: string) => {
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { tours, loading: contextLoading, refreshTours } = useToursContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set initial loading state
    setIsLoading(true);
    
    // Only refresh tours if needed (when tours array is empty)
    if (tours.length === 0) {
      refreshTours();
    }
    
    // Debounced function to find tour by type or ID - helps prevent state flickering
    const timeoutId = setTimeout(() => {
      // Skip processing if context is still loading
      if (contextLoading) return;
      
      const findTour = () => {
        // Use either context tours or fallback to static data
        const toursToUse = tours.length > 0 ? tours : tourPackagesData;
        
        let selectedTour = null;
        
        // First, check if we have a specific tour ID to look for
        if (tourId) {
          selectedTour = toursToUse.find(t => t.id === tourId);
        }
        
        // If no tour found by ID (or no ID provided), find by tour type
        if (!selectedTour) {
          switch (tourType) {
            case 'bike':
              selectedTour = toursToUse.find(t => 
                t.transportType.toLowerCase() === 'bike' || 
                (t.title && t.title.toLowerCase().includes('bike'))
              );
              break;
            case 'buddhist':
              selectedTour = toursToUse.find(t => 
                (t.title && t.title.toLowerCase().includes('buddhist')) ||
                (t.title && t.title.toLowerCase().includes('tribal'))
              );
              break;
            case 'women':
              selectedTour = toursToUse.find(t => 
                t.isWomenOnly === true ||
                (t.title && t.title.toLowerCase().includes('women'))
              );
              break;
            case 'owncar':
              selectedTour = toursToUse.find(t => 
                (t.title && t.title.toLowerCase().includes('own car')) ||
                (t.title && t.title.toLowerCase().includes('self drive'))
              );
              break;
            case 'unexplored':
              selectedTour = toursToUse.find(t => 
                (t.title && t.title.toLowerCase().includes('unexplored')) || 
                (t.title && t.title.toLowerCase().includes('exploration'))
              );
              break;
            case 'hiddenheaven':
              selectedTour = toursToUse.find(t => 
                (t.title && t.title.toLowerCase().includes('hidden heaven')) || 
                (t.title && t.title.toLowerCase().includes('hidden'))
              );
              break;
            default:
              // Default to first tour if no matches
              selectedTour = toursToUse[0];
          }
        }
        
        // Fallback to first tour of appropriate type if no specific match found
        if (!selectedTour && toursToUse.length > 0) {
          if (tourType === 'bike') {
            selectedTour = toursToUse.find(t => t.transportType.toLowerCase() === 'bike');
          } else {
            selectedTour = toursToUse.find(t => t.transportType.toLowerCase() === 'car');
          }
          
          // Last resort fallback
          if (!selectedTour) {
            selectedTour = toursToUse[0];
          }
        }
        
        if (selectedTour) {
          setTour(selectedTour);
          
          // Get other tours for the "More Popular Tours" section
          const others = toursToUse
            .filter(t => t.id !== selectedTour.id)
            .slice(0, 4);
          
          setOtherTours(others);
        }
        
        // Set loading to false only after finding tour
        setIsLoading(false);
      };
      
      findTour();
    }, 300); // Add a small delay to prevent rapid loading state changes
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [tourType, tourId, tours, contextLoading, refreshTours]);

  return { tour, otherTours, isLoading };
};
