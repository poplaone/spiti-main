
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoTab from './BasicInfoTab';
import DetailsTab from './DetailsTab';
import ItineraryTab from './ItineraryTab';
import ImageTab from './ImageTab';

interface FormTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  formProps: any;
}

const FormTabs: React.FC<FormTabsProps> = ({
  activeTab,
  setActiveTab,
  formProps
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="details">Package Details</TabsTrigger>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="image">Images</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic">
        <BasicInfoTab 
          title={formProps.title}
          setTitle={formProps.setTitle}
          overview={formProps.overview}
          setOverview={formProps.setOverview}
          originalPrice={formProps.originalPrice}
          setOriginalPrice={formProps.setOriginalPrice}
          discountedPrice={formProps.discountedPrice}
          setDiscountedPrice={formProps.setDiscountedPrice}
          durationNights={formProps.durationNights}
          setDurationNights={formProps.setDurationNights}
          durationDays={formProps.durationDays}
          setDurationDays={formProps.setDurationDays}
          transportType={formProps.transportType}
          setTransportType={formProps.setTransportType}
          isWomenOnly={formProps.isWomenOnly}
          setIsWomenOnly={formProps.setIsWomenOnly}
          isFixedDeparture={formProps.isFixedDeparture}
          setIsFixedDeparture={formProps.setIsFixedDeparture}
          isCustomizable={formProps.isCustomizable}
          setIsCustomizable={formProps.setIsCustomizable}
        />
      </TabsContent>
      
      <TabsContent value="details">
        <DetailsTab 
          nightStays={formProps.nightStays}
          setNightStays={formProps.setNightStays}
          inclusions={formProps.inclusions}
          setInclusions={formProps.setInclusions}
          exclusions={formProps.exclusions}
          setExclusions={formProps.setExclusions}
        />
      </TabsContent>
      
      <TabsContent value="itinerary">
        <ItineraryTab 
          itineraryDays={formProps.itineraryDays}
          setItineraryDays={formProps.setItineraryDays}
        />
      </TabsContent>
      
      <TabsContent value="image">
        <ImageTab 
          imagePreview={formProps.imagePreview}
          onImageChange={formProps.handleImageChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default FormTabs;
