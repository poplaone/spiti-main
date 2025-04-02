
import { TourPackageProps } from "@/components/TourPackage";
import { initializeStorage, resetToDefaultTours } from './tours/tourStorage';
import { TOURS_STORAGE_KEY, generateCustomUrl, normalizeTransportType } from './tours/tourUtils';
import { getDefaultTourValues } from './tours/tourDefaults';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Get all tours - now fetches from Supabase with fallback to localStorage
export const getAllTours = async (): Promise<TourPackageProps[]> => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('index', { ascending: true });

    if (error) {
      console.error("Error fetching from Supabase:", error);
      return getLocalTours();
    }

    if (data && data.length > 0) {
      // Transform the Supabase data to match our TourPackageProps format
      return data.map(tour => {
        // Parse JSON fields that come as strings
        let duration = { nights: 0, days: 0 };
        let nightStays = [];
        let itinerary = [];
        let departureDates = [];
        
        try {
          // Parse duration JSON
          if (typeof tour.duration === 'string') {
            duration = JSON.parse(tour.duration);
          } else if (typeof tour.duration === 'object') {
            duration = tour.duration;
          }
          
          // Parse nightStays JSON
          if (typeof tour.night_stays === 'string') {
            nightStays = JSON.parse(tour.night_stays);
          } else if (Array.isArray(tour.night_stays)) {
            nightStays = tour.night_stays;
          }
          
          // Parse itinerary JSON
          if (typeof tour.itinerary === 'string') {
            itinerary = JSON.parse(tour.itinerary);
          } else if (Array.isArray(tour.itinerary)) {
            itinerary = tour.itinerary;
          }
          
          // Parse departureDates JSON
          if (typeof tour.departure_dates === 'string') {
            departureDates = JSON.parse(tour.departure_dates);
          } else if (Array.isArray(tour.departure_dates)) {
            departureDates = tour.departure_dates;
          }
        } catch (e) {
          console.error("Error parsing JSON fields:", e);
        }
        
        return {
          title: tour.title,
          image: tour.image,
          originalPrice: tour.original_price,
          discountedPrice: tour.discounted_price,
          discount: tour.discount,
          duration: duration,
          nightStays: nightStays,
          inclusions: tour.inclusions || [],
          exclusions: tour.exclusions || [],
          overview: tour.overview || "",
          itinerary: itinerary,
          hasFixedDepartures: tour.is_fixed_departure !== false,
          isCustomizable: tour.is_customizable !== false,
          transportType: tour.transport_type as any,
          isWomenOnly: tour.is_women_only || false,
          availableDates: tour.available_dates || "June to October",
          customUrl: tour.custom_url || "",
          departureDates: departureDates,
          bestTime: tour.best_time || "June to September",
          groupSize: tour.group_size || "2-10 People",
          terrain: tour.terrain || "Himalayan Mountain Passes",
          elevation: tour.elevation || "2,000 - 4,550 meters",
          accommodationType: tour.accommodation_type || "Hotels & Homestays",
          index: tour.index
        };
      });
    } else {
      // If no data in Supabase, use localStorage
      return getLocalTours();
    }
  } catch (error) {
    console.error("Error in getAllTours:", error);
    return getLocalTours();
  }
};

// Helper function to get tours from localStorage
const getLocalTours = (): TourPackageProps[] => {
  initializeStorage();
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  return storedTours ? JSON.parse(storedTours) : [];
};

// Get a single tour by index - now can be local or from Supabase
export const getTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('index', index)
      .single();

    if (error) {
      // Fallback to localStorage
      const tours = getLocalTours();
      return tours[index] || null;
    }

    if (data) {
      // Parse JSON fields that come as strings
      let duration = { nights: 0, days: 0 };
      let nightStays = [];
      let itinerary = [];
      let departureDates = [];
      
      try {
        // Parse duration JSON
        if (typeof data.duration === 'string') {
          duration = JSON.parse(data.duration);
        } else if (typeof data.duration === 'object') {
          duration = data.duration;
        }
        
        // Parse nightStays JSON
        if (typeof data.night_stays === 'string') {
          nightStays = JSON.parse(data.night_stays);
        } else if (Array.isArray(data.night_stays)) {
          nightStays = data.night_stays;
        }
        
        // Parse itinerary JSON
        if (typeof data.itinerary === 'string') {
          itinerary = JSON.parse(data.itinerary);
        } else if (Array.isArray(data.itinerary)) {
          itinerary = data.itinerary;
        }
        
        // Parse departureDates JSON
        if (typeof data.departure_dates === 'string') {
          departureDates = JSON.parse(data.departure_dates);
        } else if (Array.isArray(data.departure_dates)) {
          departureDates = data.departure_dates;
        }
      } catch (e) {
        console.error("Error parsing JSON fields:", e);
      }

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
        transportType: data.transport_type as any,
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
    } else {
      // Fallback to localStorage
      const tours = getLocalTours();
      return tours[index] || null;
    }
  } catch (error) {
    console.error("Error in getTourByIndex:", error);
    // Fallback to localStorage
    const tours = getLocalTours();
    return tours[index] || null;
  }
};

