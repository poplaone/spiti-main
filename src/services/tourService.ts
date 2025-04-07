
import { supabase } from "@/integrations/supabase/client";
import { TourPackageProps, TourNightStay, TourItineraryDay, TourPackageWithId, TourOverviewDetails } from "@/data/types/tourTypes";

// Convert database tour to frontend tour package format
export const mapDbTourToFrontend = async (dbTour: any): Promise<TourPackageProps> => {
  // Get night stays
  const { data: nightStaysData } = await supabase
    .from('night_stays')
    .select('*')
    .eq('tour_package_id', dbTour.id)
    .order('order', { ascending: true });
  
  const nightStays: TourNightStay[] = (nightStaysData || []).map((stay: any) => ({
    location: stay.location,
    nights: stay.nights,
    order: stay.order
  }));
  
  // Get inclusions
  const { data: inclusionsData } = await supabase
    .from('inclusions')
    .select('*')
    .eq('tour_package_id', dbTour.id);
  
  const inclusions: string[] = (inclusionsData || []).map((item: any) => item.description);
  
  // Get exclusions
  const { data: exclusionsData } = await supabase
    .from('exclusions')
    .select('*')
    .eq('tour_package_id', dbTour.id);
  
  const exclusions: string[] = (exclusionsData || []).map((item: any) => item.description);
  
  // Get itinerary days
  const { data: itineraryData } = await supabase
    .from('itinerary_days')
    .select('*')
    .eq('tour_package_id', dbTour.id)
    .order('day_number');
  
  const itinerary: TourItineraryDay[] = (itineraryData || []).map((day: any) => ({
    day: day.day_number,
    title: day.title,
    description: day.description
  }));
  
  // Parse overview details if available
  let overviewDetails: TourOverviewDetails | undefined;
  if (dbTour.overview_details) {
    try {
      overviewDetails = JSON.parse(dbTour.overview_details);
    } catch (e) {
      console.error("Error parsing overview details:", e);
    }
  }
  
  return {
    id: dbTour.id, // Include the ID in the returned object
    title: dbTour.title,
    image: dbTour.image,
    originalPrice: dbTour.original_price,
    discountedPrice: dbTour.discounted_price,
    discount: dbTour.discount,
    duration: {
      nights: dbTour.duration_nights,
      days: dbTour.duration_days
    },
    transportType: dbTour.transport_type,
    isWomenOnly: dbTour.is_women_only,
    isFixedDeparture: dbTour.is_fixed_departure,
    isCustomizable: dbTour.is_customizable,
    isVisible: dbTour.is_visible, // Add this property with correct snake_case mapping
    overview: dbTour.overview,
    nightStays,
    inclusions,
    exclusions,
    itinerary,
    overviewDetails
  };
};

// Get all tour packages
export const getAllTourPackages = async (): Promise<TourPackageWithId[]> => {
  const { data: dbTours, error } = await supabase
    .from('tour_packages')
    .select('*')
    .order('title');
  
  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
  
  // Map all tours to frontend format and include the id
  const tourPromises = (dbTours || []).map(async (dbTour) => {
    const tourPackage = await mapDbTourToFrontend(dbTour);
    return { ...tourPackage, id: dbTour.id };
  });
  
  return Promise.all(tourPromises);
};

// Get a single tour package by ID
export const getTourPackageById = async (id: string): Promise<TourPackageWithId | null> => {
  const { data: dbTour, error } = await supabase
    .from('tour_packages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !dbTour) {
    console.error('Error fetching tour by ID:', error);
    return null;
  }
  
  const tourPackage = await mapDbTourToFrontend(dbTour);
  return { ...tourPackage, id: dbTour.id };
};
