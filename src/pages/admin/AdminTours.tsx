
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell, TableCaption 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { getAllTours, deleteTour, resetToDefaultTours } from '@/services/tourService';
import { TourPackageProps } from '@/components/TourPackage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AdminTours: React.FC = () => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  // Load tours when component mounts
  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    setLoading(true);
    try {
      const tourData = await getAllTours();
      setTours(tourData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive",
      });
      console.error("Failed to load tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (index: number) => {
    setTourToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (tourToDelete !== null) {
      try {
        await deleteTour(tourToDelete);
        toast({
          title: "Success",
          description: "Tour deleted successfully",
        });
        loadTours(); // Reload tours after deletion
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete tour",
          variant: "destructive",
        });
        console.error("Failed to delete tour:", error);
      }
      setDeleteDialogOpen(false);
    }
  };

  const handleReset = async () => {
    try {
      await resetToDefaultTours();
      toast({
        title: "Success",
        description: "Tours reset to default data",
      });
      loadTours();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset tours",
        variant: "destructive",
      });
      console.error("Failed to reset tours:", error);
    }
    setResetDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading tours...</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tour Packages</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setResetDialogOpen(true)}
            >
              Reset to Default
            </Button>
            <Button 
              onClick={() => navigate('/admin/tours/new')}
            >
              <Plus className="mr-1 h-4 w-4" /> Add New Tour
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of all tour packages</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Transport</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map((tour, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index}</TableCell>
                    <TableCell>{tour.title}</TableCell>
                    <TableCell>₹{tour.discountedPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      {tour.duration.nights} Nights / {tour.duration.days} Days
                    </TableCell>
                    <TableCell className="capitalize">{tour.transportType}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/tours/edit/${index}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {tours.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No tours found. Click "Add New Tour" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the tour. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Default?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all tours to their default state, discarding any changes you've made.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-amber-600 hover:bg-amber-700"
              onClick={handleReset}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminTours;
