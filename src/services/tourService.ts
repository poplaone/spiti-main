
import { TourPackageProps } from "@/components/TourPackage";
import { generateCustomUrl, normalizeTransportType } from './tours/tourUtils';
import { supabase } from './supabase/supabaseClient';
import { tourPackagesData } from '@/data/tourPackagesData';

// Get all tours - fetches from Supabase
export const getAllTours = async (): Promise<TourPackageProps[]> => {
  try {
    console.log("Fetching all tours from Supabase");
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('index', { ascending: true });
    
    if (error) {
      console.error("Error fetching tours from Supabase:", error);
      // Fallback to local data if Supabase fails
      console.log("Falling back to local data");
      return tourPackagesData;
    }
    
    if (!data || data.length === 0) {
      console.log("No tours found in Supabase, initializing with default data");
      await initializeToursDatabase();
      return tourPackagesData;
    }
    
    console.log(`Fetched ${data.length} tours from Supabase`);
    
    // Convert database format to app format
    return data.map(tour => ({
      ...tour,
      originalPrice: tour.original_price,
      discountedPrice: tour.discounted_price,
      hasFixedDepartures: tour.is_fixed_departure,
      isCustomizable: tour.is_customizable !== false,
      isWomenOnly: tour.is_women_only,
      transportType: normalizeTransportType(String(tour.transport_type)),
      customUrl: tour.custom_url
    }));
  } catch (error) {
    console.error("Error in getAllTours:", error);
    // Fallback to local data if something goes wrong
    return tourPackagesData;
  }
};

// Get a single tour by index
export const getTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    console.log("Fetching tour by index from Supabase:", index);
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('index', index)
      .single();
    
    if (error) {
      console.error("Error fetching tour by index from Supabase:", error);
      
      // Fallback to local data
      console.log("Falling back to local data for index:", index);
      const localTour = tourPackagesData.find((t, i) => i === index);
      return localTour || null;
    }
    
    // Convert database format to app format
    return {
      ...data,
      originalPrice: data.original_price,
      discountedPrice: data.discounted_price,
      hasFixedDepartures: data.is_fixed_departure,
      isCustomizable: data.is_customizable !== false,
      isWomenOnly: data.is_women_only,
      transportType: normalizeTransportType(String(data.transport_type)),
      customUrl: data.custom_url
    };
  } catch (error) {
    console.error("Error in getTourByIndex:", error);
    
    // Fallback to local data
    console.log("Falling back to local data after error for index:", index);
    const localTour = tourPackagesData.find((t, i) => i === index);
    return localTour || null;
  }
};

