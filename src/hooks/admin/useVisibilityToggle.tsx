
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TourPackage } from './types';

export const useVisibilityToggle = (
  packages: TourPackage[],
  setPackages: (packages: TourPackage[]) => void
) => {
  const [updatingVisibility, setUpdatingVisibility] = useState<string | null>(null);

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
    updatingVisibility,
    toggleVisibility
  };
};

export default useVisibilityToggle;
