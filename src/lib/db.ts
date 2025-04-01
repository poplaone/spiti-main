
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
  
  // Transform snake_case to camelCase for frontend consistency
  const transformedData = data.map(transformPackageForFrontend);
  return transformedData;
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
  
  return transformPackageForFrontend(data);
}

export async function createTourPackage(tourPackage: TourPackageProps) {
  // Transform camelCase to snake_case for database consistency
  const dbPackage = transformPackageForDatabase(tourPackage);
  
  const { data, error } = await supabase
    .from('tour_packages')
    .insert([dbPackage])
    .select();
  
  if (error) {
    console.error('Error creating tour package:', error);
    return null;
  }
  
  return data && data.length > 0 ? transformPackageForFrontend(data[0]) : null;
}

export async function updateTourPackage(id: string, tourPackage: Partial<TourPackageProps>) {
  // Transform camelCase to snake_case for database consistency
  const dbPackage = transformPackageForDatabase(tourPackage);
  
  const { data, error } = await supabase
    .from('tour_packages')
    .update(dbPackage)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error(`Error updating tour package with id ${id}:`, error);
    return null;
  }
  
  return data && data.length > 0 ? transformPackageForFrontend(data[0]) : null;
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

// Helper function to transform database snake_case to frontend camelCase
function transformPackageForFrontend(dbPackage: any): TourPackageProps {
  if (!dbPackage) return dbPackage;
  
  return {
    id: dbPackage.id,
    title: dbPackage.title,
    image: dbPackage.image,
    originalPrice: dbPackage.original_price,
    discountedPrice: dbPackage.discounted_price,
    discount: dbPackage.discount,
    duration: dbPackage.duration,
    nightStays: dbPackage.night_stays,
    inclusions: dbPackage.inclusions || [],
    exclusions: dbPackage.exclusions || [],
    overview: dbPackage.overview,
    itinerary: dbPackage.itinerary || [],
    transportType: dbPackage.transport_type,
    isWomenOnly: dbPackage.is_women_only,
    isFixedDeparture: dbPackage.is_fixed_departure,
    isCustomizable: dbPackage.is_customizable,
    departureDates: dbPackage.departure_dates,
    index: dbPackage.index,
    created_at: dbPackage.created_at,
    updated_at: dbPackage.updated_at
  };
}

// Helper function to transform frontend camelCase to database snake_case
function transformPackageForDatabase(tourPackage: Partial<TourPackageProps>): any {
  const dbPackage: any = {};
  
  if (tourPackage.id) dbPackage.id = tourPackage.id;
  if (tourPackage.title) dbPackage.title = tourPackage.title;
  if (tourPackage.image) dbPackage.image = tourPackage.image;
  if (tourPackage.originalPrice !== undefined) dbPackage.original_price = tourPackage.originalPrice;
  if (tourPackage.discountedPrice !== undefined) dbPackage.discounted_price = tourPackage.discountedPrice;
  if (tourPackage.discount !== undefined) dbPackage.discount = tourPackage.discount;
  if (tourPackage.duration) dbPackage.duration = tourPackage.duration;
  if (tourPackage.nightStays) dbPackage.night_stays = tourPackage.nightStays;
  if (tourPackage.inclusions) dbPackage.inclusions = tourPackage.inclusions;
  if (tourPackage.exclusions) dbPackage.exclusions = tourPackage.exclusions;
  if (tourPackage.overview !== undefined) dbPackage.overview = tourPackage.overview;
  if (tourPackage.itinerary) dbPackage.itinerary = tourPackage.itinerary;
  if (tourPackage.transportType) dbPackage.transport_type = tourPackage.transportType;
  if (tourPackage.isWomenOnly !== undefined) dbPackage.is_women_only = tourPackage.isWomenOnly;
  if (tourPackage.isFixedDeparture !== undefined) dbPackage.is_fixed_departure = tourPackage.isFixedDeparture;
  if (tourPackage.isCustomizable !== undefined) dbPackage.is_customizable = tourPackage.isCustomizable;
  if (tourPackage.departureDates) dbPackage.departure_dates = tourPackage.departureDates;
  if (tourPackage.index !== undefined) dbPackage.index = tourPackage.index;
  
  return dbPackage;
}
