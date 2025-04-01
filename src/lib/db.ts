
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { TourPackageProps } from "@/components/TourPackage";

// Define table name as a constant to avoid repetition
const TOUR_PACKAGES_TABLE = 'tour_packages';

// Function to fetch all tour packages from Supabase
export const fetchTourPackages = async (): Promise<TourPackageProps[]> => {
  try {
    const { data, error } = await supabase
      .from(TOUR_PACKAGES_TABLE)
      .select('*')
      .order('index', { ascending: true });
      
    if (error) {
      console.error('Error fetching tour packages:', error);
      return [];
    }
    
    return data.map(mapDatabaseToTourPackage);
  } catch (error) {
    console.error('Error in fetchTourPackages:', error);
    return [];
  }
};

// Function to fetch a single tour package by ID
export const fetchTourPackageById = async (id: string): Promise<TourPackageProps | null> => {
  try {
    const { data, error } = await supabase
      .from(TOUR_PACKAGES_TABLE)
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching tour package:', error);
      return null;
    }
    
    return mapDatabaseToTourPackage(data);
  } catch (error) {
    console.error('Error in fetchTourPackageById:', error);
    return null;
  }
};

// Function to create a new tour package
export const createTourPackage = async (packageData: Partial<TourPackageProps>): Promise<boolean> => {
  try {
    const dbPackage = mapTourPackageToDatabase(packageData);
    
    const { error } = await supabase
      .from(TOUR_PACKAGES_TABLE)
      .insert(dbPackage as any);
      
    if (error) {
      console.error('Error creating tour package:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in createTourPackage:', error);
    return false;
  }
};

// Function to update an existing tour package
export const updateTourPackage = async (id: string | undefined, packageData: Partial<TourPackageProps>): Promise<boolean> => {
  try {
    if (!id) return false;
    
    const dbPackage = mapTourPackageToDatabase(packageData);
    
    const { error } = await supabase
      .from(TOUR_PACKAGES_TABLE)
      .update(dbPackage as any)
      .eq('id', id);
      
    if (error) {
      console.error('Error updating tour package:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateTourPackage:', error);
    return false;
  }
};

// Function to delete a tour package
export const deleteTourPackage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(TOUR_PACKAGES_TABLE)
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting tour package:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteTourPackage:', error);
    return false;
  }
};

// Helper functions to map between database and front-end model
export const mapDatabaseToTourPackage = (dbPackage: any): TourPackageProps => {
  return {
    id: dbPackage.id || uuidv4(),
    title: dbPackage.title,
    image: dbPackage.image,
    originalPrice: dbPackage.original_price,
    discountedPrice: dbPackage.discounted_price,
    discount: dbPackage.discount,
    duration: dbPackage.duration,
    nightStays: dbPackage.night_stays,
    inclusions: dbPackage.inclusions || [],
    exclusions: dbPackage.exclusions || [],
    overview: dbPackage.overview || '',
    itinerary: dbPackage.itinerary || [],
    transportType: dbPackage.transport_type,
    isWomenOnly: dbPackage.is_women_only || false,
    isFixedDeparture: dbPackage.is_fixed_departure || false,
    isCustomizable: dbPackage.is_customizable !== false, // defaults to true
    departureDates: dbPackage.departure_dates || [],
    index: dbPackage.index || 0,
    created_at: dbPackage.created_at,
    updated_at: dbPackage.updated_at,
  };
};

export const mapTourPackageToDatabase = (tourPackage: Partial<TourPackageProps>): any => {
  return {
    id: tourPackage.id || uuidv4(),
    title: tourPackage.title,
    image: tourPackage.image,
    original_price: tourPackage.originalPrice,
    discounted_price: tourPackage.discountedPrice,
    discount: tourPackage.discount,
    duration: tourPackage.duration,
    night_stays: tourPackage.nightStays,
    inclusions: tourPackage.inclusions,
    exclusions: tourPackage.exclusions,
    overview: tourPackage.overview,
    itinerary: tourPackage.itinerary,
    transport_type: tourPackage.transportType,
    is_women_only: tourPackage.isWomenOnly,
    is_fixed_departure: tourPackage.isFixedDeparture,
    is_customizable: tourPackage.isCustomizable,
    departure_dates: tourPackage.departureDates,
    index: tourPackage.index,
  };
};
