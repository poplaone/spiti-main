
import { TourPackageProps } from "@/components/TourPackage";
import { TOURS_STORAGE_KEY } from './tourUtils';
import { initializeStorage, resetToDefaultTours } from './tourStorage';

// Get tours from localStorage
export const getLocalTours = (): TourPackageProps[] => {
  initializeStorage();
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  return storedTours ? JSON.parse(storedTours) : [];
};

// Save tours to localStorage
export const saveToursToLocalStorage = (tours: TourPackageProps[]): void => {
  try {
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
    console.log("Tours saved to localStorage successfully, count:", tours.length);
  } catch (error) {
    console.error("Error saving tours to localStorage:", error);
    throw error;
  }
};

// Get a single tour by index from localStorage
export const getLocalTourByIndex = (index: number): TourPackageProps | null => {
  const tours = getLocalTours();
  return index >= 0 && index < tours.length ? tours[index] : null;
};

// Get a single tour by custom URL from localStorage
export const getLocalTourByCustomUrl = (url: string): TourPackageProps | null => {
  const tours = getLocalTours();
  const tour = tours.find(tour => tour.customUrl === url);
  if (tour) {
    return {
      ...tour,
      index: tours.findIndex(t => t.customUrl === url)
    };
  }
  return null;
};

// Re-export for easy access
export { resetToDefaultTours };
