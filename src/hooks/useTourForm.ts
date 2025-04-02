
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TourPackageProps } from "@/components/TourPackage";
import { getTourByIndex } from '@/services/tourService';
import { getEmptyTourData } from './tour-form/utils';
import { useFormHandlers } from './tour-form/useFormHandlers';
import { useFormSubmission } from './tour-form/useFormSubmission';

export function useTourForm() {
  const { id } = useParams();
  const isEditing = id !== undefined;
  
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<TourPackageProps>(getEmptyTourData());
  
  // Load tour data if editing
  useEffect(() => {
    if (isEditing && id) {
      const tourIndex = parseInt(id);
      const tour = getTourByIndex(tourIndex);
      if (tour) {
        // Deep clone to avoid modifying original data
        const clonedTour = JSON.parse(JSON.stringify(tour));
        
        setFormData({
          ...clonedTour,
          hasFixedDepartures: clonedTour.hasFixedDepartures !== false,
          isCustomizable: clonedTour.isCustomizable !== false,
          availableDates: clonedTour.availableDates || "June to October",
          exclusions: clonedTour.exclusions || [],
          itinerary: clonedTour.itinerary || [],
          customUrl: clonedTour.customUrl || "",
          departureDates: clonedTour.departureDates || [],
          bestTime: clonedTour.bestTime || "June to September",
          groupSize: clonedTour.groupSize || "2-10 People",
          terrain: clonedTour.terrain || "Himalayan Mountain Passes",
          elevation: clonedTour.elevation || "2,000 - 4,550 meters",
          accommodationType: clonedTour.accommodationType || "Hotels & Homestays"
        });
      }
    }
  }, [id, isEditing]);

  // Import form handlers
  const {
    handleInputChange,
    handleNumberChange,
    handleCheckboxChange,
    handleTransportTypeChange,
    handleImageChange
  } = useFormHandlers(formData, setFormData);
  
  // Import form submission
  const { handleSubmit, handleCancel } = useFormSubmission(formData, isEditing, id, setActiveTab);

  return {
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    isEditing,
    handleInputChange,
    handleNumberChange,
    handleCheckboxChange,
    handleTransportTypeChange,
    handleImageChange,
    handleSubmit,
    handleCancel,
  };
}
