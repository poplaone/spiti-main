
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from "@/components/TourPackage";
import { tourPackagesData } from "@/data/tourPackagesData";
import { Bike, Car } from "lucide-react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import BookingCard from "@/components/tour/BookingCard";
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourAccommodation from "@/components/tour/TourAccommodation";
import TourInclusions from "@/components/tour/TourInclusions";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";

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
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const numId = parseInt(id, 10);
      const selectedTour = tourPackagesData.find((_, index) => index === numId);
      if (selectedTour) {
        setTour(selectedTour);

        // Get other tours for the "More Popular Tours" section
        const others = tourPackagesData.filter((_, index) => index !== numId).slice(0, 4);
        setOtherTours(others);
      }
    }
  }, [id]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    if (tour.transportType === 'bike') return <Bike className="text-spiti-blue w-6 h-6" />;
    if (tour.transportType === 'car') return <Car className="text-spiti-blue w-6 h-6" />;
    return <Car className="text-spiti-blue w-6 h-6" />;
  };

  // Select hero image based on tour id
  const heroImage = id && !isNaN(parseInt(id, 10)) && parseInt(id, 10) < heroImages.length 
    ? heroImages[parseInt(id, 10)] 
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
              <TourOverview tour={tour} getTransportIcon={getTransportIcon} />
              <TourItinerary tour={tour} />
              <TourAccommodation tour={tour} />
              <TourInclusions tour={tour} />
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
      <RelatedTours tours={otherTours} tourPackagesData={tourPackagesData} />
      
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
