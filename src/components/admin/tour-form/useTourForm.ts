
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { addTour, getTourByIndex, updateTour } from '@/services/tourService';

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
  departureDates: [],
  bestTime: "June to September",
  groupSize: "2-10 People",
  terrain: "Himalayan Mountain Passes",
  elevation: "2,000 - 4,550 meters",
  accommodationType: "Hotels & Homestays"
});

export function useTourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isEditing = id !== undefined;
  
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
            // Deep clone to avoid modifying original data
            const clonedTour = JSON.parse(JSON.stringify(fetchedTour));
            
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
        } catch (error) {
          console.error("Error fetching tour data:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchTourData();
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
      const discount = Math.round(((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100);
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
