
import { useState, useEffect } from 'react';
import { TourPackageProps } from '@/components/TourPackage';
import { fetchTourPackages } from '@/lib/db';
import { tourPackagesData as fallbackData } from '@/data/tourPackagesData';
import { useToast } from '@/hooks/use-toast';

export const useTourPackages = () => {
  const [packages, setPackages] = useState<TourPackageProps[]>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTourPackages();
        // If we successfully got data from the database, use it
        if (data && data.length > 0) {
          setPackages(data);
        }
      } catch (error) {
        console.error('Error loading tour packages:', error);
        toast({
          title: "Data loading error",
          description: "Using fallback tour data. Please refresh to try again.",
          variant: "destructive"
        });
        // Fallback to static data if the API call fails
        setPackages(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, [toast]);

  return { packages, isLoading };
};
