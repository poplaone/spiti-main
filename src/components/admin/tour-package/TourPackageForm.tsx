
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TourPackageProps } from '@/components/TourPackage.d';
import BasicInfoTab from './BasicInfoTab';
import ImageTab from './ImageTab';
import DetailsTab from './DetailsTab';
import ItineraryTab from './ItineraryTab';
import DeparturesTab from './DeparturesTab';
import FormHeader from './FormHeader';
import useTourPackageForm from '@/hooks/useTourPackageForm';

interface TourPackageFormProps {
  id: string | undefined;
  existingPackage: TourPackageProps | null;
  isNew: boolean;
}

const TourPackageForm = ({ id, existingPackage, isNew }: TourPackageFormProps) => {
  const {
    formData,
    imageMethod,
    setImageMethod,
    imagePreview,
    nightStaysFields,
    inclusionsText,
    exclusionsText,
    itineraryFields,
    departureDatesFields,
    isSaving,
    handleInputChange,
    handleNumberChange,
    handleDurationChange,
    handleSwitchChange,
    handleSelectChange,
    handleImageChange,
    handleImageUrlChange,
    handleNightStayChange,
    addNightStay,
    removeNightStay,
    handleInclusionsChange,
    handleExclusionsChange,
    handleItineraryChange,
    addItineraryDay,
    removeItineraryDay,
    handleDepartureDateChange,
    addDepartureDate,
    removeDepartureDate,
    handleSubmit
  } = useTourPackageForm({ id, existingPackage, isNew });

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic">
        <Card>
          <CardHeader>
            <FormHeader 
              id={id} 
              title={formData.title} 
              isSaving={isSaving} 
            />
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[800px]">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="departures">Departures</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="basic" className="space-y-6 pt-4">
              <BasicInfoTab 
                formData={formData}
                handleInputChange={handleInputChange}
                handleNumberChange={handleNumberChange}
                handleDurationChange={handleDurationChange}
                handleSelectChange={handleSelectChange}
                handleSwitchChange={handleSwitchChange}
              />
            </TabsContent>

            <TabsContent value="image" className="pt-4 space-y-6">
              <ImageTab 
                imageMethod={imageMethod}
                setImageMethod={setImageMethod}
                formData={formData}
                imagePreview={imagePreview}
                handleImageUrlChange={handleImageUrlChange}
                handleImageChange={handleImageChange}
              />
            </TabsContent>

            <TabsContent value="details" className="space-y-6 pt-4">
              <DetailsTab 
                formData={formData}
                handleInputChange={handleInputChange}
                inclusionsText={inclusionsText}
                handleInclusionsChange={handleInclusionsChange}
                exclusionsText={exclusionsText}
                handleExclusionsChange={handleExclusionsChange}
                nightStaysFields={nightStaysFields}
                handleNightStayChange={handleNightStayChange}
                addNightStay={addNightStay}
                removeNightStay={removeNightStay}
              />
            </TabsContent>

            <TabsContent value="itinerary" className="pt-4">
              <ItineraryTab 
                itineraryFields={itineraryFields}
                handleItineraryChange={handleItineraryChange}
                addItineraryDay={addItineraryDay}
                removeItineraryDay={removeItineraryDay}
              />
            </TabsContent>

            <TabsContent value="departures" className="pt-4">
              <DeparturesTab 
                formData={formData}
                handleSwitchChange={handleSwitchChange}
                departureDatesFields={departureDatesFields}
                handleDepartureDateChange={handleDepartureDateChange}
                addDepartureDate={addDepartureDate}
                removeDepartureDate={removeDepartureDate}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </form>
  );
};

export default TourPackageForm;
