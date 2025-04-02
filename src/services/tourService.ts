
import { TourPackageProps } from "@/components/TourPackage";
import { generateCustomUrl, normalizeTransportType } from './tours/tourUtils';
import { 
  getLocalTours, 
  getLocalTourByIndex, 
  getLocalTourByCustomUrl, 
  saveToursToLocalStorage, 
  resetToDefaultTours 
} from './tours/localTourService';

// Get all tours - fetches from localStorage
export const getAllTours = async (): Promise<TourPackageProps[]> => {
  try {
    return getLocalTours();
  } catch (error) {
    console.error("Error in getAllTours:", error);
    return [];
  }
};

// Get a single tour by index
export const getTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    return getLocalTourByIndex(index);
  } catch (error) {
    console.error("Error in getTourByIndex:", error);
    return null;
  }
};

// Get a single tour by custom URL
export const getTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    return getLocalTourByCustomUrl(url);
  } catch (error) {
    console.error("Error in getTourByCustomUrl:", error);
    return null;
  }
};

// Add a new tour
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
    // Save to localStorage
    const localTours = getLocalTours();
    localTours.push(tourWithIndex);
    saveToursToLocalStorage(localTours);
  } catch (error) {
    console.error("Error adding tour:", error);
    throw error;
  }
};

// Update an existing tour
export const updateTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  const tours = await getAllTours();
  
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
      // Update in localStorage
      const localTours = getLocalTours();
      localTours[index] = updatedTour;
      saveToursToLocalStorage(localTours);
    } catch (error) {
      console.error("Error updating tour:", error);
      throw error;
    }
  } else {
    throw new Error(`Tour with index ${index} not found`);
  }
};

// Delete a tour
export const deleteTour = async (index: number): Promise<void> => {
  try {
    // Delete from localStorage
    const localTours = getLocalTours();
    if (index >= 0 && index < localTours.length) {
      localTours.splice(index, 1);
      
      // Update indices for remaining tours
      localTours.forEach((tour, idx) => {
        tour.index = idx;
      });
      
      saveToursToLocalStorage(localTours);
    }
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};

// Re-export for easy access
export { resetToDefaultTours };
