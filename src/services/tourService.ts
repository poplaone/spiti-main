
import { TourPackageProps } from "@/components/TourPackage";
import { initializeStorage, resetToDefaultTours } from './tours/tourStorage';
import { TOURS_STORAGE_KEY, generateCustomUrl, normalizeTransportType } from './tours/tourUtils';
import { getDefaultTourValues } from './tours/tourDefaults';

// Get all tours
export const getAllTours = (): TourPackageProps[] => {
  initializeStorage();
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  return storedTours ? JSON.parse(storedTours) : [];
};

// Get a single tour by index
export const getTourByIndex = (index: number): TourPackageProps | null => {
  const tours = getAllTours();
  return tours[index] || null;
};

// Get a single tour by custom URL
export const getTourByCustomUrl = (url: string): TourPackageProps | null => {
  const tours = getAllTours();
  const tour = tours.find(tour => tour.customUrl === url);
  
  if (tour) {
    // Add index property to help with related tours
    return {
      ...tour,
      index: tours.findIndex(t => t.customUrl === url)
    };
  }
  
  return null;
};

// Add a new tour
export const addTour = (tour: TourPackageProps): void => {
  const tours = getAllTours();
  
  // Auto-generate customUrl if not provided
  if (!tour.customUrl) {
    tour.customUrl = generateCustomUrl(tour.title, tours);
  }
  
  // Convert any legacy transport type
  if (String(tour.transportType) === 'innova') {
    tour.transportType = 'premium';
  }
  
  tours.push(tour);
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
};

// Update an existing tour
export const updateTour = (index: number, updatedTour: TourPackageProps): void => {
  const tours = getAllTours();
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
    
    tours[index] = updatedTour;
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
  }
};

// Delete a tour
export const deleteTour = (index: number): void => {
  const tours = getAllTours();
  if (index >= 0 && index < tours.length) {
    tours.splice(index, 1);
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
  }
};

// Re-export for easy access
export { resetToDefaultTours };
