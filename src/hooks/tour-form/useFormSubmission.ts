
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { addTour, updateTour } from '@/services/tourService';

export const useFormSubmission = (
  formData: TourPackageProps, 
  isEditing: boolean, 
  id: string | undefined,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title) {
      toast({
        title: "Validation Error",
        description: "Tour title is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    if (!formData.image) {
      toast({
        title: "Validation Error",
        description: "Tour image is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    if (!formData.transportType) {
      toast({
        title: "Validation Error",
        description: "Transport type is required",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    if (formData.originalPrice <= 0 || formData.discountedPrice <= 0) {
      toast({
        title: "Validation Error",
        description: "Tour prices must be greater than zero",
        variant: "destructive"
      });
      setActiveTab("basic");
      return;
    }
    
    try {
      if (isEditing && id) {
        const tourIndex = parseInt(id);
        await updateTour(tourIndex, formData);
        toast({
          description: "Tour package updated successfully",
        });
      } else {
        await addTour(formData);
        toast({
          description: "Tour package added successfully",
        });
      }
      
      // Redirect back to tours list
      navigate("/admin/tours");
    } catch (error) {
      console.error("Error saving tour:", error);
      toast({
        title: "Error",
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
    handleCancel,
  };
};
