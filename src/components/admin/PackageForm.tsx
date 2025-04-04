import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check, Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import NightStaysEditor from "./NightStaysEditor";
import InclusionsEditor from "./InclusionsEditor";
import ItineraryEditor from "./ItineraryEditor";
import ImageUploader from "./ImageUploader";

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

interface PackageFormProps {
  packageId?: string;
  isEditing?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ packageId, isEditing = false }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState("basic");
  
  // Form states
  const [title, setTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [transportType, setTransportType] = useState("car");
  const [durationNights, setDurationNights] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [overview, setOverview] = useState("");
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  
  // Nested data
  const [nightStays, setNightStays] = useState<NightStay[]>([]);
  const [inclusions, setInclusions] = useState<Inclusion[]>([]);
  const [exclusions, setExclusions] = useState<Exclusion[]>([]);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  
  // Load data if editing
  useEffect(() => {
    if (isEditing && packageId) {
      fetchPackageData();
    }
  }, [isEditing, packageId]);
  
  const fetchPackageData = async () => {
    setIsLoading(true);
    try {
      // Fetch main package data
      const { data: packageData, error: packageError } = await supabase
        .from('tour_packages')
        .select('*')
        .eq('id', packageId)
        .single();
      
      if (packageError) throw packageError;
      
      // Set basic form fields
      setTitle(packageData.title || '');
      setOriginalPrice(packageData.original_price?.toString() || '');
      setDiscountedPrice(packageData.discounted_price?.toString() || '');
      setTransportType(packageData.transport_type || 'car');
      setDurationNights(packageData.duration_nights?.toString() || '');
      setDurationDays(packageData.duration_days?.toString() || '');
      setOverview(packageData.overview || '');
      setIsWomenOnly(packageData.is_women_only || false);
      setImagePreview(packageData.image || '');
      
      // Fetch night stays
      const { data: nightStaysData, error: nightStaysError } = await supabase
        .from('night_stays')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('id');
      
      if (!nightStaysError) {
        setNightStays(nightStaysData || []);
      }
      
      // Fetch inclusions
      const { data: inclusionsData, error: inclusionsError } = await supabase
        .from('inclusions')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('id');
      
      if (!inclusionsError) {
        setInclusions(inclusionsData || []);
      }
      
      // Fetch exclusions
      const { data: exclusionsData, error: exclusionsError } = await supabase
        .from('exclusions')
        .select('*')
        .eq('tour_package_id', packageId)
        .order('id');
      
      if (!exclusionsError) {
        setExclusions(exclusionsData || []);
      }
      
      // Fetch itinerary days
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
      // If we're editing and there's already an image, we can skip this
      if (isEditing && imagePreview) {
        return imagePreview;
      }
      throw new Error('Please select an image');
    }
    
    // Generate a unique file name
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload the file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tour_images')
      .upload(filePath, imageFile);
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('tour_images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Field validations
      if (!title) throw new Error('Title is required');
      if (!originalPrice) throw new Error('Original price is required');
      if (!discountedPrice) throw new Error('Discounted price is required');
      if (!durationNights) throw new Error('Duration nights is required');
      if (!durationDays) throw new Error('Duration days is required');
      if (!transportType) throw new Error('Transport type is required');
      
      // Calculate discount percentage
      const origPrice = parseFloat(originalPrice);
      const discPrice = parseFloat(discountedPrice);
      const discount = Math.round(((origPrice - discPrice) / origPrice) * 100);
      
      // Upload image if provided
      let imageUrl = '';
      try {
        imageUrl = await uploadImage();
      } catch (imageError: any) {
        // Only throw error if we're creating a new package and have no image
        if (!isEditing || !imagePreview) {
          throw new Error(`Image upload failed: ${imageError.message}`);
        } else {
          // Keep using the existing image
          imageUrl = imagePreview;
        }
      }
      
      let tourPackageId = packageId;
      
      // Insert or update the main tour package
      if (isEditing && packageId) {
        // Update existing package
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
            overview
          })
          .eq('id', packageId);
        
        if (updateError) throw updateError;
      } else {
        // Insert new package
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
            overview
          })
          .select('id')
          .single();
        
        if (insertError) throw insertError;
        tourPackageId = newPackage.id;
      }
      
      if (!tourPackageId) throw new Error('Failed to get tour package ID');
      
      // Handle night stays
      if (isEditing) {
        // Delete existing night stays
        await supabase
          .from('night_stays')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      // Insert night stays
      if (nightStays.length > 0) {
        const { error: nightStaysError } = await supabase
          .from('night_stays')
          .insert(
            nightStays.map(stay => ({
              tour_package_id: tourPackageId,
              location: stay.location,
              nights: stay.nights
            }))
          );
        
        if (nightStaysError) throw nightStaysError;
      }
      
      // Handle inclusions
      if (isEditing) {
        await supabase
          .from('inclusions')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (inclusions.length > 0) {
        const { error: inclusionsError } = await supabase
          .from('inclusions')
          .insert(
            inclusions.map(item => ({
              tour_package_id: tourPackageId,
              description: item.description
            }))
          );
        
        if (inclusionsError) throw inclusionsError;
      }
      
      // Handle exclusions
      if (isEditing) {
        await supabase
          .from('exclusions')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (exclusions.length > 0) {
        const { error: exclusionsError } = await supabase
          .from('exclusions')
          .insert(
            exclusions.map(item => ({
              tour_package_id: tourPackageId,
              description: item.description
            }))
          );
        
        if (exclusionsError) throw exclusionsError;
      }
      
      // Handle itinerary days
      if (isEditing) {
        await supabase
          .from('itinerary_days')
          .delete()
          .eq('tour_package_id', tourPackageId);
      }
      
      if (itineraryDays.length > 0) {
        const { error: itineraryError } = await supabase
          .from('itinerary_days')
          .insert(
            itineraryDays.map(day => ({
              tour_package_id: tourPackageId,
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
  
  if (isLoading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-spiti-forest border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading tour package data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Tour Package' : 'Create New Tour Package'}
        </h1>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/tour-packages')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-spiti-forest hover:bg-spiti-forest/90"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>{isEditing ? 'Update Package' : 'Create Package'}</>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Package Details</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Package Information</CardTitle>
              <CardDescription>
                Enter the core details of the tour package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter package title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="overview">Package Overview</Label>
                  <Textarea
                    id="overview"
                    placeholder="Write a brief overview of the package"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="Enter original price"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                    <Input
                      id="discountedPrice"
                      type="number"
                      placeholder="Enter discounted price"
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="durationNights">Number of Nights</Label>
                    <Input
                      id="durationNights"
                      type="number"
                      placeholder="Enter number of nights"
                      value={durationNights}
                      onChange={(e) => setDurationNights(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="durationDays">Number of Days</Label>
                    <Input
                      id="durationDays"
                      type="number"
                      placeholder="Enter number of days"
                      value={durationDays}
                      onChange={(e) => setDurationDays(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="transportType">Transport Type</Label>
                  <Select 
                    value={transportType} 
                    onValueChange={setTransportType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car / Jeep</SelectItem>
                      <SelectItem value="bike">Bike / Motorcycle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="women-only" 
                    checked={isWomenOnly} 
                    onCheckedChange={setIsWomenOnly} 
                  />
                  <Label htmlFor="women-only">Women-Only Tour</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Accommodation & Inclusions</CardTitle>
              <CardDescription>
                Add night stays, inclusions, and exclusions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Night Stays</h3>
                  <NightStaysEditor
                    nightStays={nightStays}
                    setNightStays={setNightStays}
                  />
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="text-lg font-medium">Inclusions & Exclusions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InclusionsEditor
                      items={inclusions}
                      setItems={setInclusions}
                      title="Inclusions"
                      placeholder="Add what's included in the package"
                    />
                    
                    <InclusionsEditor
                      items={exclusions}
                      setItems={setExclusions}
                      title="Exclusions"
                      placeholder="Add what's not included in the package"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle>Tour Itinerary</CardTitle>
              <CardDescription>
                Add day-by-day itinerary details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ItineraryEditor
                itineraryDays={itineraryDays}
                setItineraryDays={setItineraryDays}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Package Images</CardTitle>
              <CardDescription>
                Upload the main image for this tour package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default PackageForm;
