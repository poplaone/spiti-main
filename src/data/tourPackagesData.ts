
import { TourPackageProps } from '@/data/types/tourTypes';
import { bikeTours } from './tours/bikeTours';
import { unexploredTours } from './tours/carTours';
import { ownCarTours } from './tours/ownCarTours';
import { womenOnlyTours } from './tours/womenOnlyTours';
import { buddhistTours } from './tours/buddhistTours';

// Ensure all tours have the required properties
const processedTours = [
  ...bikeTours,
  ...unexploredTours.filter(tour => tour.title !== "HIDDEN HEAVEN - SPITI VALLEY"),
  ...buddhistTours,
  ...womenOnlyTours,
  ...ownCarTours,
  ...unexploredTours.filter(tour => tour.title === "HIDDEN HEAVEN - SPITI VALLEY")
].map(tour => ({
  ...tour,
  // Ensure these properties exist with default values if not specified
  isFixedDeparture: tour.isFixedDeparture !== undefined ? tour.isFixedDeparture : false,
  isCustomizable: tour.isCustomizable !== undefined ? tour.isCustomizable : true,
}));

// Set some tours as fixed departures for demonstration
// This is for testing only - in real app, the admin would set these values
const toursWithFixedDepartures = processedTours.map(tour => {
  // Make some bike tours and car tours fixed departures for demonstration
  if (tour.transportType === 'bike' || 
     (tour.transportType === 'car' && tour.title.includes("UNEXPLORED"))) {
    return {
      ...tour,
      isFixedDeparture: true
    };
  }
  return tour;
});

// Combine all tour types into a single array
export const tourPackagesData: TourPackageProps[] = toursWithFixedDepartures;

// Export individual tour categories for more targeted usage
export {
  bikeTours,
  unexploredTours as carTours,
  ownCarTours,
  womenOnlyTours,
  buddhistTours
};
