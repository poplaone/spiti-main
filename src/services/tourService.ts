
import { TourPackageProps, DepartureDate } from "@/components/TourPackage";
import { tourPackagesData } from '@/data/tourPackagesData';
import { TransportType } from "@/hooks/tour-form/types";
import { TourTransportType } from "@/data/types/tourTypes";

// In a real application, these would communicate with a backend API
// For now, we'll use localStorage to persist changes

const TOURS_STORAGE_KEY = 'spiti-admin-tours';

// Convert legacy transport types to supported types
const normalizeTransportType = (transportType: string): TourTransportType => {
  if (transportType === 'innova') {
    return 'premium';
  }
  return transportType as TourTransportType;
};

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
      // New fields
      bestTime: tour.bestTime || "June to September",
      groupSize: tour.groupSize || "2-10 People",
      terrain: tour.terrain || "Himalayan Mountain Passes",
      elevation: tour.elevation || "2,000 - 4,550 meters",
      accommodationType: tour.accommodationType || "Hotels & Homestays",
      // Convert any legacy transport type
      transportType: normalizeTransportType(tour.transportType)
    }));
    
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(enhancedTours));
  } else {
    // Check if we need to update existing tours with new fields
    try {
      const tours = JSON.parse(storedTours);
      let needsUpdate = false;
      
      const updatedTours = tours.map((tour: TourPackageProps) => {
        const updates: Partial<TourPackageProps> = {};
        
        // Check for missing fields and add if needed
        if (tour.bestTime === undefined) {
          updates.bestTime = "June to September";
          needsUpdate = true;
        }
        
        if (tour.groupSize === undefined) {
          updates.groupSize = "2-10 People";
          needsUpdate = true;
        }
        
        if (tour.terrain === undefined) {
          updates.terrain = "Himalayan Mountain Passes";
          needsUpdate = true;
        }
        
        if (tour.elevation === undefined) {
          updates.elevation = "2,000 - 4,550 meters";
          needsUpdate = true;
        }
        
        if (tour.accommodationType === undefined) {
          updates.accommodationType = "Hotels & Homestays";
          needsUpdate = true;
        }
        
        // Fix legacy transport types
        const currentTransportType = String(tour.transportType);
        if (currentTransportType === 'innova') {
          updates.transportType = 'premium' as TourTransportType;
          needsUpdate = true;
        }
        
        return needsUpdate ? { ...tour, ...updates } : tour;
      });
      
      if (needsUpdate) {
        localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      }
    } catch (error) {
      console.error("Error updating tour data:", error);
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
  
  // Convert any legacy transport type
  if (String(tour.transportType) === 'innova') {
    tour.transportType = 'premium' as TourTransportType;
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
      updatedTour.transportType = 'premium' as TourTransportType;
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

// Reset to default tours
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
    // New fields with default values
    bestTime: tour.bestTime || "June to September",
    groupSize: tour.groupSize || "2-10 People",
    terrain: tour.terrain || "Himalayan Mountain Passes",
    elevation: tour.elevation || "2,000 - 4,550 meters",
    accommodationType: tour.accommodationType || "Hotels & Homestays",
    transportType: normalizeTransportType(String(tour.transportType))
  }));
  
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(enhancedTours));
};
