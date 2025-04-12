
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToursContext } from '@/context/ToursContext';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { Loader2 } from 'lucide-react';

const FixedDepartures = () => {
  const { tours, loading, error } = useToursContext();
  
  // Filter for fixed departure tours
  const fixedDepartureTours = tours.filter(tour => tour.isFixedDeparture === true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-transparent">
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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-spiti-forest" />
              <p className="mt-4 text-gray-600">Loading tour packages...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6">
              <p className="text-xl text-red-500">{error}</p>
              <p className="mt-2 text-gray-600">Please try again later or contact us for assistance.</p>
            </div>
          ) : fixedDepartureTours.length === 0 ? (
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
