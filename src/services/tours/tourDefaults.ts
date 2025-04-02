
import { TourPackageProps } from '@/components/TourPackage';
import { generateCustomUrl, normalizeTransportType } from './tourUtils';

// Initialize a tour with default values for required fields
export const getDefaultTourValues = (tour: Partial<TourPackageProps>, existingTours: TourPackageProps[] = []): TourPackageProps => {
  return {
    ...tour,
    hasFixedDepartures: tour.hasFixedDepartures !== false,
    isCustomizable: tour.isCustomizable !== false,
    availableDates: tour.availableDates || "June to October",
    exclusions: tour.exclusions || [],
    itinerary: tour.itinerary || [],
    customUrl: tour.customUrl || generateCustomUrl(tour.title || 'tour', existingTours),
    departureDates: tour.departureDates || [],
    // New fields with default values
    bestTime: tour.bestTime || "June to September",
    groupSize: tour.groupSize || "2-10 People",
    terrain: tour.terrain || "Himalayan Mountain Passes",
    elevation: tour.elevation || "2,000 - 4,550 meters",
    accommodationType: tour.accommodationType || "Hotels & Homestays",
    transportType: normalizeTransportType(String(tour.transportType))
  } as TourPackageProps;
};
