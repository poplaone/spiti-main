
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
  // Determine if we should show package details or departure dates
  const showPackageDetails = !tour.isFixedDeparture;
  
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* First - Only show Package Details for non-fixed departure tours */}
          {showPackageDetails ? (
            <TourPackageDetails
              transportType={tour.transportType}
              getTransportIcon={getTransportIcon}
              isWomenOnly={tour.isWomenOnly}
              isFixedDeparture={tour.isFixedDeparture}
              isCustomizable={tour.isCustomizable}
            />
          ) : (
            // Show departure dates for fixed departure tours
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-heading font-bold text-spiti-forest mb-4">
                Departure Dates
              </h2>
              <DepartureDatesCard 
                className="p-0 bg-transparent shadow-none" 
                tourId={tour.id}
              />
            </div>
          )}
          
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
        
        {/* Sidebar - with fixed height and no relative positioning on mobile */}
        <div className="lg:w-[350px] space-y-6 flex-shrink-0 lg:relative" style={{ minHeight: 'auto', maxHeight: 'none' }}>
          <BookingCard 
            discountedPrice={tour.discountedPrice} 
            originalPrice={tour.originalPrice} 
            discount={tour.discount}
            formatPrice={formatPrice}
          />
          
          {/* Only show departure dates in sidebar if this is a fixed departure tour 
              AND we're not already showing them in the main content area */}
          {tour.isFixedDeparture && !showPackageDetails ? null : (
            tour.isFixedDeparture && (
              <DepartureDatesCard tourId={tour.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TourContent;
