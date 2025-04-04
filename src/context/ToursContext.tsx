
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllTourPackages } from '@/services/tourService';
import { TourPackageWithId } from '@/data/types/tourTypes';

interface ToursContextType {
  tours: TourPackageWithId[];
  loading: boolean;
  error: string | null;
  refreshTours: () => Promise<void>;
}

const ToursContext = createContext<ToursContextType | undefined>(undefined);

export const useToursContext = () => {
  const context = useContext(ToursContext);
  if (!context) {
    throw new Error('useToursContext must be used within a ToursProvider');
  }
  return context;
};

export const ToursProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<TourPackageWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const tourData = await getAllTourPackages();
      setTours(tourData);
    } catch (error: any) {
      console.error('Error fetching tours:', error);
      setError(error.message || 'Failed to fetch tours');
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

export default ToursProvider;
