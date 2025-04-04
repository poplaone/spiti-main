
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from '@/data/types/tourTypes';
import { Bike, Car } from "lucide-react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { useToursContext } from '@/context/ToursContext';
import { tourPackagesData } from "@/data/tourPackagesData";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import BookingCard from "@/components/tour/BookingCard";
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourPackageDetails from "@/components/tour/TourPackageDetails";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";
import DepartureDatesCard from "@/components/tour/DepartureDatesCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BaseTourDetailPageProps {
  tourType: string; // 'bike', 'buddhist', 'women', 'owncar', 'unexplored', 'hiddenheaven'
  heroImage: string;
}

const BaseTourDetailPage: React.FC<BaseTourDetailPageProps> = ({ tourType, heroImage }) => {
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const [isLoading, setIsLoading] = useState(true);
  const { tours, loading: contextLoading, refreshTours } = useToursContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set initial loading state
    setIsLoading(true);
    
    // Only refresh tours if needed (when tours array is empty)
    if (tours.length === 0) {
      refreshTours();
    }
    
    // Debounced function to find tour by type - helps prevent state flickering
    const timeoutId = setTimeout(() => {
      // Skip processing if context is still loading
      if (contextLoading) return;
      
      const findTourByType = () => {
        // Use either context tours or fallback to static data
        const toursToUse = tours.length > 0 ? tours : tourPackagesData;
        
        let selectedTour = null;
        
        // Find the tour based on tourType
        switch (tourType) {
          case 'bike':
            selectedTour = toursToUse.find(t => 
              t.transportType.toLowerCase() === 'bike' || 
              (t.title && t.title.toLowerCase().includes('bike'))
            );
            break;
          case 'buddhist':
            selectedTour = toursToUse.find(t => 
              (t.title && t.title.toLowerCase().includes('buddhist')) ||
              (t.title && t.title.toLowerCase().includes('tribal'))
            );
            break;
          case 'women':
            selectedTour = toursToUse.find(t => 
              t.isWomenOnly === true ||
              (t.title && t.title.toLowerCase().includes('women'))
            );
            break;
          case 'owncar':
            selectedTour = toursToUse.find(t => 
              (t.title && t.title.toLowerCase().includes('own car')) ||
              (t.title && t.title.toLowerCase().includes('self drive'))
            );
            break;
          case 'unexplored':
            selectedTour = toursToUse.find(t => 
              (t.title && t.title.toLowerCase().includes('unexplored')) || 
              (t.title && t.title.toLowerCase().includes('exploration'))
            );
            break;
          case 'hiddenheaven':
            selectedTour = toursToUse.find(t => 
              (t.title && t.title.toLowerCase().includes('hidden heaven')) || 
              (t.title && t.title.toLowerCase().includes('hidden'))
            );
            break;
          default:
            // Default to first tour if no matches
            selectedTour = toursToUse[0];
        }
        
        // Fallback to first tour of appropriate type if no specific match found
        if (!selectedTour && toursToUse.length > 0) {
          if (tourType === 'bike') {
            selectedTour = toursToUse.find(t => t.transportType.toLowerCase() === 'bike');
          } else {
            selectedTour = toursToUse.find(t => t.transportType.toLowerCase() === 'car');
          }
          
          // Last resort fallback
          if (!selectedTour) {
            selectedTour = toursToUse[0];
          }
        }
        
        if (selectedTour) {
          setTour(selectedTour);
          
          // Get other tours for the "More Popular Tours" section
          const others = toursToUse
            .filter(t => t.id !== selectedTour.id)
            .slice(0, 4);
          
          setOtherTours(others);
        }
        
        // Set loading to false only after finding tour
        setIsLoading(false);
      };
      
      findTourByType();
    }, 300); // Add a small delay to prevent rapid loading state changes
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [tourType, tours, contextLoading, refreshTours]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    if (tourType === 'bike' || (tour && tour.transportType.toLowerCase() === 'bike')) {
      return <Bike className="text-spiti-blue w-6 h-6" />;
    }
    return <Car className="text-spiti-blue w-6 h-6" />;
  };

  // Show loading skeleton if loading
  if (isLoading || !tour) {
    return (
      <div className="min-h-screen" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(44, 82, 130, 0.15), rgba(99, 179, 237, 0.1)), url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1920&auto=format&fit=crop')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Header />
        
        <div className="relative h-[80vh] sm:h-[70vh] mt-0 bg-gray-200">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          <div className="container mx-auto px-4 h-full flex items-end sm:items-center pb-16 sm:pb-0 relative z-10">
            <div className="max-w-3xl space-y-6">
              <Skeleton className="h-10 w-3/4 bg-gray-400" />
              <Skeleton className="h-6 w-1/2 bg-gray-400" />
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-8 w-32 bg-gray-400" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-400" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-400" />
              </div>
              <Skeleton className="h-10 w-40 bg-gray-400" />
            </div>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
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
        </section>
        
        <Footer />
      </div>
    );
  }

  // Only render content when we have data and are not loading
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
        isLoading={false} // Always false here since we're already past the loading check
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
              <TourPackageDetails tour={tour} isLoading={false} />
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

export default BaseTourDetailPage;
