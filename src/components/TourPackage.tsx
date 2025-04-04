import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Car, Users, Calendar, Sliders } from 'lucide-react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
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
  isWomenOnly
}) => {
  const getTransportIcon = () => {
    switch (transportType.toLowerCase()) {
      case 'bike':
        return <Bike className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  // Determine the path to link to based on the title
  const getLinkPath = () => {
    if (title.includes("BIKE") || transportType.toLowerCase() === 'bike') {
      return '/tour-bike';
    }
    if (title.includes("WOMEN")) {
      return '/tour-women';
    }
    if (title.includes("OWN CAR") || title.includes("OWN VEHICLE")) {
      return '/tour-owncar';
    }
    if (title.includes("BUDDHIST")) {
      return '/tour-buddhist';
    }
    if (title.includes("HIDDEN HEAVEN")) {
      return '/tour-hiddenheaven';
    }
    // Default to unexplored tour page
    return '/tour-unexplored';
  };
  return <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[200px] object-cover" />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 text-lg font-bold rounded-full">
          {discount}% OFF
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-heading font-bold text-xl mb-3 text-gray-800">{title}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium text-sm">FIXED DEPARTURES</span>
          </div>
          
          <div className="flex items-center">
            <Sliders className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium text-sm">CUSTOMIZABLE</span>
          </div>
        </div>
        
        <p className="text-md text-red-500 font-medium mb-4">Available from <span className="text-red-500 font-semibold">June</span> to <span className="text-red-500 font-semibold">October</span></p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500 line-through text-sm">₹{originalPrice.toLocaleString('en-IN')}</p>
            <p className="text-gray-800 font-bold text-2xl">₹{discountedPrice.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="text-right">
            <p className="text-red-500 text-lg font-semibold">
              {duration.nights} NIGHTS / {duration.days} DAYS
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Link to={getLinkPath()} className="flex-1">
            <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
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
    </Card>;
};

// Re-export the types from tourTypes.ts for easier access by other components
export type { TourPackageProps, TourPackageWithId } from '@/data/types/tourTypes';
export default TourPackage;