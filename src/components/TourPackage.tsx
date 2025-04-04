
import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Car, Users, Calendar, Sliders } from 'lucide-react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const TourPackage: React.FC<TourPackageProps & {
  id?: string;
}> = ({
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
  overviewDetails
}) => {
  const getTransportIcon = () => {
    switch (transportType.toLowerCase()) {
      case 'bike':
        return <Bike className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  // Get availability dates with fallbacks
  const availableFrom = overviewDetails?.availableFrom || 'June';
  const availableTo = overviewDetails?.availableTo || 'October';

  // Modified to use the tour ID directly when available
  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full w-full">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[200px] object-cover" />
        <div className="absolute top-1 left-1 bg-red-500 text-white text-xs sm:text-sm md:text-base font-bold py-0.5 px-1.5 rounded-sm">
          {discount}% OFF
        </div>
        
        {/* Removed the redundant tour type badges that were here */}
      </div>
      
      <CardContent className="p-4 sm:p-6 mx-[3px] my-0 py-[12px] px-[6px]">
        <h3 className="font-heading font-bold text-xl mb-3 text-gray-800">{title}</h3>
        
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

        <div className="flex gap-2 mt-2">
          <Link to={id ? `/tour/${id}` : "#"} className="flex-1">
            <Button variant="default" className="w-full bg-spiti-forest">
              Details
            </Button>
          </Link>
          <Link to="/contact" className="flex-1">
            <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50">
              Enquiry
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Re-export the types from tourTypes.ts for easier access by other components
export type { TourPackageProps, TourPackageWithId } from '@/data/types/tourTypes';
export default TourPackage;
