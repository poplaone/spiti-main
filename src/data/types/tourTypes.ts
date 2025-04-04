
// If this file doesn't exist, we'll create it

export interface TourNightStay {
  location: string;
  nights: number;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackageWithId extends TourPackageProps {
  id: string;
}
