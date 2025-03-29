
import { TourPackageProps } from '@/components/TourPackage';
import { bikeTours } from './tours/bikeTours';
import { unexploredTours } from './tours/carTours';
import { ownCarTours } from './tours/ownCarTours';
import { womenOnlyTours } from './tours/womenOnlyTours';
import { buddhistTours } from './tours/buddhistTours';

// Combine all tour types into a single array
export const tourPackagesData: TourPackageProps[] = [
  ...bikeTours,
  ...unexploredTours.filter(tour => tour.title !== "HIDDEN HEAVEN - SPITI VALLEY"),
  ...buddhistTours,
  ...womenOnlyTours,
  ...ownCarTours,
  ...unexploredTours.filter(tour => tour.title === "HIDDEN HEAVEN - SPITI VALLEY")
];

// Export individual tour categories for more targeted usage
export {
  bikeTours,
  unexploredTours as carTours,
  ownCarTours,
  womenOnlyTours,
  buddhistTours
};
