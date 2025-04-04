
import React from 'react';
import { useParams } from 'react-router-dom';
import PackageForm from '@/components/admin/PackageForm';

const EditPackage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Error: Package ID is missing</div>;
  }

  return (
    <div>
      <PackageForm packageId={id} isEditing={true} />
    </div>
  );
};

export default EditPackage;
