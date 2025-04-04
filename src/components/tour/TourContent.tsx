
import React, { useState } from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TourOverview from './TourOverview';
import TourItinerary from './TourItinerary';
import TourInclusions from './TourInclusions';
import TourPackageDetails from './TourPackageDetails';
import TourAccommodation from './TourAccommodation';
import BookingCard from './BookingCard';
import DepartureDatesCard from './DepartureDatesCard';
import ContactBar from './ContactBar';

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
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Main content */}
        <div className="flex-1">
          <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="w-full flex flex-wrap overflow-x-auto justify-start md:justify-center">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="focus:outline-none">
              <TourOverview 
                tour={tour} 
                getTransportIcon={getTransportIcon} 
                overview={tour.overview}
              />
            </TabsContent>
            
            <TabsContent value="itinerary" className="focus:outline-none tour-itinerary">
              <TourItinerary 
                itinerary={tour.itinerary}
                nightStays={tour.nightStays}
                duration={tour.duration}
              />
            </TabsContent>
            
            <TabsContent value="inclusions" className="focus:outline-none">
              <TourInclusions 
                inclusions={tour.inclusions} 
                exclusions={tour.exclusions} 
              />
            </TabsContent>
            
            <TabsContent value="details" className="focus:outline-none">
              <TourPackageDetails
                transportType={tour.transportType}
                getTransportIcon={getTransportIcon}
                isWomenOnly={tour.isWomenOnly}
                isFixedDeparture={tour.isFixedDeparture}
                isCustomizable={tour.isCustomizable}
              />
            </TabsContent>
            
            <TabsContent value="accommodation" className="focus:outline-none">
              <TourAccommodation 
                nightStays={tour.nightStays} 
              />
            </TabsContent>
          </Tabs>
          
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
