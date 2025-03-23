
import { TourPackageProps } from '@/components/TourPackage';
import { bikeTours } from './tours/bikeTours';
import { carTours } from './tours/carTours';
import { ownCarTours } from './tours/ownCarTours';
import { womenOnlyTours } from './tours/womenOnlyTours';
import { buddhistTours } from './tours/buddhistTours';

// Combine all tour types into a single array
export const tourPackagesData: TourPackageProps[] = [
  ...bikeTours,
  ...carTours,
  ...ownCarTours,
  ...womenOnlyTours,
  ...buddhistTours
];

// Export individual tour categories for more targeted usage
export {
  bikeTours,
  carTours,
  ownCarTours,
  womenOnlyTours,
  buddhistTours
};
