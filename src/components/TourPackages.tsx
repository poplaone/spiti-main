
import React from 'react';
import TourPackageHeader from './tour/TourPackageHeader';
import TourPackageGrid from './tour/TourPackageGrid';
import { useToursContext } from '@/context/ToursContext';
import { Loader2 } from 'lucide-react';

const TourPackages = () => {
  const { tours, loading, error } = useToursContext();

  return (
    <section id="discover-spiti-valley" className="py-8 md:py-12 relative bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/lovable-uploads/a811740d-73fd-4b4e-b9d5-a993a272be04.png')`,
        backgroundAttachment: 'fixed'
      }}>
      <div className="container mx-auto px-3 sm:px-4">
        <TourPackageHeader 
          title="Discover Spiti Valley"
          description="Explore our carefully crafted tour packages designed to provide you with an unforgettable Spiti Valley experience. Choose from a variety of options to match your preferences and budget."
        />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-spiti-forest" />
            <p className="mt-4 text-gray-600">Loading tour packages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              className="mt-4 bg-spiti-forest text-white px-4 py-2 rounded hover:bg-spiti-forest/80"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-12 bg-white/70 rounded-lg shadow p-6">
            <p className="text-gray-700 font-medium">No tour packages are currently available.</p>
            <p className="text-gray-600 mt-2">Please check back later for our upcoming tours.</p>
          </div>
        ) : (
          <div className="mt-8">
            <TourPackageGrid packages={tours} />
          </div>
        )}
      </div>
    </section>
  );
};

export default TourPackages;
