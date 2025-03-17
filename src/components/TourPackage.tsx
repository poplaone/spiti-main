import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bike, Car, Calendar, Users, Clock, Coffee, MapPin, Home, Warehouse, MessageSquareMore, Send } from 'lucide-react';
import { Link } from "react-router-dom";
interface NightStay {
  location: string;
  nights: number;
}
export interface TourPackageProps {
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  duration: {
    nights: number;
    days: number;
  };
  nightStays: NightStay[];
  inclusions: string[];
  transportType?: 'bike' | 'car' | 'innova';
  isWomenOnly?: boolean;
  index?: number;
}
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN').format(price);
};
const TourPackage: React.FC<TourPackageProps> = ({
  title,
  image,
  originalPrice,
  discountedPrice,
  discount,
  duration,
  nightStays,
  inclusions,
  transportType,
  isWomenOnly,
  index
}) => {
  // Format the night stays for display
  const formattedStays = nightStays.map((stay, index) => <React.Fragment key={stay.location}>
      <span className="text-black">{stay.nights} night {stay.location}</span>
      {index < nightStays.length - 1 && " | "}
    </React.Fragment>);

  // Choose the appropriate transport icon
  const getTransportIcon = () => {
    if (transportType === 'bike') return <Bike className="text-spiti-blue w-5 h-5" />;
    if (transportType === 'car') return <Car className="text-spiti-blue w-5 h-5" />;
    return <Car className="text-spiti-blue w-5 h-5" />;
  };
  return <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col">
      <div className="relative">
        {/* Discount badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-red-500 text-white font-medium text-sm px-3 py-1 rounded-md">
            {discount}% off
          </Badge>
        </div>

        {/* Women only badge */}
        {isWomenOnly && <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-pink-500 text-white font-medium text-sm px-3 py-1 rounded-md">
              Women Only
            </Badge>
          </div>}

        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-spiti-dark mb-2">{title}</h3>
        
        {/* Price */}
        <div className="mb-2 flex items-center">
          <span className="text-lg font-bold text-green-600">INR {formatPrice(discountedPrice)}/-</span>
          <span className="text-sm line-through ml-2 text-red-600">INR {formatPrice(originalPrice)}/-</span>
          <span className="ml-auto text-sm text-gray-600">Onwards</span>
        </div>
        
        {/* Duration */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Clock className="w-4 h-4 mr-1" />
          <span>{duration.nights} {duration.nights === 1 ? 'Night' : 'Nights'}/{duration.days} {duration.days === 1 ? 'Day' : 'Days'}</span>
        </div>
        
        {/* Night stays - using a scrollbar for long text */}
        <div className="text-xs text-gray-600 mb-4 overflow-x-auto whitespace-nowrap pb-1 scrollbar-thin scrollbar-thumb-gray-300">
          {formattedStays}
        </div>
        
        <h4 className="font-semibold text-spiti-dark mb-2">Package Inclusions:</h4>
        
        {/* Inclusions list with icons */}
        <ul className="text-sm text-gray-700 mb-4 flex-1">
          {inclusions.map((inclusion, index) => <li key={index} className="mb-1 flex items-start">
              <div className="mr-2 mt-1">
                {inclusion.includes('Pick up') && <MapPin className="w-4 h-4 text-spiti-blue" />}
                {inclusion.includes('Sightseeing') && getTransportIcon()}
                {inclusion.includes('Nights accommodation') && <Home className="w-4 h-4 text-spiti-blue" />}
                {inclusion.includes('breakfasts') && <Coffee className="w-4 h-4 text-spiti-blue" />}
                {inclusion.includes('Hotel taxes') && <Warehouse className="w-4 h-4 text-spiti-blue" />}
                {inclusion.includes('Helmet') && <Bike className="w-4 h-4 text-spiti-blue" />}
                {inclusion.includes('Oxygen') && <Users className="w-4 h-4 text-spiti-blue" />}
                {inclusion.includes('Group Leader') && <Users className="w-4 h-4 text-spiti-blue" />}
              </div>
              <span>{inclusion}</span>
            </li>)}
        </ul>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button variant="default" className="w-1/2 bg-blue-500 hover:bg-blue-600" asChild>
            <Link to={typeof index === 'number' ? `/tour/${index}` : '#'}>
              <MessageSquareMore className="mr-1 w-4 h-4" />
              <span>More Details</span>
            </Link>
          </Button>
          <Button variant="default" className="w-1/2 bg-yellow-500 hover:bg-yellow-600">
            <Send className="mr-1 w-4 h-4" />
            <span>Send Enquiry</span>
          </Button>
        </div>

        {/* WhatsApp floating button */}
        
      </CardContent>
    </Card>;
};
export default TourPackage;