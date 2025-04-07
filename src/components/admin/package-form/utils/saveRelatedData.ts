
import { supabase } from "@/integrations/supabase/client";
import { TourPackageFormData, NightStay, Inclusion, Exclusion, ItineraryDay } from "../types";

export const saveRelatedData = async (
  tourPackageId: string, 
  formData: TourPackageFormData, 
  isEditing: boolean
): Promise<void> => {
  await Promise.all([
    saveNightStays(tourPackageId, formData.nightStays, isEditing),
    saveInclusions(tourPackageId, formData.inclusions, isEditing),
    saveExclusions(tourPackageId, formData.exclusions, isEditing),
    saveItinerary(tourPackageId, formData.itineraryDays, isEditing)
  ]);
};

const saveNightStays = async (
  tourPackageId: string,
  nightStays: NightStay[],
  isEditing: boolean
): Promise<void> => {
  if (isEditing) {
    await supabase
      .from('night_stays')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (nightStays.length > 0) {
    // Ensure night stays have order values
    const nightStaysWithOrder = nightStays.map((stay, index) => ({
      tour_package_id: tourPackageId,
      location: stay.location,
      nights: stay.nights,
      order: stay.order || index + 1 // Use existing order or fallback to index-based order
    }));
    
    const { error: nightStaysError } = await supabase
      .from('night_stays')
      .insert(nightStaysWithOrder);
    
    if (nightStaysError) throw nightStaysError;
  }
};

const saveInclusions = async (
  tourPackageId: string,
  inclusions: Inclusion[],
  isEditing: boolean
): Promise<void> => {
  if (isEditing) {
    await supabase
      .from('inclusions')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (inclusions.length > 0) {
    const { error: inclusionsError } = await supabase
      .from('inclusions')
      .insert(
        inclusions.map(item => ({
          tour_package_id: tourPackageId,
          description: item.description
        }))
      );
    
    if (inclusionsError) throw inclusionsError;
  }
};

const saveExclusions = async (
  tourPackageId: string,
  exclusions: Exclusion[],
  isEditing: boolean
): Promise<void> => {
  if (isEditing) {
    await supabase
      .from('exclusions')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (exclusions.length > 0) {
    const { error: exclusionsError } = await supabase
      .from('exclusions')
      .insert(
        exclusions.map(item => ({
          tour_package_id: tourPackageId,
          description: item.description
        }))
      );
    
    if (exclusionsError) throw exclusionsError;
  }
};

const saveItinerary = async (
  tourPackageId: string,
  itineraryDays: ItineraryDay[],
  isEditing: boolean
): Promise<void> => {
  if (isEditing) {
    await supabase
      .from('itinerary_days')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (itineraryDays.length > 0) {
    const { error: itineraryError } = await supabase
      .from('itinerary_days')
      .insert(
        itineraryDays.map(day => ({
          tour_package_id: tourPackageId,
          day_number: day.day_number,
          title: day.title,
          description: day.description
        }))
      );
    
    if (itineraryError) throw itineraryError;
  }
};
