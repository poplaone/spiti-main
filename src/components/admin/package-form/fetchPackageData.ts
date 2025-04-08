
import { supabase } from "@/integrations/supabase/client";
import { TourPackageFormData } from "./types";
import { createSlug } from "@/utils/slugUtils";

export const fetchPackageData = async (packageId: string): Promise<TourPackageFormData | null> => {
  try {
    // Fetch the main package data
    const { data: packageData, error: packageError } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', packageId)
      .single();
      
    if (packageError) throw packageError;
    if (!packageData) return null;
    
    // Fetch night stays
    const { data: nightStaysData, error: nightStaysError } = await supabase
      .from('tour_night_stays')
      .select('*')
      .eq('tour_id', packageId)
      .order('order', { ascending: true });
      
    if (nightStaysError) throw nightStaysError;
    
    // Fetch inclusions
    const { data: inclusionsData, error: inclusionsError } = await supabase
      .from('tour_inclusions')
      .select('*')
      .eq('tour_id', packageId);
      
    if (inclusionsError) throw inclusionsError;
    
    // Fetch exclusions
    const { data: exclusionsData, error: exclusionsError } = await supabase
      .from('tour_exclusions')
      .select('*')
      .eq('tour_id', packageId);
      
    if (exclusionsError) throw exclusionsError;
    
    // Fetch itinerary days
    const { data: itineraryData, error: itineraryError } = await supabase
      .from('tour_itinerary')
      .select('*')
      .eq('tour_id', packageId)
      .order('day_number', { ascending: true });
      
    if (itineraryError) throw itineraryError;
    
    // Parse overview details
    let overviewDetails = {};
    try {
      if (packageData.overview_details) {
        overviewDetails = JSON.parse(packageData.overview_details);
      }
    } catch (e) {
      console.error('Error parsing overview details:', e);
    }
    
    // Parse meta for custom slug
    let customSlug = '';
    try {
      if (packageData.meta) {
        if (typeof packageData.meta === 'string') {
          const metaObj = JSON.parse(packageData.meta);
          customSlug = metaObj.custom_slug || '';
        } else if (typeof packageData.meta === 'object') {
          customSlug = packageData.meta.custom_slug || '';
        }
      }
    } catch (e) {
      console.error('Error parsing meta field:', e);
    }
    
    // Default values for overview details if not present
    const overviewDetailsWithDefaults = {
      accommodation: '',
      bestTime: '',
      groupSize: '',
      terrain: '',
      elevation: '',
      availableFrom: '',
      availableTo: '',
      ...overviewDetails
    };
    
    return {
      title: packageData.title || '',
      customSlug,
      originalPrice: packageData.original_price?.toString() || '',
      discountedPrice: packageData.discounted_price?.toString() || '',
      transportType: packageData.transport_type || 'car',
      durationNights: packageData.duration_nights?.toString() || '',
      durationDays: packageData.duration_days?.toString() || '',
      overview: packageData.overview || '',
      isWomenOnly: packageData.is_women_only || false,
      isFixedDeparture: packageData.is_fixed_departure || false,
      isCustomizable: packageData.is_customizable !== false, // default to true if not set
      
      // Use the overviewDetails with defaults
      accommodation: overviewDetailsWithDefaults.accommodation,
      bestTime: overviewDetailsWithDefaults.bestTime,
      groupSize: overviewDetailsWithDefaults.groupSize,
      terrain: overviewDetailsWithDefaults.terrain,
      elevation: overviewDetailsWithDefaults.elevation,
      availableFrom: overviewDetailsWithDefaults.availableFrom,
      availableTo: overviewDetailsWithDefaults.availableTo,
      
      // Format related data
      nightStays: (nightStaysData || []).map(ns => ({
        id: ns.id,
        location: ns.location || '',
        nights: ns.nights || 0,
        order: ns.order || 0
      })),
      
      inclusions: (inclusionsData || []).map(inc => ({
        id: inc.id,
        description: inc.description || ''
      })),
      
      exclusions: (exclusionsData || []).map(exc => ({
        id: exc.id,
        description: exc.description || ''
      })),
      
      itineraryDays: (itineraryData || []).map(day => ({
        id: day.id,
        day_number: day.day_number || 0,
        title: day.title || '',
        description: day.description || ''
      })),
      
      imageFile: null,
      imagePreview: packageData.image || ''
    };
  } catch (error) {
    console.error('Error fetching package data:', error);
    return null;
  }
};
