
import { supabase } from "@/integrations/supabase/client";
import { TourPackageProps } from "@/components/TourPackage";
import { TourNightStay, TourItineraryDay } from "@/data/types/tourTypes";

// Convert database tour to frontend tour package format
export const mapDbTourToFrontend = async (dbTour: any): Promise<TourPackageProps> => {
  // Get night stays
  const { data: nightStaysData } = await supabase
    .from('night_stays')
    .select('*')
    .eq('tour_package_id', dbTour.id)
    .order('id');
  
  const nightStays: TourNightStay[] = (nightStaysData || []).map((stay: any) => ({
    location: stay.location,
    nights: stay.nights
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
  
  return {
    id: dbTour.id,
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
    overview: dbTour.overview,
    nightStays,
    inclusions,
    exclusions,
    itinerary
  };
};

// Get all tour packages
export const getAllTourPackages = async (): Promise<TourPackageProps[]> => {
  const { data: dbTours, error } = await supabase
    .from('tour_packages')
    .select('*')
    .order('title');
  
  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
  
  // Map all tours to frontend format
  const tourPromises = dbTours.map(mapDbTourToFrontend);
  return Promise.all(tourPromises);
};

// Get a single tour package by ID
export const getTourPackageById = async (id: string): Promise<TourPackageProps | null> => {
  const { data: dbTour, error } = await supabase
    .from('tour_packages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !dbTour) {
    console.error('Error fetching tour by ID:', error);
    return null;
  }
  
  return mapDbTourToFrontend(dbTour);
};

// More methods can be added as needed for filtering, etc.
