
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import TourPackageForm from '@/components/admin/tour-package/TourPackageForm';
import { TourPackageProps } from '@/components/TourPackage';
import { fetchTourPackageById } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

const EditTourPackage = () => {
  useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [existingPackage, setExistingPackage] = useState<TourPackageProps | null>(null);
  
  const isNew = id === 'new';

  useEffect(() => {
    const loadTourPackage = async () => {
      if (isNew) return;
      
      try {
        setIsLoading(true);
        if (id) {
          const packageData = await fetchTourPackageById(id);
          
          if (packageData) {
            setExistingPackage(packageData);
          } else {
            toast({
              title: "Package not found",
              description: "The requested tour package could not be found.",
              variant: "destructive"
            });
            navigate('/admin/tour-packages');
          }
        }
      } catch (error) {
        console.error("Error loading tour package:", error);
        toast({
          title: "Error",
          description: "Failed to load tour package details.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTourPackage();
  }, [id, isNew, navigate, toast]);

  return (
    <div className="pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin/tour-packages')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Add New Tour Package' : `Edit: ${existingPackage?.title || 'Loading...'}`}
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spiti-forest"></div>
        </div>
      ) : (
        <TourPackageForm
          id={id}
          existingPackage={existingPackage}
          isNew={isNew}
        />
      )}
    </div>
  );
};

export default EditTourPackage;
