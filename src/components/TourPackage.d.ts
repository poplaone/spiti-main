
import { TourDuration, TourItineraryDay, TourNightStay, TourTransportType } from '@/data/types/tourTypes';

export interface TourPackageProps {
  id?: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  duration: TourDuration;
  nightStays: TourNightStay[];
  inclusions: string[];
  exclusions: string[]; // Changed from optional to required to match usage
  overview: string;
  itinerary: TourItineraryDay[];
  transportType: TourTransportType | 'innova';
  isWomenOnly?: boolean;
  isFixedDeparture?: boolean;
  isCustomizable?: boolean;
  departureDates?: DepartureDateField[];
  index?: number;
  className?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DepartureDateField {
  date: string;
  available: boolean;
  price?: number;
}