// Get a single tour by custom URL
export const getTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    // Normalize URL for comparison
    const normalizedUrl = url.trim().toLowerCase();
    
    console.log("Fetching tour by custom URL from Supabase:", normalizedUrl);
    
    // First try exact match
    const { data: exactMatches, error: exactError } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('custom_url', normalizedUrl);
    
    if (exactError) {
      console.error("Error fetching tour by custom URL (exact match) from Supabase:", exactError);
      
      // Fallback to local data for exact match
      console.log("Falling back to local data for URL (exact):", normalizedUrl);
      const localTour = tourPackagesData.find(t => 
        t.customUrl && t.customUrl.toLowerCase() === normalizedUrl);
      return localTour || null;
    }
    
    if (exactMatches && exactMatches.length > 0) {
      console.log("Exact URL match found");
      
      // Convert database format to app format
      return {
        ...exactMatches[0],
        originalPrice: exactMatches[0].original_price,
        discountedPrice: exactMatches[0].discounted_price,
        hasFixedDepartures: exactMatches[0].is_fixed_departure,
        isCustomizable: exactMatches[0].is_customizable !== false,
        isWomenOnly: exactMatches[0].is_women_only,
        transportType: normalizeTransportType(String(exactMatches[0].transport_type)),
        customUrl: exactMatches[0].custom_url
      };
    }
    
    // If exact match failed, try with ILIKE for partial match
    const { data: likeMatches, error: likeError } = await supabase
      .from('tour_packages')
      .select('*')
      .ilike('custom_url', `%${normalizedUrl}%`);
    
    if (likeError) {
      console.error("Error fetching tour by custom URL (ILIKE match) from Supabase:", likeError);
      
      // Fallback to local data for ILIKE match
      console.log("Falling back to local data for URL (partial):", normalizedUrl);
      const localTour = tourPackagesData.find(t => 
        t.customUrl && t.customUrl.toLowerCase().includes(normalizedUrl));
      return localTour || null;
    }
    
    if (likeMatches && likeMatches.length > 0) {
      console.log("Partial URL match found");
      
      // Convert database format to app format
      return {
        ...likeMatches[0],
        originalPrice: likeMatches[0].original_price,
        discountedPrice: likeMatches[0].discounted_price,
        hasFixedDepartures: likeMatches[0].is_fixed_departure,
        isCustomizable: likeMatches[0].is_customizable !== false,
        isWomenOnly: likeMatches[0].is_women_only,
        transportType: normalizeTransportType(String(likeMatches[0].transport_type)),
        customUrl: likeMatches[0].custom_url
      };
    }
    
    console.log("No URL match found for:", normalizedUrl);
    
    // If nothing found in Supabase, check local data
    console.log("Checking local data for URL:", normalizedUrl);
    const localExactTour = tourPackagesData.find(t => 
      t.customUrl && t.customUrl.toLowerCase() === normalizedUrl);
      
    if (localExactTour) {
      console.log("Found exact match in local data");
      return localExactTour;
    }
    
    const localPartialTour = tourPackagesData.find(t => 
      t.customUrl && t.customUrl.toLowerCase().includes(normalizedUrl));
      
    if (localPartialTour) {
      console.log("Found partial match in local data");
      return localPartialTour;
    }
    
    return null;
  } catch (error) {
    console.error("Error in getTourByCustomUrl:", error);
    
    // Fallback to local data
    console.log("Falling back to local data after error for URL:", url);
    const normalizedUrl = url.trim().toLowerCase();
    const localTour = tourPackagesData.find(t => 
      t.customUrl && (t.customUrl.toLowerCase() === normalizedUrl || 
                     t.customUrl.toLowerCase().includes(normalizedUrl)));
    return localTour || null;
  }
};

// Initialize database with default tours if empty
export const initializeToursDatabase = async (): Promise<void> => {
  try {
    // Check if tours table is empty
    const { data, error } = await supabase
      .from('tour_packages')
      .select('count')
      .single();
      
    if (error) {
      console.error("Error checking tours database:", error);
      return;
    }
    
    if (!data || data.count === 0) {
      console.log("Tours database is empty, initializing with default data");
      
      // Convert default tours to database format
      const dbTours = tourPackagesData.map((tour, index) => ({
        title: tour.title,
        image: tour.image,
        original_price: tour.originalPrice,
        discounted_price: tour.discountedPrice,
        discount: tour.discount,
        duration: tour.duration,
        night_stays: tour.nightStays || [],
        inclusions: tour.inclusions || [],
        exclusions: tour.exclusions || [],
        overview: tour.overview,
        itinerary: tour.itinerary || [],
        is_fixed_departure: tour.hasFixedDepartures !== false,
        is_customizable: tour.isCustomizable !== false,
        transport_type: tour.transportType,
        is_women_only: tour.isWomenOnly || false,
        available_dates: tour.availableDates,
        custom_url: generateCustomUrl(tour.title, tourPackagesData.slice(0, index)),
        departure_dates: tour.departureDates || [],
        best_time: tour.bestTime || "June to September",
        group_size: tour.groupSize || "2-10 People",
        terrain: tour.terrain || "Himalayan Mountain Passes",
        elevation: tour.elevation || "2,000 - 4,550 meters",
        accommodation_type: tour.accommodationType || "Hotels & Homestays",
        index: index
      }));
      
      // Insert default tours into database
      const { error: insertError } = await supabase
        .from('tour_packages')
        .insert(dbTours);
        
      if (insertError) {
        console.error("Error initializing tours database:", insertError);
      } else {
        console.log("Tours database initialized successfully");
      }
    }
  } catch (error) {
    console.error("Error initializing tours database:", error);
  }
};

