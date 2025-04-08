
import { useToursContext } from '@/context/ToursContext';
import { useIsMobile } from '@/hooks/use-mobile';

export function useTourData(tourType: string, tourId?: string) {
  const { tours, loading, error } = useToursContext();
  const isMobile = useIsMobile();
  
  // Find the tour by ID if available
  const getTourById = (id?: string) => {
    if (!id || !tours.length) return null;
    
    // Try to find by exact ID
    let foundTour = tours.find(tour => tour.id === id);
    
    // If not found, try partial match (for backward compatibility)
    if (!foundTour) {
      foundTour = tours.find(tour => tour.id?.includes(id) || id.includes(tour.id || ''));
    }
    
    return foundTour || null;
  };

  // Get the current tour based on ID if available, or fallback to first tour of type
  const tour = tourId
    ? getTourById(tourId)
    : tours.find(t => {
        if (tourType === 'bike') return t.transportType.toLowerCase() === 'bike';
        if (tourType === 'women') return t.isWomenOnly;
        if (tourType === 'buddhist') {
          return t.title.toLowerCase().includes('buddhist') || 
                 t.title.toLowerCase().includes('tribal');
        }
        if (tourType === 'owncar') {
          return t.title.toLowerCase().includes('own car') || 
                 t.title.toLowerCase().includes('self drive');
        }
        if (tourType === 'hiddenheaven') {
          return t.title.toLowerCase().includes('hidden');
        }
        return true; // For 'unexplored' and fallback cases
      });

  // Get other tours of similar type for the "Related Tours" section
  const otherTours = tours.filter(t => {
    // Don't include the current tour
    if (tour && t.id === tour.id) return false;
    
    // Filter based on tour type
    if (tourType === 'bike') return t.transportType.toLowerCase() === 'bike';
    if (tourType === 'women') return t.isWomenOnly;
    if (tourType === 'buddhist') {
      return t.title.toLowerCase().includes('buddhist') || 
             t.title.toLowerCase().includes('tribal');
    }
    if (tourType === 'owncar') {
      return t.title.toLowerCase().includes('own car') || 
             t.title.toLowerCase().includes('self drive');
    }
    if (tourType === 'hiddenheaven') {
      return t.title.toLowerCase().includes('hidden');
    }
    
    // For 'unexplored' and fallback cases, return all tours except special categories
    return !(
      t.transportType.toLowerCase() === 'bike' || 
      t.isWomenOnly || 
      t.title.toLowerCase().includes('buddhist') || 
      t.title.toLowerCase().includes('tribal') ||
      t.title.toLowerCase().includes('own car') || 
      t.title.toLowerCase().includes('self drive') ||
      t.title.toLowerCase().includes('hidden')
    );
  });

  return { tour, otherTours, isLoading: loading || error !== null };
}
