import React from 'react';
import TourPackage, { TourPackageProps } from "@/components/TourPackage";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedToursProps {
  tours: TourPackageProps[];
  loading?: boolean;
}

const RelatedTours: React.FC<RelatedToursProps> = ({ tours, loading = false }) => {
  if (loading) {
    return (
      <section className="py-16 bg-spiti-stone">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-6 text-spiti-forest">More Popular Spiti Valley Tours</h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Discover our other handcrafted Spiti Valley adventures, each offering unique experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                <Skeleton className="h-52 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-spiti-stone">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-6 text-spiti-forest">More Popular Spiti Valley Tours</h2>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Discover our other handcrafted Spiti Valley adventures, each offering unique experiences through 
          this mesmerizing Himalayan region. From bike tours and women-only expeditions to family-friendly 
          journeys, find the perfect package for your next mountain getaway.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => {
            return (
              <div key={index} className="h-full">
                <TourPackage 
                  {...tour} 
                  index={tour.index || index} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedTours;
