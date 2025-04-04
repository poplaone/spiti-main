
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tourPackagesData } from "@/data/tourPackagesData";
import { useTourFilters } from '@/hooks/useTourFilters';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const FixedDepartures = () => {
  const {
    fixedDepartureTours
  } = useTourFilters(tourPackagesData);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <div className="min-h-screen" style={{
    backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=1920&auto=format&fit=crop')`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg text-2xl font-normal">
            Fixed Departure Tours
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-100 text-lg md:text-xl mb-8 font-normal">
            Join our scheduled group adventures with guaranteed departures throughout the Spiti Valley season
          </p>
        </div>
      </section>
      
      {/* Fixed Departure Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
          </div>
          
          <TourPackageGrid packages={fixedDepartureTours} />
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>;
};

export default FixedDepartures;
