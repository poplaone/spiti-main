
import { TourPackageProps } from '@/components/TourPackage';
import { tourPackagesData } from '@/data/tourPackagesData';
import { TOURS_STORAGE_KEY } from './tourUtils';
import { getDefaultTourValues } from './tourDefaults';

// Initialize storage with default data if not already set
export const initializeStorage = (): void => {
  const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);
  if (!storedTours) {
    // Add default values for new fields
    const enhancedTours = tourPackagesData.map((tour, index) => 
      getDefaultTourValues(tour, tourPackagesData.slice(0, index))
    );
    
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
          updates.transportType = 'premium';
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

// Reset to default tours
export const resetToDefaultTours = (): void => {
  const enhancedTours = tourPackagesData.map((tour, index) => 
    getDefaultTourValues(tour, tourPackagesData.slice(0, index))
  );
  
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(enhancedTours));
};
