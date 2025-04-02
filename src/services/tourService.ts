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
    if (tours && tours.length > 0) {
      // Keep localStorage in sync with Supabase
      saveToursToLocalStorage(tours);
      return tours;
    }
    return getLocalTours();
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

// Add a new tour - now adds to Supabase first, then to localStorage
export const addTour = async (tour: TourPackageProps): Promise<void> => {
  // Auto-generate customUrl if not provided
  if (!tour.customUrl) {
    const tours = await getAllTours();
    tour.customUrl = generateCustomUrl(tour.title, tours);
  }
  
  // Convert any legacy transport type
  if (String(tour.transportType) === 'innova') {
    tour.transportType = 'premium';
  }

  // Set the index for the new tour
  const tours = await getAllTours();
  const tourWithIndex = {
    ...tour,
    index: tours.length
  };

  try {
    // Add to Supabase FIRST
    await addSupaTour(tourWithIndex);
    
    // Then refresh from Supabase to ensure data consistency
    await getAllTours();
  } catch (error) {
    console.error("Error adding tour to Supabase:", error);
    
    // Fallback to localStorage only if Supabase fails
    const localTours = getLocalTours();
    localTours.push(tourWithIndex);
    saveToursToLocalStorage(localTours);
  }
};

// Update an existing tour - now updates in Supabase first, then localStorage
export const updateTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  const tours = await getAllTours(); // Get latest from Supabase
  
  if (index >= 0 && index < tours.length) {
    // If title changed or customUrl is empty, regenerate it
    if ((tours[index].title !== updatedTour.title) || !updatedTour.customUrl) {
      updatedTour.customUrl = generateCustomUrl(updatedTour.title, 
        tours.filter((_, i) => i !== index)); // Exclude current tour from duplicates check
    }
    
    // Convert any legacy transport type
    if (String(updatedTour.transportType) === 'innova') {
      updatedTour.transportType = 'premium';
    }
    
    try {
      // Update in Supabase FIRST
      await updateSupaTour(index, updatedTour);
      
      // Then refresh from Supabase to ensure data consistency
      await getAllTours();
    } catch (error) {
      console.error("Error updating tour in Supabase:", error);
      
      // Fallback to localStorage only if Supabase fails
      const localTours = getLocalTours();
      localTours[index] = updatedTour;
      saveToursToLocalStorage(localTours);
    }
  }
};

// Delete a tour - now deletes from Supabase first, then localStorage
export const deleteTour = async (index: number): Promise<void> => {
  try {
    // Delete from Supabase FIRST
    await deleteSupaTour(index);
    
    // Then refresh from Supabase to ensure data consistency
    await getAllTours();
  } catch (error) {
    console.error("Error deleting tour from Supabase:", error);
    
    // Fallback to localStorage only if Supabase fails
    const localTours = getLocalTours();
    if (index >= 0 && index < localTours.length) {
      localTours.splice(index, 1);
      
      // Update indices for remaining tours
      localTours.forEach((tour, idx) => {
        tour.index = idx;
      });
      
      saveToursToLocalStorage(localTours);
    }
  }
};

// Re-export for easy access
export { resetToDefaultTours };
