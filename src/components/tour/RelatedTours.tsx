
import React from 'react';
import TourPackage, { TourPackageProps } from "@/components/TourPackage";

interface RelatedToursProps {
  tours: TourPackageProps[];
  tourPackagesData: TourPackageProps[]; // Add this prop
}

const RelatedTours: React.FC<RelatedToursProps> = ({ tours, tourPackagesData }) => {
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
          {tours.map((tour, index) => (
            <div key={index} className="h-full">
              <TourPackage {...tour} index={tourPackagesData.findIndex(t => t.title === tour.title)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTours;
