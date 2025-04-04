
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tourPackagesData } from "@/data/tourPackagesData";
import { useTourFilters } from '@/hooks/useTourFilters';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const CustomizableTours = () => {
  const {
    customizableTours
  } = useTourFilters(tourPackagesData);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1655720031554-a929595ffad7?q=80&w=1920&auto=format&fit=crop')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header />
      
      {/* Hero Section */}
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
      
      {/* Customizable Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-center">Tailor Your Spiti Adventure</h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto">
              Our customizable tour packages offer the flexibility to adjust itineraries, accommodations, and activities to suit your preferences. Whether you want to spend more time in specific villages, add meditation sessions at monasteries, or include special adventure activities, we can tailor the experience just for you.
            </p>
          </div>
          
          <TourPackageGrid packages={customizableTours} />
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default CustomizableTours;
