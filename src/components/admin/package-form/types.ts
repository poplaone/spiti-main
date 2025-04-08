
export interface NightStay {
  id?: string;
  location: string;
  nights: number;
  order?: number;
}

export interface Inclusion {
  id?: string;
  description: string;
}

export interface Exclusion {
  id?: string;
  description: string;
}

export interface ItineraryDay {
  id?: string;
  day_number: number;
  title: string;
  description: string;
}

export interface OverviewDetails {
  accommodation: string;
  bestTime: string;
  groupSize: string;
  terrain: string;
  elevation: string;
  availableFrom: string;
  availableTo: string;
}

export interface TourPackageFormData {
  title: string;
  customSlug?: string; // New field for custom slug
  originalPrice: string;
  discountedPrice: string;
  transportType: string;
  durationNights: string;
  durationDays: string;
  overview: string;
  isWomenOnly: boolean;
  isFixedDeparture: boolean;
  isCustomizable: boolean;
  accommodation: string;
  bestTime: string;
  groupSize: string;
  terrain: string;
  elevation: string;
  availableFrom: string;
  availableTo: string;
  nightStays: NightStay[];
  inclusions: Inclusion[];
  exclusions: Exclusion[];
  itineraryDays: ItineraryDay[];
  imageFile?: File | null;
  imagePreview: string;
}
