
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TourPackage {
  id: string;
  title: string;
  image: string;
  original_price: number;
  discounted_price: number;
  discount: number;
  transport_type: string;
  is_women_only: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const useTourPackages = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updatingVisibility, setUpdatingVisibility] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
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

  const confirmDelete = async (id: string) => {
    try {
      setDeleteLoading(true);
      
      // First delete related records to avoid foreign key constraint errors
      // Delete night stays
      await supabase
        .from('night_stays')
        .delete()
        .eq('tour_package_id', id);
      
      // Delete inclusions
      await supabase
        .from('inclusions')
        .delete()
        .eq('tour_package_id', id);
      
      // Delete exclusions
      await supabase
        .from('exclusions')
        .delete()
        .eq('tour_package_id', id);
      
      // Delete itinerary days
      await supabase
        .from('itinerary_days')
        .delete()
        .eq('tour_package_id', id);

      // Delete departure dates
      await supabase
        .from('tour_departure_dates')
        .delete()
        .eq('tour_package_id', id);
      
      // Finally delete the tour package
      const { error } = await supabase
        .from('tour_packages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Delete the tour image from storage
      const packageData = packages.find(p => p.id === id);
      if (packageData?.image) {
        const imagePath = packageData.image.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('tour_images')
            .remove([imagePath]);
        }
      }
      
      toast.success('Tour package deleted successfully');
      setPackages(packages.filter(p => p.id !== id));
    } catch (error: any) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete tour package');
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      setUpdatingVisibility(id);
      
      const { error } = await supabase
        .from('tour_packages')
        .update({ is_visible: !currentVisibility })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the local state to reflect the change
      setPackages(packages.map(pkg => 
        pkg.id === id ? { ...pkg, is_visible: !currentVisibility } : pkg
      ));
      
      toast.success(`Tour package ${!currentVisibility ? 'visible' : 'hidden'} successfully`);
    } catch (error: any) {
      console.error('Error updating visibility:', error);
      toast.error('Failed to update tour package visibility');
    } finally {
      setUpdatingVisibility(null);
    }
  };

  return {
    packages,
    loading,
    deleteLoading,
    updatingVisibility,
    fetchPackages,
    confirmDelete,
    toggleVisibility
  };
};

export default useTourPackages;
