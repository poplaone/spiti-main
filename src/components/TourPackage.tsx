
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, MessageSquareMore, Send, CalendarCheck, Settings2 } from 'lucide-react';
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

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
    <div className="group h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative h-60 overflow-hidden">
        {/* Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Discount badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="text-white font-medium text-sm px-3 py-1 rounded-md bg-rose-500 border-none">
            {discount}% OFF
          </Badge>
        </div>

        {/* Women only badge */}
        {isWomenOnly && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-pink-500 text-white font-medium text-sm px-3 py-1 rounded-md border-none">
              Women Only
            </Badge>
          </div>
        )}
        
        {/* Title overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-heading text-xl text-white font-bold mb-1">{title}</h3>
          
          {/* Duration */}
          <div className="flex items-center text-white/90 text-sm mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>{duration.nights} {duration.nights === 1 ? 'Night' : 'Nights'} / {duration.days} {duration.days === 1 ? 'Day' : 'Days'}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        {/* Price section */}
        <div className="flex items-end justify-between mb-3 border-b pb-3">
          <div>
            <div className="text-lg font-bold text-spiti-forest">₹{formatPrice(discountedPrice)}</div>
            <div className="text-sm text-gray-500 line-through">₹{formatPrice(originalPrice)}</div>
          </div>
          
          {/* Fixed Departures and Customizable */}
          <div className="text-xs space-y-1 text-right">
            <div className="flex items-center justify-end text-spiti-forest font-medium">
              <CalendarCheck className="w-3.5 h-3.5 mr-1" />
              <span>Fixed Departures</span>
            </div>
            <div className="flex items-center justify-end text-spiti-forest font-medium">
              <Settings2 className="w-3.5 h-3.5 mr-1" />
              <span>Customizable</span>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-spiti-forest text-spiti-forest hover:bg-spiti-forest hover:text-white" asChild>
            <Link to={typeof index === 'number' ? `/tour/${index}` : '#'}>
              <MessageSquareMore className="mr-1 w-4 h-4" />
              <span>Details</span>
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="flex-1 bg-spiti-slate hover:bg-spiti-forest">
                <Send className="mr-1 w-4 h-4" />
                <span>Enquiry</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <LeadForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TourPackage;
