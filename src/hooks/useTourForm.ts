
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TourPackageProps } from "@/components/TourPackage";
import { getTourByIndex } from '@/services/tourService';
import { getEmptyTourData } from './tour-form/utils';
import { useFormHandlers } from './tour-form/useFormHandlers';
import { useFormSubmission } from './tour-form/useFormSubmission';
import { useToast } from "@/components/ui/use-toast";

export function useTourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<TourPackageProps>(getEmptyTourData());
  const [loading, setLoading] = useState(isEditing);
  
  // Load tour data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchTourData = async () => {
        setLoading(true);
        try {
          const tourIndex = parseInt(id);
          const fetchedTour = await getTourByIndex(tourIndex);
          
          if (fetchedTour) {
            console.log("Fetched tour for editing:", fetchedTour);
            // Deep clone to avoid modifying original data
            setFormData({
              ...JSON.parse(JSON.stringify(fetchedTour)),
              hasFixedDepartures: fetchedTour.hasFixedDepartures !== false,
              isCustomizable: fetchedTour.isCustomizable !== false,
              availableDates: fetchedTour.availableDates || "June to October",
              exclusions: fetchedTour.exclusions || [],
              itinerary: fetchedTour.itinerary || [],
              customUrl: fetchedTour.customUrl || "",
              departureDates: fetchedTour.departureDates || [],
              bestTime: fetchedTour.bestTime || "June to September",
              groupSize: fetchedTour.groupSize || "2-10 People",
              terrain: fetchedTour.terrain || "Himalayan Mountain Passes",
              elevation: fetchedTour.elevation || "2,000 - 4,550 meters",
              accommodationType: fetchedTour.accommodationType || "Hotels & Homestays"
            });
          } else {
            toast({
              title: "Error",
              description: "Tour not found",
              variant: "destructive"
            });
            navigate("/admin/tours");
          }
        } catch (error) {
          console.error("Error fetching tour data:", error);
          toast({
            title: "Error",
            description: "Failed to load tour data",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchTourData();
    }
  }, [id, isEditing, navigate, toast]);

  // Import form handlers
  const {
    handleInputChange,
    handleNumberChange,
    handleCheckboxChange,
    handleTransportTypeChange,
    handleImageChange
  } = useFormHandlers(formData, setFormData);
  
  // Import form submission handler
  const { handleSubmit, handleCancel } = useFormSubmission(
    formData, 
    isEditing, 
    id,
    setActiveTab
  );

  return {
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    isEditing,
    loading,
    handleInputChange,
    handleNumberChange,
    handleCheckboxChange,
    handleTransportTypeChange,
    handleImageChange,
    handleSubmit,
    handleCancel
  };
}
