
import React from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';
import TourOverview from './TourOverview';
import TourItinerary from './TourItinerary';
import TourInclusions from './TourInclusions';
import TourPackageDetails from './TourPackageDetails';
import TourAccommodation from './TourAccommodation';
import BookingCard from './BookingCard';
import DepartureDatesCard from './DepartureDatesCard';
import ContactBar from './ContactBar';
import TourDetailTabs from './TourDetailTabs';

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
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* First - Details including departure dates */}
          <TourPackageDetails
            transportType={tour.transportType}
            getTransportIcon={getTransportIcon}
            isWomenOnly={tour.isWomenOnly}
            isFixedDeparture={tour.isFixedDeparture}
            isCustomizable={tour.isCustomizable}
          />
          
          {/* Second - Overview */}
          <TourOverview 
            tour={tour} 
            getTransportIcon={getTransportIcon} 
            overview={tour.overview}
          />
          
          {/* Third - Itinerary */}
          <TourItinerary 
            itinerary={tour.itinerary || []}
            nightStays={tour.nightStays}
            duration={tour.duration}
          />
          
          {/* Fourth - Package Details with Accommodations and Inclusions/Exclusions in toggle */}
          <TourDetailTabs tour={tour} />
          
          {/* Mobile contact bar */}
          <div className="block md:hidden mb-8">
            <ContactBar />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="md:w-[350px] space-y-6">
          <BookingCard 
            discountedPrice={tour.discountedPrice} 
            originalPrice={tour.originalPrice} 
            discount={tour.discount}
            formatPrice={formatPrice}
          />
          
          {/* Only show departure dates if this is a fixed departure tour */}
          {tour.isFixedDeparture && (
            <DepartureDatesCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default TourContent;
