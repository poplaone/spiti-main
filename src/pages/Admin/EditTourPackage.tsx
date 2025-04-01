
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { tourPackagesData } from '@/data/tourPackagesData';
import { TourPackageProps } from '@/components/TourPackage';
import { ArrowLeft, Save, Trash2, Plus } from 'lucide-react';

interface NightStayField {
  location: string;
  nights: number;
}

interface ItineraryField {
  day: number;
  title: string;
  description: string;
}

const EditTourPackage = () => {
  useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isNew = id === 'new';
  const packageIndex = isNew ? -1 : parseInt(id || '-1');
  const existingPackage = !isNew && packageIndex >= 0 && packageIndex < tourPackagesData.length ? 
    tourPackagesData[packageIndex] : null;

  // Initialize form state
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
    isWomenOnly: false
  });

  // Load existing data if editing
  useEffect(() => {
    if (existingPackage) {
      setFormData({
        ...existingPackage
      });
    }
  }, [existingPackage]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  // Handle duration changes
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

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle night stays management
  const [nightStaysFields, setNightStaysFields] = useState<NightStayField[]>([
    { location: '', nights: 1 }
  ]);

  useEffect(() => {
    if (existingPackage?.nightStays?.length) {
      setNightStaysFields(existingPackage.nightStays);
    }
  }, [existingPackage]);

  const handleNightStayChange = (index: number, field: keyof NightStayField, value: string | number) => {
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

  // Handle list items (inclusions, exclusions)
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

  // Handle itinerary management
  const [itineraryFields, setItineraryFields] = useState<ItineraryField[]>([
    { day: 1, title: '', description: '' }
  ]);

  useEffect(() => {
    if (existingPackage?.itinerary?.length) {
      setItineraryFields(existingPackage.itinerary);
    }
  }, [existingPackage]);

  const handleItineraryChange = (index: number, field: keyof ItineraryField, value: string | number) => {
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would save the data to a database
    // For this demo, we'll just show a success message
    
    toast({
      title: isNew ? "Tour package created" : "Tour package updated",
      description: `${formData.title} has been ${isNew ? 'created' : 'updated'} successfully.`
    });
    
    // Navigate back to tour packages list
    navigate('/admin/tour-packages');
  };

  return (
    <div className="pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin/tour-packages')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Add New Tour Package' : `Edit: ${existingPackage?.title}`}
        </h1>
      </div>

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
                  <Button variant="outline" type="button" onClick={() => navigate('/admin/tour-packages')}>
                    Cancel
                  </Button>
                  <Button className="bg-spiti-forest hover:bg-spiti-forest/90" type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Package
                  </Button>
                </div>
              </div>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="stays">Night Stays</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="basic" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Package Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange}
                      placeholder="Enter tour package title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={formData.image} 
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input 
                      id="originalPrice" 
                      name="originalPrice" 
                      type="number" 
                      value={formData.originalPrice} 
                      onChange={handleNumberChange}
                      placeholder="Enter original price"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                    <Input 
                      id="discountedPrice" 
                      name="discountedPrice" 
                      type="number" 
                      value={formData.discountedPrice} 
                      onChange={handleNumberChange}
                      placeholder="Enter discounted price"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input 
                      id="discount" 
                      name="discount" 
                      type="number" 
                      value={formData.discount} 
                      onChange={handleNumberChange}
                      placeholder="Enter discount percentage"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nights">Number of Nights</Label>
                    <Input 
                      id="nights" 
                      name="nights" 
                      type="number" 
                      value={formData.duration?.nights} 
                      onChange={handleDurationChange}
                      placeholder="Enter number of nights"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="days">Number of Days</Label>
                    <Input 
                      id="days" 
                      name="days" 
                      type="number" 
                      value={formData.duration?.days} 
                      onChange={handleDurationChange}
                      placeholder="Enter number of days"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transportType">Transport Type</Label>
                    <Select 
                      value={formData.transportType || 'car'} 
                      onValueChange={(value) => handleSelectChange('transportType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="car">Car Tour</SelectItem>
                          <SelectItem value="bike">Bike Tour</SelectItem>
                          <SelectItem value="innova">Innova/Premium</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isWomenOnly"
                        name="isWomenOnly"
                        checked={formData.isWomenOnly || false}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-spiti-forest focus:ring-spiti-forest"
                      />
                      <Label htmlFor="isWomenOnly">Women Only Tour</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stays" className="pt-4">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Night Stays</h3>
                    <Button type="button" variant="outline" onClick={addNightStay}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Stay
                    </Button>
                  </div>

                  {nightStaysFields.map((stay, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end border-b pb-4">
                      <div className="md:col-span-4 space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={stay.location}
                          onChange={(e) => handleNightStayChange(index, 'location', e.target.value)}
                          placeholder="Enter location name"
                          required
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`nights-${index}`}>Nights</Label>
                        <Input
                          id={`nights-${index}`}
                          type="number"
                          min="1"
                          value={stay.nights}
                          onChange={(e) => handleNightStayChange(index, 'nights', e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeNightStay(index)}
                          disabled={nightStaysFields.length <= 1}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="overview">Overview</Label>
                    <Textarea
                      id="overview"
                      name="overview"
                      value={formData.overview || ''}
                      onChange={handleInputChange}
                      placeholder="Enter tour package overview"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                    <Textarea
                      id="inclusions"
                      value={inclusionsText}
                      onChange={handleInclusionsChange}
                      placeholder="Enter inclusions, one per line"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exclusions">Exclusions (one per line)</Label>
                    <Textarea
                      id="exclusions"
                      value={exclusionsText}
                      onChange={handleExclusionsChange}
                      placeholder="Enter exclusions, one per line"
                      rows={5}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="pt-4">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Itinerary</h3>
                    <Button type="button" variant="outline" onClick={addItineraryDay}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Day
                    </Button>
                  </div>

                  {itineraryFields.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Day {day.day}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItineraryDay(index)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`day-${index}`}>Day Number</Label>
                          <Input
                            id={`day-${index}`}
                            type="number"
                            min="1"
                            value={day.day}
                            onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`title-${index}`}>Title</Label>
                          <Input
                            id={`title-${index}`}
                            value={day.title}
                            onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                            placeholder="Enter day title"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={day.description}
                          onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                          placeholder="Enter day description"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </form>
    </div>
  );
};

export default EditTourPackage;
