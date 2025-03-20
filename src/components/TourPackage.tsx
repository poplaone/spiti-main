
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Calendar as CalendarIcon, MessageSquareMore, Send } from 'lucide-react';
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
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col border-0 shadow-sm">
      <div className="relative h-48 overflow-hidden">
        {/* Discount badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="text-white font-medium text-sm px-3 py-1 rounded-md bg-spiti-accent">
            {discount}% off
          </Badge>
        </div>

        {/* Women only badge */}
        {isWomenOnly && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-pink-500 text-white font-medium text-sm px-3 py-1 rounded-md">
              Women Only
            </Badge>
          </div>
        )}

        {/* Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        
        {/* Departure information overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center gap-2 text-white text-sm">
            <CalendarIcon className="w-4 h-4 text-white/80" />
            <span className="font-medium">Fixed Departures Customizable</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-display font-bold text-spiti-dark mb-2">{title}</h3>
        
        {/* Price */}
        <div className="mb-2 flex items-center">
          <span className="text-lg font-bold text-spiti-blue">₹{formatPrice(discountedPrice)}</span>
          <span className="text-sm line-through ml-2 text-gray-500">₹{formatPrice(originalPrice)}</span>
          <span className="ml-auto text-xs text-gray-500">Starting Price</span>
        </div>
        
        {/* Duration */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Clock className="w-4 h-4 mr-1" />
          <span>{duration.nights} {duration.nights === 1 ? 'Night' : 'Nights'} / {duration.days} {duration.days === 1 ? 'Day' : 'Days'}</span>
        </div>
        
        {/* Locations visited */}
        <div className="flex items-start gap-1 mb-4">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600 line-clamp-1">
            {nightStays.map(stay => stay.location).join(' • ')}
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" className="w-1/2 border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white" asChild>
            <Link to={typeof index === 'number' ? `/tour/${index}` : '#'}>
              <MessageSquareMore className="mr-1 w-4 h-4" />
              <span>Details</span>
            </Link>
          </Button>
          <Button variant="default" className="w-1/2 bg-spiti-accent hover:bg-spiti-accent/90">
            <Send className="mr-1 w-4 h-4" />
            <span>Enquiry</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourPackage;
