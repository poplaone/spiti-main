
import React from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';
import TourOverview from "@/components/tour/TourOverview";
import TourItinerary from "@/components/tour/TourItinerary";
import TourPackageDetails from "@/components/tour/TourPackageDetails";
import DepartureDatesCard from "@/components/tour/DepartureDatesCard";
import BookingCard from "@/components/tour/BookingCard";

interface TourContentProps {
  tour: TourPackageProps;
  getTransportIcon: () => JSX.Element;
  formatPrice: (price: number) => string;
}

const TourContent: React.FC<TourContentProps> = ({ 
  tour, 
  getTransportIcon, 
  formatPrice
}) => {
  return (
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
  );
};

export default TourContent;
