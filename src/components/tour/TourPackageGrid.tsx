import React from 'react';
import TourPackage from '@/components/TourPackage';
import { TourPackageProps } from '@/data/types/tourTypes';

interface TourPackageGridProps {
  packages: TourPackageProps[];
}

const TourPackageGrid: React.FC<TourPackageGridProps> = ({ packages }) => {
  // Sort packages by display_order first (if available), nulls last
  const sortedPackages = [...packages].sort((a, b) => {
    // If both have displayOrder, compare them
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    // If only a has displayOrder, a comes first
    if (a.displayOrder !== undefined) {
      return -1;
    }
    // If only b has displayOrder, b comes first
    if (b.displayOrder !== undefined) {
      return 1;
    }
    // If neither has displayOrder, keep original order (by title)
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1 sm:px-0">
      {sortedPackages.map((pkg, index) => (
        <div key={`tour-${pkg.title}-${index}`} className="h-full backdrop-blur-sm bg-white/10 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-102 hover:-translate-y-1">
          <TourPackage {...pkg} id={pkg.id || `tour-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default TourPackageGrid;
