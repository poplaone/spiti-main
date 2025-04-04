
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from '@/data/types/tourTypes';
import { Car } from "lucide-react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { useToursContext } from '@/context/ToursContext';
import { tourPackagesData } from "@/data/tourPackagesData";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import BookingCard from "@/components/tour/BookingCard";
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourDetailTabs from "@/components/tour/TourDetailTabs";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";
import DepartureDatesCard from "@/components/tour/DepartureDatesCard";

const TourDetailUnexplored = () => {
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const { tours, loading, refreshTours } = useToursContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Refresh tours when component mounts
    refreshTours();
    
    // Use either context tours or fallback to static data
    const toursToUse = tours.length > 0 ? tours : tourPackagesData;
    
    // Find the Unexplored Spiti tour
    const selectedTour = toursToUse.find(tour => 
      (tour.title && tour.title.toLowerCase().includes('unexplored')) || 
      (tour.title && tour.title.toLowerCase().includes('exploration'))
    );
    
    if (selectedTour) {
      setTour(selectedTour);

      // Get other tours for the "More Popular Tours" section
      const others = toursToUse.filter(t => t.id !== selectedTour.id).slice(0, 4);
      setOtherTours(others);
    } else {
      // Fallback to first car tour if no unexplored tour is found
      const fallbackTour = toursToUse.find(t => t.transportType === 'car');
      if (fallbackTour) {
        setTour(fallbackTour);
        const others = toursToUse.filter(t => t.id !== fallbackTour.id).slice(0, 4);
        setOtherTours(others);
      }
    }
  }, [tours, loading, refreshTours]);

  if (loading && !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-spiti-blue border-t-transparent rounded-full"></div>
        <p className="ml-4 text-lg">Loading Unexplored tour details...</p>
      </div>
    );
  }

  if (!tour) {
    // Last resort fallback to any available tour
    const fallbackTour = tourPackagesData[0];
    if (!fallbackTour) {
      return <div>Unexplored tour not found. Please check back later.</div>;
    }
    // Set the fallback tour before rendering
    setTour(fallbackTour);
    return null; // Will re-render with the fallback tour
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    return <Car className="text-spiti-blue w-6 h-6" />;
  };

  return (
    <div className="min-h-screen" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1920&auto=format&fit=crop')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Header />
      
      {/* Hero Section with Tour Title and Image */}
      <TourHero 
        tour={tour} 
        selectedMonth={selectedMonth} 
        setSelectedMonth={setSelectedMonth} 
        formatPrice={formatPrice}
        heroImage="/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png"
      />

      {/* Package Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Package details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Desktop view: Display Tour Overview and Departure Dates side by side */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                <TourOverview tour={tour} getTransportIcon={getTransportIcon} />
                <DepartureDatesCard />
              </div>
              
              {/* Mobile view: Stack them */}
              <div className="lg:hidden space-y-8">
                <DepartureDatesCard />
                <TourOverview tour={tour} getTransportIcon={getTransportIcon} />
              </div>
              
              <TourItinerary tour={tour} />
              <TourDetailTabs tour={tour} />
            </div>
            
            {/* Right column - Booking info */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <BookingCard 
                  originalPrice={tour.originalPrice}
                  discountedPrice={tour.discountedPrice}
                  discount={tour.discount}
                  formatPrice={formatPrice}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Popular Tours Section */}
      <RelatedTours tours={otherTours} />
      
      {/* Mobile Sticky Footer */}
      <MobileStickyFooter 
        discountedPrice={tour.discountedPrice}
        originalPrice={tour.originalPrice}
        formatPrice={formatPrice}
      />
      
      {/* Add Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
      
      <Footer />
    </div>
  );
};

export default TourDetailUnexplored;
