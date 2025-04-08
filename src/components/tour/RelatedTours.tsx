
import React from 'react';
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { TourPackageProps } from '@/data/types/tourTypes';
import { tourTitleToSlug } from '@/utils/routeUtils';

interface RelatedToursProps {
  tours: TourPackageProps[];
  currentTourId?: string;
}

// Format price with thousands separator
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN');
};

const RelatedTours: React.FC<RelatedToursProps> = ({ tours, currentTourId }) => {
  // Filter out the current tour if currentTourId is provided
  const filteredTours = currentTourId 
    ? tours.filter(tour => tour.id !== currentTourId)
    : tours;
  
  // Show a maximum of 6 related tours
  const relatedTours = filteredTours.slice(0, 6);
  
  if (relatedTours.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-50">
      <h2 className="text-2xl font-bold text-spiti-forest mb-6">More Tours You Might Like</h2>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 w-max md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:w-auto">
          {relatedTours.map((tour) => {
            // Get the custom URL for this tour
            const tourUrl = tourTitleToSlug[tour.title] || `/tour/${tour.id}`;
            
            return (
              <Link 
                key={tour.id || tour.title} 
                to={tourUrl}
                className="min-w-[280px] max-w-[300px] md:min-w-0 md:max-w-none transition-transform hover:-translate-y-1"
              >
                <Card className="overflow-hidden shadow-sm hover:shadow bg-white border">
                  <div className="relative">
                    <img 
                      src={tour.image} 
                      alt={tour.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-medium text-spiti-forest shadow">
                      ₹{formatCurrency(tour.discountedPrice)}
                    </div>
                    {tour.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-spiti-green text-white px-2 py-1 rounded-sm text-xs font-bold">
                        {tour.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 text-spiti-forest">
                      {tour.title}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{tour.duration.nights} Nights</span>
                      {tour.originalPrice > tour.discountedPrice && (
                        <span className="line-through text-gray-400 mr-2">
                          ₹{formatCurrency(tour.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedTours;
