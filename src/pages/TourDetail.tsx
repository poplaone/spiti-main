
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TourPackageProps } from "@/components/TourPackage";
import { tourPackagesData } from "@/data/tourPackagesData";
import { Bike, Car } from "lucide-react";

// Import refactored components
import TourHero from "@/components/tour/TourHero";
import BookingCard from "@/components/tour/BookingCard";
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourAccommodation from "@/components/tour/TourAccommodation";
import TourInclusions from "@/components/tour/TourInclusions";
import RelatedTours from "@/components/tour/RelatedTours";
import MobileStickyFooter from "@/components/tour/MobileStickyFooter";

// Array of hero images for different tour types
const heroImages = [
  "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200", // Bike tour
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80", // Unexplored
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80", // Buddhist
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80", // Women
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80", // Own Car
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80", // Hidden Heaven
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80", // Default
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
      
      <Footer />
    </div>
  );
};

export default TourDetail;
