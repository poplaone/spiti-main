
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tourPackagesData } from "@/data/tourPackagesData";
import { useTourFilters } from '@/hooks/useTourFilters';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const RoadTrips = () => {
  const { roadTripsTours } = useTourFilters(tourPackagesData);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1920&auto=format&fit=crop')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white drop-shadow-lg">
            Road Trip Adventures in Spiti Valley
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
            Explore the breathtaking landscapes of Spiti Valley with our curated road trip experiences by bike or car.
          </p>
        </div>
      </section>
      
      {/* Road Trip Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-spiti-forest mb-4">
              Our Road Trip Packages
            </h2>
            <p className="text-gray-700">
              Choose from our selection of carefully crafted road trip itineraries designed to give you the best Spiti Valley experience.
            </p>
          </div>
          
          <TourPackageGrid packages={roadTripsTours} />
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default RoadTrips;
