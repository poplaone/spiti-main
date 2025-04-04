
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from "@/data/types/tourTypes";
import { Bike, Car } from "lucide-react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { useToursContext } from '@/context/ToursContext';
import { tourPackagesData } from "@/data/tourPackagesData";
import { Skeleton } from "@/components/ui/skeleton";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import BookingCard from "@/components/tour/BookingCard";
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourPackageDetails from "@/components/tour/TourPackageDetails";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";
import DepartureDatesCard from "@/components/tour/DepartureDatesCard";

// Array of hero images for different tour types - correct paths for deployment
const heroImages = [
  "/lovable-uploads/96c75803-78e2-4f53-a67c-b14d8e80d30f.png", // Bike tour
  "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png", // Unexplored
  "/lovable-uploads/e375b837-c930-402e-8fd0-0ea3280c7540.png", // Buddhist
  "/lovable-uploads/bc21cc57-f972-4cd7-af1f-ca1542135c90.png", // Women
  "/lovable-uploads/b619b7ac-daf4-4da4-8ebc-f30d0c9d883f.png", // Own Car
  "/lovable-uploads/f8e55e6b-8b70-4f27-a84d-ee09e7e3550c.png", // Hidden Heaven
  "/lovable-uploads/96c75803-78e2-4f53-a67c-b14d8e80d30f.png", // Default
];

const TourDetail = () => {
  const { id } = useParams<{ id: string; }>();
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { tours, loading, refreshTours } = useToursContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Refresh tours when component mounts
    refreshTours();
    
    const findTour = () => {
      // Use either context tours or fallback to static data
      const toursToUse = tours.length > 0 ? tours : tourPackagesData;
      
      if (id) {
        // Find the tour by ID
        const selectedTour = toursToUse.find(tour => tour.id === id);
        if (selectedTour) {
          setTour(selectedTour);
  
          // Get other tours for the "More Popular Tours" section
          const others = toursToUse.filter(t => t.id !== id).slice(0, 4);
          setOtherTours(others);
        } else if (toursToUse.length > 0) {
          // If tour with ID not found but we have tours, use the first one as fallback
          setTour(toursToUse[0]);
          const others = toursToUse.filter((_, i) => i > 0).slice(0, 4);
          setOtherTours(others);
        }
      } else if (toursToUse.length > 0) {
        // If no ID provided but we have tours, use the first one
        setTour(toursToUse[0]);
        const others = toursToUse.filter((_, i) => i > 0).slice(0, 4);
        setOtherTours(others);
      }
      
      // Initial load complete
      setIsInitialLoad(false);
    };
    
    // Only update state when tours change or if we're on initial load
    if (!loading || isInitialLoad) {
      findTour();
    }
  }, [id, tours, loading, refreshTours, isInitialLoad]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    if (!tour) return <Car className="text-spiti-blue w-6 h-6" />;
    
    if (tour.transportType.toLowerCase() === 'bike') return <Bike className="text-spiti-blue w-6 h-6" />;
    return <Car className="text-spiti-blue w-6 h-6" />;
  };

  // Render loading skeleton if initial load and no tour yet
  if (isInitialLoad || (loading && !tour)) {
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
          <p>We couldn't find the tour you're looking for. Please check back later.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Select hero image based on tour index in the tours array
  const tourIndex = tours.findIndex(t => t.id === tour.id);
  const heroImage = tourIndex >= 0 && tourIndex < heroImages.length 
    ? heroImages[tourIndex] 
    : heroImages[heroImages.length - 1];

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
        heroImage={heroImage}
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
              <TourPackageDetails tour={tour} />
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

export default TourDetail;