// Get a single tour by custom URL - now can be local or from Supabase
export const getTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('custom_url', url)
      .single();

    if (error) {
      // Fallback to localStorage
      const tours = getLocalTours();
      const tour = tours.find(tour => tour.customUrl === url);
      if (tour) {
        return {
          ...tour,
          index: tours.findIndex(t => t.customUrl === url)
        };
      }
      return null;
    }

    if (data) {
      // Parse JSON fields that come as strings
      let duration = { nights: 0, days: 0 };
      let nightStays = [];
      let itinerary = [];
      let departureDates = [];
      
      try {
        // Parse duration JSON
        if (typeof data.duration === 'string') {
          duration = JSON.parse(data.duration);
        } else if (typeof data.duration === 'object') {
          duration = data.duration;
        }
        
        // Parse nightStays JSON
        if (typeof data.night_stays === 'string') {
          nightStays = JSON.parse(data.night_stays);
        } else if (Array.isArray(data.night_stays)) {
          nightStays = data.night_stays;
        }
        
        // Parse itinerary JSON
        if (typeof data.itinerary === 'string') {
          itinerary = JSON.parse(data.itinerary);
        } else if (Array.isArray(data.itinerary)) {
          itinerary = data.itinerary;
        }
        
        // Parse departureDates JSON
        if (typeof data.departure_dates === 'string') {
          departureDates = JSON.parse(data.departure_dates);
        } else if (Array.isArray(data.departure_dates)) {
          departureDates = data.departure_dates;
        }
      } catch (e) {
        console.error("Error parsing JSON fields:", e);
      }

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
        transportType: data.transport_type as any,
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
    } else {
      // Fallback to localStorage
      const tours = getLocalTours();
      const tour = tours.find(tour => tour.customUrl === url);
      if (tour) {
        return {
          ...tour,
          index: tours.findIndex(t => t.customUrl === url)
        };
      }
      return null;
    }
  } catch (error) {
    console.error("Error in getTourByCustomUrl:", error);
    // Fallback to localStorage
    const tours = getLocalTours();
    const tour = tours.find(tour => tour.customUrl === url);
    if (tour) {
      return {
        ...tour,
        index: tours.findIndex(t => t.customUrl === url)
      };
    }
    return null;
  }
};

// Add a new tour - now adds to Supabase and localStorage
export const addTour = async (tour: TourPackageProps): Promise<void> => {
  const tours = getLocalTours();
  
  // Auto-generate customUrl if not provided
  if (!tour.customUrl) {
    tour.customUrl = generateCustomUrl(tour.title, tours);
  }
  
  // Convert any legacy transport type
  if (String(tour.transportType) === 'innova') {
    tour.transportType = 'premium';
  }

  // First, add to localStorage for backwards compatibility
  tours.push(tour);
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));

  // Then, add to Supabase
  try {
    const { error } = await supabase
      .from('tour_packages')
      .insert([{
        title: tour.title,
        image: tour.image,
        original_price: tour.originalPrice,
        discounted_price: tour.discountedPrice,
        discount: tour.discount,
        duration: tour.duration,
        night_stays: tour.nightStays,
        inclusions: tour.inclusions,
        exclusions: tour.exclusions || [],
        overview: tour.overview || "",
        itinerary: tour.itinerary || [],
        is_fixed_departure: tour.hasFixedDepartures !== false,
        is_customizable: tour.isCustomizable !== false,
        transport_type: tour.transportType,
        is_women_only: tour.isWomenOnly || false,
        available_dates: tour.availableDates || "June to October",
        custom_url: tour.customUrl || "",
        departure_dates: tour.departureDates || [],
        best_time: tour.bestTime || "June to September",
        group_size: tour.groupSize || "2-10 People",
        terrain: tour.terrain || "Himalayan Mountain Passes",
        elevation: tour.elevation || "2,000 - 4,550 meters",
        accommodation_type: tour.accommodationType || "Hotels & Homestays",
        index: tours.length - 1 // Use the array index
      }]);
    
    if (error) {
      console.error("Error adding tour to Supabase:", error);
    }
  } catch (error) {
    console.error("Error in addTour:", error);
  }
};

