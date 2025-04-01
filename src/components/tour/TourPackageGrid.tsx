
import React from 'react';
import TourPackage from '../TourPackage';
import { TourPackageProps } from '../TourPackage';

interface TourPackageGridProps {
  packages: TourPackageProps[];
}

const TourPackageGrid: React.FC<TourPackageGridProps> = ({ packages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((tour, index) => (
        <div key={index} className="transform transition duration-300 hover:scale-102 hover:z-10 w-full">
          <TourPackage 
            {...tour} 
            index={index} 
            className="bg-white/70 backdrop-blur-sm w-full h-full" 
          />
        </div>
      ))}
    </div>
  );
};

export default TourPackageGrid;
