
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the form schema
const tourSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  transport_type: z.enum(["bike", "car", "innova"]),
  nights: z.number().min(1, { message: "Must have at least 1 night" }),
  days: z.number().min(1, { message: "Must have at least 1 day" }),
  original_price: z.number().min(1, { message: "Price must be greater than 0" }),
  discounted_price: z.number().min(1, { message: "Discounted price must be greater than 0" }),
  discount: z.number().min(0).max(100, { message: "Discount must be between 0 and 100%" }),
  is_women_only: z.boolean().default(false),
  has_fixed_departures: z.boolean().default(true),
  is_customizable: z.boolean().default(true),
  available_from: z.string().min(3, { message: "Please provide availability information" }),
  overview: z.string().optional(),
  night_stays: z.array(z.object({
    location: z.string().min(1, { message: "Location is required" }),
    nights: z.number().min(1, { message: "Must be at least 1 night" }),
  })).min(1, { message: "At least one night stay is required" }),
  inclusions: z.array(z.object({
    description: z.string().min(1, { message: "Description is required" }),
  })).min(1, { message: "At least one inclusion is required" }),
  exclusions: z.array(z.object({
    description: z.string().min(1, { message: "Description is required" }),
  })).min(1, { message: "At least one exclusion is required" }),
  itinerary: z.array(z.object({
    day_number: z.number().min(1, { message: "Day number is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  })).min(1, { message: "At least one itinerary day is required" }),
});

type TourFormValues = z.infer<typeof tourSchema>;

interface TourFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const TourForm: React.FC<TourFormProps> = ({ initialData, isEdit = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Transform initial data for the form
  const defaultValues: Partial<TourFormValues> = {
    title: initialData?.title || '',
    transport_type: initialData?.transport_type || 'car',
    nights: initialData?.nights || 1,
    days: initialData?.days || 2,
    original_price: initialData?.original_price || 0,
    discounted_price: initialData?.discounted_price || 0,
    discount: initialData?.discount || 0,
    is_women_only: initialData?.is_women_only || false,
    has_fixed_departures: initialData?.has_fixed_departures !== undefined ? initialData.has_fixed_departures : true,
    is_customizable: initialData?.is_customizable !== undefined ? initialData.is_customizable : true,
    available_from: initialData?.available_from || 'June to October',
    overview: initialData?.overview || '',
    night_stays: initialData?.night_stays || [{ location: '', nights: 1 }],
    inclusions: initialData?.inclusions || [{ description: '' }],
    exclusions: initialData?.exclusions || [{ description: '' }],
    itinerary: initialData?.itinerary || [{ day_number: 1, title: '', description: '' }],
  };

  // Initialize the form
  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues,
  });

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: TourFormValues) => {
    setIsSubmitting(true);
    try {
      let imageUrl = initialData?.image || null;

      // Upload image if selected
      if (image) {
        const fileName = `tour-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('tour-images')
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        if (uploadData) {
          const { data: urlData } = supabase.storage.from('tour-images').getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
        }
      }

      // Insert or update tour data
      let tourId = initialData?.id;
      if (isEdit && tourId) {
        // Update existing tour
        const { error: tourError } = await supabase
          .from('tours')
          .update({
            title: data.title,
            image: imageUrl,
            transport_type: data.transport_type,
            nights: data.nights,
            days: data.days,
            original_price: data.original_price,
            discounted_price: data.discounted_price,
            discount: data.discount,
            is_women_only: data.is_women_only,
            has_fixed_departures: data.has_fixed_departures,
            is_customizable: data.is_customizable,
            available_from: data.available_from,
            overview: data.overview,
            updated_at: new Date().toISOString(), // Fix: Convert Date to ISO string
          })
          .eq('id', tourId);

        if (tourError) {
          throw tourError;
        }

        // Delete existing night stays, inclusions, exclusions, and itinerary
        await Promise.all([
          supabase.from('night_stays').delete().eq('tour_id', tourId),
          supabase.from('inclusions').delete().eq('tour_id', tourId),
          supabase.from('exclusions').delete().eq('tour_id', tourId),
          supabase.from('itinerary_days').delete().eq('tour_id', tourId),
        ]);
      } else {
        // Insert new tour
        const { data: tourData, error: tourError } = await supabase
          .from('tours')
          .insert({
            title: data.title,
            image: imageUrl,
            transport_type: data.transport_type,
            nights: data.nights,
            days: data.days,
            original_price: data.original_price,
            discounted_price: data.discounted_price,
            discount: data.discount,
            is_women_only: data.is_women_only,
            has_fixed_departures: data.has_fixed_departures,
            is_customizable: data.is_customizable,
            available_from: data.available_from,
            overview: data.overview,
          })
          .select();

        if (tourError) {
          throw tourError;
        }

        if (tourData && tourData.length > 0) {
          tourId = tourData[0].id;
        }
      }

      if (tourId) {
        // Insert night stays
        if (data.night_stays && data.night_stays.length > 0) {
          const { error: nightStaysError } = await supabase
            .from('night_stays')
            .insert(data.night_stays.map(stay => ({
              tour_id: tourId,
              location: stay.location,
              nights: stay.nights,
            })));

          if (nightStaysError) {
            throw nightStaysError;
          }
        }

        // Insert inclusions
        if (data.inclusions && data.inclusions.length > 0) {
          const { error: inclusionsError } = await supabase
            .from('inclusions')
            .insert(data.inclusions.map(inclusion => ({
              tour_id: tourId,
              description: inclusion.description,
            })));

          if (inclusionsError) {
            throw inclusionsError;
          }
        }

        // Insert exclusions
        if (data.exclusions && data.exclusions.length > 0) {
          const { error: exclusionsError } = await supabase
            .from('exclusions')
            .insert(data.exclusions.map(exclusion => ({
              tour_id: tourId,
              description: exclusion.description,
            })));

          if (exclusionsError) {
            throw exclusionsError;
          }
        }

        // Insert itinerary days
        if (data.itinerary && data.itinerary.length > 0) {
          const { error: itineraryError } = await supabase
            .from('itinerary_days')
            .insert(data.itinerary.map(day => ({
              tour_id: tourId,
              day_number: day.day_number,
              title: day.title,
              description: day.description,
            })));

          if (itineraryError) {
            throw itineraryError;
          }
        }
      }

      toast({
        title: "Success",
        description: isEdit ? "Tour updated successfully" : "Tour created successfully",
      });

      navigate('/admin/tours');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Tour Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tour Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              name="transport_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Type</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transport type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="innova">Innova</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Nights</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter number of nights" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Days</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter number of days" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="original_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter original price" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discounted_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted Price (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter discounted price" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
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
                  <FormLabel>Discount Percentage (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter discount percentage" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="is_women_only"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-spiti-blue focus:ring-spiti-blue"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Women Only Tour</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_fixed_departures"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-spiti-blue focus:ring-spiti-blue"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Fixed Departures</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_customizable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-spiti-blue focus:ring-spiti-blue"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Customizable</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="available_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available From</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., June to October" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Overview</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter tour overview" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormLabel>Tour Image</FormLabel>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img 
                  src={imagePreview} 
                  alt="Tour preview" 
                  className="h-40 object-cover rounded-md" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Night Stays Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Night Stays</h2>
          
          {form.watch('night_stays').map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b">
              <FormField
                control={form.control}
                name={`night_stays.${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`night_stays.${index}.nights`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nights at Location {index + 1}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter number of nights" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="justify-self-end text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => {
                    const currentStays = form.getValues('night_stays');
                    form.setValue(
                      'night_stays', 
                      currentStays.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentStays = form.getValues('night_stays');
              form.setValue('night_stays', [
                ...currentStays,
                { location: '', nights: 1 }
              ]);
            }}
          >
            Add Night Stay
          </Button>
        </div>

        {/* Inclusions Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Inclusions</h2>
          
          {form.watch('inclusions').map((_, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <FormField
                control={form.control}
                name={`inclusions.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                      <FormControl>
                        <Input placeholder="Enter inclusion" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => {
                    const current = form.getValues('inclusions');
                    form.setValue(
                      'inclusions', 
                      current.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const current = form.getValues('inclusions');
              form.setValue('inclusions', [
                ...current,
                { description: '' }
              ]);
            }}
          >
            Add Inclusion
          </Button>
        </div>

        {/* Exclusions Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Exclusions</h2>
          
          {form.watch('exclusions').map((_, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <FormField
                control={form.control}
                name={`exclusions.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center gap-2">
                      <X className="text-red-500 w-5 h-5 flex-shrink-0" />
                      <FormControl>
                        <Input placeholder="Enter exclusion" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => {
                    const current = form.getValues('exclusions');
                    form.setValue(
                      'exclusions', 
                      current.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const current = form.getValues('exclusions');
              form.setValue('exclusions', [
                ...current,
                { description: '' }
              ]);
            }}
          >
            Add Exclusion
          </Button>
        </div>

        {/* Itinerary Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
          
          {form.watch('itinerary').map((day, index) => (
            <div key={index} className="mb-8 pb-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <FormField
                  control={form.control}
                  name={`itinerary.${index}.day_number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter day number" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`itinerary.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter day title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name={`itinerary.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter day description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {index > 0 && (
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => {
                      const current = form.getValues('itinerary');
                      form.setValue(
                        'itinerary', 
                        current.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove Day
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const current = form.getValues('itinerary');
              const nextDayNumber = current.length > 0 ? Math.max(...current.map(d => d.day_number)) + 1 : 1;
              form.setValue('itinerary', [
                ...current,
                { day_number: nextDayNumber, title: '', description: '' }
              ]);
            }}
          >
            Add Itinerary Day
          </Button>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/tours')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEdit ? "Update Tour" : "Create Tour"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TourForm;
