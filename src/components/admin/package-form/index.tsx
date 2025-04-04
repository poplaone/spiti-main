
import React from 'react';
import FormHeader from './FormHeader';
import FormTabs from './FormTabs';
import useTourPackageForm from './useTourPackageForm';

interface PackageFormProps {
  packageId?: string;
  isEditing?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ 
  packageId, 
  isEditing = false 
}) => {
  const formProps = useTourPackageForm(packageId, isEditing);
  
  if (formProps.isLoading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-spiti-forest border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading tour package data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={formProps.handleSubmit} className="space-y-8">
      <FormHeader 
        isEditing={isEditing} 
        isLoading={formProps.isLoading}
      />
      
      <FormTabs 
        activeTab={formProps.activeTab}
        setActiveTab={formProps.setActiveTab}
        formProps={formProps}
      />
    </form>
  );
};

export default PackageForm;
