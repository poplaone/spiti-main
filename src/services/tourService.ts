
import { supabase } from "@/integrations/supabase/client";
import { TourPackageProps, TourNightStay, TourItineraryDay, TourPackageWithId, TourOverviewDetails } from "@/data/types/tourTypes";

// Storage for tour package caching
const tourCache = new Map<string, TourPackageWithId>();
const TOUR_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms
let lastToursFetchTime = 0;
let cachedTours: TourPackageWithId[] = [];

// Convert database tour to frontend tour package format
export const mapDbTourToFrontend = async (dbTour: any): Promise<TourPackageProps> => {
  // Get night stays
  const { data: nightStaysData } = await supabase
    .from('night_stays')
    .select('location,nights,order')
    .eq('tour_package_id', dbTour.id)
    .order('order', { ascending: true });
  
  const nightStays: TourNightStay[] = (nightStaysData || []).map((stay: any) => ({
    location: stay.location,
    nights: stay.nights,
    order: stay.order
  }));
  
  // Get inclusions - only get what's needed
  const { data: inclusionsData } = await supabase
    .from('inclusions')
    .select('description')
    .eq('tour_package_id', dbTour.id);
  
  const inclusions: string[] = (inclusionsData || []).map((item: any) => item.description);
  
  // Get exclusions - only get what's needed
  const { data: exclusionsData } = await supabase
    .from('exclusions')
    .select('description')
    .eq('tour_package_id', dbTour.id);
  
  const exclusions: string[] = (exclusionsData || []).map((item: any) => item.description);
  
  // Get itinerary days
  const { data: itineraryData } = await supabase
    .from('itinerary_days')
    .select('day_number,title,description')
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
    isVisible: dbTour.is_visible,
    displayOrder: dbTour.display_order,
    overview: dbTour.overview,
    nightStays,
    inclusions,
    exclusions,
    itinerary,
    overviewDetails
  };
};

// Get all tour packages with caching
export const getAllTourPackages = async (): Promise<TourPackageWithId[]> => {
  const now = Date.now();
  
  // Return cached tours if they exist and aren't expired
  if (cachedTours.length > 0 && now - lastToursFetchTime < TOUR_CACHE_DURATION) {
    return cachedTours;
  }
  
  try {
    const { data: dbTours, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('title');
    
    if (error) {
      console.error('Error fetching tours:', error);
      // Return cached tours as fallback if available
      return cachedTours.length > 0 ? cachedTours : [];
    }
    
    // Map all tours to frontend format and include the id
    const tourPromises = (dbTours || []).map(async (dbTour) => {
      // Check if we have this tour in the cache
      if (tourCache.has(dbTour.id)) {
        return tourCache.get(dbTour.id) as TourPackageWithId;
      }
      
      const tourPackage = await mapDbTourToFrontend(dbTour);
      const tourWithId = { ...tourPackage, id: dbTour.id };
      
      // Store in tour cache
      tourCache.set(dbTour.id, tourWithId);
      
      return tourWithId;
    });
    
    const tours = await Promise.all(tourPromises);
    
    // Update the cache and timestamp
    cachedTours = tours;
    lastToursFetchTime = now;
    
    return tours;
  } catch (err) {
    console.error('Error in getAllTourPackages:', err);
    // Return cached tours as fallback if available
    return cachedTours.length > 0 ? cachedTours : [];
  }
};

// Get a single tour package by ID with caching
export const getTourPackageById = async (id: string): Promise<TourPackageWithId | null> => {
  // Check cache first
  if (tourCache.has(id)) {
    return tourCache.get(id) as TourPackageWithId;
  }
  
  try {
    const { data: dbTour, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error || !dbTour) {
      console.error('Error fetching tour by ID:', error);
      return null;
    }
    
    const tourPackage = await mapDbTourToFrontend(dbTour);
    const tourWithId = { ...tourPackage, id: dbTour.id };
    
    // Store in tour cache
    tourCache.set(id, tourWithId);
    
    return tourWithId;
  } catch (err) {
    console.error('Error in getTourPackageById:', err);
    return null;
  }
};
