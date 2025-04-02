
import React, { useState, useEffect } from 'react';
import TourPackageHeader from './tour/TourPackageHeader';
import TourPackageGrid from './tour/TourPackageGrid';
import { getAllTours } from '@/services/tourService';
import { TourPackageProps } from './TourPackage';

const TourPackages = () => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch tours from Supabase or localStorage
    const fetchTours = async () => {
      try {
        const tourData = await getAllTours();
        setTours(tourData);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p>Loading tour packages...</p>
        </div>
      </section>
    );
  }

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
        
        <TourPackageGrid packages={tours} />
      </div>
    </section>
  );
};

export default TourPackages;
