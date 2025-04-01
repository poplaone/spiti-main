
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TourPackageProps } from "@/components/TourPackage";
import { getAllTours, deleteTour } from '@/services/tourService';

export const useTourPackagesAdmin = () => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourPackageProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const loadTours = () => {
    const allTours = getAllTours();
    setTours(allTours);
    setFilteredTours(allTours);
  };

  useEffect(() => {
    // Initialize tours from service
    loadTours();
  }, []);

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

  const handleDeleteConfirm = () => {
    if (tourToDelete !== null) {
      deleteTour(tourToDelete);
      loadTours(); // Reload the tours after deletion
      
      toast({
        description: "Tour package deleted successfully",
      });
      
      setDeleteDialogOpen(false);
      setTourToDelete(null);
    }
  };

  return {
    filteredTours,
    searchTerm,
    setSearchTerm,
    deleteDialogOpen,
    setDeleteDialogOpen,
    tourToDelete,
    handleDeleteClick,
    handleDeleteConfirm
  };
};
