
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TourPackageProps } from "@/components/TourPackage";
import { getTourByIndex, addTour, updateTour } from '@/services/tourService';
import { getEmptyTourData } from './tour-form/utils';
import { useFormHandlers } from './tour-form/useFormHandlers';
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
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    handleCancel,
  };
}
