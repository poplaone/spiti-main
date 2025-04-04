
export interface TourNightStay {
  location: string;
  nights: number;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackageProps {
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  duration: {
    nights: number;
    days: number;
  };
  transportType: string;
  isWomenOnly: boolean;
  overview: string | null;
  nightStays: TourNightStay[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
}

export interface TourPackageWithId extends TourPackageProps {
  id: string;
}
