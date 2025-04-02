
import React, { useState, useEffect } from 'react';
import TourPackageHeader from './tour/TourPackageHeader';
import TourPackageGrid from './tour/TourPackageGrid';
import { getAllTours } from '@/services/tourService';
import { TourPackageProps } from './TourPackage';
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="container mx-auto px-4">
          <TourPackageHeader 
            title="Discover Spiti Valley"
            description="Explore our carefully crafted tour packages designed to provide you with an unforgettable Spiti Valley experience."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-52 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
