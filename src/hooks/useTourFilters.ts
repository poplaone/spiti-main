import { useMemo } from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';

/**
 * Custom hook to filter tours by different criteria
 */
export function useTourFilters(tours: TourPackageProps[]) {
  // Filter road trip tours - bike or car transport types
  const roadTripsTours = useMemo(() => 
    tours.filter(tour => 
      tour.transportType === 'bike' || tour.transportType === 'car'
    ),
    [tours]
  );

  // Filter fixed departure tours - include all except "OWN CAR" tours
  const fixedDepartureTours = useMemo(() => 
    tours.filter(tour => 
      !tour.title.includes('OWN CAR')
    ),
    [tours]
  );

  return {
    roadTripsTours,
    fixedDepartureTours
  };
}
