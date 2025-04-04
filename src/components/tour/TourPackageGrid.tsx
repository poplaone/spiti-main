
import React from 'react';
import { TourPackageWithId } from '@/data/types/tourTypes';
import TourPackage from '@/components/TourPackage';

interface TourPackageGridProps {
  packages: TourPackageWithId[];
}

const TourPackageGrid: React.FC<TourPackageGridProps> = ({ packages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {packages.map((pkg) => (
        <TourPackage key={pkg.id} {...pkg} />
      ))}
    </div>
  );
};

export default TourPackageGrid;
