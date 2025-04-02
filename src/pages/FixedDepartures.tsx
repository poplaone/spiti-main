
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllTours } from "@/services/tourService";
import { useTourFilters } from '@/hooks/useTourFilters';
import TourPackageGrid from '@/components/tour/TourPackageGrid';
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { TourPackageProps } from '@/components/TourPackage';
import { Skeleton } from "@/components/ui/skeleton";

const FixedDepartures = () => {
  const [tours, setTours] = useState<TourPackageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { fixedDepartureTours } = useTourFilters(tours);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchTours = async () => {
      try {
        const allTours = await getAllTours();
        setTours(allTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTours();
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
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          ) : (
            <TourPackageGrid packages={fixedDepartureTours} />
          )}
        </div>
      </section>

      <FloatingWhatsAppButton />
      <Footer />
    </div>;
};
export default FixedDepartures;
