
import { useTourPackagesAdmin } from "@/hooks/useTourPackagesAdmin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
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
    loading,
    refetchTours
  } = useTourPackagesAdmin();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tour Packages</h1>
        <Link to="/admin/tours/new">
          <Button className="bg-spiti-forest hover:bg-spiti-forest/90">
            <Plus size={16} className="mr-2" /> Add New Tour
          </Button>
        </Link>
      </div>

      <ToursHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {loading ? (
        <div className="space-y-4 mt-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <>
          {filteredTours.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg mt-6">
              <h3 className="text-lg font-medium text-gray-600">No tour packages found</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm ? "Try a different search term" : "Add your first tour package"}
              </p>
              {!searchTerm && (
                <Link to="/admin/tours/new" className="mt-4 inline-block">
                  <Button className="bg-spiti-forest hover:bg-spiti-forest/90">
                    <Plus size={16} className="mr-2" /> Create Your First Tour
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <ToursTable 
              tours={filteredTours}
              onDeleteClick={handleDeleteClick}
              className="mt-6"
            />
          )}
        </>
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
