
import React from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { Skeleton } from "@/components/ui/skeleton";
import TourHeroBadges from './TourHeroBadges';
import TourHeroPrice from './TourHeroPrice';
import TourHeroContent from './TourHeroContent';
import TourHeroBackground from './TourHeroBackground';

interface TourHeroProps {
  tour: TourPackageProps;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  formatPrice: (price: number) => string;
  heroImage?: string;
  isLoading?: boolean;
}

const TourHero: React.FC<TourHeroProps> = ({
  tour,
  selectedMonth,
  setSelectedMonth,
  formatPrice,
  heroImage = "https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=1200&q=80",
  isLoading = false
}) => {
  // Function to scroll to itinerary section
  const scrollToItinerary = () => {
    const itinerarySection = document.querySelector('.tour-itinerary');
    if (itinerarySection) {
      itinerarySection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <section className="relative h-[80vh] sm:h-[70vh] mt-0 bg-gray-200">
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
      </section>
    );
  }

  return (
    <section className="relative h-[80vh] sm:h-[70vh] mt-0" style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginTop: '0',
      paddingTop: '0'
    }}>
      {/* Hero Background with Overlay */}
      <TourHeroBackground heroImage={heroImage} />
      
      <div className="container mx-auto px-4 h-full flex items-end sm:items-center pb-16 sm:pb-0 relative z-10">
        {/* Hero Content - Title and Duration */}
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <TourHeroContent 
            title={tour.title}
            duration={tour.duration}
          />
          
          {/* Badges and View Itinerary Button */}
          <TourHeroBadges 
            transportType={tour.transportType}
            scrollToItinerary={scrollToItinerary}
          />
          
          {/* Price Information */}
          <TourHeroPrice 
            discountedPrice={tour.discountedPrice}
            originalPrice={tour.originalPrice}
            discount={tour.discount}
            isWomenOnly={tour.isWomenOnly}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </section>
  );
};

export default TourHero;
