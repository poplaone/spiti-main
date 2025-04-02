
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
      if ('nights' in data && 'days' in data) {
        return {
          nights: Number(data.nights) || 0,
          days: Number(data.days) || 0
        };
      }
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
      return data.map(stay => {
        if (typeof stay === 'object' && stay !== null) {
          return {
            location: String((stay as any).location || ''),
            nights: Number((stay as any).nights || 0)
          };
        }
        return { location: '', nights: 0 };
      });
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
      return data.map(day => {
        if (typeof day === 'object' && day !== null) {
          return {
            day: Number((day as any).day || 0),
            title: String((day as any).title || ''),
            description: String((day as any).description || '')
          };
        }
        return { day: 0, title: '', description: '' };
      });
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
      return data.map(month => {
        if (typeof month === 'object' && month !== null) {
          return {
            month: String((month as any).month || ''),
            dates: Array.isArray((month as any).dates) ? (month as any).dates.map(String) : []
          };
        }
        return { month: '', dates: [] };
      });
    }
  } catch (e) {
    console.error("Error parsing departure dates:", e);
  }
  
  return [];
};
