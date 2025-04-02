
import { TourPackageProps } from "@/components/TourPackage";
import { supabase } from "@/integrations/supabase/client";
import { mapSupabaseTourToProps, mapTourPropsToSupabase } from "./tourMappers";
import { v4 as uuidv4 } from "uuid";

// Get all tours from Supabase
export const getSupaTours = async (): Promise<TourPackageProps[]> => {
  try {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('index', { ascending: true });

    if (error) {
      console.error("Error fetching from Supabase:", error);
      throw error;
    }

    if (data && data.length > 0) {
      // Transform the Supabase data to match our TourPackageProps format
      return data.map(tour => mapSupabaseTourToProps(tour));
    }
    
    return [];
  } catch (error) {
    console.error("Error in getSupaTours:", error);
    throw error;
  }
};

// Get a single tour by index from Supabase
export const getSupaTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('index', index)
      .single();

    if (error) {
      console.error("Error fetching tour by index from Supabase:", error);
      throw error;
    }

    if (data) {
      return mapSupabaseTourToProps(data);
    }
    
    return null;
  } catch (error) {
    console.error("Error in getSupaTourByIndex:", error);
    throw error;
  }
};

// Get a single tour by custom URL from Supabase
export const getSupaTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('custom_url', url)
      .single();

    if (error) {
      console.error("Error fetching tour by custom URL from Supabase:", error);
      throw error;
    }

    if (data) {
      return mapSupabaseTourToProps(data);
    }
    
    return null;
  } catch (error) {
    console.error("Error in getSupaTourByCustomUrl:", error);
    throw error;
  }
};

// Add a new tour to Supabase
export const addSupaTour = async (tour: TourPackageProps): Promise<void> => {
  try {
    const tourData = mapTourPropsToSupabase(tour);
    
    // Create a new tour object that matches Supabase's schema
    const { error } = await supabase
      .from('tour_packages')
      .insert({
        ...tourData,
        id: uuidv4(),
        index: tour.index
      });
    
    if (error) {
      console.error("Error adding tour to Supabase:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in addSupaTour:", error);
    throw error;
  }
};

// Update an existing tour in Supabase
export const updateSupaTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  try {
    const tourData = mapTourPropsToSupabase(updatedTour);
    
    // First, try to find the existing record by index
    const { data } = await supabase
      .from('tour_packages')
      .select('id')
      .eq('index', index)
      .single();
    
    if (data?.id) {
      // If found, update the record
      const { error } = await supabase
        .from('tour_packages')
        .update(tourData)
        .eq('id', data.id);
      
      if (error) {
        console.error("Error updating tour in Supabase:", error);
        throw error;
      }
    } else {
      // If not found, insert as a new record
      await addSupaTour({
        ...updatedTour,
        index: index
      });
    }
  } catch (error) {
    console.error("Error in updateSupaTour:", error);
    throw error;
  }
};

// Delete a tour from Supabase
export const deleteSupaTour = async (index: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('tour_packages')
      .delete()
      .eq('index', index);
    
    if (error) {
      console.error("Error deleting tour from Supabase:", error);
      throw error;
    }
    
    // Update indices for remaining tours
    const { data: remainingTours } = await supabase
      .from('tour_packages')
      .select('id, index')
      .order('index', { ascending: true });
    
    if (remainingTours) {
      for (let i = 0; i < remainingTours.length; i++) {
        const tour = remainingTours[i];
        if (tour.index !== i) {
          const { error } = await supabase
            .from('tour_packages')
            .update({ index: i })
            .eq('id', tour.id);
          
          if (error) {
            console.error("Error updating tour index:", error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in deleteSupaTour:", error);
    throw error;
  }
};
