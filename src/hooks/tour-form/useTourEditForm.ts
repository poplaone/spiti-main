import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { getTourByIndex, addTour, updateTour } from '@/services/tourService';
import { TourPackageProps, DepartureDate } from '@/components/TourPackage';
import { v4 as uuidv4 } from 'uuid';

// Form schema
export const tourSchema = z.object({
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

export type TourFormValues = z.infer<typeof tourSchema>;

export const useTourEditForm = (tourId?: string) => {
  const navigate = useNavigate();
  const isEditing = tourId !== undefined;
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<TourPackageProps | null>(null);
  
  // For additional tour details not in the main form
  const [duration, setDuration] = useState({ days: 1, nights: 0 });
  const [nightStays, setNightStays] = useState<{ location: string; nights: number }[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<{ day: number; title: string; description: string }[]>([]);
  const [departureDates, setDepartureDates] = useState<DepartureDate[]>([]);
  
  // Setup the form
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

  // Load tour data for editing
  useEffect(() => {
    const loadTour = async () => {
      if (isEditing && tourId) {
        setIsLoading(true);
        try {
          const tour = await getTourByIndex(parseInt(tourId, 10));
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
          setDepartureDates(tour.departureDates || []);
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
  }, [isEditing, tourId, navigate, form]);
  
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
  
  const addDepartureDate = () => {
    setDepartureDates([
      ...departureDates, 
      { 
        id: uuidv4(), 
        startDate: new Date(), 
        endDate: new Date(new Date().setDate(new Date().getDate() + 4)), 
        status: "Available" 
      }
    ]);
  };
  
  const updateDepartureDate = (index: number, field: keyof DepartureDate, value: any) => {
    const updated = [...departureDates];
    updated[index] = { ...updated[index], [field]: value };
    setDepartureDates(updated);
  };
  
  const removeDepartureDate = (index: number) => {
    setDepartureDates(departureDates.filter((_, i) => i !== index));
  };
  
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
    
    // Filter out empty items
    const filteredInclusions = inclusions.filter(item => item.trim() !== '');
    const filteredExclusions = exclusions.filter(item => item.trim() !== '');
    const filteredItinerary = itinerary.filter(item => item.title.trim() !== '' || item.description.trim() !== '');
    
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
      inclusions: filteredInclusions,
      exclusions: filteredExclusions,
      itinerary: filteredItinerary,
      departureDates: departureDates,
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
      index: initialData?.index ?? 0,
    };
    
    try {
      console.log("Saving tour data:", tourData);
      if (isEditing && tourId) {
        await updateTour(parseInt(tourId, 10), tourData);
        toast({
          title: "Success",
          description: "Tour updated successfully",
        });
      } else {
        console.log("Adding new tour:", tourData);
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

  return {
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
    departureDates,
    addDepartureDate,
    updateDepartureDate,
    removeDepartureDate,
    onSubmit,
    navigate
  };
};
