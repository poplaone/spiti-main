
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Tour {
  id: string;
  title: string;
  transport_type: 'bike' | 'car' | 'innova';
  nights: number;
  days: number;
  original_price: number;
  discounted_price: number;
  discount: number;
  has_fixed_departures: boolean;
  is_customizable: boolean;
}

const AdminTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch tours from the database
  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setTours(data as Tour[]);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load tours",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a tour
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      try {
        // Delete related records first (due to foreign key constraints)
        await supabase.from('night_stays').delete().eq('tour_id', id);
        await supabase.from('inclusions').delete().eq('tour_id', id);
        await supabase.from('exclusions').delete().eq('tour_id', id);
        await supabase.from('itinerary_days').delete().eq('tour_id', id);

        // Then delete the tour
        const { error } = await supabase
          .from('tours')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: "Success",
          description: "Tour deleted successfully",
        });
        
        fetchTours(); // Refresh the list
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete tour",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchTours();
    }
  }, [user]);

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tours</h1>
          <Button onClick={() => navigate('/admin/tours/new')}>Add New Tour</Button>
        </div>

        {isLoading ? (
          <div className="text-center p-10">
            <Loader2 className="h-10 w-10 animate-spin mx-auto" />
            <p className="mt-2">Loading tours...</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <p className="text-gray-600 mb-4">No tours found. Create one to get started!</p>
            <Button 
              onClick={() => navigate('/admin/tours/new')}
              className="mt-4"
            >
              Create Tour
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell className="font-medium">{tour.title}</TableCell>
                    <TableCell className="capitalize">{tour.transport_type}</TableCell>
                    <TableCell>{tour.nights} nights / {tour.days} days</TableCell>
                    <TableCell>
                      <div>
                        <span className="line-through text-gray-400">₹{tour.original_price.toLocaleString('en-IN')}</span>
                        <span className="ml-2 font-bold">₹{tour.discounted_price.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-xs text-green-600">{tour.discount}% Off</span>
                    </TableCell>
                    <TableCell>
                      {tour.has_fixed_departures ? 'Fixed' : ''} 
                      {tour.has_fixed_departures && tour.is_customizable ? ' & ' : ''}
                      {tour.is_customizable ? 'Custom' : ''}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/tours/edit/${tour.id}`)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(tour.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTours;
