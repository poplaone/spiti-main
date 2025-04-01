
import { TourDuration, TourItineraryDay, TourNightStay, TourTransportType } from '@/data/types/tourTypes';

export interface TourPackageProps {
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  duration: TourDuration;
  nightStays: TourNightStay[];
  inclusions: string[];
  exclusions: string[];
  overview: string;
  itinerary: TourItineraryDay[];
  transportType: TourTransportType | 'innova';
  isWomenOnly?: boolean;
  isFixedDeparture?: boolean;
  isCustomizable?: boolean;
  departureDates?: DepartureDateField[];
}

export interface DepartureDateField {
  date: string;
  available: boolean;
  price?: number;
}
