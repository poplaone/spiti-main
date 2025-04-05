
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToursContext } from '@/context/ToursContext';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { Loader2 } from 'lucide-react';

const RoadTrips = () => {
  const { tours, loading, error } = useToursContext();
  
  // Filter for road trips - any tour with car, suv, or bike transport type
  const roadTripsTours = tours.filter(tour => 
    tour.transportType.toLowerCase() === 'car' || 
    tour.transportType.toLowerCase() === 'suv' ||
    tour.transportType.toLowerCase() === 'bike'
  );
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(19, 38, 64, 0.7), rgba(19, 38, 64, 0.5)), url('/lovable-uploads/ad2ff006c0d5.png')`,
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg font-light text-2xl">
            Road Trip Adventures
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-100 md:text-xl mb-8 text-lg font-light">
            Explore the majestic Spiti Valley on wheels with our curated road trip experiences
          </p>
        </div>
      </section>
      
      {/* Road Trip Packages Section */}
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
          ) : roadTripsTours.length === 0 ? (
            <div className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6">
              <p className="text-xl text-gray-600">No road trip tours available at the moment.</p>
              <p className="mt-2 text-gray-500">Please check back later or contact us to schedule a custom tour.</p>
            </div>
          ) : (
            <TourPackageGrid packages={roadTripsTours} />
          )}
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default RoadTrips;
