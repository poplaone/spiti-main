
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
    // Ensure each tour has a valid index and customUrl
    tours.forEach((tour, idx) => {
      tour.index = idx;
      // Make sure customUrl is set and not empty
      if (!tour.customUrl || tour.customUrl.trim() === '') {
        tour.customUrl = tour.title.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      }
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

// Get a single tour by custom URL from localStorage with improved matching
export const getLocalTourByCustomUrl = (url: string): TourPackageProps | null => {
  try {
    const tours = getLocalTours();
    console.log(`Looking for tour with custom URL: ${url}, total tours: ${tours.length}`);
    
    if (!url) {
      console.log("URL is empty, cannot search for tour");
      return null;
    }
    
    // Debug: List all tour URLs to help diagnose issues
    console.log("Available tour URLs:");
    tours.forEach((tour, index) => {
      console.log(`Tour ${index}: ${tour.title}, URL: ${tour.customUrl || "undefined"}`);
    });
    
    // Normalize the search URL (trim and convert to lowercase)
    const normalizedSearchUrl = url.trim().toLowerCase();
    
    // Comprehensive search strategy:
    
    // 1. Try exact match (case sensitive)
    let tour = tours.find(tour => tour.customUrl === url);
    
    // 2. If not found, try case-insensitive match
    if (!tour) {
      tour = tours.find(tour => 
        tour.customUrl && tour.customUrl.toLowerCase() === normalizedSearchUrl
      );
      if (tour) console.log("Found tour through case-insensitive match");
    }
    
    // 3. Try partial match (URL might be truncated or modified)
    if (!tour) {
      tour = tours.find(tour => 
        tour.customUrl && (
          tour.customUrl.toLowerCase().includes(normalizedSearchUrl) ||
          normalizedSearchUrl.includes(tour.customUrl.toLowerCase())
        )
      );
      if (tour) console.log("Found tour through partial URL match");
    }
    
    // 4. Try to match by title
    if (!tour) {
      tour = tours.find(tour => 
        tour.title && tour.title.toLowerCase().replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .includes(normalizedSearchUrl)
      );
      if (tour) console.log("Found tour through title match");
    }
    
    if (tour) {
      console.log(`Found tour with URL ${url}:`, tour);
      return {
        ...tour,
        index: tours.findIndex(t => t.customUrl === tour.customUrl || t.index === tour.index)
      };
    }
    
    console.log(`No tour found with URL: ${url} after trying multiple matching strategies`);
    return null;
  } catch (error) {
    console.error("Error getting tour by custom URL:", error);
    return null;
  }
};

// Re-export for easy access
export { resetToDefaultTours };
