
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TourPackageFormData, NightStay, Inclusion, Exclusion, ItineraryDay } from "./types";
import { fetchPackageData } from "./fetchPackageData";
import { handleImageChange as imageHandler } from "./imageHandler";
import { submitPackageForm } from "./submitPackageForm";

export const useTourPackageForm = (packageId?: string, isEditing: boolean = false) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Form state
  const [title, setTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [transportType, setTransportType] = useState("car");
  const [durationNights, setDurationNights] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [overview, setOverview] = useState("");
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  const [isFixedDeparture, setIsFixedDeparture] = useState(false);
  const [isCustomizable, setIsCustomizable] = useState(true);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Overview details
  const [accommodation, setAccommodation] = useState("Hotels & Homestays");
  const [bestTime, setBestTime] = useState("June to September");
  const [groupSize, setGroupSize] = useState("2-10 People");
  const [terrain, setTerrain] = useState("Himalayan Mountain Passes");
  const [elevation, setElevation] = useState("2,000 - 4,550 meters");
  const [availableFrom, setAvailableFrom] = useState("June");
  const [availableTo, setAvailableTo] = useState("October");
  
  // Related data
  const [nightStays, setNightStays] = useState<NightStay[]>([]);
  const [inclusions, setInclusions] = useState<Inclusion[]>([]);
  const [exclusions, setExclusions] = useState<Exclusion[]>([]);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);

  useEffect(() => {
    if (isEditing && packageId) {
      loadPackageData();
    }
  }, [isEditing, packageId]);

  const loadPackageData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPackageData(packageId as string);
      if (data) {
        // Set basic info
        setTitle(data.title);
        setOriginalPrice(data.originalPrice);
        setDiscountedPrice(data.discountedPrice);
        setTransportType(data.transportType);
        setDurationNights(data.durationNights);
        setDurationDays(data.durationDays);
        setOverview(data.overview);
        setIsWomenOnly(data.isWomenOnly);
        setIsFixedDeparture(data.isFixedDeparture);
        setIsCustomizable(data.isCustomizable);
        setImagePreview(data.imagePreview);
        
        // Set overview details
        setAccommodation(data.accommodation);
        setBestTime(data.bestTime);
        setGroupSize(data.groupSize);
        setTerrain(data.terrain);
        setElevation(data.elevation);
        setAvailableFrom(data.availableFrom);
        setAvailableTo(data.availableTo);
        
        // Set related data
        setNightStays(data.nightStays);
        setInclusions(data.inclusions);
        setExclusions(data.exclusions);
        setItineraryDays(data.itineraryDays);
      }
    } catch (error) {
      console.error("Error loading package data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    imageHandler(file, setImageFile, setImagePreview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData: TourPackageFormData = {
        title,
        originalPrice,
        discountedPrice,
        transportType,
        durationNights,
        durationDays,
        overview,
        isWomenOnly,
        isFixedDeparture,
        isCustomizable,
        accommodation,
        bestTime,
        groupSize,
        terrain,
        elevation,
        availableFrom,
        availableTo,
        nightStays,
        inclusions,
        exclusions,
        itineraryDays,
        imageFile,
        imagePreview
      };
      
      const success = await submitPackageForm(formData, imageFile, packageId, isEditing);
      
      if (success) {
        toast.success(isEditing ? 'Tour package updated successfully' : 'New tour package created successfully');
        navigate('/admin/tour-packages');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    activeTab,
    setActiveTab,
    imagePreview,
    
    // Make sure packageId is exposed in the return
    packageId, 
    
    title,
    setTitle,
    overview,
    setOverview,
    originalPrice,
    setOriginalPrice,
    discountedPrice,
    setDiscountedPrice,
    durationNights,
    setDurationNights,
    durationDays,
    setDurationDays,
    transportType,
    setTransportType,
    isWomenOnly,
    setIsWomenOnly,
    isFixedDeparture,
    setIsFixedDeparture,
    isCustomizable,
    setIsCustomizable,
    
    accommodation,
    setAccommodation,
    bestTime,
    setBestTime,
    groupSize,
    setGroupSize,
    terrain,
    setTerrain,
    elevation,
    setElevation,
    availableFrom,
    setAvailableFrom,
    availableTo,
    setAvailableTo,
    
    nightStays,
    setNightStays,
    inclusions,
    setInclusions,
    exclusions,
    setExclusions,
    
    itineraryDays,
    setItineraryDays,
    
    handleImageChange,
    
    handleSubmit
  };
};

export default useTourPackageForm;
