
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RelatedToursProps {
  tours: TourPackageProps[];
  currentTourId?: string;
}

const RelatedTours: React.FC<RelatedToursProps> = ({ tours, currentTourId }) => {
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
        <p className="text-center text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto">
          Discover our other handcrafted Spiti Valley adventures, each offering unique experiences through 
          this mesmerizing Himalayan region. From bike tours and women-only expeditions to family-friendly 
          journeys, find the perfect package for your next mountain getaway.
        </p>
        
        {/* Swipe indicator for mobile */}
        <div className="flex justify-center items-center mb-4 md:hidden">
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <ArrowLeft className="h-4 w-4 text-spiti-forest animate-pulse" />
            <span className="text-sm text-spiti-forest font-medium">Swipe to explore all {filteredTours.length} tours</span>
            <ArrowRight className="h-4 w-4 text-spiti-forest animate-pulse" />
          </div>
        </div>

        <div className="relative">
          <Carousel 
            className="w-full" 
            opts={{ 
              align: "start",
              loop: filteredTours.length > 2,
              dragFree: true
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredTours.map((tour, index) => (
                <CarouselItem 
                  key={`related-tour-${tour.id || index}`} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="h-full">
                    <TourPackage {...tour} id={tour.id} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
  
            {/* Custom navigation controls for desktop */}
            <div className="hidden md:block">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white/80 border-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-10 w-10 rounded-full"
                aria-label="Previous slide"
                onClick={() => {
                  const prevButton = document.querySelector('[data-carousel-prev="true"]') as HTMLButtonElement;
                  if (prevButton) prevButton.click();
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white/80 border-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-10 w-10 rounded-full"
                aria-label="Next slide"
                onClick={() => {
                  const nextButton = document.querySelector('[data-carousel-next="true"]') as HTMLButtonElement;
                  if (nextButton) nextButton.click();
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
  
            {/* Standard carousel controls - hidden but functional */}
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>
  
          {/* Mobile custom navigation arrows - made more visible */}
          <div className="flex justify-between md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/90 border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-9 w-9 rounded-full"
              aria-label="Previous slide"
              onClick={() => {
                const prevButton = document.querySelector('[data-carousel-prev="true"]') as HTMLButtonElement;
                if (prevButton) prevButton.click();
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/90 border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-9 w-9 rounded-full"
              aria-label="Next slide"
              onClick={() => {
                const nextButton = document.querySelector('[data-carousel-next="true"]') as HTMLButtonElement;
                if (nextButton) nextButton.click();
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Display total number of tours available */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
            {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} available
          </span>
        </div>
      </div>
    </section>
  );
};

export default RelatedTours;
