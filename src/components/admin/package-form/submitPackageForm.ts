
import { supabase } from "@/integrations/supabase/client";
import { TourPackageFormData } from "./types";
import { uploadImage } from "./imageHandler";
import { toast } from "sonner";
import { validateForm, calculateDiscount } from "./utils/validateForm";
import { prepareTourPackageData } from "./utils/preparePackageData";
import { saveRelatedData } from "./utils/saveRelatedData";

export const submitPackageForm = async (
  formData: TourPackageFormData,
  imageFile: File | null,
  packageId?: string,
  isEditing: boolean = false
): Promise<boolean> => {
  try {
    // Validate the form data
    validateForm(formData);
    
    // Calculate discount
    const discount = calculateDiscount(formData.originalPrice, formData.discountedPrice);
    
    // Handle image upload
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
    
    let tourPackageId = packageId;
    
    // Prepare the data for the tour package
    const packageData = prepareTourPackageData(formData, imageUrl, discount);
    
    // Update or create the tour package
    if (isEditing && packageId) {
      const { error: updateError } = await supabase
        .from('tour_packages')
        .update(packageData)
        .eq('id', packageId);
      
      if (updateError) throw updateError;
      
      console.log(`Updated tour package with ID ${packageId}:`, {
        isFixedDeparture: formData.isFixedDeparture,
        isCustomizable: formData.isCustomizable,
        customSlug: formData.customSlug
      });
    } else {
      const { data: newPackage, error: insertError } = await supabase
        .from('tour_packages')
        .insert(packageData)
        .select('id')
        .single();
      
      if (insertError) throw insertError;
      tourPackageId = newPackage?.id;
      
      console.log(`Created new tour package with ID ${tourPackageId}:`, {
        isFixedDeparture: formData.isFixedDeparture,
        isCustomizable: formData.isCustomizable,
        customSlug: formData.customSlug
      });
      
      if (!tourPackageId) throw new Error('Failed to get tour package ID');
    }
    
    // Save related data (night stays, inclusions, exclusions, itinerary)
    await saveRelatedData(tourPackageId, formData, isEditing);
    
    return true;
  } catch (error: any) {
    throw error;
  }
};
