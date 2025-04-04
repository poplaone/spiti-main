
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { tourPackagesData } from '@/data/tourPackagesData';
import { ArrowDownToLine, Loader2 } from 'lucide-react';

const SeedOriginalToursButton = () => {
  const [loading, setLoading] = useState(false);
  
  const seedTourData = async () => {
    try {
      setLoading(true);
      
      for (const tourPackage of tourPackagesData) {
        // Create the tour package
        const { data: packageData, error: packageError } = await supabase
          .from('tour_packages')
          .insert({
            title: tourPackage.title,
            image: tourPackage.image,
            original_price: tourPackage.originalPrice,
            discounted_price: tourPackage.discountedPrice,
            discount: tourPackage.discount,
            duration_nights: tourPackage.duration.nights,
            duration_days: tourPackage.duration.days,
            transport_type: tourPackage.transportType,
            is_women_only: tourPackage.isWomenOnly,
            overview: tourPackage.overview
          })
          .select('id')
          .single();
          
        if (packageError) {
          console.error('Error creating tour package:', packageError);
          continue;
        }
        
        const tourId = packageData.id;
        
        // Add night stays
        if (tourPackage.nightStays && tourPackage.nightStays.length > 0) {
          for (const stay of tourPackage.nightStays) {
            await supabase
              .from('night_stays')
              .insert({
                tour_package_id: tourId,
                location: stay.location,
                nights: stay.nights
              });
          }
        }
        
        // Add inclusions
        if (tourPackage.inclusions && tourPackage.inclusions.length > 0) {
          for (const inclusion of tourPackage.inclusions) {
            await supabase
              .from('inclusions')
              .insert({
                tour_package_id: tourId,
                description: inclusion
              });
          }
        }
        
        // Add exclusions
        if (tourPackage.exclusions && tourPackage.exclusions.length > 0) {
          for (const exclusion of tourPackage.exclusions) {
            await supabase
              .from('exclusions')
              .insert({
                tour_package_id: tourId,
                description: exclusion
              });
          }
        }
        
        // Add itinerary days
        if (tourPackage.itinerary && tourPackage.itinerary.length > 0) {
          for (const day of tourPackage.itinerary) {
            await supabase
              .from('itinerary_days')
              .insert({
                tour_package_id: tourId,
                day_number: day.day,
                title: day.title,
                description: day.description
              });
          }
        }
      }
      
      toast.success('Original tour packages successfully added to the database!');
    } catch (error) {
      console.error('Error seeding original tours:', error);
      toast.error('Failed to seed original tour packages.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={seedTourData}
      disabled={loading}
      className="bg-spiti-forest hover:bg-spiti-forest/90"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importing Tour Data...
        </>
      ) : (
        <>
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Import Original Tour Data
        </>
      )}
    </Button>
  );
};

export default SeedOriginalToursButton;