// Add a new tour
export const addTour = async (tour: TourPackageProps): Promise<void> => {
  console.log("Starting to add new tour to Supabase:", tour.title);
  
  try {
    // Auto-generate customUrl if not provided or empty
    if (!tour.customUrl || tour.customUrl.trim() === '') {
      const allTours = await getAllTours();
      tour.customUrl = generateCustomUrl(tour.title, allTours);
      console.log("Generated custom URL:", tour.customUrl);
    } else {
      // Normalize custom URL
      tour.customUrl = tour.customUrl.trim().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }
    
    // Convert any legacy transport type
    tour.transportType = normalizeTransportType(String(tour.transportType));
    
    // Convert to database format
    const dbTour = {
      title: tour.title,
      image: tour.image,
      original_price: tour.originalPrice,
      discounted_price: tour.discountedPrice,
      discount: tour.discount,
      duration: tour.duration,
      night_stays: tour.nightStays || [],
      inclusions: tour.inclusions || [],
      exclusions: tour.exclusions || [],
      overview: tour.overview,
      itinerary: tour.itinerary || [],
      is_fixed_departure: tour.hasFixedDepartures !== false,
      is_customizable: tour.isCustomizable !== false,
      transport_type: tour.transportType,
      is_women_only: tour.isWomenOnly || false,
      available_dates: tour.availableDates,
      custom_url: tour.customUrl,
      departure_dates: tour.departureDates || [],
      best_time: tour.bestTime || "June to September",
      group_size: tour.groupSize || "2-10 People",
      terrain: tour.terrain || "Himalayan Mountain Passes",
      elevation: tour.elevation || "2,000 - 4,550 meters",
      accommodation_type: tour.accommodationType || "Hotels & Homestays",
      index: (await getAllTours()).length // Set index to the current length
    };
    
    // Add the new tour to Supabase
    const { error } = await supabase
      .from('tour_packages')
      .insert([dbTour]);
      
    if (error) {
      console.error("Error adding tour to Supabase:", error);
      throw error;
    }
    
    console.log("Tour added successfully to Supabase:", tour.title);
  } catch (error) {
    console.error("Error adding tour:", error);
    throw error;
  }
};

// Update an existing tour
export const updateTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  try {
    console.log("Updating tour at index in Supabase:", index, updatedTour);
    
    // Get all tours to check for duplicate custom URLs
    const allTours = await getAllTours();
    
    // If title changed or customUrl is empty, regenerate it
    if (!updatedTour.customUrl) {
      updatedTour.customUrl = generateCustomUrl(updatedTour.title, 
        allTours.filter((_, i) => i !== index)); // Exclude current tour from duplicates check
    } else {
      // Normalize custom URL if provided
      updatedTour.customUrl = updatedTour.customUrl.trim().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }
    
    // Convert any legacy transport type
    updatedTour.transportType = normalizeTransportType(String(updatedTour.transportType));
    
    // Convert to database format
    const dbTour = {
      title: updatedTour.title,
      image: updatedTour.image,
      original_price: updatedTour.originalPrice,
      discounted_price: updatedTour.discountedPrice,
      discount: updatedTour.discount,
      duration: updatedTour.duration,
      night_stays: updatedTour.nightStays || [],
      inclusions: updatedTour.inclusions || [],
      exclusions: updatedTour.exclusions || [],
      overview: updatedTour.overview,
      itinerary: updatedTour.itinerary || [],
      is_fixed_departure: updatedTour.hasFixedDepartures !== false,
      is_customizable: updatedTour.isCustomizable !== false,
      transport_type: updatedTour.transportType,
      is_women_only: updatedTour.isWomenOnly || false,
      available_dates: updatedTour.availableDates,
      custom_url: updatedTour.customUrl,
      departure_dates: updatedTour.departureDates || [],
      best_time: updatedTour.bestTime || "June to September",
      group_size: updatedTour.groupSize || "2-10 People",
      terrain: updatedTour.terrain || "Himalayan Mountain Passes",
      elevation: updatedTour.elevation || "2,000 - 4,550 meters",
      accommodation_type: updatedTour.accommodationType || "Hotels & Homestays"
    };
    
    // Update the tour in Supabase
    const { error } = await supabase
      .from('tour_packages')
      .update(dbTour)
      .eq('index', index);
      
    if (error) {
      console.error("Error updating tour in Supabase:", error);
      throw error;
    }
    
    console.log("Tour updated successfully in Supabase:", updatedTour.title);
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
};

