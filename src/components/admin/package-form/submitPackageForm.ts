import { supabase } from "@/integrations/supabase/client";
import { TourPackageFormData, NightStay, Inclusion, Exclusion, ItineraryDay } from "./types";
import { uploadImage } from "./imageHandler";
import { toast } from "sonner";

export const submitPackageForm = async (
  formData: TourPackageFormData,
  imageFile: File | null,
  packageId?: string,
  isEditing: boolean = false
): Promise<boolean> => {
  try {
    if (!formData.title) throw new Error('Title is required');
    if (!formData.originalPrice) throw new Error('Original price is required');
    if (!formData.discountedPrice) throw new Error('Discounted price is required');
    if (!formData.durationNights) throw new Error('Duration nights is required');
    if (!formData.durationDays) throw new Error('Duration days is required');
    if (!formData.transportType) throw new Error('Transport type is required');
    
    const origPrice = parseFloat(formData.originalPrice);
    const discPrice = parseFloat(formData.discountedPrice);
    const discount = Math.round(((origPrice - discPrice) / origPrice) * 100);
    
    let imageUrl = '';
    try {
      imageUrl = await uploadImage(imageFile, formData.imagePreview, isEditing);
    } catch (imageError: any) {
      if (!isEditing || !formData.imagePreview) {
        throw new Error(`Image upload failed: ${imageError.message}`);
      } else {
        imageUrl = formData.imagePreview;
      }
    }
    
    // Prepare overview details as JSON string
    const overviewDetails = JSON.stringify({
      accommodation: formData.accommodation,
      bestTime: formData.bestTime,
      groupSize: formData.groupSize,
      terrain: formData.terrain,
      elevation: formData.elevation,
      availableFrom: formData.availableFrom,
      availableTo: formData.availableTo
    });
    
    let tourPackageId = packageId;
    
    if (isEditing && packageId) {
      const { error: updateError } = await supabase
        .from('tour_packages')
        .update({
          title: formData.title,
          image: imageUrl,
          original_price: origPrice,
          discounted_price: discPrice,
          discount,
          duration_nights: parseInt(formData.durationNights),
          duration_days: parseInt(formData.durationDays),
          transport_type: formData.transportType,
          is_women_only: formData.isWomenOnly,
          is_fixed_departure: formData.isFixedDeparture,
          is_customizable: formData.isCustomizable,
          overview: formData.overview,
          overview_details: overviewDetails
        })
        .eq('id', packageId);
      
      if (updateError) throw updateError;
    } else {
      const { data: newPackage, error: insertError } = await supabase
        .from('tour_packages')
        .insert({
          title: formData.title,
          image: imageUrl,
          original_price: origPrice,
          discounted_price: discPrice,
          discount,
          duration_nights: parseInt(formData.durationNights),
          duration_days: parseInt(formData.durationDays),
          transport_type: formData.transportType,
          is_women_only: formData.isWomenOnly,
          is_fixed_departure: formData.isFixedDeparture,
          is_customizable: formData.isCustomizable,
          overview: formData.overview,
          overview_details: overviewDetails
        })
        .select('id')
        .single();
      
      if (insertError) throw insertError;
      tourPackageId = newPackage?.id;
      
      if (!tourPackageId) throw new Error('Failed to get tour package ID');
    }
    
    // Handle related data (night stays, inclusions, exclusions, itinerary)
    await saveRelatedData(tourPackageId, formData, isEditing);
    
    return true;
  } catch (error: any) {
    throw error;
  }
};

const saveRelatedData = async (
  tourPackageId: string, 
  formData: TourPackageFormData, 
  isEditing: boolean
): Promise<void> => {
  // Handle night stays
  if (isEditing) {
    await supabase
      .from('night_stays')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (formData.nightStays.length > 0) {
    const { error: nightStaysError } = await supabase
      .from('night_stays')
      .insert(
        formData.nightStays.map(stay => ({
          tour_package_id: tourPackageId,
          location: stay.location,
          nights: stay.nights
        }))
      );
    
    if (nightStaysError) throw nightStaysError;
  }
  
  // Handle inclusions
  if (isEditing) {
    await supabase
      .from('inclusions')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (formData.inclusions.length > 0) {
    const { error: inclusionsError } = await supabase
      .from('inclusions')
      .insert(
        formData.inclusions.map(item => ({
          tour_package_id: tourPackageId,
          description: item.description
        }))
      );
    
    if (inclusionsError) throw inclusionsError;
  }
  
  // Handle exclusions
  if (isEditing) {
    await supabase
      .from('exclusions')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (formData.exclusions.length > 0) {
    const { error: exclusionsError } = await supabase
      .from('exclusions')
      .insert(
        formData.exclusions.map(item => ({
          tour_package_id: tourPackageId,
          description: item.description
        }))
      );
    
    if (exclusionsError) throw exclusionsError;
  }
  
  // Handle itinerary
  if (isEditing) {
    await supabase
      .from('itinerary_days')
      .delete()
      .eq('tour_package_id', tourPackageId);
  }
  
  if (formData.itineraryDays.length > 0) {
    const { error: itineraryError } = await supabase
      .from('itinerary_days')
      .insert(
        formData.itineraryDays.map(day => ({
          tour_package_id: tourPackageId,
          day_number: day.day_number,
          title: day.title,
          description: day.description
        }))
      );
    
    if (itineraryError) throw itineraryError;
  }
};
