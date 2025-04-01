
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { TourPackageProps, DepartureDateField } from '@/components/TourPackage.d';
import { TourItineraryDay, TourNightStay } from '@/data/types/tourTypes';
import { createTourPackage, updateTourPackage } from '@/lib/db';

interface UseTourPackageFormProps {
  id: string | undefined;
  existingPackage: TourPackageProps | null;
  isNew: boolean;
}

const useTourPackageForm = ({
  id,
  existingPackage,
  isNew
}: UseTourPackageFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
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

  // Image handling
  const [imageMethod, setImageMethod] = useState<'url' | 'upload'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Night stays handling
  const [nightStaysFields, setNightStaysFields] = useState<TourNightStay[]>([
    { location: '', nights: 1 }
  ]);

  // Text areas for inclusions and exclusions
  const [inclusionsText, setInclusionsText] = useState('');
  const [exclusionsText, setExclusionsText] = useState('');

  // Itinerary handling
  const [itineraryFields, setItineraryFields] = useState<TourItineraryDay[]>([
    { day: 1, title: '', description: '' }
  ]);

  // Departure dates handling
  const [departureDatesFields, setDepartureDatesFields] = useState<DepartureDateField[]>([
    { date: '', available: true, price: undefined }
  ]);

  // Initialize form data from existing package
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

  // Initialize night stays from existing package
  useEffect(() => {
    if (existingPackage?.nightStays?.length) {
      setNightStaysFields(existingPackage.nightStays);
    }
  }, [existingPackage]);

  // Initialize inclusions and exclusions text from existing package
  useEffect(() => {
    if (existingPackage?.inclusions?.length) {
      setInclusionsText(existingPackage.inclusions.join('\n'));
    }
    if (existingPackage?.exclusions?.length) {
      setExclusionsText(existingPackage.exclusions.join('\n'));
    }
  }, [existingPackage]);

  // Initialize itinerary from existing package
  useEffect(() => {
    if (existingPackage?.itinerary?.length) {
      setItineraryFields(existingPackage.itinerary);
    }
  }, [existingPackage]);

  // Initialize departure dates from form data
  useEffect(() => {
    if (formData.departureDates?.length) {
      setDepartureDatesFields(formData.departureDates);
    }
  }, [formData.departureDates]);

  // Form input handlers
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

  // Image handlers
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

  // Night stays handlers
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

  // Inclusions and exclusions handlers
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

  // Itinerary handlers
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

  // Departure dates handlers
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

  // Form submission
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
      
      const packageData = {
        ...formData,
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
        result = await updateTourPackage(id, packageData);
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

  return {
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
    handleCheckboxChange,
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
  };
};

export default useTourPackageForm;
