
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TourPackage } from './types';

export const usePackageFetch = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      // Query packages ordered by display_order first, then by title
      // Use nullsFirst: false to ensure null values appear last
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('title');
      
      if (error) throw error;
      setPackages(data || []);
    } catch (error: any) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load tour packages');
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    setPackages,
    loading,
    fetchPackages
  };
};

export default usePackageFetch;