// Update an existing tour - now updates in Supabase and localStorage
export const updateTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  const tours = getLocalTours();
  
  if (index >= 0 && index < tours.length) {
    // If title changed or customUrl is empty, regenerate it
    if (tours[index].title !== updatedTour.title || !updatedTour.customUrl) {
      updatedTour.customUrl = generateCustomUrl(updatedTour.title, 
        tours.filter((_, i) => i !== index)); // Exclude current tour from duplicates check
    }
    
    // Convert any legacy transport type
    if (String(updatedTour.transportType) === 'innova') {
      updatedTour.transportType = 'premium';
    }
    
    // Update localStorage
    tours[index] = updatedTour;
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
    
    // Update in Supabase
    try {
      // First, try to find the existing record by index
      const { data } = await supabase
        .from('tour_packages')
        .select('id')
        .eq('index', index)
        .single();
      
      if (data?.id) {
        // If found, update the record
        const { error } = await supabase
          .from('tour_packages')
          .update({
            title: updatedTour.title,
            image: updatedTour.image,
            original_price: updatedTour.originalPrice,
            discounted_price: updatedTour.discountedPrice,
            discount: updatedTour.discount,
            duration: updatedTour.duration,
            night_stays: updatedTour.nightStays,
            inclusions: updatedTour.inclusions,
            exclusions: updatedTour.exclusions || [],
            overview: updatedTour.overview || "",
            itinerary: updatedTour.itinerary || [],
            is_fixed_departure: updatedTour.hasFixedDepartures !== false,
            is_customizable: updatedTour.isCustomizable !== false,
            transport_type: updatedTour.transportType,
            is_women_only: updatedTour.isWomenOnly || false,
            available_dates: updatedTour.availableDates || "June to October",
            custom_url: updatedTour.customUrl || "",
            departure_dates: updatedTour.departureDates || [],
            best_time: updatedTour.bestTime || "June to September",
            group_size: updatedTour.groupSize || "2-10 People",
            terrain: updatedTour.terrain || "Himalayan Mountain Passes",
            elevation: updatedTour.elevation || "2,000 - 4,550 meters",
            accommodation_type: updatedTour.accommodationType || "Hotels & Homestays"
          })
          .eq('id', data.id);
        
        if (error) {
          console.error("Error updating tour in Supabase:", error);
        }
      } else {
        // If not found, insert as a new record
        const { error } = await supabase
          .from('tour_packages')
          .insert([{
            title: updatedTour.title,
            image: updatedTour.image,
            original_price: updatedTour.originalPrice,
            discounted_price: updatedTour.discountedPrice,
            discount: updatedTour.discount,
            duration: updatedTour.duration,
            night_stays: updatedTour.nightStays,
            inclusions: updatedTour.inclusions,
            exclusions: updatedTour.exclusions || [],
            overview: updatedTour.overview || "",
            itinerary: updatedTour.itinerary || [],
            is_fixed_departure: updatedTour.hasFixedDepartures !== false,
            is_customizable: updatedTour.isCustomizable !== false,
            transport_type: updatedTour.transportType,
            is_women_only: updatedTour.isWomenOnly || false,
            available_dates: updatedTour.availableDates || "June to October",
            custom_url: updatedTour.customUrl || "",
            departure_dates: updatedTour.departureDates || [],
            best_time: updatedTour.bestTime || "June to September",
            group_size: updatedTour.groupSize || "2-10 People",
            terrain: updatedTour.terrain || "Himalayan Mountain Passes",
            elevation: updatedTour.elevation || "2,000 - 4,550 meters",
            accommodation_type: updatedTour.accommodationType || "Hotels & Homestays",
            index: index
          }]);
        
        if (error) {
          console.error("Error inserting tour in Supabase:", error);
        }
      }
    } catch (error) {
      console.error("Error in updateTour:", error);
    }
  }
};

// Delete a tour - now deletes from Supabase and localStorage
export const deleteTour = async (index: number): Promise<void> => {
  const tours = getLocalTours();
  
  if (index >= 0 && index < tours.length) {
    // Delete from localStorage
    tours.splice(index, 1);
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
    
    // Delete from Supabase
    try {
      const { error } = await supabase
        .from('tour_packages')
        .delete()
        .eq('index', index);
      
      if (error) {
        console.error("Error deleting tour from Supabase:", error);
      }
      
      // Update indices for remaining tours
      tours.forEach(async (tour, idx) => {
        const { error } = await supabase
          .from('tour_packages')
          .update({ index: idx })
          .eq('index', idx > index ? idx + 1 : idx);
        
        if (error) {
          console.error("Error updating tour index:", error);
        }
      });
    } catch (error) {
      console.error("Error in deleteTour:", error);
    }
  }
};

// Re-export for easy access
export { resetToDefaultTours };
