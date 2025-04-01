
import { useState, useEffect } from 'react';
import { TourPackageProps } from '@/components/TourPackage';
import { useToast } from '@/hooks/use-toast';
import { fetchTourPackages, deleteTourPackage } from '@/lib/db';

export function useAdminTourPackages() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [tourPackages, setTourPackages] = useState<TourPackageProps[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<TourPackageProps[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch packages from Supabase
  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTourPackages();
      setTourPackages(data);
      setFilteredPackages(data);
    } catch (error) {
      console.error('Error loading tour packages:', error);
      toast({
        title: "Error",
        description: "Failed to load tour packages.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter packages by search term and/or transport type
  const filterPackages = (term: string, filter: string | null) => {
    let filtered = [...tourPackages];
    
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

  // Handle delete confirmation dialog
  const handleDeleteConfirmation = (id: string) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      const success = await deleteTourPackage(deleteId);
      
      if (success) {
        const updatedPackages = tourPackages.filter(pkg => pkg.id !== deleteId);
        setTourPackages(updatedPackages);
        setFilteredPackages(updatedPackages.filter(pkg => {
          let match = true;
          if (searchTerm) {
            match = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   pkg.overview?.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (selectedFilter) {
            match = match && pkg.transportType === selectedFilter;
          }
          return match;
        }));
        
        toast({
          title: "Package deleted",
          description: "The tour package has been deleted successfully."
        });
      } else {
        throw new Error("Failed to delete tour package");
      }
    } catch (error) {
      console.error('Error deleting tour package:', error);
      toast({
        title: "Error",
        description: "Failed to delete tour package.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setDialogOpen(false);
      setDeleteId(null);
    }
  };

  // Cancel delete dialog
  const handleCancelDelete = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  return {
    searchTerm,
    selectedFilter,
    filteredPackages,
    isLoading,
    isDeleting,
    dialogOpen,
    deleteId,
    handleSearch,
    handleFilterSelect,
    handleDelete,
    handleDeleteConfirmation,
    handleCancelDelete
  };
}
