
import { supabase } from '@/integrations/supabase/client';
import { TourPackageProps } from '@/components/TourPackage';

export async function getTourPackages() {
  const { data, error } = await supabase
    .from('tour_packages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching tour packages:', error);
    return null;
  }
  
  return data;
}

export async function getTourPackageById(id: string) {
  const { data, error } = await supabase
    .from('tour_packages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching tour package with id ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function createTourPackage(tourPackage: TourPackageProps) {
  const { data, error } = await supabase
    .from('tour_packages')
    .insert([tourPackage])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating tour package:', error);
    return null;
  }
  
  return data;
}

export async function updateTourPackage(id: string, tourPackage: Partial<TourPackageProps>) {
  const { data, error } = await supabase
    .from('tour_packages')
    .update(tourPackage)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating tour package with id ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function deleteTourPackage(id: string) {
  const { error } = await supabase
    .from('tour_packages')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting tour package with id ${id}:`, error);
    return false;
  }
  
  return true;
}
