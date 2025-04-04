
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { TourPackageProps } from '@/data/types/tourTypes';
import { mapDbTourToFrontend } from '@/services/tourService';
import { tourPackagesData } from '@/data/tourPackagesData'; // Import the original data

interface ToursContextProps {
  tours: TourPackageProps[];
  loading: boolean;
  error: string | null;
  refreshTours: () => Promise<void>;
}

const ToursContext = createContext<ToursContextProps | undefined>(undefined);

export const ToursProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<TourPackageProps[]>(tourPackagesData); // Initialize with original data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch tours from Supabase
      const { data: dbTours, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('title');
      
      if (error) {
        throw error;
      }
      
      // If there are tours in Supabase, map them to frontend format
      if (dbTours && dbTours.length > 0) {
        const tourPromises = dbTours.map(async (dbTour) => {
          return await mapDbTourToFrontend(dbTour);
        });
        
        const mappedTours = await Promise.all(tourPromises);
        setTours(mappedTours);
      } else {
        // If no tours in Supabase, use the original data
        setTours(tourPackagesData);
      }
      
    } catch (err: any) {
      console.error("Error fetching tours:", err);
      setError("Failed to load tour packages. Please try again later.");
      // Fall back to original data on error
      setTours(tourPackagesData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const refreshTours = async () => {
    await fetchTours();
  };

  return (
    <ToursContext.Provider value={{ tours, loading, error, refreshTours }}>
      {children}
    </ToursContext.Provider>
  );
};

export const useToursContext = (): ToursContextProps => {
  const context = useContext(ToursContext);
  if (context === undefined) {
    throw new Error("useToursContext must be used within a ToursProvider");
  }
  return context;
};
