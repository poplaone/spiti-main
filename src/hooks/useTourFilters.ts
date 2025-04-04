
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

  // Filter for fixed departure tours - make sure we strictly check isFixedDeparture === true
  const fixedDepartureTours = useMemo(() => {
    const tours = allTours.filter(tour => tour.isFixedDeparture === true);
    console.log("Fixed departure tours:", tours);
    return tours;
  }, [allTours]);

  // Updated to include all tours that involve road travel (car or bike)
  const roadTripsTours = useMemo(() => {
    return allTours.filter(tour => 
      tour.transportType.toLowerCase() === 'car' || 
      tour.transportType.toLowerCase() === 'suv' ||
      tour.transportType.toLowerCase() === 'bike'
    );
  }, [allTours]);

  // Filter for customizable tours - make sure we strictly check isCustomizable === true
  const customizableTours = useMemo(() => {
    const tours = allTours.filter(tour => tour.isCustomizable === true);
    console.log("Customizable tours:", tours);
    return tours;
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
    fixedDepartureTours,
    roadTripsTours,
    customizableTours
  };
}
