
import React from 'react';
import TourPackage from '@/components/TourPackage';
import { TourPackageProps } from '@/data/types/tourTypes';

interface TourPackageGridProps {
  packages: TourPackageProps[];
}

const TourPackageGrid: React.FC<TourPackageGridProps> = ({ packages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1 sm:px-0">
      {packages.map((pkg, index) => (
        <div key={`tour-${pkg.title}-${index}`} className="h-full backdrop-blur-sm bg-white/10 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-102 hover:-translate-y-1">
          <TourPackage {...pkg} id={pkg.id || `tour-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default TourPackageGrid;
