import React from 'react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { useIsMobile } from '@/hooks/use-mobile';
import TourPackage from '@/components/TourPackage';

interface RelatedToursProps {
  tours: TourPackageProps[];
  currentTourId?: string;
}

const RelatedTours: React.FC<RelatedToursProps> = ({ tours, currentTourId }) => {
  // Always call hooks at the top level before any conditional logic
  const isMobile = useIsMobile();
  
  // Filter out the current tour if it exists
  const filteredTours = tours.filter(tour => 
    currentTourId ? tour.id !== currentTourId : true
  );
  
  // If there are no related tours, render nothing but still keep the hook calls above
  if (filteredTours.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-6">
          Similar Experiences You Might Like
        </h2>
        
        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className={`flex space-x-4 ${!isMobile ? 'flex-wrap -mx-2' : ''}`} style={{
            minWidth: isMobile ? 'max-content' : 'auto'
          }}>
            {filteredTours.slice(0, 4).map((tour, index) => (
              <div 
                key={tour.id || `related-tour-${index}`}
                className={isMobile ? "w-72 flex-shrink-0" : "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"}
              >
                <TourPackage 
                  {...tour} 
                  id={tour.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedTours;
