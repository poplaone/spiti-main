
import React from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';

import { useTourEditForm } from '@/hooks/tour-form/useTourEditForm';
import BasicInfoTab from '@/components/admin/tour-form/BasicInfoTab';
import DetailsTab from '@/components/admin/tour-form/DetailsTab';
import InclusionsTab from '@/components/admin/tour-form/InclusionsTab';
import ExclusionsTab from '@/components/admin/tour-form/ExclusionsTab';
import ItineraryTab from '@/components/admin/tour-form/ItineraryTab';

const AdminTourEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Use our custom hook to handle all the form logic
  const { 
    form,
    activeTab,
    setActiveTab,
    isLoading,
    isEditing,
    duration,
    setDuration,
    nightStays,
    addNightStay,
    updateNightStay,
    removeNightStay,
    inclusions,
    addInclusion,
    updateInclusion,
    removeInclusion,
    exclusions,
    addExclusion,
    updateExclusion,
    removeExclusion,
    itinerary,
    addItineraryDay,
    updateItineraryDay,
    removeItineraryDay,
    onSubmit,
    navigate
  } = useTourEditForm(id);
  
  if (isLoading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading tour details...</div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/tours')}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Tour Package' : 'Create Tour Package'}
          </h1>
        </div>
        
        <Button 
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={isLoading}
          type="button"
        >
          <Save className="mr-1 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Tour'}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }} className="space-y-8">
            <TabsContent value="basic">
              <BasicInfoTab form={form} />
            </TabsContent>
            
            <TabsContent value="details">
              <DetailsTab
                form={form}
                duration={duration}
                setDuration={setDuration}
                nightStays={nightStays}
                addNightStay={addNightStay}
                updateNightStay={updateNightStay}
                removeNightStay={removeNightStay}
              />
            </TabsContent>
            
            <TabsContent value="inclusions">
              <InclusionsTab
                inclusions={inclusions}
                addInclusion={addInclusion}
                updateInclusion={updateInclusion}
                removeInclusion={removeInclusion}
              />
            </TabsContent>
            
            <TabsContent value="exclusions">
              <ExclusionsTab
                exclusions={exclusions}
                addExclusion={addExclusion}
                updateExclusion={updateExclusion}
                removeExclusion={removeExclusion}
              />
            </TabsContent>
            
            <TabsContent value="itinerary">
              <ItineraryTab
                itinerary={itinerary}
                addItineraryDay={addItineraryDay}
                updateItineraryDay={updateItineraryDay}
                removeItineraryDay={removeItineraryDay}
              />
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AdminTourEdit;
