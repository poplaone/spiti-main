
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export const handleImageChange = (
  file: File | null,
  setImageFile: (file: File | null) => void,
  setImagePreview: (preview: string) => void
) => {
  setImageFile(file);
  
  if (file) {
    // Use URL.createObjectURL instead of FileReader for better performance
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Clean up the object URL when no longer needed
    return () => URL.revokeObjectURL(objectUrl);
  }
};

export const uploadImage = async (
  imageFile: File | null, 
  imagePreview: string, 
  isEditing: boolean
): Promise<string> => {
  if (!imageFile) {
    if (isEditing && imagePreview) {
      return imagePreview;
    }
    throw new Error('Please select an image');
  }
  
  // Optimize image before upload if it's too large
  let fileToUpload = imageFile;
  if (imageFile.size > 1000000) { // If larger than 1MB
    // We'll use the original file but in a production app
    // you might want to implement compression here
    console.log('Large image detected - consider optimization');
  }
  
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('tour_images')
    .upload(filePath, fileToUpload);
  
  if (uploadError) {
    throw uploadError;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('tour_images')
    .getPublicUrl(filePath);
  
  return publicUrl;
};
