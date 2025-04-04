
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
    console.log("Fixed departure tours:", fixedDepartureTours);
  }, [fixedDepartureTours]);
  
  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg font-light text-2xl">
            Fixed Departure Tours
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-100 md:text-xl mb-8 text-lg font-light">
            Join our scheduled group tours to Spiti Valley on fixed dates with guaranteed departures
          </p>
        </div>
      </section>
      
      {/* Fixed Departure Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-center">Upcoming Spiti Valley Group Tours</h2>
          </div>
          
          {fixedDepartureTours.length === 0 ? (
            <div className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6">
              <p className="text-xl text-gray-600">No fixed departure tours available at the moment.</p>
              <p className="mt-2 text-gray-500">Please check back later or contact us to schedule a custom tour.</p>
            </div>
          ) : (
            <TourPackageGrid packages={fixedDepartureTours} />
          )}
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default FixedDepartures;
