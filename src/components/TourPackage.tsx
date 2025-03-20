
import React from 'react';
import { Card } from "@/components/ui/card";
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
    <Card className="group h-full flex flex-col overflow-hidden rounded-lg border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        {/* Image with overlay */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Price tag */}
        <div className="absolute bottom-0 right-0 bg-white px-4 py-2 rounded-tl-lg">
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-spiti-blue">₹{formatPrice(discountedPrice)}</span>
            <span className="text-sm line-through text-gray-500">₹{formatPrice(originalPrice)}</span>
          </div>
        </div>
        
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
        
        {/* Fixed Departures and Customizable */}
        <div className="absolute bottom-12 left-3 right-3 flex items-center gap-2 text-white text-sm bg-black/30 backdrop-blur-sm p-1.5 rounded">
          <div className="flex items-center gap-1">
            <CalendarCheck className="w-4 h-4" />
            <span>Fixed Departures</span>
          </div>
          <span className="text-white/50">|</span>
          <div className="flex items-center gap-1">
            <Settings2 className="w-4 h-4" />
            <span>Customizable</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-display font-bold text-spiti-dark mb-2">{title}</h3>
        
        <div className="space-y-2 mb-4">
          {/* Duration */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-spiti-blue/70" />
            <span>{duration.nights} {duration.nights === 1 ? 'Night' : 'Nights'} / {duration.days} {duration.days === 1 ? 'Day' : 'Days'}</span>
          </div>
          
          {/* Locations visited */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-spiti-blue/70 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600 line-clamp-1">
              {nightStays.map(stay => stay.location).join(' • ')}
            </p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline" 
            className="flex-1 border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white" 
            asChild
          >
            <Link to={typeof index === 'number' ? `/tour/${index}` : '#'}>
              <MessageSquareMore className="mr-1 w-4 h-4" />
              <span>Details</span>
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="flex-1 bg-spiti-accent hover:bg-spiti-accent/90"
              >
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
    </Card>
  );
};

export default TourPackage;
