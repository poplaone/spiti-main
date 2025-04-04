
import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Car, Users } from 'lucide-react';
import { TourPackageProps } from '@/data/types/tourTypes';

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
          {discount}% OFF
        </div>
        {isWomenOnly && (
          <div className="absolute top-0 left-0 bg-pink-500 text-white px-2 py-1 text-xs font-bold">
            Women Only
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{duration.nights} Nights</span>
            <span className="mx-1">•</span>
            <span className="font-medium">{duration.days} Days</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            {getTransportIcon()}
            <span className="ml-1 capitalize">{transportType}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-gray-500 line-through text-sm">₹{originalPrice.toLocaleString('en-IN')}</p>
            <p className="text-spiti-forest font-bold text-xl">₹{discountedPrice.toLocaleString('en-IN')}</p>
          </div>
          <Link
            to={getLinkPath()}
            className="bg-spiti-forest text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-spiti-forest/90 transition-colors"
          >
            View Details
          </Link>
        </div>

        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Users className="w-3 h-3 mr-1" />
          <span>2-10 people</span>
          <span className="mx-1">•</span>
          <span>Group Tour</span>
        </div>
      </div>
    </div>
  );
};

export default TourPackage;
