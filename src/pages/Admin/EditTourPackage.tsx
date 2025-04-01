
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { tourPackagesData } from '@/data/tourPackagesData';
import TourPackageForm from '@/components/admin/tour-package/TourPackageForm';
import { TourPackageProps } from '@/components/TourPackage';
import { getTourPackageById } from '@/lib/db';

const EditTourPackage = () => {
  useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tourPackage, setTourPackage] = useState<TourPackageProps | null>(null);
  
  const isNew = id === 'new';

  useEffect(() => {
    async function fetchTourPackage() {
      if (isNew) return;
      
      setIsLoading(true);
      const data = await getTourPackageById(id!);
      
      if (data) {
        setTourPackage(data);
      } else {
        // Fall back to static data if fetch fails
        console.log('Failed to fetch package from database, checking static data');
        const packageIndex = parseInt(id || '-1');
        const existingPackage = packageIndex >= 0 && packageIndex < tourPackagesData.length ? 
          tourPackagesData[packageIndex] as TourPackageProps : null;
        setTourPackage(existingPackage);
      }
      
      setIsLoading(false);
    }
    
    fetchTourPackage();
  }, [id, isNew]);

  return (
    <div className="pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin/tour-packages')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Add New Tour Package' : `Edit: ${tourPackage?.title || 'Loading...'}`}
        </h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-spiti-forest mr-2" />
          <span className="text-lg">Loading tour package details...</span>
        </div>
      ) : (
        <TourPackageForm
          id={id}
          existingPackage={tourPackage}
          isNew={isNew}
        />
      )}
    </div>
  );
};

export default EditTourPackage;
