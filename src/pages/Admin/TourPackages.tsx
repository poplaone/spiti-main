
import { useTourPackagesAdmin } from "@/hooks/useTourPackagesAdmin";
import ToursHeader from "@/components/admin/tours/ToursHeader";
import ToursTable from "@/components/admin/tours/ToursTable";
import DeleteTourDialog from "@/components/admin/tours/DeleteTourDialog";

const TourPackages = () => {
  const {
    filteredTours,
    searchTerm,
    setSearchTerm,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleDeleteClick,
    handleDeleteConfirm
  } = useTourPackagesAdmin();

  return (
    <div className="p-6">
      <ToursHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <ToursTable 
        tours={filteredTours}
        onDeleteClick={handleDeleteClick}
      />

      <DeleteTourDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default TourPackages;
