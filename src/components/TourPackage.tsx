
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareMore, Send, CalendarCheck, Settings2 } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";

interface NightStay {
  location: string;
  nights: number;
}
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
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
  exclusions?: string[];
  itinerary?: ItineraryDay[];
  overview?: string;
  transportType?: 'bike' | 'car' | 'innova';
  isWomenOnly?: boolean;
  index?: number;
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

// Fix the route mapping to ensure each index matches the correct tour page
const getRouteMap = {
  0: '/tour-bike',
  1: '/tour-unexplored',
  2: '/tour-buddhist',
  3: '/tour-women',
  4: '/tour-owncar',
  5: '/tour-hiddenheaven'
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
  index,
  className = ""
}) => {
  const navigate = useNavigate();
  
  const getDetailRoute = () => {
    if (typeof index !== 'number') return '/';
    return getRouteMap[index as keyof typeof getRouteMap] || '/';
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.enquiry-btn')) {
      return;
    }
    navigate(getDetailRoute());
  };
  
  return (
    <div 
      className={`group h-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${className} cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
        
        <div className="absolute top-3 left-3 z-10">
          <Badge className="text-white font-medium text-sm px-3 py-1 rounded-md bg-rose-500 border-none">
            {discount}% OFF
          </Badge>
        </div>

        {isWomenOnly && <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-pink-500 text-white font-medium text-sm px-3 py-1 rounded-md border-none">
              Women Only
            </Badge>
          </div>}
      </div>
      
      <div className="p-4">
        {/* New typography format for the top section */}
        <div className="mb-3">
          <div className="text-sm font-medium text-rose-500 uppercase mb-1">
            {duration.days} DAYS TREK | EASY
          </div>
          <h3 className="font-heading text-xl text-spiti-forest font-bold">{title}</h3>
        </div>
        
        <div className="flex flex-col space-y-2 mb-4">
          {/* Fixed Departures and Customizable */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-spiti-blue">
              <CalendarCheck className="w-5 h-5 mr-1.5 text-spiti-blue" />
              <span className="text-sm font-medium uppercase">Fixed Departures</span>
            </div>
            
            <div className="flex items-center text-spiti-blue">
              <Settings2 className="w-5 h-5 mr-1.5 text-spiti-blue" />
              <span className="text-sm font-medium uppercase">Customizable</span>
            </div>
          </div>
          
          {/* Available from... */}
          <div className="text-sm text-gray-600">
            Available from June to October
          </div>
        </div>
        
        <div className="flex items-end justify-between mb-4 border-b pb-3">
          <div>
            <div className="text-lg font-bold text-spiti-forest">₹{formatPrice(discountedPrice)}</div>
            <div className="text-sm text-gray-500 line-through">₹{formatPrice(originalPrice)}</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 border-spiti-forest text-spiti-forest hover:bg-spiti-forest hover:text-white" asChild>
            <Link to={getDetailRoute()}>
              <MessageSquareMore className="mr-1 w-4 h-4" />
              <span>Details</span>
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="flex-1 bg-spiti-forest enquiry-btn">
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

export default React.memo(TourPackage);
