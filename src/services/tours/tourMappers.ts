
import { TourPackageProps, DepartureDate } from "@/components/TourPackage";
import { TourTransportType } from "@/data/types/tourTypes";
import { Json } from "@/integrations/supabase/types";
import { parseTourDuration, parseNightStays, parseItinerary, parseDepartureDates, TourDepartureDateJSON } from "./tourTypes";

// Map Supabase tour data to TourPackageProps
export const mapSupabaseTourToProps = (data: any): TourPackageProps => {
  // Parse all JSON fields
  const duration = parseTourDuration(data.duration);
  const nightStays = parseNightStays(data.night_stays);
  const itinerary = parseItinerary(data.itinerary);
  const departureDatesRaw = parseDepartureDates(data.departure_dates);
  
  // Convert from TourDepartureDateJSON[] to DepartureDate[] format
  const departureDates: DepartureDate[] = departureDatesRaw.map((month) => {
    return {
      id: `${month.month}-${Math.random().toString(36).substring(2, 9)}`,
      status: 'Available'
    };
  });
  
  return {
    title: data.title,
    image: data.image,
    originalPrice: data.original_price,
    discountedPrice: data.discounted_price,
    discount: data.discount,
    duration: duration,
    nightStays: nightStays,
    inclusions: data.inclusions || [],
    exclusions: data.exclusions || [],
    overview: data.overview || "",
    itinerary: itinerary,
    hasFixedDepartures: data.is_fixed_departure !== false,
    isCustomizable: data.is_customizable !== false,
    transportType: data.transport_type as TourTransportType,
    isWomenOnly: data.is_women_only || false,
    availableDates: data.available_dates || "June to October",
    customUrl: data.custom_url || "",
    departureDates: departureDates,
    bestTime: data.best_time || "June to September",
    groupSize: data.group_size || "2-10 People",
    terrain: data.terrain || "Himalayan Mountain Passes",
    elevation: data.elevation || "2,000 - 4,550 meters",
    accommodationType: data.accommodation_type || "Hotels & Homestays",
    index: data.index
  };
};

// Map TourPackageProps to Supabase tour format
export const mapTourPropsToSupabase = (tour: TourPackageProps) => {
  // Convert departureDates to a format that can be stored in Supabase
  // We need to convert from DepartureDate[] to a JSONB structure
  const departureDatesForSupabase = JSON.stringify(
    tour.departureDates?.map(d => ({
      month: d.id.split('-')[0] || 'June',
      dates: []
    })) || []
  );

  return {
    title: tour.title,
    image: tour.image,
    original_price: tour.originalPrice,
    discounted_price: tour.discountedPrice,
    discount: tour.discount,
    duration: JSON.stringify(tour.duration),
    night_stays: JSON.stringify(tour.nightStays),
    inclusions: tour.inclusions,
    exclusions: tour.exclusions || [],
    overview: tour.overview || "",
    itinerary: JSON.stringify(tour.itinerary || []),
    is_fixed_departure: tour.hasFixedDepartures !== false,
    is_customizable: tour.isCustomizable !== false,
    transport_type: tour.transportType,
    is_women_only: tour.isWomenOnly || false,
    available_dates: tour.availableDates || "June to October",
    custom_url: tour.customUrl || "",
    departure_dates: departureDatesForSupabase,
    best_time: tour.bestTime || "June to September",
    group_size: tour.groupSize || "2-10 People",
    terrain: tour.terrain || "Himalayan Mountain Passes",
    elevation: tour.elevation || "2,000 - 4,550 meters",
    accommodation_type: tour.accommodationType || "Hotels & Homestays"
  };
};