// Delete a tour
export const deleteTour = async (index: number): Promise<void> => {
  try {
    console.log("Deleting tour at index from Supabase:", index);
    
    // Delete the tour from Supabase
    const { error } = await supabase
      .from('tour_packages')
      .delete()
      .eq('index', index);
      
    if (error) {
      console.error("Error deleting tour from Supabase:", error);
      throw error;
    }
    
    // Update indices for remaining tours
    const remainingTours = await getAllTours();
    
    for (let i = 0; i < remainingTours.length; i++) {
      if (remainingTours[i].index !== i) {
        await supabase
          .from('tour_packages')
          .update({ index: i })
          .eq('index', remainingTours[i].index);
      }
    }
    
    console.log("Tour deleted successfully from Supabase");
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};

// Initialize database with default tours if empty
export const initializeToursDatabase = async (): Promise<void> => {
  try {
    // Check if tours table is empty
    const { data, error } = await supabase
      .from('tour_packages')
      .select('count')
      .single();
      
    if (error) {
      console.error("Error checking tours database:", error);
      return;
    }
    
    if (!data || data.count === 0) {
      console.log("Tours database is empty, initializing with default data");
      
      // Convert default tours to database format
      const dbTours = tourPackagesData.map((tour, index) => ({
        title: tour.title,
        image: tour.image,
        original_price: tour.originalPrice,
        discounted_price: tour.discountedPrice,
        discount: tour.discount,
        duration: tour.duration,
        night_stays: tour.nightStays || [],
        inclusions: tour.inclusions || [],
        exclusions: tour.exclusions || [],
        overview: tour.overview,
        itinerary: tour.itinerary || [],
        is_fixed_departure: tour.hasFixedDepartures !== false,
        is_customizable: tour.isCustomizable !== false,
        transport_type: tour.transportType,
        is_women_only: tour.isWomenOnly || false,
        available_dates: tour.availableDates,
        custom_url: generateCustomUrl(tour.title, tourPackagesData.slice(0, index)),
        departure_dates: tour.departureDates || [],
        best_time: tour.bestTime || "June to September",
        group_size: tour.groupSize || "2-10 People",
        terrain: tour.terrain || "Himalayan Mountain Passes",
        elevation: tour.elevation || "2,000 - 4,550 meters",
        accommodation_type: tour.accommodationType || "Hotels & Homestays",
        index: index
      }));
      
      // Insert default tours into database
      const { error: insertError } = await supabase
        .from('tour_packages')
        .insert(dbTours);
        
      if (insertError) {
        console.error("Error initializing tours database:", insertError);
      } else {
        console.log("Tours database initialized successfully");
      }
    }
  } catch (error) {
    console.error("Error initializing tours database:", error);
  }
};

// Reset to default tours
export const resetToDefaultTours = async (): Promise<void> => {
  try {
    // Delete all existing tours
    const { error: deleteError } = await supabase
      .from('tour_packages')
      .delete()
      .neq('index', -1); // Delete all tours
      
    if (deleteError) {
      console.error("Error deleting existing tours:", deleteError);
      return;
    }
    
    // Re-initialize with default data
    await initializeToursDatabase();
    
    console.log("Tours reset to default successfully");
  } catch (error) {
    console.error("Error resetting tours:", error);
  }
};
