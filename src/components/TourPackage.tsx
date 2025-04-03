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
const getRouteMap = {
  0: '/tour-bike',
  1: '/tour-unexplored',
  2: '/tour-buddhist',
  3: '/tour-women',
  4: '/tour-owncar',
  5: '/tour-hiddenheaven'
};

// Function to highlight month names in a text string
const highlightMonths = (text: string) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let result = text;
  months.forEach(month => {
    if (text.includes(month)) {
      result = result.replace(month, `<span class="text-spiti-blue font-medium">${month}</span>`);
    }
  });
  return <span dangerouslySetInnerHTML={{
    __html: result
  }} />;
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
  return <div className={`group h-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${className} cursor-pointer`} onClick={handleCardClick}>
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
        <h3 className="font-heading text-xl text-spiti-forest font-bold mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex flex-col space-y-1 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-rose-500">
              <CalendarCheck className="w-4 h-4 mr-1 text-rose-500" />
              <span className="text-xs font-medium uppercase py-[2px] px-px">Fixed Departures</span>
            </div>
            
            <div className="flex items-center text-rose-500 px-[3px]">
              <Settings2 className="w-4 h-4 mr-1 text-rose-500" />
              <span className="text-xs font-medium uppercase text-left px-0">Customizable</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-700 font-medium">
            {highlightMonths("Available from June to October")}
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
        
        <div className="flex gap-2 w-full">
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
    </div>;
};
export default React.memo(TourPackage);