
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminTourPackages } from '@/hooks/useAdminTourPackages';
import TourPackageList from '@/components/admin/tour-package/TourPackageList';
import SearchAndFilter from '@/components/admin/tour-package/SearchAndFilter';

const TourPackages = () => {
  useAdminAuth();
  const navigate = useNavigate();
  
  const {
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
  } = useAdminTourPackages();

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
          <SearchAndFilter 
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            selectedFilter={selectedFilter}
            onFilterSelect={handleFilterSelect}
          />

          <TourPackageList 
            packages={filteredPackages}
            isLoading={isLoading}
            onDelete={handleDeleteConfirmation}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={handleCancelDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tour Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tour package? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Package'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourPackages;
