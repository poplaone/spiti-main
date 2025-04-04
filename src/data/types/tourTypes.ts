
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
  id?: string;  // Making id optional in base type
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
  isFixedDeparture?: boolean;
  isCustomizable?: boolean;
  overview: string | null;
  nightStays: TourNightStay[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
}

export interface TourPackageWithId extends TourPackageProps {
  id: string;  // Required in this interface
}

// Add types for the component props to fix the errors
export interface TourOverviewProps {
  overview: string | null;
}

export interface TourItineraryProps {
  itinerary: TourItineraryDay[];
}

export interface TourInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export interface TourAccommodationProps {
  nightStays: TourNightStay[];
}
