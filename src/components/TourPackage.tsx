
import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Car, Users, Calendar, Sliders } from 'lucide-react';
import { TourPackageProps } from '@/data/types/tourTypes';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const TourPackage: React.FC<TourPackageProps & { id?: string }> = ({
  id,
  title,
  image,
  originalPrice,
  discountedPrice,
  discount,
  duration,
  transportType,
  isWomenOnly,
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

  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute top-6 left-6 bg-red-500 text-white px-6 py-3 text-xl font-bold rounded-full">
          {discount}% OFF
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-heading font-bold text-2xl mb-4 text-gray-800">{title}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-medium">FIXED DEPARTURES</span>
          </div>
          
          <div className="flex items-center">
            <Sliders className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-medium">CUSTOMIZABLE</span>
          </div>
        </div>
        
        <p className="text-xl text-gray-700 mb-6">Available from June to October</p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 line-through text-lg">₹{originalPrice.toLocaleString('en-IN')}</p>
            <p className="text-gray-800 font-bold text-4xl">₹{discountedPrice.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="text-right">
            <p className="text-red-500 text-2xl font-bold">
              {duration.nights} NIGHTS / {duration.days} DAYS
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Re-export the types from tourTypes.ts for easier access by other components
export type { TourPackageProps, TourPackageWithId } from '@/data/types/tourTypes';

export default TourPackage;
