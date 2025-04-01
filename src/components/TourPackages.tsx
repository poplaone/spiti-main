
import React from 'react';
import TourPackageHeader from './tour/TourPackageHeader';
import TourPackageGrid from './tour/TourPackageGrid';
import BookingSummaryCard from './tour/BookingSummaryCard';
import TourIntroSection from './tour/TourIntroSection';
import { useTourPackages } from '../hooks/useTourPackages';

const TourPackages = () => {
  const { packages, isLoading } = useTourPackages();

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
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <BookingSummaryCard />
          <TourIntroSection />
        </div>
        
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
