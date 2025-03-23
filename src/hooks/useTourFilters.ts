
import { useMemo } from 'react';
import { TourPackageProps } from '@/components/TourPackage';
import { bikeTours, carTours, womenOnlyTours } from '@/data/tourPackagesData';

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

  // Filter fixed departure tours - women only or with "FIXED" in the title
  const fixedDepartureTours = useMemo(() => 
    tours.filter(tour => 
      tour.isWomenOnly === true || tour.title.includes('FIXED')
    ),
    [tours]
  );

  return {
    roadTripsTours,
    fixedDepartureTours
  };
}
