
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { TourPackageProps } from '@/components/TourPackage';
import { getAllTourPackages } from '@/services/tourService';
import { toast } from 'sonner';

interface ToursContextType {
  tours: TourPackageProps[];
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

interface ToursProviderProps {
  children: ReactNode;
}

export const ToursProvider: React.FC<ToursProviderProps> = ({ children }) => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const toursData = await getAllTourPackages();
      setTours(toursData);
    } catch (err: any) {
      console.error('Error fetching tours:', err);
      setError(err.message || 'Failed to load tours');
      toast.error('Failed to load tour packages. Please try again later.');
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

  const value = {
    tours,
    loading,
    error,
    refreshTours
  };

  return (
    <ToursContext.Provider value={value}>
      {children}
    </ToursContext.Provider>
  );
};
