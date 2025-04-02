
import { TourPackageProps } from "@/components/TourPackage";
import { generateCustomUrl, normalizeTransportType } from './tours/tourUtils';
import { 
  getLocalTours, 
  getLocalTourByIndex, 
  getLocalTourByCustomUrl, 
  saveToursToLocalStorage, 
  resetToDefaultTours 
} from './tours/localTourService';
import { 
  getSupaTours, 
  getSupaTourByIndex, 
  getSupaTourByCustomUrl,
  addSupaTour,
  updateSupaTour,
  deleteSupaTour
} from './tours/supaTourService';

// Get all tours - now fetches from Supabase with fallback to localStorage
export const getAllTours = async (): Promise<TourPackageProps[]> => {
  try {
    // Try to fetch from Supabase first
    const tours = await getSupaTours();
    return tours && tours.length > 0 ? tours : getLocalTours();
  } catch (error) {
    console.error("Error in getAllTours:", error);
    return getLocalTours();
  }
};

// Get a single tour by index - with Supabase and local fallback
export const getTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    // Try to fetch from Supabase first
    const tour = await getSupaTourByIndex(index);
    return tour || getLocalTourByIndex(index);
  } catch (error) {
    console.error("Error in getTourByIndex:", error);
    return getLocalTourByIndex(index);
  }
};

// Get a single tour by custom URL - with Supabase and local fallback
export const getTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    // Try to fetch from Supabase first
    const tour = await getSupaTourByCustomUrl(url);
    return tour || getLocalTourByCustomUrl(url);
  } catch (error) {
    console.error("Error in getTourByCustomUrl:", error);
    return getLocalTourByCustomUrl(url);
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

  // Set the index for the new tour
  const tourWithIndex = {
    ...tour,
    index: tours.length
  };

  // First, add to localStorage for backwards compatibility
  tours.push(tourWithIndex);
  saveToursToLocalStorage(tours);

  // Then, add to Supabase
  try {
    await addSupaTour(tourWithIndex);
  } catch (error) {
    console.error("Error adding tour to Supabase:", error);
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
    saveToursToLocalStorage(tours);
    
    // Update in Supabase
    try {
      await updateSupaTour(index, updatedTour);
    } catch (error) {
      console.error("Error updating tour in Supabase:", error);
    }
  }
};

// Delete a tour - now deletes from Supabase and localStorage
export const deleteTour = async (index: number): Promise<void> => {
  const tours = getLocalTours();
  
  if (index >= 0 && index < tours.length) {
    // Delete from localStorage
    tours.splice(index, 1);
    
    // Update indices for remaining tours in localStorage
    tours.forEach((tour, idx) => {
      tour.index = idx;
    });
    
    saveToursToLocalStorage(tours);
    
    // Delete from Supabase
    try {
      await deleteSupaTour(index);
    } catch (error) {
      console.error("Error deleting tour from Supabase:", error);
    }
  }
};

// Re-export for easy access
export { resetToDefaultTours };
