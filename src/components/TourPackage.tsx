
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Bike, Car, Calendar, Sliders, UserRound } from 'lucide-react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LeadForm from "./LeadForm";
import { tourTitleToSlug } from '@/utils/routeUtils';

// Memoized TourPackage component to prevent unnecessary re-renders
const TourPackage: React.FC<TourPackageProps & {
  id?: string;
}> = memo(({
  id,
  title,
  image,
  originalPrice,
  discountedPrice,
  discount,
  duration,
  transportType,
  isWomenOnly,
  isFixedDeparture = false,
  isCustomizable = true,
  displayOrder,
  overviewDetails
}) => {
  // Get availability dates with fallbacks
  const availableFrom = overviewDetails?.availableFrom || 'June';
  const availableTo = overviewDetails?.availableTo || 'October';

  // Determine the URL based on the tour title
  let detailsUrl;
  
  // Map specific titles to their clean URLs - adding a more direct check for exact title match
  if (title === "BUDDHIST AND TRIBAL CIRCUIT–SPITI" || 
      title === "BUDDHIST AND TRIBAL CIRCUIT–SPITI " || 
      title === "BUDDHIST AND TRIBAL CIRCUIT SPITI") {
    detailsUrl = "/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI";
  } else if (title === "SNOW LEOPARD EXPEDITION (WINTER SPECIAL)" || 
             title === "SNOW LEOPARD EXPEDITION (WINTER SPECIAL) " || 
             title === "SNOW LEOPARD EXPEDITION WINTER SPECIAL") {
    detailsUrl = "/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL";
  } else {
    // For other tours, use the existing mapping from tourTitleToSlug or default to ID-based URL
    detailsUrl = title && tourTitleToSlug[title] ? tourTitleToSlug[title] : (id ? `/tour/${id}` : "#");
  }

  return (
    <div className="block h-full w-full">
      <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full w-full cursor-pointer">
        <Link to={detailsUrl} className="block">
          <div className="relative">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-[200px] object-cover" 
              loading="lazy"
              decoding="async"
              width="400"
              height="200"
            />
            <div className="absolute top-1 left-1 bg-red-500 text-white text-xs sm:text-sm md:text-base font-bold py-0.5 px-1.5 rounded-sm">
              {discount}% OFF
            </div>
            
            {isWomenOnly && (
              <div className="absolute top-1 right-1 bg-pink-500 text-white text-xs sm:text-sm md:text-base font-bold py-0.5 px-1.5 rounded-sm flex items-center">
                <UserRound className="w-3 h-3 mr-1" />
                <span>Women Only</span>
              </div>
            )}
          </div>
        </Link>
        
        <CardContent className="p-4 sm:p-6 mx-[3px] my-0 py-[12px] px-[6px]">
          <Link to={detailsUrl} className="block">
            <h3 className="font-heading font-bold text-xl mb-3 text-gray-800 line-clamp-2">{title}</h3>
            
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" style={{
                  color: isFixedDeparture ? '#3B82F6' : '#6B7280'
                }} />
                <span style={{
                  color: isFixedDeparture ? '#3B82F6' : '#6B7280',
                  fontWeight: isFixedDeparture ? 'bold' : 'normal'
                }} className="text-xs">FIXED DEPARTURES</span>
              </div>
              
              <div className="flex items-center">
                <Sliders className="w-4 h-4 mr-1" style={{
                  color: isCustomizable ? '#10B981' : '#6B7280'
                }} />
                <span style={{
                  color: isCustomizable ? '#10B981' : '#6B7280',
                  fontWeight: isCustomizable ? 'bold' : 'normal'
                }} className="text-xs">CUSTOMIZABLE</span>
              </div>
            </div>
            
            <p className="text-md text-gray-800 mb-4 font-medium text-sm">Available from <span className="text-red-500 font-semibold">{availableFrom}</span> to <span className="text-red-500 font-semibold">{availableTo}</span></p>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-500 line-through text-sm">₹{originalPrice.toLocaleString('en-IN')}</p>
                <p className="text-gray-800 font-bold text-2xl">₹{discountedPrice.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-spiti-forest text-sm">
                  {duration.nights} NIGHTS / {duration.days} DAYS
                </p>
              </div>
            </div>
          </Link>

          <div className="flex gap-2 mt-2">
            <div className="w-1/2">
              <Link to={detailsUrl} className="block w-full">
                <Button variant="default" className="w-full bg-spiti-forest h-10">
                  Details
                </Button>
              </Link>
            </div>
            <div className="w-1/2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50 h-10">
                    Enquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LeadForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

// For React DevTools
TourPackage.displayName = 'TourPackage';

// Re-export the types from tourTypes.ts for easier access by other components
export type { TourPackageProps, TourPackageWithId } from '@/data/types/tourTypes';
export default TourPackage;
