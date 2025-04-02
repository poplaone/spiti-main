
import { useState } from 'react';
import { TourPackageProps } from "@/components/TourPackage";
import { FormInputChangeEvent, FormNumberChangeEvent, TransportType } from './types';

export function useFormHandlers(
  formData: TourPackageProps,
  setFormData: React.Dispatch<React.SetStateAction<TourPackageProps>>
) {
  // Form input handlers
  const handleInputChange = (e: FormInputChangeEvent) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof TourPackageProps;
      
      // Type guard to ensure we're only spreading objects
      if (parentKey === 'duration' && typeof formData.duration === 'object') {
        setFormData({
          ...formData,
          duration: {
            ...formData.duration,
            [child]: value
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNumberChange = (e: FormNumberChangeEvent) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      const parentKey = parent as keyof TourPackageProps;
      
      // Type guard to ensure we're only spreading objects
      if (parentKey === 'duration' && typeof formData.duration === 'object') {
        setFormData({
          ...formData,
          duration: {
            ...formData.duration,
            [child]: parseInt(value) || 0
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    }
  };
  
  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleTransportTypeChange = (type: 'bike' | 'car' | 'premium') => {
    setFormData({
      ...formData,
      transportType: type as TransportType
    });
  };

  // Handle image change
  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      image: imageUrl
    });
  };

  return {
    handleInputChange,
    handleNumberChange,
    handleCheckboxChange,
    handleTransportTypeChange,
    handleImageChange
  };
}
