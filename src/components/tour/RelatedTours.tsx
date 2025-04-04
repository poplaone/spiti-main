
import React from 'react';
import TourPackage from "@/components/TourPackage";
import { TourPackageProps } from "@/data/types/tourTypes";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface RelatedToursProps {
  tours: TourPackageProps[];
  currentTourId?: string;
}

const RelatedTours: React.FC<RelatedToursProps> = ({ tours, currentTourId }) => {
  const isMobile = useIsMobile();
  
  // Filter out the current tour if currentTourId is provided
  const filteredTours = currentTourId 
    ? tours.filter(tour => tour.id !== currentTourId) 
    : tours;

  // If no related tours available after filtering current tour
  if (filteredTours.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-16 bg-spiti-stone">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-4 md:mb-6 text-spiti-forest">More Popular Spiti Valley Tours</h2>
        <p className="text-center text-gray-700 mb-6 md:mb-12 max-w-3xl mx-auto">
          Discover our other handcrafted Spiti Valley adventures, each offering unique experiences through 
          this mesmerizing Himalayan region. From bike tours and women-only expeditions to family-friendly 
          journeys, find the perfect package for your next mountain getaway.
        </p>
        
        {/* Desktop version with carousel */}
        <Carousel 
          className="w-full" 
          opts={{ 
            align: "start",
            loop: filteredTours.length > 3,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredTours.map((tour, index) => (
              <CarouselItem 
                key={`related-tour-${index}`} 
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full">
                  <TourPackage {...tour} id={tour.id} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>

        {/* Mobile version with ScrollArea for smooth touch scrolling */}
        {isMobile && (
          <div className="block md:hidden mt-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {filteredTours.map((tour, index) => (
                  <div key={`related-tour-mobile-${index}`} className="w-[85vw] flex-shrink-0">
                    <TourPackage {...tour} id={tour.id} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedTours;
