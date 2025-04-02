
import { useTourPackagesAdmin } from "@/hooks/useTourPackagesAdmin";
import ToursHeader from "@/components/admin/tours/ToursHeader";
import ToursTable from "@/components/admin/tours/ToursTable";
import DeleteTourDialog from "@/components/admin/tours/DeleteTourDialog";
import { Skeleton } from "@/components/ui/skeleton";

const TourPackages = () => {
  const {
    filteredTours,
    searchTerm,
    setSearchTerm,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    loading
  } = useTourPackagesAdmin();

  return (
    <div className="p-6">
      <ToursHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <ToursTable 
          tours={filteredTours}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <DeleteTourDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default TourPackages;
