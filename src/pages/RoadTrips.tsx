import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tourPackagesData } from "@/data/tourPackagesData";
import { useTourFilters } from '@/hooks/useTourFilters';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
const RoadTrips = () => {
  const {
    roadTripsTours
  } = useTourFilters(tourPackagesData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen" style={{
    backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop')`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto text-center">
          
          
        </div>
      </section>
      
      {/* Road Trip Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-heading mb-4 text-zinc-50 text-center font-light text-2xl">
              Our Road Trip Packages
            </h2>
            <p className="text-center text-zinc-50 font-light text-base">
              Choose from our selection of carefully crafted road trip itineraries designed to give you the best Spiti Valley experience.
            </p>
          </div>
          
          <TourPackageGrid packages={roadTripsTours} />
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>;
};
export default RoadTrips;