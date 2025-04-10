
import React from 'react';
import useTourPackages from '@/hooks/admin/useTourPackages';
import TourListHeader from '@/components/admin/tour-list/TourListHeader';
import TourListTable from '@/components/admin/tour-list/TourListTable';
import EmptyTourList from '@/components/admin/tour-list/EmptyTourList';
import LoadingState from '@/components/admin/tour-list/LoadingState';

const TourPackageList: React.FC = () => {
  const {
    packages,
    loading,
    deleteLoading,
    updatingVisibility,
    updatingOrder,
    confirmDelete,
    toggleVisibility,
    movePackageUp,
    movePackageDown
  } = useTourPackages();

  return (
    <div className="p-6 space-y-6">
      <TourListHeader />
      
      {loading ? (
        <LoadingState />
      ) : packages.length === 0 ? (
        <EmptyTourList />
      ) : (
        <TourListTable 
          packages={packages}
          onToggleVisibility={toggleVisibility}
          onConfirmDelete={confirmDelete}
          onMoveUp={movePackageUp}
          onMoveDown={movePackageDown}
          deleteLoading={deleteLoading}
          updatingVisibility={updatingVisibility}
          updatingOrder={updatingOrder}
        />
      )}
    </div>
  );
};

export default TourPackageList;
