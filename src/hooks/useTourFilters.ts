
import { useState, useMemo } from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';

export function useTourFilters(allTours: TourPackageProps[]) {
  const [selectedFilters, setSelectedFilters] = useState<{
    transportType: string[];
    isWomenOnly: boolean | null;
    priceRange: [number, number] | null;
    duration: number | null;
  }>({
    transportType: [],
    isWomenOnly: null,
    priceRange: null,
    duration: null,
  });

  // Filter tours based on the selected filters
  const filteredTours = useMemo(() => {
    return allTours.filter((tour) => {
      // Transport Type filter
      if (selectedFilters.transportType.length > 0 && !selectedFilters.transportType.includes(tour.transportType)) {
        return false;
      }

      // Women Only filter
      if (selectedFilters.isWomenOnly !== null && tour.isWomenOnly !== selectedFilters.isWomenOnly) {
        return false;
      }

      // Price Range filter
      if (selectedFilters.priceRange !== null) {
        const [min, max] = selectedFilters.priceRange;
        if (tour.discountedPrice < min || tour.discountedPrice > max) {
          return false;
        }
      }

      // Duration filter
      if (selectedFilters.duration !== null && tour.duration.days !== selectedFilters.duration) {
        return false;
      }

      return true;
    });
  }, [allTours, selectedFilters]);

  // Specific categorized tours
  const bikeTours = useMemo(() => {
    return allTours.filter(tour => tour.transportType.toLowerCase() === 'bike');
  }, [allTours]);

  const womenOnlyTours = useMemo(() => {
    return allTours.filter(tour => tour.isWomenOnly === true);
  }, [allTours]);

  const ownCarTours = useMemo(() => {
    return allTours.filter(tour => 
      tour.title.toLowerCase().includes('own car') || 
      tour.title.toLowerCase().includes('self drive')
    );
  }, [allTours]);

  const buddhistTours = useMemo(() => {
    return allTours.filter(tour => 
      tour.title.toLowerCase().includes('buddhist') ||
      tour.title.toLowerCase().includes('tribal')
    );
  }, [allTours]);

  const hiddenHeavenTours = useMemo(() => {
    return allTours.filter(tour => tour.title.toLowerCase().includes('hidden heaven'));
  }, [allTours]);

  const unexploredTours = useMemo(() => {
    return allTours.filter(tour => 
      tour.title.toLowerCase().includes('unexplored') ||
      tour.title.toLowerCase().includes('exploration')
    );
  }, [allTours]);

  const fixedDepartureTours = useMemo(() => {
    // This is just an example - you may want to add a specific property to determine fixed departure tours
    return allTours.filter((_, index) => index % 2 === 0);
  }, [allTours]);

  // Helper function to update filters
  const updateFilter = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return {
    filteredTours,
    selectedFilters,
    updateFilter,
    bikeTours,
    womenOnlyTours,
    ownCarTours,
    buddhistTours,
    hiddenHeavenTours,
    unexploredTours,
    fixedDepartureTours
  };
}
