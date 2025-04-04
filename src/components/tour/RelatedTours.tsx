
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
        
        {/* Carousel indicators to show it's horizontally scrollable */}
        <div className="flex justify-center items-center mb-4 md:hidden">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-spiti-forest" />
            <span className="text-sm text-spiti-forest font-medium">Swipe to see more</span>
            <ArrowRight className="h-5 w-5 text-spiti-forest" />
          </div>
        </div>

        <div className="relative">
          <Carousel 
            className="w-full" 
            opts={{ 
              align: "start",
              loop: filteredTours.length > 2,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredTours.map((tour, index) => (
                <CarouselItem 
                  key={`related-tour-${index}`} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
                >
                  <div className="h-full">
                    <TourPackage {...tour} id={tour.id} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
  
            {/* Custom navigation controls that are more visible */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-10 w-10 rounded-full hidden md:flex"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-10 w-10 rounded-full hidden md:flex"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
  
            {/* Standard carousel controls (hidden but functional) */}
            <div>
              <CarouselPrevious className="hidden" />
              <CarouselNext className="hidden" />
            </div>
          </Carousel>
  
          {/* Mobile custom navigation arrows (more visible) */}
          <div className="flex justify-between md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 px-1 z-10 pointer-events-none">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-8 w-8 rounded-full pointer-events-auto"
              aria-label="Previous slide"
              onClick={() => {
                // Using event to navigate the carousel
                const prevButton = document.querySelector('[data-carousel-prev="true"]') as HTMLButtonElement;
                if (prevButton) prevButton.click();
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white shadow-md h-8 w-8 rounded-full pointer-events-auto"
              aria-label="Next slide"
              onClick={() => {
                // Using event to navigate the carousel
                const nextButton = document.querySelector('[data-carousel-next="true"]') as HTMLButtonElement;
                if (nextButton) nextButton.click();
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedTours;
