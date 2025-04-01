
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { tourPackagesData } from '@/data/tourPackagesData';
import TourPackageForm from '@/components/admin/tour-package/TourPackageForm';
import { TourPackageProps } from '@/components/TourPackage';

const EditTourPackage = () => {
  useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const isNew = id === 'new';
  const packageIndex = isNew ? -1 : parseInt(id || '-1');
  const existingPackage = !isNew && packageIndex >= 0 && packageIndex < tourPackagesData.length ? 
    tourPackagesData[packageIndex] as TourPackageProps : null;

  return (
    <div className="pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin/tour-packages')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Add New Tour Package' : `Edit: ${existingPackage?.title}`}
        </h1>
      </div>

      <TourPackageForm
        id={id}
        existingPackage={existingPackage}
        isNew={isNew}
      />
    </div>
  );
};

export default EditTourPackage;
