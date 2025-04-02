import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { getTourByIndex, addTour, updateTour } from '@/services/tourService';
import { TourPackageProps } from '@/components/TourPackage';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form schema
const tourSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  overview: z.string().min(50, "Overview must be at least 50 characters"),
  image: z.string().min(5, "Image URL is required"),
  originalPrice: z.coerce.number().min(1000, "Price must be at least 1000"),
  discountedPrice: z.coerce.number().min(1000, "Discounted price must be at least 1000"),
  discount: z.coerce.number().min(0, "Discount must be at least 0").max(100, "Discount cannot exceed 100"),
  transportType: z.enum(["bike", "car", "premium"], {
    required_error: "Transport type is required",
  }),
  isWomenOnly: z.boolean().default(false),
  hasFixedDepartures: z.boolean().default(true),
  isCustomizable: z.boolean().default(true),
  availableDates: z.string().min(1, "Available dates are required"),
  bestTime: z.string().min(1, "Best time information is required"),
  groupSize: z.string().min(1, "Group size information is required"),
  terrain: z.string().min(1, "Terrain information is required"),
  elevation: z.string().min(1, "Elevation information is required"),
  accommodationType: z.string().min(1, "Accommodation type is required"),
});

type TourFormValues = z.infer<typeof tourSchema>;

const AdminTourEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== undefined;
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<TourPackageProps | null>(null);
  
  // Form for basic details
  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: '',
      overview: '',
      image: '',
      originalPrice: 0,
      discountedPrice: 0,
      discount: 0,
      transportType: 'car',
      isWomenOnly: false,
      hasFixedDepartures: true,
      isCustomizable: true,
      availableDates: 'June to October',
      bestTime: 'June to September',
      groupSize: '2-10 People',
      terrain: 'Himalayan Mountain Passes',
      elevation: '2,000 - 4,550 meters',
      accommodationType: 'Hotels & Homestays',
    },
  });
  
  // For duration and night stays
  const [duration, setDuration] = useState({ days: 1, nights: 0 });
  const [nightStays, setNightStays] = useState<{ location: string; nights: number }[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<{ day: number; title: string; description: string }[]>([]);
  
  // Load tour data for editing
  useEffect(() => {
    const loadTour = async () => {
      if (isEditing && id) {
        setIsLoading(true);
        try {
          const tour = await getTourByIndex(parseInt(id, 10));
          if (!tour) {
            toast({
              title: "Error",
              description: "Tour not found",
              variant: "destructive",
            });
            navigate('/admin/tours');
            return;
          }
          
          setInitialData(tour);
          
          // Populate form with tour data
          form.reset({
            title: tour.title,
            overview: tour.overview,
            image: tour.image,
            originalPrice: tour.originalPrice,
            discountedPrice: tour.discountedPrice,
            discount: tour.discount,
            transportType: tour.transportType,
            isWomenOnly: tour.isWomenOnly || false,
            hasFixedDepartures: tour.hasFixedDepartures !== false,
            isCustomizable: tour.isCustomizable !== false,
            availableDates: tour.availableDates || 'June to October',
            bestTime: tour.bestTime || 'June to September',
            groupSize: tour.groupSize || '2-10 People',
            terrain: tour.terrain || 'Himalayan Mountain Passes',
            elevation: tour.elevation || '2,000 - 4,550 meters',
            accommodationType: tour.accommodationType || 'Hotels & Homestays',
          });
          
          setDuration(tour.duration);
          setNightStays(tour.nightStays || []);
          setInclusions(tour.inclusions || []);
          setExclusions(tour.exclusions || []);
          setItinerary(tour.itinerary || []);
        } catch (error) {
          console.error("Error loading tour:", error);
          toast({
            title: "Error",
            description: "Failed to load tour details",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadTour();
  }, [isEditing, id, navigate, form]);
  
  // Handle form submission
  const onSubmit = async (values: TourFormValues) => {
    console.log("Form submitted with values:", values);
    setIsLoading(true);
    
    // Validation for basic requirements
    if (inclusions.length === 0) {
      toast({
        title: "Warning",
        description: "Please add at least one inclusion",
        variant: "destructive",
      });
      setActiveTab('inclusions');
      setIsLoading(false);
      return;
    }
    
    if (nightStays.length === 0) {
      toast({
        title: "Warning",
        description: "Please add at least one night stay location",
        variant: "destructive",
      });
      setActiveTab('details');
      setIsLoading(false);
      return;
    }
    
    // Create complete tour data by merging form values with other state
    const tourData: TourPackageProps = {
      title: values.title,
      image: values.image,
      originalPrice: values.originalPrice,
      discountedPrice: values.discountedPrice,
      discount: values.discount,
      transportType: values.transportType,
      overview: values.overview,
      duration,
      nightStays,
      inclusions,
      exclusions,
      itinerary,
      isWomenOnly: values.isWomenOnly,
      hasFixedDepartures: values.hasFixedDepartures,
      isCustomizable: values.isCustomizable,
      availableDates: values.availableDates,
      bestTime: values.bestTime,
      groupSize: values.groupSize,
      terrain: values.terrain,
      elevation: values.elevation,
      accommodationType: values.accommodationType,
      customUrl: initialData?.customUrl || '',
      departureDates: initialData?.departureDates || [],
    };
    
    try {
      console.log("Saving tour data:", tourData);
      if (isEditing && id) {
        await updateTour(parseInt(id, 10), tourData);
        toast({
          title: "Success",
          description: "Tour updated successfully",
        });
      } else {
        await addTour(tourData);
        toast({
          title: "Success",
          description: "Tour created successfully",
        });
      }
      navigate('/admin/tours');
    } catch (error) {
      console.error("Error saving tour:", error);
      toast({
        title: "Error",
        description: "Failed to save tour: " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper functions for arrays
  const addNightStay = () => {
    setNightStays([...nightStays, { location: '', nights: 1 }]);
  };
  
  const updateNightStay = (index: number, field: 'location' | 'nights', value: string | number) => {
    const updated = [...nightStays];
    updated[index] = { ...updated[index], [field]: value };
    setNightStays(updated);
  };
  
  const removeNightStay = (index: number) => {
    setNightStays(nightStays.filter((_, i) => i !== index));
  };
  
  const addInclusion = () => {
    setInclusions([...inclusions, '']);
  };
  
  const updateInclusion = (index: number, value: string) => {
    const updated = [...inclusions];
    updated[index] = value;
    setInclusions(updated);
  };
  
  const removeInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };
  
  const addExclusion = () => {
    setExclusions([...exclusions, '']);
  };
  
  const updateExclusion = (index: number, value: string) => {
    const updated = [...exclusions];
    updated[index] = value;
    setExclusions(updated);
  };
  
  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };
  
  const addItineraryDay = () => {
    const nextDay = itinerary.length > 0 
      ? Math.max(...itinerary.map(item => item.day)) + 1 
      : 1;
    
    setItinerary([...itinerary, { day: nextDay, title: '', description: '' }]);
  };
  
  const updateItineraryDay = (index: number, field: 'day' | 'title' | 'description', value: any) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setItinerary(updated);
  };
  
  const removeItineraryDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };
  
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
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading}
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tour title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="overview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overview</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter tour overview" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a full URL for the tour image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Original Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="discountedPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discounted Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="transportType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transport Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a transport type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="premium">Premium (Innova)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <FormField
                      control={form.control}
                      name="isWomenOnly"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Women Only Tour</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasFixedDepartures"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Has Fixed Departures</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isCustomizable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Is Customizable</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Days</label>
                      <Input
                        type="number"
                        min="1"
                        value={duration.days}
                        onChange={(e) => setDuration({ ...duration, days: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nights</label>
                      <Input
                        type="number"
                        min="0"
                        value={duration.nights}
                        onChange={(e) => setDuration({ ...duration, nights: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="availableDates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Dates</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., June to October" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bestTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Best Time to Visit</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., June to September" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="groupSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Group Size</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2-10 People" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="terrain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Terrain</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Himalayan Mountain Passes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="elevation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Elevation</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2,000 - 4,550 meters" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="accommodationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accommodation Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Hotels & Homestays" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Night Stays</h3>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={addNightStay}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Location
                      </Button>
                    </div>
                    
                    {nightStays.map((stay, index) => (
                      <div key={index} className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-3">
                          <label className="text-sm font-medium">Location</label>
                          <Input
                            value={stay.location}
                            onChange={(e) => updateNightStay(index, 'location', e.target.value)}
                            placeholder="Location name"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-sm font-medium">Nights</label>
                          <Input
                            type="number"
                            min="1"
                            value={stay.nights}
                            onChange={(e) => updateNightStay(index, 'nights', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="flex items-end justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeNightStay(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {nightStays.length === 0 && (
                      <div className="text-sm text-gray-500 py-2">
                        No night stays added. Click "Add Location" to add one.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inclusions">
              <Card>
                <CardHeader>
                  <CardTitle>Inclusions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Add items that are included in the package</p>
                    <Button 
                      type="button" 
                      onClick={addInclusion}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>
                  
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateInclusion(index, e.target.value)}
                        placeholder="Enter inclusion item"
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInclusion(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  
                  {inclusions.length === 0 && (
                    <div className="text-sm text-gray-500 py-2">
                      No inclusions added. Click "Add Item" to add one.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exclusions">
              <Card>
                <CardHeader>
                  <CardTitle>Exclusions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Add items that are not included in the package</p>
                    <Button 
                      type="button" 
                      onClick={addExclusion}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>
                  
                  {exclusions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateExclusion(index, e.target.value)}
                        placeholder="Enter exclusion item"
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExclusion(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  
                  {exclusions.length === 0 && (
                    <div className="text-sm text-gray-500 py-2">
                      No exclusions added. Click "Add Item" to add one.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="itinerary">
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Add day-by-day itinerary details</p>
                    <Button 
                      type="button" 
                      onClick={addItineraryDay}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Day
                    </Button>
                  </div>
                  
                  {itinerary.map((day, index) => (
                    <div key={index} className="space-y-3 border p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Day</h4>
                          <Input
                            type="number"
                            min="1"
                            value={day.day}
                            onChange={(e) => updateItineraryDay(index, 'day', parseInt(e.target.value) || 0)}
                            className="w-16"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItineraryDay(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={day.title}
                          onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                          placeholder="Day title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={day.description}
                          onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                          placeholder="Day description"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {itinerary.length === 0 && (
                    <div className="text-sm text-gray-500 py-2">
                      No itinerary days added. Click "Add Day" to add one.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AdminTourEdit;
