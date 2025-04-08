
import { supabase } from "@/integrations/supabase/client";
import { createSlug } from "@/utils/slugUtils";

export const fetchPackageData = async (packageId: string) => {
  try {
    // Fetch the main package data
    const { data: packageData, error: packageError } = await supabase
      .from("tour_packages")
      .select("*")
      .eq("id", packageId)
      .single();

    if (packageError) throw packageError;
    if (!packageData) throw new Error("Package not found");

    // Parse the overview details JSON
    let overviewDetails = {};
    try {
      overviewDetails = packageData.overview_details ? JSON.parse(packageData.overview_details) : {};
    } catch (e) {
      console.error("Error parsing overview_details:", e);
    }

    // Fetch night stays data
    const { data: nightStaysData, error: nightStaysError } = await supabase
      .from("night_stays")
      .select("*")
      .eq("tour_package_id", packageId)
      .order("order", { ascending: true });

    if (nightStaysError) throw nightStaysError;

    // Fetch inclusions data
    const { data: inclusionsData, error: inclusionsError } = await supabase
      .from("inclusions")
      .select("*")
      .eq("tour_package_id", packageId);

    if (inclusionsError) throw inclusionsError;

    // Fetch exclusions data
    const { data: exclusionsData, error: exclusionsError } = await supabase
      .from("exclusions")
      .select("*")
      .eq("tour_package_id", packageId);

    if (exclusionsError) throw exclusionsError;

    // Fetch itinerary data
    const { data: itineraryData, error: itineraryError } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("tour_package_id", packageId)
      .order("day_number", { ascending: true });

    if (itineraryError) throw itineraryError;

    // Check for custom slug in meta field
    let customSlug = '';
    try {
      if (packageData.meta && typeof packageData.meta === 'object') {
        customSlug = packageData.meta.custom_slug || '';
      } else if (typeof packageData.meta === 'string') {
        const metaObj = JSON.parse(packageData.meta);
        customSlug = metaObj.custom_slug || '';
      }
    } catch (e) {
      console.error("Error parsing meta field:", e);
    }

    // If no custom slug is found, generate one from the title
    if (!customSlug) {
      customSlug = createSlug(packageData.title);
    }

    return {
      title: packageData.title,
      customSlug,
      originalPrice: packageData.original_price.toString(),
      discountedPrice: packageData.discounted_price.toString(),
      transportType: packageData.transport_type || 'car',
      durationNights: packageData.duration_nights.toString(),
      durationDays: packageData.duration_days.toString(),
      overview: packageData.overview || '',
      isWomenOnly: packageData.is_women_only || false,
      isFixedDeparture: packageData.is_fixed_departure || false,
      isCustomizable: packageData.is_customizable !== false, // Default to true if undefined
      imagePreview: packageData.image || '',
      
      // Overview details
      accommodation: overviewDetails.accommodation || 'Hotels & Homestays',
      bestTime: overviewDetails.bestTime || 'June to September',
      groupSize: overviewDetails.groupSize || '2-10 People',
      terrain: overviewDetails.terrain || 'Himalayan Mountain Passes',
      elevation: overviewDetails.elevation || '2,000 - 4,550 meters',
      availableFrom: overviewDetails.availableFrom || 'June',
      availableTo: overviewDetails.availableTo || 'October',
      
      // Related data
      nightStays: nightStaysData || [],
      inclusions: inclusionsData || [],
      exclusions: exclusionsData || [],
      itineraryDays: itineraryData || [],
    };
  } catch (error) {
    console.error("Error fetching package data:", error);
    throw error;
  }
};
