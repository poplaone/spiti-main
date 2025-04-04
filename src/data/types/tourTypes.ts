
export interface TourNightStay {
  location: string;
  nights: number;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourOverviewDetails {
  accommodation?: string;
  bestTime?: string;
  groupSize?: string;
  terrain?: string;
  elevation?: string;
  availableFrom?: string;
  availableTo?: string;
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
  isFixedDeparture?: boolean; // Optional with default false
  isCustomizable?: boolean; // Optional with default true
  isVisible?: boolean; // Add this property
  overview: string | null;
  nightStays: TourNightStay[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
  overviewDetails?: TourOverviewDetails;
}

export interface TourPackageWithId extends TourPackageProps {
  id: string;  // Required in this interface
}

// Add component props interfaces
export interface TourOverviewProps {
  tour: TourPackageProps;
  getTransportIcon: () => JSX.Element;
  overview?: string | null;
}

export interface TourItineraryProps {
  itinerary: TourItineraryDay[];
  nightStays: TourNightStay[];
  duration: {
    nights: number;
    days: number;
  };
}

export interface TourInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export interface TourPackageDetailsProps {
  transportType: string;
  getTransportIcon: () => JSX.Element;
  isWomenOnly: boolean;
  isFixedDeparture?: boolean;
  isCustomizable?: boolean;
}

export interface TourAccommodationProps {
  nightStays: TourNightStay[];
}
