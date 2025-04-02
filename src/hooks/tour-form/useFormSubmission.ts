
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { addTour, updateTour } from '@/services/tourService';
import { calculateDiscount } from './utils';

export function useFormSubmission(
  formData: TourPackageProps,
  isEditing: boolean, 
  id: string | undefined,
  setActiveTab: (tab: string) => void
) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title) {
      toast({
        description: "Title is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    if (!formData.image) {
      toast({
        description: "Tour image is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    // Calculate discount percentage
    if (formData.originalPrice > 0 && formData.discountedPrice > 0) {
      const discount = calculateDiscount(formData.originalPrice, formData.discountedPrice);
      formData.discount = discount;
    }
    
    try {
      if (isEditing && id) {
        await updateTour(parseInt(id), formData);
        toast({
          description: "Tour package updated successfully",
        });
      } else {
        await addTour(formData);
        toast({
          description: "Tour package added successfully",
        });
      }
      
      navigate("/admin/tours");
    } catch (error) {
      console.error("Error saving tour:", error);
      toast({
        description: "Failed to save tour package",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate("/admin/tours");
  };

  return {
    handleSubmit,
    handleCancel
  };
}
