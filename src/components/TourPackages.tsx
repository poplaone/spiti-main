
import React from 'react';
import TourPackageHeader from './tour/TourPackageHeader';
import TourPackageGrid from './tour/TourPackageGrid';
import { tourPackagesData } from '../data/tourPackagesData';

const TourPackages = () => {
  return (
    <section className="py-16 relative bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/lovable-uploads/a811740d-73fd-4b4e-b9d5-a993a272be04.png')`,
        backgroundAttachment: 'fixed'
      }}>
      <div className="container mx-auto px-4">
        <TourPackageHeader 
          title="Discover Spiti Valley"
          description="Explore our carefully crafted tour packages designed to provide you with an unforgettable Spiti Valley experience. Choose from a variety of options to match your preferences and budget."
        />
        
        <TourPackageGrid packages={tourPackagesData} />
      </div>
    </section>
  );
};

export default TourPackages;
