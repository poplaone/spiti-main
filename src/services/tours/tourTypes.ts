
import { TourPackageProps } from "@/components/TourPackage";
import { Json } from "@/integrations/supabase/types";

export interface TourDurationJSON {
  nights: number;
  days: number;
}

export interface TourNightStayJSON {
  location: string;
  nights: number;
}

export interface TourItineraryDayJSON {
  day: number;
  title: string;
  description: string;
}

export interface TourDepartureDateJSON {
  month: string;
  dates: string[];
}

// Helper functions to safely parse JSON fields from Supabase
export const parseTourDuration = (data: Json | null): TourDurationJSON => {
  if (!data) {
    return { nights: 0, days: 0 };
  }
  
  try {
    if (typeof data === 'string') {
      return JSON.parse(data);
    } else if (typeof data === 'object' && data !== null) {
      // Handle direct object representation from Supabase
      const typedData = data as Record<string, number>;
      return {
        nights: typedData.nights || 0,
        days: typedData.days || 0
      };
    }
  } catch (e) {
    console.error("Error parsing tour duration:", e);
  }
  
  return { nights: 0, days: 0 };
};

export const parseNightStays = (data: Json | null): TourNightStayJSON[] => {
  if (!data) {
    return [];
  }
  
  try {
    if (typeof data === 'string') {
      return JSON.parse(data);
    } else if (Array.isArray(data)) {
      return data as TourNightStayJSON[];
    }
  } catch (e) {
    console.error("Error parsing night stays:", e);
  }
  
  return [];
};

export const parseItinerary = (data: Json | null): TourItineraryDayJSON[] => {
  if (!data) {
    return [];
  }
  
  try {
    if (typeof data === 'string') {
      return JSON.parse(data);
    } else if (Array.isArray(data)) {
      return data as TourItineraryDayJSON[];
    }
  } catch (e) {
    console.error("Error parsing itinerary:", e);
  }
  
  return [];
};

export const parseDepartureDates = (data: Json | null): TourDepartureDateJSON[] => {
  if (!data) {
    return [];
  }
  
  try {
    if (typeof data === 'string') {
      return JSON.parse(data);
    } else if (Array.isArray(data)) {
      return data as TourDepartureDateJSON[];
    }
  } catch (e) {
    console.error("Error parsing departure dates:", e);
  }
  
  return [];
};
