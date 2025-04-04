
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from '@/data/types/tourTypes';
import { Bike } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

const TourDetailBike = () => {
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { tours, loading, refreshTours } = useToursContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Refresh tours when component mounts
    refreshTours();
    
    // Find the bike tour from available data
    const findBikeTour = () => {
      // Use either context tours or fallback to static data
      const toursToUse = tours.length > 0 ? tours : tourPackagesData;
      
      // Find the bike tour (first one with transportType = bike)
      const selectedTour = toursToUse.find(tour => 
        tour.transportType.toLowerCase() === 'bike' || 
        (tour.title && tour.title.toLowerCase().includes('bike'))
      );
      
      if (selectedTour) {
        setTour(selectedTour);

        // Get other tours for the "More Popular Tours" section
        const others = toursToUse.filter(t => t.id !== selectedTour.id).slice(0, 4);
        setOtherTours(others);
      } else {
        // Fallback to first tour in static data if no bike tour is found
        const fallbackTour = tourPackagesData[0];
        if (fallbackTour) {
          setTour(fallbackTour);
          const others = tourPackagesData.filter(t => t.id !== fallbackTour.id).slice(0, 4);
          setOtherTours(others);
        }
      }
      
      // Initial load complete
      setIsInitialLoad(false);
    };

    // Only update state when tours change or if we're on initial load
    if (!loading || isInitialLoad) {
      findBikeTour();
    }
  }, [tours, loading, refreshTours, isInitialLoad]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    return <Bike className="text-spiti-blue w-6 h-6" />;
  };

  // Render loading skeleton if initial load and no tour yet
  if (isInitialLoad && !tour) {
    return (
      <div className="min-h-screen" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1920&auto=format&fit=crop')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Header />
        
        <div className="container mx-auto px-4 py-24">
          <Skeleton className="h-64 w-full mb-8 rounded-xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
            
            <div className="hidden lg:block">
              <Skeleton className="h-96 w-full rounded-lg sticky top-24" />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // If no tour after loading, show a proper message
  if (!tour) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Tour Not Found</h2>
          <p>We couldn't find the bike tour you're looking for. Please check back later.</p>
        </div>
        <Footer />
      </div>
    );
  }

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
        heroImage="/lovable-uploads/96c75803-78e2-4f53-a67c-b14d8e80d30f.png"
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

export default TourDetailBike;
