
import { TourPackageProps } from "@/components/TourPackage";
import { tourPackagesData } from '@/data/tourPackagesData';

// In a real application, these would communicate with a backend API
// For now, we'll use localStorage to persist changes

const TOURS_STORAGE_KEY = 'spiti-admin-tours';

// Initialize storage with default data if not already set
const initializeStorage = () => {
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  if (!storedTours) {
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tourPackagesData));
  }
};

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

// Add a new tour
export const addTour = (tour: TourPackageProps): void => {
  const tours = getAllTours();
  tours.push(tour);
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
};

// Update an existing tour
export const updateTour = (index: number, updatedTour: TourPackageProps): void => {
  const tours = getAllTours();
  if (index >= 0 && index < tours.length) {
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

// Reset to default data (useful for testing or reset functionality)
export const resetToDefaultTours = (): void => {
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tourPackagesData));
};
