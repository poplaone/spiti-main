
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

interface NightStay {
  id?: string;
  location: string;
  nights: number;
}

interface Inclusion {
  id?: string;
  description: string;
}

interface Exclusion {
  id?: string;
  description: string;
}

interface ItineraryDay {
  id?: string;
  day_number: number;
  title: string;
  description: string;
}

interface OverviewDetails {
  accommodation: string;
  bestTime: string;
  groupSize: string;
  terrain: string;
  elevation: string;
  availableFrom: string;
  availableTo: string;
}

export const useTourPackageForm = (packageId?: string, isEditing: boolean = false) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState("basic");
  
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
  
  // Overview details
  const [accommodation, setAccommodation] = useState("Hotels & Homestays");
  const [bestTime, setBestTime] = useState("June to September");
  const [groupSize, setGroupSize] = useState("2-10 People");
  const [terrain, setTerrain] = useState("Himalayan Mountain Passes");
  const [elevation, setElevation] = useState("2,000 - 4,550 meters");
  const [availableFrom, setAvailableFrom] = useState("June");
  const [availableTo, setAvailableTo] = useState("October");
  
  const [nightStays, setNightStays] = useState<NightStay[]>([]);
  const [inclusions, setInclusions] = useState<Inclusion[]>([]);
  const [exclusions, setExclusions] = useState<Exclusion[]>([]);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);

  useEffect(() => {
    if (isEditing && packageId) {
      fetchPackageData();
    }
  }, [isEditing, packageId]);

  const fetchPackageData = async () => {
    setIsLoading(true);
    try {
      const { data: packageData, error: packageError } = await supabase
        .from('tour_packages')
        .select('*')
        .eq('id', packageId)
        .single();
      
      if (packageError) throw packageError;
      
      if (packageData) {
        setTitle(packageData.title || '');
        setOriginalPrice(packageData.original_price?.toString() || '');
        setDiscountedPrice(packageData.discounted_price?.toString() || '');
        setTransportType(packageData.transport_type || 'car');
        setDurationNights(packageData.duration_nights?.toString() || '');
        setDurationDays(packageData.duration_days?.toString() || '');
        setOverview(packageData.overview || '');
        setIsWomenOnly(packageData.is_women_only || false);
        setIsFixedDeparture(packageData.is_fixed_departure || false);
        setIsCustomizable(packageData.is_customizable !== false);
        setImagePreview(packageData.image || '');
        
        // Load overview details if available
        if (packageData.overview_details) {
          try {
            const details = JSON.parse(packageData.overview_details);
            setAccommodation(details.accommodation || 'Hotels & Homestays');
            setBestTime(details.bestTime || 'June to September');
            setGroupSize(details.groupSize || '2-10 People');
            setTerrain(details.terrain || 'Himalayan Mountain Passes');
            setElevation(details.elevation || '2,000 - 4,550 meters');
            setAvailableFrom(details.availableFrom || 'June');
            setAvailableTo(details.availableTo || 'October');
          } catch (e) {
            console.error("Error parsing overview details:", e);
          }
        }
      }
      
      const { data: nightStaysData, error: nightStaysError } = await supabase
        .from('night_stays')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('id');
      
      if (!nightStaysError) {
        setNightStays(nightStaysData || []);
      }
      
      const { data: inclusionsData, error: inclusionsError } = await supabase
        .from('inclusions')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('id');
      
      if (!inclusionsError) {
        setInclusions(inclusionsData || []);
      }
      
      const { data: exclusionsData, error: exclusionsError } = await supabase
        .from('exclusions')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('id');
      
      if (!exclusionsError) {
        setExclusions(exclusionsData || []);
      }
      
      const { data: itineraryData, error: itineraryError } = await supabase
        .from('itinerary_days')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('day_number');
      
      if (!itineraryError) {
        setItineraryDays(itineraryData || []);
      }
    } catch (error: any) {
      toast.error(`Error loading tour package: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!title) throw new Error('Title is required');
      if (!originalPrice) throw new Error('Original price is required');
      if (!discountedPrice) throw new Error('Discounted price is required');
      if (!durationNights) throw new Error('Duration nights is required');
      if (!durationDays) throw new Error('Duration days is required');
      if (!transportType) throw new Error('Transport type is required');
      
      const origPrice = parseFloat(originalPrice);
      const discPrice = parseFloat(discountedPrice);
      const discount = Math.round(((origPrice - discPrice) / origPrice) * 100);
      
      let imageUrl = '';
      try {
        imageUrl = await uploadImage();
      } catch (imageError: any) {
        if (!isEditing || !imagePreview) {
          throw new Error(`Image upload failed: ${imageError.message}`);
        } else {
          imageUrl = imagePreview;
        }
      }
      
      // Prepare overview details as JSON string
      const overviewDetails = JSON.stringify({
        accommodation,
        bestTime,
        groupSize,
        terrain,
        elevation,
        availableFrom,
        availableTo
      });
      
      let tourPackageId = packageId;
      
      if (isEditing && packageId) {
        const { error: updateError } = await supabase
          .from('tour_packages')
          .update({
            title,
            image: imageUrl,
            original_price: origPrice,
            discounted_price: discPrice,
            discount,
            duration_nights: parseInt(durationNights),
            duration_days: parseInt(durationDays),
            transport_type: transportType,
            is_women_only: isWomenOnly,
            is_fixed_departure: isFixedDeparture,
            is_customizable: isCustomizable,
            overview,
            overview_details: overviewDetails
          })
          .eq('id', packageId);
        
        if (updateError) throw updateError;
      } else {
        const { data: newPackage, error: insertError } = await supabase
          .from('tour_packages')
          .insert({
            title,
            image: imageUrl,
            original_price: origPrice,
            discounted_price: discPrice,
            discount,
            duration_nights: parseInt(durationNights),
            duration_days: parseInt(durationDays),
            transport_type: transportType,
            is_women_only: isWomenOnly,
            is_fixed_departure: isFixedDeparture,
            is_customizable: isCustomizable,
            overview,
            overview_details: overviewDetails
          })
          .select('id')
          .single();
        
        if (insertError) throw insertError;
        tourPackageId = newPackage?.id;
        
        if (!tourPackageId) throw new Error('Failed to get tour package ID');
      }
      
      if (isEditing && tourPackageId) {
        await supabase
          .from('night_stays')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (nightStays.length > 0 && tourPackageId) {
        const { error: nightStaysError } = await supabase
          .from('night_stays')
          .insert(
            nightStays.map(stay => ({
              tour_package_id: tourPackageId as string,
              location: stay.location,
              nights: stay.nights
            }))
          );
        
        if (nightStaysError) throw nightStaysError;
      }
      
      if (isEditing && tourPackageId) {
        await supabase
          .from('inclusions')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (inclusions.length > 0 && tourPackageId) {
        const { error: inclusionsError } = await supabase
          .from('inclusions')
          .insert(
            inclusions.map(item => ({
              tour_package_id: tourPackageId as string,
              description: item.description
            }))
          );
        
        if (inclusionsError) throw inclusionsError;
      }
      
      if (isEditing && tourPackageId) {
        await supabase
          .from('exclusions')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (exclusions.length > 0 && tourPackageId) {
        const { error: exclusionsError } = await supabase
          .from('exclusions')
          .insert(
            exclusions.map(item => ({
              tour_package_id: tourPackageId as string,
              description: item.description
            }))
          );
        
        if (exclusionsError) throw exclusionsError;
      }
      
      if (isEditing && tourPackageId) {
        await supabase
          .from('itinerary_days')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (itineraryDays.length > 0 && tourPackageId) {
        const { error: itineraryError } = await supabase
          .from('itinerary_days')
          .insert(
            itineraryDays.map(day => ({
              tour_package_id: tourPackageId as string,
              day_number: day.day_number,
              title: day.title,
              description: day.description
            }))
          );
        
        if (itineraryError) throw itineraryError;
      }
      
      toast.success(isEditing ? 'Tour package updated successfully' : 'New tour package created successfully');
      navigate('/admin/tour-packages');
      
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Form state
    isLoading,
    activeTab,
    setActiveTab,
    imagePreview,
    
    // Basic info
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
    
    // Overview details
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
    
    // Details
    nightStays,
    setNightStays,
    inclusions,
    setInclusions,
    exclusions,
    setExclusions,
    
    // Itinerary
    itineraryDays,
    setItineraryDays,
    
    // Images
    handleImageChange,
    
    // Form submission
    handleSubmit
  };
};

export default useTourPackageForm;
