
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

// Add a new tour - ensure all required properties are present
export const addTour = async (tour: TourPackageProps): Promise<void> => {
  console.log("Starting to add new tour:", tour.title);
  
  try {
    // Get existing tours
    const tours = getLocalTours();
    
    // Auto-generate customUrl if not provided
    if (!tour.customUrl) {
      tour.customUrl = generateCustomUrl(tour.title, tours);
      console.log("Generated custom URL:", tour.customUrl);
    }
    
    // Convert any legacy transport type
    if (String(tour.transportType) === 'innova') {
      tour.transportType = 'premium';
    }
    
    // Ensure all required fields exist
    const completeData = {
      ...tour,
      index: tours.length, // Set index to the length of the tours array
      inclusions: tour.inclusions || [],
      exclusions: tour.exclusions || [],
      itinerary: tour.itinerary || [],
      departureDates: tour.departureDates || [],
      isWomenOnly: tour.isWomenOnly || false,
      hasFixedDepartures: tour.hasFixedDepartures !== false,
      isCustomizable: tour.isCustomizable !== false
    };
    
    // Add the new tour
    tours.push(completeData);
    console.log("About to save tour to localStorage, tour count:", tours.length);
    
    // Save updated tours list
    saveToursToLocalStorage(tours);
    console.log("Tour added successfully:", completeData);
  } catch (error) {
    console.error("Error adding tour:", error);
    throw error;
  }
};

// Update an existing tour
export const updateTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  try {
    console.log("Updating tour at index:", index, updatedTour);
    const tours = getLocalTours();
    
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
      
      // Update in localStorage
      tours[index] = updatedTour;
      saveToursToLocalStorage(tours);
      console.log("Tour updated successfully:", updatedTour);
    } else {
      throw new Error(`Tour with index ${index} not found`);
    }
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
};

// Delete a tour
export const deleteTour = async (index: number): Promise<void> => {
  try {
    // Delete from localStorage
    const tours = getLocalTours();
    if (index >= 0 && index < tours.length) {
      tours.splice(index, 1);
      
      // Update indices for remaining tours
      tours.forEach((tour, idx) => {
        tour.index = idx;
      });
      
      saveToursToLocalStorage(tours);
    }
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};

// Re-export for easy access
export { resetToDefaultTours };
