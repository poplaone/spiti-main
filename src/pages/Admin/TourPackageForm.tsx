
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTourForm } from "@/hooks/useTourForm";
import BasicInfoTab from "@/components/admin/tour-form/BasicInfoTab";
import DepartureDatesTab from "@/components/admin/tour-form/DepartureDatesTab";
import OverviewTab from "@/components/admin/tour-form/OverviewTab";
import ItineraryTab from "@/components/admin/tour-form/ItineraryTab";
import AccommodationsAndInclusionsTab from "@/components/admin/tour-form/AccommodationsAndInclusionsTab";

const TourPackageForm = () => {
  const {
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
    handleCancel
  } = useTourForm();
  return <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Tour Package" : "Add New Tour Package"}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="departures">Departure Dates</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations & Inclusions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <BasicInfoTab formData={formData} handleInputChange={handleInputChange} handleNumberChange={handleNumberChange} handleCheckboxChange={handleCheckboxChange} handleTransportTypeChange={handleTransportTypeChange} handleImageChange={handleImageChange} />
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
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            
            <Button type="submit" className="bg-spiti-forest hover:bg-spiti-forest/90">
              {isEditing ? "Update Package" : "Add Package"}
            </Button>
          </div>
        </div>
      </form>
    </div>;
};
export default TourPackageForm;
