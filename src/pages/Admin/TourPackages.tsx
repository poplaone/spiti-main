
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { TourPackageProps } from "@/components/TourPackage";
import { tourPackagesData } from '@/data/tourPackagesData';

const TourPackages = () => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourPackageProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize tours from data
    setTours([...tourPackagesData]);
    setFilteredTours([...tourPackagesData]);
  }, []);

  useEffect(() => {
    // Filter tours based on search term
    const filtered = tours.filter(tour => 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTours(filtered);
  }, [searchTerm, tours]);

  const handleDeleteConfirm = () => {
    if (tourToDelete !== null) {
      // In a real app, you would delete from database
      // For now, we'll just remove from state
      const updatedTours = tours.filter((_, index) => index !== tourToDelete);
      setTours(updatedTours);
      
      toast({
        description: "Tour package deleted successfully",
      });
      
      setDeleteDialogOpen(false);
      setTourToDelete(null);
    }
  };

  const handleDeleteClick = (index: number) => {
    setTourToDelete(index);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Tour Packages</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-[250px]"
            />
          </div>
          
          <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
            <Link to="/admin/tours/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Package
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Duration</th>
                <th className="text-left p-4">Price</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{tour.title}</div>
                  </td>
                  <td className="p-4">
                    {tour.duration.nights} Nights / {tour.duration.days} Days
                  </td>
                  <td className="p-4">
                    <div className="font-medium">₹{tour.discountedPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 line-through">₹{tour.originalPrice.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/tours/edit/${index}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTours.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No tour packages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tour package? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourPackages;
