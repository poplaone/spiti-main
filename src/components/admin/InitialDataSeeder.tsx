
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const InitialDataSeeder: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const seedDemoData = async () => {
    try {
      setLoading(true);

      // Create a sample tour package
      const { data: tourData, error: tourError } = await supabase
        .from('tour_packages')
        .insert({
          title: 'BIKE TOUR - MANALI TO SPITI VALLEY',
          image: '/lovable-uploads/666eddfd-7fea-48b0-9cfa-543555743e7a.png',
          original_price: 24999,
          discounted_price: 19999,
          discount: 20,
          duration_nights: 7,
          duration_days: 8,
          transport_type: 'bike',
          is_women_only: false,
          overview: 'Experience the beauty of Spiti Valley on a thrilling bike tour starting from Manali.'
        })
        .select('id')
        .single();

      if (tourError) throw tourError;
      const tourId = tourData.id;

      // Add night stays
      await supabase
        .from('night_stays')
        .insert([
          { tour_package_id: tourId, location: 'Manali', nights: 1 },
          { tour_package_id: tourId, location: 'Kaza', nights: 3 },
          { tour_package_id: tourId, location: 'Tabo', nights: 2 },
          { tour_package_id: tourId, location: 'Chandratal', nights: 1 }
        ]);

      // Add inclusions
      await supabase
        .from('inclusions')
        .insert([
          { tour_package_id: tourId, description: 'Royal Enfield 350cc bike' },
          { tour_package_id: tourId, description: 'Fuel for the entire journey' },
          { tour_package_id: tourId, description: 'Accommodation on twin/triple sharing basis' },
          { tour_package_id: tourId, description: 'All meals (breakfast, lunch, dinner)' },
          { tour_package_id: tourId, description: 'Experienced tour guide' }
        ]);

      // Add exclusions
      await supabase
        .from('exclusions')
        .insert([
          { tour_package_id: tourId, description: 'Any personal expenses' },
          { tour_package_id: tourId, description: 'Travel insurance' },
          { tour_package_id: tourId, description: 'Any monument entry fees' },
          { tour_package_id: tourId, description: 'Any activities not mentioned in inclusions' }
        ]);

      // Add itinerary
      await supabase
        .from('itinerary_days')
        .insert([
          { 
            tour_package_id: tourId, 
            day_number: 1, 
            title: 'Arrival in Manali', 
            description: 'Arrive in Manali and check in to the hotel. Briefing about the tour and bike handover.' 
          },
          { 
            tour_package_id: tourId, 
            day_number: 2, 
            title: 'Manali to Kaza', 
            description: 'Ride through the beautiful Rohtang Pass and Kunzum Pass to reach Kaza.' 
          },
          { 
            tour_package_id: tourId, 
            day_number: 3, 
            title: 'Exploring Kaza', 
            description: 'Visit Key Monastery and Kibber Village. Experience local culture and cuisine.' 
          }
        ]);

      toast.success('Demo data has been successfully created!');
      
    } catch (error: any) {
      console.error('Error seeding data:', error);
      toast.error(`Failed to seed data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-2">Demo Data</h3>
      <p className="text-sm text-gray-600 mb-3">
        Create sample tour data to test the application.
      </p>
      <Button 
        onClick={seedDemoData} 
        disabled={loading}
        className="bg-spiti-forest hover:bg-spiti-forest/90"
      >
        {loading ? 'Creating...' : 'Create Demo Tour'}
      </Button>
    </div>
  );
};

export default InitialDataSeeder;
