
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
import { ArrowLeft, Save, Trash2, Plus, Image, Calendar, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface NightStayField {
  location: string;
  nights: number;
}

interface ItineraryField {
  day: number;
  title: string;
  description: string;
}

interface DepartureDateField {
  date: string;
  available: boolean;
  price?: number;
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
  const [formData, setFormData] = useState<Partial<TourPackageProps & {
    isFixedDeparture: boolean;
    isCustomizable: boolean;
    departureDates: DepartureDateField[];
  }>>({
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

  // Handle image upload or URL input
  const [imageMethod, setImageMethod] = useState<'url' | 'upload'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Load existing data if editing
  useEffect(() => {
    if (existingPackage) {
      setFormData({
        ...existingPackage,
        isFixedDeparture: existingPackage.isFixedDeparture || false,
        isCustomizable: existingPackage.isCustomizable !== false, // Default to true if undefined
        departureDates: existingPackage.departureDates || []
      });
      
      if (existingPackage.image) {
        setImagePreview(existingPackage.image);
      }
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

  // Handle switch toggle
  const handleSwitchChange = (name: string, checked: boolean) => {
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

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      setFormData(prev => ({
        ...prev,
        image: fileUrl // Temporary URL for preview
      }));
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    setImagePreview(url);
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

  // Handle departure dates management
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
                  <Button type="button" variant="outline" onClick={() => navigate(`/admin/tour-packages/${id}/preview`)}>
                    Preview
                  </Button>
                  <Button variant="outline" type="button" onClick={() => navigate('/admin/tour-packages')}>
                    Cancel
                  </Button>
                  <Button className="bg-spiti-forest hover:bg-spiti-forest/90" type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Package
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isWomenOnly"
                      checked={formData.isWomenOnly || false}
                      onCheckedChange={(checked) => handleSwitchChange('isWomenOnly', checked)}
                    />
                    <Label htmlFor="isWomenOnly">Women Only Tour</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFixedDeparture"
                      checked={formData.isFixedDeparture || false}
                      onCheckedChange={(checked) => handleSwitchChange('isFixedDeparture', checked)}
                    />
                    <Label htmlFor="isFixedDeparture">Fixed Departure Tour</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isCustomizable"
                      checked={formData.isCustomizable !== false}
                      onCheckedChange={(checked) => handleSwitchChange('isCustomizable', checked)}
                    />
                    <Label htmlFor="isCustomizable">Customizable Tour</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="pt-4 space-y-6">
                <div className="space-y-4">
                  <Label>Image Source</Label>
                  <RadioGroup 
                    defaultValue="url" 
                    value={imageMethod}
                    onValueChange={(value) => setImageMethod(value as 'url' | 'upload')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="url" id="url" />
                      <Label htmlFor="url">Image URL</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upload" id="upload" />
                      <Label htmlFor="upload">Upload Image</Label>
                    </div>
                  </RadioGroup>
                </div>

                {imageMethod === 'url' ? (
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleImageUrlChange}
                      placeholder="Enter image URL"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="imageUpload">Upload Image</Label>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500">
                      Max file size: 5MB. Supported formats: JPG, PNG, WEBP.
                    </p>
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-6">
                    <Label>Image Preview</Label>
                    <div className="mt-2 border rounded-md overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Tour preview" 
                        className="w-full h-60 object-cover"
                      />
                    </div>
                  </div>
                )}
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
                      rows={6}
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

              <TabsContent value="departures" className="pt-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                      <h3 className="font-medium flex items-center text-amber-800">
                        <Calendar className="h-5 w-5 mr-2" />
                        Tour Availability Settings
                      </h3>
                      <p className="text-amber-700 text-sm mt-1">
                        Configure whether this tour has fixed departure dates, is customizable, or both.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isFixedDepartureDates"
                            checked={formData.isFixedDeparture || false}
                            onCheckedChange={(checked) => handleSwitchChange('isFixedDeparture', checked)}
                          />
                          <div>
                            <Label htmlFor="isFixedDepartureDates">Fixed Departure Dates</Label>
                            <p className="text-xs text-amber-700">Tour departs on specific dates only</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isCustomizableDates"
                            checked={formData.isCustomizable !== false}
                            onCheckedChange={(checked) => handleSwitchChange('isCustomizable', checked)}
                          />
                          <div>
                            <Label htmlFor="isCustomizableDates">Customizable Dates</Label>
                            <p className="text-xs text-amber-700">Customers can choose their own dates</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.isFixedDeparture && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          Fixed Departure Dates
                        </h3>
                        <Button type="button" variant="outline" onClick={addDepartureDate}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Date
                        </Button>
                      </div>

                      {departureDatesFields.map((date, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4">
                          <div className="md:col-span-4 space-y-2">
                            <Label htmlFor={`date-${index}`}>Departure Date</Label>
                            <Input
                              id={`date-${index}`}
                              type="date"
                              value={date.date}
                              onChange={(e) => handleDepartureDateChange(index, 'date', e.target.value)}
                              required
                            />
                          </div>
                          <div className="md:col-span-3 space-y-2">
                            <Label htmlFor={`price-${index}`}>Special Price (optional)</Label>
                            <Input
                              id={`price-${index}`}
                              type="number"
                              min="0"
                              value={date.price || ''}
                              onChange={(e) => handleDepartureDateChange(index, 'price', e.target.value)}
                              placeholder="Regular price if empty"
                            />
                          </div>
                          <div className="md:col-span-4 space-y-2">
                            <div className="flex items-center h-10">
                              <Switch
                                id={`available-${index}`}
                                checked={date.available}
                                onCheckedChange={(checked) => handleDepartureDateChange(index, 'available', checked)}
                              />
                              <Label htmlFor={`available-${index}`} className="ml-2">
                                {date.available ? 'Available' : 'Sold Out'}
                              </Label>
                            </div>
                          </div>
                          <div className="md:col-span-1 flex justify-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeDepartureDate(index)}
                              disabled={departureDatesFields.length <= 1}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
