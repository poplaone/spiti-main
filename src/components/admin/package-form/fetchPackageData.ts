
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NightStay, Inclusion, Exclusion, ItineraryDay, TourPackageFormData } from "./types";

export const fetchPackageData = async (packageId: string): Promise<TourPackageFormData | null> => {
  try {
    const { data: packageData, error: packageError } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', packageId)
      .single();
    
    if (packageError) throw packageError;
    
    let formData: Partial<TourPackageFormData> = {
      title: packageData.title || '',
      originalPrice: packageData.original_price?.toString() || '',
      discountedPrice: packageData.discounted_price?.toString() || '',
      transportType: packageData.transport_type || 'car',
      durationNights: packageData.duration_nights?.toString() || '',
      durationDays: packageData.duration_days?.toString() || '',
      overview: packageData.overview || '',
      isWomenOnly: packageData.is_women_only || false,
      isFixedDeparture: packageData.is_fixed_departure || false,
      isCustomizable: packageData.is_customizable !== false,
      imagePreview: packageData.image || '',
      accommodation: 'Hotels & Homestays',
      bestTime: 'June to September',
      groupSize: '2-10 People',
      terrain: 'Himalayan Mountain Passes',
      elevation: '2,000 - 4,550 meters',
      availableFrom: 'June',
      availableTo: 'October'
    };
    
    // Load overview details if available
    if (packageData.overview_details) {
      try {
        const details = JSON.parse(packageData.overview_details as string) as Record<string, any>;
        formData.accommodation = typeof details.accommodation === 'string' ? details.accommodation : 'Hotels & Homestays';
        formData.bestTime = typeof details.bestTime === 'string' ? details.bestTime : 'June to September';
        formData.groupSize = typeof details.groupSize === 'string' ? details.groupSize : '2-10 People';
        formData.terrain = typeof details.terrain === 'string' ? details.terrain : 'Himalayan Mountain Passes';
        formData.elevation = typeof details.elevation === 'string' ? details.elevation : '2,000 - 4,550 meters';
        formData.availableFrom = typeof details.availableFrom === 'string' ? details.availableFrom : 'June';
        formData.availableTo = typeof details.availableTo === 'string' ? details.availableTo : 'October';
      } catch (e) {
        console.error("Error parsing overview details:", e);
      }
    }
    
    // Get night stays
    const { data: nightStaysData, error: nightStaysError } = await supabase
      .from('night_stays')
      .select('*')
      .eq('tour_package_id', packageId)
      .order('order', { ascending: true });
    
    if (!nightStaysError) {
      formData.nightStays = nightStaysData || [];
    }
    
    // Get inclusions
    const { data: inclusionsData, error: inclusionsError } = await supabase
      .from('inclusions')
      .select('*')
      .eq('tour_package_id', packageId)
      .order('id');
    
    if (!inclusionsError) {
      formData.inclusions = inclusionsData || [];
    }
    
    // Get exclusions
    const { data: exclusionsData, error: exclusionsError } = await supabase
      .from('exclusions')
      .select('*')
      .eq('tour_package_id', packageId)
      .order('id');
    
    if (!exclusionsError) {
      formData.exclusions = exclusionsData || [];
    }
    
    // Get itinerary
    const { data: itineraryData, error: itineraryError } = await supabase
      .from('itinerary_days')
      .select('*')
      .eq('tour_package_id', packageId)
      .order('day_number');
    
    if (!itineraryError) {
      formData.itineraryDays = itineraryData || [];
    }

    return formData as TourPackageFormData;
  } catch (error: any) {
    toast.error(`Error loading tour package: ${error.message}`);
    return null;
  }
};
