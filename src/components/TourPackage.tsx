import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareMore, Send, CalendarCheck, Settings2 } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { TourPackageProps } from './TourPackage.d';

// Re-export the types so they can be imported from either location
export type { TourPackageProps, DepartureDateField } from './TourPackage.d';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

// Mapping for static routes (keeping backward compatibility)
const getRouteMap = {
  0: '/tour-bike',
  1: '/tour-unexplored',
  2: '/tour-buddhist',
  3: '/tour-women',
  4: '/tour-owncar',
  5: '/tour-hiddenheaven'
};

const TourPackage: React.FC<TourPackageProps> = ({
  id,
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
  isFixedDeparture,
  isCustomizable,
  index,
  className = ""
}) => {
  const navigate = useNavigate();
  
  const getDetailRoute = () => {
    // If we have an ID, use the dynamic route
    if (id) {
      return `/tour-detail/${id}`;
    }
    
    // Fall back to static routes for backward compatibility
    if (typeof index !== 'undefined') {
      return getRouteMap[index as keyof typeof getRouteMap] || '/';
    }
    
    return '/';
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
        <h3 className="font-heading text-xl text-spiti-forest font-bold mb-2">{title}</h3>
        
        <div className="flex flex-col space-y-1 mb-3">
          <div className="flex items-center space-x-4">
            {isFixedDeparture && (
              <div className="flex items-center text-rose-500">
                <CalendarCheck className="w-4 h-4 mr-1 text-rose-500" />
                <span className="text-xs font-medium uppercase">Fixed Departures</span>
              </div>
            )}
            
            {isCustomizable && (
              <div className="flex items-center text-rose-500">
                <Settings2 className="w-4 h-4 mr-1 text-rose-500" />
                <span className="text-xs font-medium uppercase">Customizable</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-600">
            Available from June to October
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4 border-b pb-3">
          <div>
            <div className="text-lg font-bold text-spiti-forest">₹{formatPrice(discountedPrice)}</div>
            <div className="text-sm text-gray-500 line-through">₹{formatPrice(originalPrice)}</div>
          </div>
          <div className="text-sm font-medium text-rose-500 uppercase">
            {duration.nights} NIGHTS / {duration.days} DAYS
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
