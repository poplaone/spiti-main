
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

// Get all tours - fetches from Supabase with fallback to localStorage
export const getAllTours = async (): Promise<TourPackageProps[]> => {
  try {
    console.log("Fetching all tours from Supabase...");
    // Try to fetch from Supabase first
    const tours = await getSupaTours();
    console.log(`Fetched ${tours.length} tours from Supabase`);
    
    if (tours && tours.length > 0) {
      // Keep localStorage in sync with Supabase
      saveToursToLocalStorage(tours);
      return tours;
    }
    
    console.log("No tours found in Supabase, using local storage");
    return getLocalTours();
  } catch (error) {
    console.error("Error in getAllTours:", error);
    console.log("Using local storage as fallback...");
    return getLocalTours();
  }
};

// Get a single tour by index - with Supabase and local fallback
export const getTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    // Try to fetch from Supabase first
    console.log(`Fetching tour with index ${index} from Supabase...`);
    const tour = await getSupaTourByIndex(index);
    if (tour) {
      console.log(`Tour found in Supabase:`, tour);
      return tour;
    } 
    
    console.log(`Tour not found in Supabase, falling back to local storage...`);
    return getLocalTourByIndex(index);
  } catch (error) {
    console.error("Error in getTourByIndex:", error);
    return getLocalTourByIndex(index);
  }
};

// Get a single tour by custom URL - with Supabase and local fallback
export const getTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    // Try to fetch from Supabase first
    console.log(`Fetching tour with URL ${url} from Supabase...`);
    const tour = await getSupaTourByCustomUrl(url);
    if (tour) {
      console.log(`Tour found in Supabase by URL:`, tour);
      return tour;
    }
    
    console.log(`Tour not found in Supabase by URL, falling back to local storage...`);
    return getLocalTourByCustomUrl(url);
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
    console.log('Adding tour to Supabase:', tourWithIndex);
    // Add to Supabase FIRST
    await addSupaTour(tourWithIndex);
    console.log('Tour successfully added to Supabase');
    
    // Then refresh from Supabase to ensure data consistency
    await getAllTours();
    
    return;
  } catch (error) {
    console.error("Error adding tour to Supabase:", error);
    console.log("Falling back to localStorage...");
    
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
    
    // Ensure the index field is set correctly
    updatedTour.index = index;
    
    // Convert any legacy transport type
    if (String(updatedTour.transportType) === 'innova') {
      updatedTour.transportType = 'premium';
    }
    
    try {
      console.log(`Updating tour with index ${index} in Supabase:`, updatedTour);
      // Update in Supabase FIRST
      await updateSupaTour(index, updatedTour);
      console.log('Tour successfully updated in Supabase');
      
      // Then refresh from Supabase to ensure data consistency
      await getAllTours();
      
      return;
    } catch (error) {
      console.error("Error updating tour in Supabase:", error);
      console.log("Falling back to localStorage...");
      
      // Fallback to localStorage only if Supabase fails
      const localTours = getLocalTours();
      localTours[index] = updatedTour;
      saveToursToLocalStorage(localTours);
    }
  } else {
    throw new Error(`Tour with index ${index} not found`);
  }
};

// Delete a tour - now deletes from Supabase first, then localStorage
export const deleteTour = async (index: number): Promise<void> => {
  try {
    console.log(`Deleting tour with index ${index} from Supabase...`);
    // Delete from Supabase FIRST
    await deleteSupaTour(index);
    console.log('Tour successfully deleted from Supabase');
    
    // Then refresh from Supabase to ensure data consistency
    await getAllTours();
    
    return;
  } catch (error) {
    console.error("Error deleting tour from Supabase:", error);
    console.log("Falling back to localStorage...");
    
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
