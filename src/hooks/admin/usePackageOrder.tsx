
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TourPackage } from './types';

export const usePackageOrder = (
  packages: TourPackage[],
  setPackages: (packages: TourPackage[]) => void,
  fetchPackages: () => Promise<void>
) => {
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const updateDisplayOrder = async (id: string, newOrder: number) => {
    try {
      setUpdatingOrder(id);
      
      const { error } = await supabase
        .from('tour_packages')
        .update({ display_order: newOrder })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the local state to reflect the change
      setPackages(packages.map(pkg => 
        pkg.id === id ? { ...pkg, display_order: newOrder } : pkg
      ));
      
      toast.success('Tour package order updated successfully');
    } catch (error: any) {
      console.error('Error updating display order:', error);
      toast.error('Failed to update tour package order');
    } finally {
      setUpdatingOrder(null);
    }
  };

  // Function to move package up in order
  const movePackageUp = async (index: number) => {
    if (index <= 0) return; // Already at the top
    
    const currentPackage = packages[index];
    const previousPackage = packages[index - 1];
    
    // Swap the display_order values
    if (currentPackage && previousPackage) {
      try {
        setUpdatingOrder(currentPackage.id);
        const tempOrder = previousPackage.display_order;
        await updateDisplayOrder(currentPackage.id, tempOrder || 0);
        await updateDisplayOrder(previousPackage.id, currentPackage.display_order || 0);
        
        // Refresh the list
        await fetchPackages();
      } finally {
        setUpdatingOrder(null);
      }
    }
  };
  
  // Function to move package down in order
  const movePackageDown = async (index: number) => {
    if (index >= packages.length - 1) return; // Already at the bottom
    
    const currentPackage = packages[index];
    const nextPackage = packages[index + 1];
    
    // Swap the display_order values
    if (currentPackage && nextPackage) {
      try {
        setUpdatingOrder(currentPackage.id);
        const tempOrder = nextPackage.display_order;
        await updateDisplayOrder(currentPackage.id, tempOrder || 0);
        await updateDisplayOrder(nextPackage.id, currentPackage.display_order || 0);
        
        // Refresh the list
        await fetchPackages();
      } finally {
        setUpdatingOrder(null);
      }
    }
  };

  return {
    updatingOrder,
    updateDisplayOrder,
    movePackageUp,
    movePackageDown
  };
};

export default usePackageOrder;
