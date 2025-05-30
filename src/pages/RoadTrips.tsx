
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
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header />
      
      {/* Hero Section - Reduced padding */}
      <section className="relative pt-16 pb-6 md:pt-24 md:pb-8 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg font-light text-2xl">
            Road Trip Adventures
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-100 md:text-xl mb-4 text-lg font-light">
            Explore the majestic Spiti Valley on wheels with our curated road trip experiences
          </p>
        </div>
      </section>
      
      {/* Road Trip Packages Section - Reduced top padding */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-spiti-forest" />
              <p className="mt-4 text-gray-600">Loading tour packages...</p>
            </div>
          ) : error ? (
            <div className="text-center py-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6">
              <p className="text-xl text-red-500">{error}</p>
              <p className="mt-2 text-gray-600">Please try again later or contact us for assistance.</p>
            </div>
          ) : roadTripsTours.length === 0 ? (
            <div className="text-center py-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6">
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
