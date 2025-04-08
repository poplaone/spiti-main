
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Bike, ArrowLeftRight, User } from "lucide-react";
import { tourTitleToSlug } from '@/utils/routeUtils';
import { TourPackageProps } from '@/data/types/tourTypes';

// Format price with thousands separator
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN');
};

const TourPackage: React.FC<TourPackageProps> = ({
  id,
  title,
  image,
  originalPrice,
  discountedPrice,
  discount,
  duration,
  transportType,
  isWomenOnly,
  isFixedDeparture
}) => {
  // Get the custom URL for this tour package
  const tourUrl = tourTitleToSlug[title] || `/tour/${id}`;
  
  // Generate badge text based on tour characteristics
  const getBadgeText = () => {
    if (isWomenOnly) return "Women Only";
    if (transportType.toLowerCase() === 'bike') return "Bike Tour";
    if (isFixedDeparture) return "Fixed Departure";
    return null;
  };
  
  const badgeText = getBadgeText();
  
  return (
    <Link to={tourUrl}>
      <Card className="overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 bg-white">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          
          {/* Price badge */}
          <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-medium text-spiti-forest shadow">
            ₹{formatCurrency(discountedPrice)}
          </div>
          
          {/* Tour type badge */}
          {badgeText && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-spiti-blue hover:bg-spiti-blue">
                {transportType.toLowerCase() === 'bike' && <Bike className="mr-1" size={16} />}
                {isWomenOnly && <User className="mr-1" size={16} />}
                {badgeText}
              </Badge>
            </div>
          )}
          
          {/* Discount tag */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-spiti-green text-white px-2 py-1 rounded-sm text-xs font-bold">
              {discount}% OFF
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-base md:text-lg mb-2 text-spiti-forest line-clamp-2">
            {title}
          </h3>
          
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <span className="inline-flex items-center">
                <ArrowLeftRight className="mr-1" size={16} />
                {duration.nights} Nights
              </span>
            </div>
            
            <div>
              {originalPrice > discountedPrice && (
                <span className="line-through text-gray-400 mr-2">
                  ₹{formatCurrency(originalPrice)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TourPackage;
