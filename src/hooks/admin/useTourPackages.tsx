
import { usePackageFetch } from './usePackageFetch';
import { useVisibilityToggle } from './useVisibilityToggle';
import { usePackageDelete } from './usePackageDelete';
import { usePackageOrder } from './usePackageOrder';

export const useTourPackages = () => {
  const { 
    packages, 
    setPackages, 
    loading, 
    fetchPackages 
  } = usePackageFetch();

  const { 
    updatingVisibility, 
    toggleVisibility 
  } = useVisibilityToggle(packages, setPackages);

  const { 
    deleteLoading, 
    confirmDelete 
  } = usePackageDelete(packages, setPackages);

  const { 
    updatingOrder, 
    updateDisplayOrder, 
    movePackageUp, 
    movePackageDown 
  } = usePackageOrder(packages, setPackages, fetchPackages);

  return {
    packages,
    loading,
    deleteLoading,
    updatingVisibility,
    updatingOrder,
    fetchPackages,
    confirmDelete,
    toggleVisibility,
    updateDisplayOrder,
    movePackageUp,
    movePackageDown
  };
};

export default useTourPackages;
