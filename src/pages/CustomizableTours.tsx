
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToursContext } from '@/context/ToursContext';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { Loader2 } from 'lucide-react';

const CustomizableTours = () => {
  const { tours, loading, error } = useToursContext();
  
  // Filter for customizable tours
  const customizableTours = tours.filter(tour => tour.isCustomizable === true);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with fixed dimensions to prevent CLS */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg font-light text-2xl">
            Customizable Spiti Tours
          </h1>
          <p className="max-w-3xl mx-auto text-zinc-100 md:text-xl mb-8 text-lg font-light">
            Create your perfect Spiti Valley experience with our flexible, customizable tour packages
          </p>
        </div>
      </section>
      
      {/* Customizable Packages Section with content-visibility optimization */}
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
          ) : customizableTours.length === 0 ? (
            <div className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6">
              <p className="text-xl text-gray-600">No customizable tours available at the moment.</p>
              <p className="mt-2 text-gray-500">Please check back later or contact us for assistance.</p>
            </div>
          ) : (
            <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
              <TourPackageGrid packages={customizableTours} />
            </div>
          )}
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default CustomizableTours;
