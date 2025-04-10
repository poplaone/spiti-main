
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
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export const useTourPackages = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updatingVisibility, setUpdatingVisibility] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
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

  const movePackage = async (id: string, direction: 'up' | 'down') => {
    try {
      setUpdatingOrder(id);
      
      // Get the current package and its order
      const currentPackage = packages.find(pkg => pkg.id === id);
      if (!currentPackage) {
        toast.error('Package not found');
        return;
      }
      
      // Sort packages by display_order, nulls last
      const sortedPackages = [...packages].sort((a, b) => {
        if (a.display_order === null && b.display_order === null) return 0;
        if (a.display_order === null) return 1;
        if (b.display_order === null) return -1;
        return a.display_order - b.display_order;
      });
      
      // Find the index of the current package in the sorted array
      const currentIndex = sortedPackages.findIndex(pkg => pkg.id === id);
      
      // Determine the target package based on the direction
      let targetIndex;
      if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      } else if (direction === 'down' && currentIndex < sortedPackages.length - 1) {
        targetIndex = currentIndex + 1;
      } else {
        // Can't move further in this direction
        toast.info(`Cannot move ${direction === 'up' ? 'up' : 'down'} any further`);
        setUpdatingOrder(null);
        return;
      }
      
      const targetPackage = sortedPackages[targetIndex];
      
      // Swap the display_order values
      const currentOrder = currentPackage.display_order ?? sortedPackages.length + 1;
      const targetOrder = targetPackage.display_order ?? sortedPackages.length + 2;
      
      // Update the current package's order
      const { error: currentError } = await supabase
        .from('tour_packages')
        .update({ display_order: targetOrder })
        .eq('id', currentPackage.id);
        
      if (currentError) throw currentError;
      
      // Update the target package's order
      const { error: targetError } = await supabase
        .from('tour_packages')
        .update({ display_order: currentOrder })
        .eq('id', targetPackage.id);
        
      if (targetError) throw targetError;
      
      // Update the local state to reflect the changes
      setPackages(prevPackages => {
        const updatedPackages = prevPackages.map(pkg => {
          if (pkg.id === currentPackage.id) {
            return { ...pkg, display_order: targetOrder };
          }
          if (pkg.id === targetPackage.id) {
            return { ...pkg, display_order: currentOrder };
          }
          return pkg;
        });
        
        // Sort the updated packages
        return [...updatedPackages].sort((a, b) => {
          if (a.display_order === null && b.display_order === null) return 0;
          if (a.display_order === null) return 1;
          if (b.display_order === null) return -1;
          return a.display_order - b.display_order;
        });
      });
      
      toast.success('Package order updated successfully');
    } catch (error: any) {
      console.error('Error updating package order:', error);
      toast.error('Failed to update package order');
    } finally {
      setUpdatingOrder(null);
    }
  };

  return {
    packages,
    loading,
    deleteLoading,
    updatingVisibility,
    fetchPackages,
    confirmDelete,
    toggleVisibility,
    movePackage
  };
};

export default useTourPackages;
