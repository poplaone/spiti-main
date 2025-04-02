
import { TourPackageProps } from "@/components/TourPackage";
import { supabase } from "@/integrations/supabase/client";
import { mapSupabaseTourToProps, mapTourPropsToSupabase } from "./tourMappers";
import { v4 as uuidv4 } from "uuid";

// Get all tours from Supabase
export const getSupaTours = async (): Promise<TourPackageProps[]> => {
  try {
    console.log("Fetching all tours from Supabase...");
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('index', { ascending: true });

    if (error) {
      console.error("Error fetching from Supabase:", error);
      throw error;
    }

    if (data && data.length > 0) {
      console.log(`Found ${data.length} tours in Supabase`);
      // Transform the Supabase data to match our TourPackageProps format
      const mappedTours = data.map(tour => mapSupabaseTourToProps(tour));
      console.log("First mapped tour:", mappedTours[0]);
      return mappedTours;
    }
    
    console.log("No tours found in Supabase");
    return [];
  } catch (error) {
    console.error("Error in getSupaTours:", error);
    throw error;
  }
};

// Get a single tour by index from Supabase
export const getSupaTourByIndex = async (index: number): Promise<TourPackageProps | null> => {
  try {
    console.log(`Looking up tour with index ${index} in Supabase...`);
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('index', index)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("Error fetching tour by index from Supabase:", error);
      throw error;
    }

    if (data) {
      console.log(`Found tour with index ${index} in Supabase`);
      return mapSupabaseTourToProps(data);
    }
    
    console.log(`No tour with index ${index} found in Supabase`);
    return null;
  } catch (error) {
    console.error("Error in getSupaTourByIndex:", error);
    throw error;
  }
};

// Get a single tour by custom URL from Supabase
export const getSupaTourByCustomUrl = async (url: string): Promise<TourPackageProps | null> => {
  try {
    console.log(`Looking up tour with custom URL '${url}' in Supabase...`);
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('custom_url', url)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("Error fetching tour by custom URL from Supabase:", error);
      throw error;
    }

    if (data) {
      console.log(`Found tour with custom URL '${url}' in Supabase`);
      return mapSupabaseTourToProps(data);
    }
    
    console.log(`No tour with custom URL '${url}' found in Supabase`);
    return null;
  } catch (error) {
    console.error("Error in getSupaTourByCustomUrl:", error);
    throw error;
  }
};

// Add a new tour to Supabase
export const addSupaTour = async (tour: TourPackageProps): Promise<void> => {
  try {
    console.log('Converting tour data for Supabase...');
    const tourData = mapTourPropsToSupabase(tour);
    
    // Create a new tour object that matches Supabase's schema
    console.log('Adding tour to Supabase with index:', tour.index);
    const { data, error } = await supabase
      .from('tour_packages')
      .insert({
        ...tourData,
        id: uuidv4(),
        index: tour.index,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error("Error adding tour to Supabase:", error);
      throw error;
    }
    
    console.log('Tour added successfully to Supabase');
  } catch (error) {
    console.error("Error in addSupaTour:", error);
    throw error;
  }
};

// Update an existing tour in Supabase
export const updateSupaTour = async (index: number, updatedTour: TourPackageProps): Promise<void> => {
  try {
    console.log(`Converting tour at index ${index} for Supabase update...`);
    const tourData = mapTourPropsToSupabase(updatedTour);
    // Remove this line since updated_at is now included in mapTourPropsToSupabase
    // tourData.updated_at = new Date().toISOString();
    
    // First, try to find the existing record by index
    console.log(`Looking up existing tour with index ${index}...`);
    const { data: findResult } = await supabase
      .from('tour_packages')
      .select('id')
      .eq('index', index)
      .maybeSingle();
    
    if (findResult?.id) {
      // If found, update the record
      console.log(`Found tour with ID ${findResult.id}, updating...`);
      const { error } = await supabase
        .from('tour_packages')
        .update(tourData)
        .eq('id', findResult.id);
      
      if (error) {
        console.error("Error updating tour in Supabase:", error);
        throw error;
      }
      
      console.log('Tour updated successfully in Supabase');
    } else {
      // If not found, insert as a new record
      console.log(`No tour with index ${index} found, inserting as new...`);
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
    console.log(`Deleting tour with index ${index} from Supabase...`);
    const { error } = await supabase
      .from('tour_packages')
      .delete()
      .eq('index', index);
    
    if (error) {
      console.error("Error deleting tour from Supabase:", error);
      throw error;
    }
    
    console.log(`Tour with index ${index} deleted successfully`);
    
    // Update indices for remaining tours
    console.log('Updating indices for remaining tours...');
    const { data: remainingTours } = await supabase
      .from('tour_packages')
      .select('id, index')
      .order('index', { ascending: true });
    
    if (remainingTours) {
      console.log(`Found ${remainingTours.length} remaining tours to reindex`);
      
      // Update each tour with its new index
      for (let i = 0; i < remainingTours.length; i++) {
        const tour = remainingTours[i];
        if (tour.index !== i) {
          console.log(`Updating tour ID ${tour.id} index from ${tour.index} to ${i}`);
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
