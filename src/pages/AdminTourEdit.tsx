
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import TourForm from '@/components/admin/TourForm';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface TourData {
  id: string;
  title: string;
  [key: string]: any;
}

const AdminTourEdit = () => {
  const [tour, setTour] = useState<TourData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchTourData = async () => {
      if (!id || !user) return;

      try {
        // Fetch tour data
        const { data: tourData, error: tourError } = await supabase
          .from('tours')
          .select('*')
          .eq('id', id)
          .single();

        if (tourError) throw tourError;
        if (!tourData) throw new Error('Tour not found');

        // Fetch night stays
        const { data: nightStays, error: nightStaysError } = await supabase
          .from('night_stays')
          .select('*')
          .eq('tour_id', id);

        if (nightStaysError) throw nightStaysError;

        // Fetch inclusions
        const { data: inclusions, error: inclusionsError } = await supabase
          .from('inclusions')
          .select('*')
          .eq('tour_id', id);

        if (inclusionsError) throw inclusionsError;

        // Fetch exclusions
        const { data: exclusions, error: exclusionsError } = await supabase
          .from('exclusions')
          .select('*')
          .eq('tour_id', id);

        if (exclusionsError) throw exclusionsError;

        // Fetch itinerary days
        const { data: itinerary, error: itineraryError } = await supabase
          .from('itinerary_days')
          .select('*')
          .eq('tour_id', id)
          .order('day_number', { ascending: true });

        if (itineraryError) throw itineraryError;

        // Combine data for the form
        setTour({
          ...tourData,
          night_stays: nightStays || [],
          inclusions: inclusions || [],
          exclusions: exclusions || [],
          itinerary: itinerary || []
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load tour data",
          variant: "destructive",
        });
        navigate('/admin/tours');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTourData();
    }
  }, [id, toast, navigate, user]);

  if (authLoading || (isLoading && user)) {
    return (
      <AdminLayout>
        <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="mt-4">Loading tour data...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (!tour) {
    return (
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Tour</h1>
          <div className="text-center p-4 bg-red-50 text-red-700 rounded-md">
            Tour not found
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Tour: {tour.title}</h1>
        <TourForm initialData={tour} isEdit={true} />
      </div>
    </AdminLayout>
  );
};

export default AdminTourEdit;
