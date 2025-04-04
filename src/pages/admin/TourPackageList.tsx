
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Edit, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TourPackage {
  id: string;
  title: string;
  image: string;
  original_price: number;
  discounted_price: number;
  discount: number;
  transport_type: string;
  is_women_only: boolean;
  created_at: string;
  updated_at: string;
}

const TourPackageList: React.FC = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('title');
      
      if (error) throw error;
      setPackages(data || []);
    } catch (error: any) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load tour packages');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setDeleteLoading(true);
      
      // First delete related records to avoid foreign key constraint errors
      // Delete night stays
      await supabase
        .from('night_stays')
        .delete()
        .eq('tour_package_id', deleteId);
      
      // Delete inclusions
      await supabase
        .from('inclusions')
        .delete()
        .eq('tour_package_id', deleteId);
      
      // Delete exclusions
      await supabase
        .from('exclusions')
        .delete()
        .eq('tour_package_id', deleteId);
      
      // Delete itinerary days
      await supabase
        .from('itinerary_days')
        .delete()
        .eq('tour_package_id', deleteId);
      
      // Finally delete the tour package
      const { error } = await supabase
        .from('tour_packages')
        .delete()
        .eq('id', deleteId);
      
      if (error) throw error;
      
      // Delete the tour image from storage
      const packageData = packages.find(p => p.id === deleteId);
      if (packageData?.image) {
        const imagePath = packageData.image.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('tour_images')
            .remove([imagePath]);
        }
      }
      
      toast.success('Tour package deleted successfully');
      setPackages(packages.filter(p => p.id !== deleteId));
      setDeleteId(null);
    } catch (error: any) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete tour package');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tour Packages</h1>
        <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
          <Link to="/admin/tour-packages/create">
            <Plus className="w-4 h-4 mr-2" />
            Add New Package
          </Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-spiti-forest border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading tour packages...</p>
        </div>
      ) : packages.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-xl font-medium mb-2">No tour packages yet</h2>
          <p className="text-gray-500 mb-6">
            Create your first tour package to get started.
          </p>
          <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
            <Link to="/admin/tour-packages/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Tour Package
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Transport</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{pkg.title}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-semibold">₹{pkg.discounted_price.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-500 line-through">₹{pkg.original_price.toLocaleString('en-IN')}</div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{pkg.transport_type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Active
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/admin/tour-packages/edit/${pkg.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => confirmDelete(pkg.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Tour Package</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete "{pkg.title}"? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              variant="destructive"
                              onClick={handleDelete}
                              disabled={deleteLoading}
                            >
                              {deleteLoading ? 'Deleting...' : 'Delete'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TourPackageList;
