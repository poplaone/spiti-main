
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTourForm } from "@/hooks/useTourForm";
import BasicInfoTab from "@/components/admin/tour-form/BasicInfoTab";
import DepartureDatesTab from "@/components/admin/tour-form/DepartureDatesTab";
import OverviewTab from "@/components/admin/tour-form/OverviewTab";
import ItineraryTab from "@/components/admin/tour-form/ItineraryTab";
import AccommodationsAndInclusionsTab from "@/components/admin/tour-form/AccommodationsAndInclusionsTab";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from 'react';

const TourPackageForm = () => {
  const {
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
  } = useTourForm();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit Tour Package" : "Add New Tour Package"}
        </h1>
        
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-40 ml-auto" />
        </div>
      </div>
    );
  }
  
  // Form validation check
  const isFormValid = () => {
    return (
      formData.title && 
      formData.image && 
      formData.originalPrice > 0 && 
      formData.discountedPrice > 0 &&
      formData.transportType
    );
  };
  
  const hasValidationErrors = !isFormValid();
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Tour Package" : "Add New Tour Package"}
      </h1>
      
      {hasValidationErrors && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing information</AlertTitle>
          <AlertDescription>
            Please fill in all required fields before submitting. Title, image, prices and transport type are required.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="departures">Departure Dates</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations & Inclusions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <BasicInfoTab 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleNumberChange={handleNumberChange} 
                handleCheckboxChange={handleCheckboxChange} 
                handleTransportTypeChange={handleTransportTypeChange} 
                handleImageChange={handleImageChange} 
              />
            </TabsContent>

            <TabsContent value="departures" className="space-y-6">
              <DepartureDatesTab formData={formData} setFormData={setFormData} />
            </TabsContent>
            
            <TabsContent value="overview" className="space-y-6">
              <OverviewTab formData={formData} handleInputChange={handleInputChange} />
            </TabsContent>
            
            <TabsContent value="itinerary" className="space-y-6">
              <ItineraryTab formData={formData} setFormData={setFormData} />
            </TabsContent>
            
            <TabsContent value="accommodations" className="space-y-6">
              <AccommodationsAndInclusionsTab formData={formData} setFormData={setFormData} />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              className="bg-spiti-forest hover:bg-spiti-forest/90"
              disabled={hasValidationErrors}
            >
              {isEditing ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TourPackageForm;
