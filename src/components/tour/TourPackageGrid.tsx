
import React from 'react';
import TourPackage from '@/components/TourPackage';
import { TourPackageProps } from '@/data/types/tourTypes';

interface TourPackageGridProps {
  packages: TourPackageProps[];
}

const TourPackageGrid: React.FC<TourPackageGridProps> = ({ packages }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {packages.map((pkg, index) => (
        <div key={index} className="h-full">
          <TourPackage {...pkg} id={`tour-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default TourPackageGrid;
