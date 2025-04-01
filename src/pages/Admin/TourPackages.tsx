
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Eye,
  Filter,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { TourPackageProps } from '@/components/TourPackage';
import { getTourPackages, deleteTourPackage } from '@/lib/db';

const TourPackages = () => {
  useAdminAuth(); // This will redirect to login if not authenticated
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [packages, setPackages] = useState<TourPackageProps[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<TourPackageProps[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [packageToDelete, setPackageToDelete] = useState<TourPackageProps | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch tour packages from Supabase
  useEffect(() => {
    async function fetchPackages() {
      setIsLoading(true);
      const data = await getTourPackages();
      if (data) {
        setPackages(data);
        setFilteredPackages(data);
      } else {
        // Fall back to static data if fetch fails
        console.log('Failed to fetch packages from database, using static data');
      }
      setIsLoading(false);
    }
    
    fetchPackages();
  }, []);

  // Filter packages by search term and/or transport type
  const filterPackages = (term: string, filter: string | null) => {
    let filtered = [...packages];
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(term.toLowerCase()) || 
        pkg.overview?.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by transport type
    if (filter) {
      filtered = filtered.filter(pkg => pkg.transportType === filter);
    }
    
    setFilteredPackages(filtered);
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterPackages(term, selectedFilter);
  };

  // Handle filter selection
  const handleFilterSelect = (filter: string | null) => {
    setSelectedFilter(filter);
    filterPackages(searchTerm, filter);
  };

  // Handle package deletion
  const handleDeletePackage = async () => {
    if (!packageToDelete) return;
    
    setIsDeleting(true);
    const success = await deleteTourPackage(packageToDelete.id);
    
    if (success) {
      // Remove the deleted package from state
      setPackages(packages.filter(p => p.id !== packageToDelete.id));
      setFilteredPackages(filteredPackages.filter(p => p.id !== packageToDelete.id));
      
      toast({
        title: "Package deleted",
        description: `${packageToDelete.title} has been deleted successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete package. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsDeleting(false);
    setPackageToDelete(null);
  };

  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Tour Packages</h1>
        <Button 
          className="bg-spiti-forest hover:bg-spiti-forest/90"
          onClick={() => navigate('/admin/tour-packages/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Package
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search packages..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex w-full md:w-auto justify-between">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedFilter ? `Filter: ${selectedFilter}` : 'Filter'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleFilterSelect(null)}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect('bike')}>
                  Bike Tours
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect('car')}>
                  Car Tours
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-spiti-forest mr-2" />
                <span className="text-lg">Loading tour packages...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <img 
                              src={pkg.image} 
                              alt={pkg.title} 
                              className="h-10 w-14 object-cover rounded"
                            />
                            <span className="line-clamp-2">{pkg.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">
                            {pkg.transportType === 'bike' ? 'Bike Tour' : 
                             pkg.transportType === 'car' ? 'Car Tour' : 'Other'}
                          </Badge>
                          {pkg.isWomenOnly && (
                            <Badge variant="secondary" className="ml-2 bg-pink-100 text-pink-800">
                              Women Only
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {pkg.duration.nights} Nights / {pkg.duration.days} Days
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <div className="text-sm font-semibold">₹{formatPrice(pkg.discountedPrice)}</div>
                            <div className="text-xs text-gray-500 line-through">₹{formatPrice(pkg.originalPrice)}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <a href={`/admin/tour-packages/${pkg.id}/preview`} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => navigate(`/admin/tour-packages/${pkg.id}/edit`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => setPackageToDelete(pkg)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No tour packages found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!packageToDelete} onOpenChange={(open) => !open && setPackageToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tour Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{packageToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeletePackage} 
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Package"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourPackages;
