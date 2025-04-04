
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export const handleImageChange = (
  file: File | null,
  setImageFile: (file: File | null) => void,
  setImagePreview: (preview: string) => void
) => {
  setImageFile(file);
  
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
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
  
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('tour_images')
    .upload(filePath, imageFile);
  
  if (uploadError) {
    throw uploadError;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('tour_images')
    .getPublicUrl(filePath);
  
  return publicUrl;
};
