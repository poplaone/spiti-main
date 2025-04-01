import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Edit, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { TourPackageProps, DepartureDateField } from '@/components/TourPackage';
import { TourItineraryDay, TourNightStay } from '@/data/types/tourTypes';
import BasicInfoTab from './BasicInfoTab';
import ImageTab from './ImageTab';
import DetailsTab from './DetailsTab';
import ItineraryTab from './ItineraryTab';
import DeparturesTab from './DeparturesTab';
import { createTourPackage, updateTourPackage } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

interface TourPackageFormProps {
  id: string | undefined;
  existingPackage: TourPackageProps | null;
  isNew: boolean;
}

const TourPackageForm = ({ id, existingPackage, isNew }: TourPackageFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<TourPackageProps>>({
    title: '',
    image: '',
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
    overview: '',
    itinerary: [],
    transportType: 'car',
    isWomenOnly: false,
    isFixedDeparture: false,
    isCustomizable: true,
    departureDates: []
  });

  const [imageMethod, setImageMethod] = useState<'url' | 'upload'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (existingPackage) {
      setFormData({
        ...existingPackage,
        isFixedDeparture: existingPackage.isFixedDeparture || false,
        isCustomizable: existingPackage.isCustomizable !== false,
        departureDates: existingPackage.departureDates || []
      });
      
      if (existingPackage.image) {
        setImagePreview(existingPackage.image);
      }
    }
  }, [existingPackage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [name]: parseInt(value) || 0
      }
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      setFormData(prev => ({
        ...prev,
        image: fileUrl
      }));
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    setImagePreview(url);
  };

  const [nightStaysFields, setNightStaysFields] = useState<TourNightStay[]>([
    { location: '', nights: 1 }
  ]);

  useEffect(() => {
    if (existingPackage?.nightStays?.length) {
      setNightStaysFields(existingPackage.nightStays);
    }
  }, [existingPackage]);

  const handleNightStayChange = (index: number, field: keyof TourNightStay, value: string | number) => {
    const updatedFields = [...nightStaysFields];
    updatedFields[index] = { 
      ...updatedFields[index], 
      [field]: field === 'nights' ? parseInt(value.toString()) || 1 : value 
    };
    
    setNightStaysFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      nightStays: updatedFields
    }));
  };

  const addNightStay = () => {
    setNightStaysFields([...nightStaysFields, { location: '', nights: 1 }]);
  };

  const removeNightStay = (index: number) => {
    const updatedFields = nightStaysFields.filter((_, i) => i !== index);
    setNightStaysFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      nightStays: updatedFields
    }));
  };

  const [inclusionsText, setInclusionsText] = useState('');
  const [exclusionsText, setExclusionsText] = useState('');

  useEffect(() => {
    if (existingPackage?.inclusions?.length) {
      setInclusionsText(existingPackage.inclusions.join('\n'));
    }
    if (existingPackage?.exclusions?.length) {
      setExclusionsText(existingPackage.exclusions.join('\n'));
    }
  }, [existingPackage]);

  const handleInclusionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInclusionsText(e.target.value);
    const items = e.target.value.split('\n').filter(item => item.trim() !== '');
    setFormData(prev => ({
      ...prev,
      inclusions: items
    }));
  };

  const handleExclusionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExclusionsText(e.target.value);
    const items = e.target.value.split('\n').filter(item => item.trim() !== '');
    setFormData(prev => ({
      ...prev,
      exclusions: items
    }));
  };

  const [itineraryFields, setItineraryFields] = useState<TourItineraryDay[]>([
    { day: 1, title: '', description: '' }
  ]);

  useEffect(() => {
    if (existingPackage?.itinerary?.length) {
      setItineraryFields(existingPackage.itinerary);
    }
  }, [existingPackage]);

  const handleItineraryChange = (index: number, field: keyof TourItineraryDay, value: string | number) => {
    const updatedFields = [...itineraryFields];
    updatedFields[index] = { 
      ...updatedFields[index], 
      [field]: field === 'day' ? parseInt(value.toString()) || 1 : value 
    };
    
    setItineraryFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      itinerary: updatedFields
    }));
  };

  const addItineraryDay = () => {
    const nextDay = itineraryFields.length > 0 ? itineraryFields[itineraryFields.length - 1].day + 1 : 1;
    setItineraryFields([...itineraryFields, { day: nextDay, title: '', description: '' }]);
  };

  const removeItineraryDay = (index: number) => {
    const updatedFields = itineraryFields.filter((_, i) => i !== index);
    setItineraryFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      itinerary: updatedFields
    }));
  };

  const [departureDatesFields, setDepartureDatesFields] = useState<DepartureDateField[]>([
    { date: '', available: true, price: undefined }
  ]);

  useEffect(() => {
    if (formData.departureDates?.length) {
      setDepartureDatesFields(formData.departureDates);
    }
  }, [formData.departureDates]);

  const handleDepartureDateChange = (index: number, field: keyof DepartureDateField, value: string | number | boolean) => {
    const updatedFields = [...departureDatesFields];
    updatedFields[index] = { 
      ...updatedFields[index], 
      [field]: field === 'price' ? (value === '' ? undefined : Number(value)) : value
    };
    
    setDepartureDatesFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      departureDates: updatedFields
    }));
  };

  const addDepartureDate = () => {
    setDepartureDatesFields([...departureDatesFields, { date: '', available: true }]);
  };

  const removeDepartureDate = (index: number) => {
    const updatedFields = departureDatesFields.filter((_, i) => i !== index);
    setDepartureDatesFields(updatedFields);
    setFormData(prev => ({
      ...prev,
      departureDates: updatedFields
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (!formData.title) {
        toast({
          title: "Missing information",
          description: "Please provide a title for the tour package.",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }

      const packageData: TourPackageProps = {
        ...formData as TourPackageProps,
        id: isNew ? uuidv4() : id || uuidv4(),
        exclusions: formData.exclusions || [],
        inclusions: formData.inclusions || [],
        created_at: isNew ? new Date().toISOString() : formData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      let result;
      if (isNew) {
        result = await createTourPackage(packageData);
      } else {
        result = await updateTourPackage(id!, packageData);
      }
      
      if (result) {
        toast({
          title: isNew ? "Tour package created" : "Tour package updated",
          description: `${formData.title} has been ${isNew ? 'created' : 'updated'} successfully.`
        });
        
        navigate('/admin/tour-packages');
      } else {
        throw new Error("Failed to save tour package");
      }
    } catch (error) {
      console.error("Error saving tour package:", error);
      toast({
        title: "Error",
        description: `Failed to ${isNew ? 'create' : 'update'} tour package. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Tour Package Details</CardTitle>
                <CardDescription>Manage all aspects of this tour package</CardDescription>
              </div>
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(`/admin/tour-packages/${id}/preview`)}
                  disabled={isSaving}
                >
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => navigate('/admin/tour-packages')}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-spiti-forest hover:bg-spiti-forest/90" 
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Package
                    </>
                  )}
                </Button>
              </div>
            </div>
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
