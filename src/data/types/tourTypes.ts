
import { TourPackageProps } from '@/components/TourPackage';

export type TourTransportType = 'bike' | 'car' | 'premium';

export interface TourNightStay {
  location: string;
  nights: number;
}

export interface TourDuration {
  nights: number;
  days: number;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}
