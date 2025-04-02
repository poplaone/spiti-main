
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { getAllTours, deleteTour } from '@/services/tourService';

export const useTourPackagesAdmin = () => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourPackageProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const loadTours = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching all tours...");
      const allTours = await getAllTours();
      console.log("Fetched tours:", allTours);
      setTours(allTours);
      setFilteredTours(allTours);
    } catch (error) {
      console.error("Error loading tours:", error);
      toast({
        description: "Failed to load tour packages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // Initialize tours from service
    loadTours();
  }, [loadTours]);

  useEffect(() => {
    // Filter tours based on search term
    const filtered = tours.filter(tour => 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTours(filtered);
  }, [searchTerm, tours]);

  const handleDeleteClick = (index: number) => {
    setTourToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (tourToDelete !== null) {
      try {
        await deleteTour(tourToDelete);
        toast({
          description: "Tour package deleted successfully",
        });
        
        // Reload the tours after deletion
        await loadTours();
        
        setDeleteDialogOpen(false);
        setTourToDelete(null);
      } catch (error) {
        console.error("Error deleting tour:", error);
        toast({
          description: "Failed to delete tour package",
          variant: "destructive"
        });
      }
    }
  };

  const refetchTours = loadTours;

  return {
    filteredTours,
    searchTerm,
    setSearchTerm,
    deleteDialogOpen,
    setDeleteDialogOpen,
    tourToDelete,
    handleDeleteClick,
    handleDeleteConfirm,
    loading,
    refetchTours
  };
};
