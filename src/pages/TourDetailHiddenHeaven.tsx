
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from "@/components/TourPackage";
import { getAllTours } from "@/services/tourService";
import { Car } from "lucide-react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import BookingCard from "@/components/tour/BookingCard";
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourPackageDetails from "@/components/tour/TourPackageDetails";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";
import DepartureDatesCard from "@/components/tour/DepartureDatesCard";

const TourDetailHiddenHeaven = () => {
  // Using Hidden Heaven tour
  const [tour, setTour] = useState<TourPackageProps | null>(null);
  const [otherTours, setOtherTours] = useState<TourPackageProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("June");
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        // Get all tours
        const allTours = await getAllTours();
        
        // Get the Hidden Heaven tour (index 5)
        const selectedTour = allTours[5];
        if (selectedTour) {
          setTour(selectedTour);
          
          // Get other tours for the "More Popular Tours" section
          const others = allTours.filter((_, index) => index !== 5).slice(0, 4);
          setOtherTours(others);
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading || !tour) {
    return <div>Loading...</div>;
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
        heroImage="/lovable-uploads/e375b837-c930-402e-8fd0-0ea3280c7540.png" // Swapped with Buddhist tour image
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

export default TourDetailHiddenHeaven;
