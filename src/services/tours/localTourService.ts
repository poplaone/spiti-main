
import { TourPackageProps } from "@/components/TourPackage";
import { TOURS_STORAGE_KEY } from './tourUtils';
import { initializeStorage, resetToDefaultTours } from './tourStorage';

// Get tours from localStorage
export const getLocalTours = (): TourPackageProps[] => {
  initializeStorage();
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  const tours = storedTours ? JSON.parse(storedTours) : [];
  console.log("Retrieved tours from localStorage, count:", tours.length);
  return tours;
};

// Save tours to localStorage
export const saveToursToLocalStorage = (tours: TourPackageProps[]): void => {
  try {
    // Ensure each tour has a valid index
    tours.forEach((tour, idx) => {
      tour.index = idx;
    });
    
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
    console.log("Tours saved to localStorage successfully, count:", tours.length);
  } catch (error) {
    console.error("Error saving tours to localStorage:", error);
    throw error;
  }
};

// Get a single tour by index from localStorage
export const getLocalTourByIndex = (index: number): TourPackageProps | null => {
  try {
    const tours = getLocalTours();
    console.log(`Retrieving tour at index ${index}, total tours: ${tours.length}`);
    return index >= 0 && index < tours.length ? tours[index] : null;
  } catch (error) {
    console.error("Error getting tour by index:", error);
    return null;
  }
};

// Get a single tour by custom URL from localStorage
export const getLocalTourByCustomUrl = (url: string): TourPackageProps | null => {
  try {
    const tours = getLocalTours();
    
    // Normalize URL for comparison (remove leading/trailing spaces, convert to lowercase)
    const normalizedUrl = url.trim().toLowerCase();
    
    // First try exact match
    let tour = tours.find(tour => tour.customUrl?.toLowerCase() === normalizedUrl);
    
    // If not found, try partial match (URL might contain customUrl)
    if (!tour) {
      tour = tours.find(tour => 
        tour.customUrl && normalizedUrl.includes(tour.customUrl.toLowerCase())
      );
    }
    
    // If still not found, try reverse match (customUrl might contain URL)
    if (!tour) {
      tour = tours.find(tour => 
        tour.customUrl && tour.customUrl.toLowerCase().includes(normalizedUrl)
      );
    }
    
    if (tour) {
      console.log("Found tour by custom URL:", tour.customUrl);
      return {
        ...tour,
        index: tours.findIndex(t => t.customUrl === tour.customUrl)
      };
    }
    
    console.log(`Tour with custom URL '${url}' not found`);
    return null;
  } catch (error) {
    console.error("Error getting tour by custom URL:", error);
    return null;
  }
};

// Re-export for easy access
export { resetToDefaultTours };
