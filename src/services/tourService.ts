
import { TourPackageProps, DepartureDate } from "@/components/TourPackage";
import { tourPackagesData } from '@/data/tourPackagesData';

// In a real application, these would communicate with a backend API
// For now, we'll use localStorage to persist changes

const TOURS_STORAGE_KEY = 'spiti-admin-tours';

// Generate slug from title
const generateCustomUrl = (title: string, existingTours: TourPackageProps[]): string => {
  // Convert to lowercase, replace spaces with hyphens, remove special chars
  let slug = title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  
  // Check if slug already exists
  let counter = 0;
  let uniqueSlug = slug;
  
  while (existingTours.some(tour => tour.customUrl === uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
  
  return uniqueSlug;
};

// Initialize storage with default data if not already set
const initializeStorage = () => {
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  if (!storedTours) {
    // Add default values for new fields
    const enhancedTours = tourPackagesData.map((tour, index) => ({
      ...tour,
      hasFixedDepartures: true,
      isCustomizable: true,
      availableDates: tour.availableDates || "June to October",
      exclusions: tour.exclusions || [],
      itinerary: tour.itinerary || [],
      customUrl: tour.customUrl || generateCustomUrl(tour.title, []),
      departureDates: tour.departureDates || [],
      // Convert any "innova" transport type to "premium"
      transportType: tour.transportType === "premium" ? "premium" : tour.transportType
    }));
    
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(enhancedTours));
  } else {
    // Check if we need to update "innova" to "premium" in existing tours
    try {
      const tours = JSON.parse(storedTours);
      let needsUpdate = false;
      
      const updatedTours = tours.map((tour: TourPackageProps) => {
        if (tour.transportType === "premium") {
          needsUpdate = true;
          return {
            ...tour,
            transportType: "premium"
          };
        }
        return tour;
      });
      
      if (needsUpdate) {
        localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      }
    } catch (error) {
      console.error("Error updating transport type:", error);
    }
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
  const enhancedTours = tourPackagesData.map(tour => ({
    ...tour,
    hasFixedDepartures: true,
    isCustomizable: true,
    availableDates: tour.availableDates || "June to October",
    exclusions: tour.exclusions || [],
    itinerary: tour.itinerary || [],
    customUrl: tour.customUrl || generateCustomUrl(tour.title, []),
    departureDates: tour.departureDates || [],
    transportType: tour.transportType === "premium" ? "premium" : tour.transportType
  }));
  
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(enhancedTours));
};
