import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { addTour, getTourByIndex, updateTour, getTourByCustomUrl } from '@/services/tourService';

// Initialize empty tour form data
const getEmptyTourData = (): TourPackageProps => ({
  title: "",
  image: "",
  originalPrice: 0,
  discountedPrice: 0,
  discount: 0,
  duration: {
    nights: 0,
    days: 0
  },
  nightStays: [],
  inclusions: [],
  exclusions: [],
  overview: "",
  itinerary: [],
  hasFixedDepartures: true,
  isCustomizable: true,
  transportType: 'car',
  isWomenOnly: false,
  availableDates: "June to October",
  customUrl: "",
  departureDates: []
});

export function useTourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
          departureDates: clonedTour.departureDates || []
        });
      }
    }
  }, [id, isEditing]);

  // Form input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      transportType: type
    });
  };

  // Handle image change
  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      image: imageUrl
    });
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
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
      const discount = Math.round(((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100);
      formData.discount = discount;
    }
    
    if (isEditing && id) {
      updateTour(parseInt(id), formData);
      toast({
        description: "Tour package updated successfully",
      });
    } else {
      addTour(formData);
      toast({
        description: "Tour package added successfully",
      });
    }
    
    navigate("/admin/tours");
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
    handleInputChange,
    handleNumberChange,
    handleCheckboxChange,
    handleTransportTypeChange,
    handleImageChange,
    handleSubmit,
    handleCancel,
  };
}
