
import React, { useState, useEffect } from 'react';
import TourPackageHeader from './tour/TourPackageHeader';
import TourPackageGrid from './tour/TourPackageGrid';
import { fetchTourPackages } from '../lib/db';
import { TourPackageProps } from './TourPackage.d';
import { tourPackagesData as fallbackData } from '../data/tourPackagesData';

const TourPackages = () => {
  const [packages, setPackages] = useState<TourPackageProps[]>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTourPackages();
        // If we successfully got data from the database, use it
        if (data && data.length > 0) {
          setPackages(data);
        }
      } catch (error) {
        console.error('Error loading tour packages:', error);
        // Fallback to static data if the API call fails
        setPackages(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  return (
    <section id="discover-spiti-valley" className="py-16 relative bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/lovable-uploads/a811740d-73fd-4b4e-b9d5-a993a272be04.png')`,
        backgroundAttachment: 'fixed'
      }}>
      <div className="container mx-auto px-4">
        <TourPackageHeader 
          title="Discover Spiti Valley"
          description="Explore our carefully crafted tour packages designed to provide you with an unforgettable Spiti Valley experience. Choose from a variety of options to match your preferences and budget."
        />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spiti-forest"></div>
          </div>
        ) : (
          <TourPackageGrid packages={packages} />
        )}
      </div>
    </section>
  );
};

export default TourPackages;
