
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Search, Bike, Car, Image } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface TourPackage {
  id: string;
  title: string;
  original_price: number;
  discounted_price: number;
  discount: number;
  duration_nights: number;
  duration_days: number;
  transport_type: string;
  image: string;
  is_women_only: boolean;
}

const TourPackageList = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTourPackages = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('title');
        
      if (error) throw error;
      
      setPackages(data || []);
    } catch (error: any) {
      toast.error(`Error fetching tour packages: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourPackages();
  }, []);

  const handleDeletePackage = async (id: string) => {
    try {
      // First get the image URL to delete from storage
      const { data: packageData, error: fetchError } = await supabase
        .from('tour_packages')
        .select('image')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Delete the package (cascade will delete related records)
      const { error } = await supabase
        .from('tour_packages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // If there's an image URL that includes storage reference, delete it
      if (packageData?.image && packageData.image.includes('storage')) {
        try {
          const imagePath = packageData.image.split('/').pop();
          if (imagePath) {
            await supabase.storage
              .from('tour_images')
              .remove([imagePath]);
          }
        } catch (storageError) {
          console.error('Error deleting image:', storageError);
        }
      }
      
      toast.success('Tour package deleted successfully');
      fetchTourPackages();
    } catch (error: any) {
      toast.error(`Error deleting tour package: ${error.message}`);
    }
  };

  const filteredPackages = searchTerm
    ? packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : packages;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tour Packages</h1>
        <Link to="/admin/tour-packages/create">
          <Button className="bg-spiti-forest hover:bg-spiti-forest/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Package
          </Button>
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <Input
              placeholder="Search tour packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 pl-0"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-spiti-forest border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading tour packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="p-8 text-center">
            {searchTerm ? (
              <p className="text-gray-500">No tour packages matching "{searchTerm}"</p>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">No tour packages found</p>
                <Link to="/admin/tour-packages/create">
                  <Button>Create your first package</Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>
                    {pkg.transport_type === 'bike' ? (
                      <Bike className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Car className="h-5 w-5 text-green-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded overflow-hidden">
                      {pkg.image ? (
                        <img 
                          src={pkg.image} 
                          alt={pkg.title} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <Image className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{pkg.title}</TableCell>
                  <TableCell className="text-right">
                    <div>₹{pkg.discounted_price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 line-through">₹{pkg.original_price.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    {pkg.duration_nights} Nights / {pkg.duration_days} Days
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/admin/tour-packages/edit/${pkg.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tour Package</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{pkg.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDeletePackage(pkg.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default TourPackageList;
