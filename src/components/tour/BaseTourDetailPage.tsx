
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bike, Car } from "lucide-react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";
import TourDetailSkeleton from "@/components/tour/TourDetailSkeleton";
import TourContent from "@/components/tour/TourContent";
import { useTourData } from "@/components/tour/useTourData";

interface BaseTourDetailPageProps {
  tourType: string; // 'bike', 'buddhist', 'women', 'owncar', 'unexplored', 'hiddenheaven'
  heroImage: string;
  tourId?: string; // Added tourId as an optional prop
}

const BaseTourDetailPage: React.FC<BaseTourDetailPageProps> = ({ tourType, heroImage, tourId }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const { tour, otherTours, isLoading } = useTourData(tourType, tourId);
  
  // Format price with thousands separator
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
    return <TourDetailSkeleton />;
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
      <TourContent 
        tour={tour}
        getTransportIcon={getTransportIcon}
        formatPrice={formatPrice}
      />

      {/* More Popular Tours Section - horizontal scrollable */}
      <RelatedTours 
        tours={otherTours} 
        currentTourId={tour.id}
      />
      
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
