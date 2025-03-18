
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { Link } from 'react-router-dom';

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
  nightStays: {
    location: string;
    nights: number;
  }[];
  inclusions: string[];
  transportType: "car" | "bike";
  isWomenOnly?: boolean;
  index?: number;
}

const TourPackage = ({
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
  index = 0
}: TourPackageProps) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const originPrice = formatter.format(originalPrice);
  const discPrice = formatter.format(discountedPrice);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {discount}% OFF
          </div>
        )}
        
        {isWomenOnly && (
          <div className="absolute top-4 left-4 bg-pink-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            Women Only
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-300 line-through">{originPrice}</span>
            <CardTitle className="text-xl font-bold text-green-400">{discPrice}</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-white/90">
            <Calendar size={16} />
            <span className="text-sm">{duration.nights}N/{duration.days}D</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2">
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Night Stays:</h4>
          <div className="flex flex-wrap gap-1">
            {nightStays.slice(0, 3).map((stay, i) => (
              <div key={i} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                <MapPin size={12} className="text-orange-300" />
                {stay.location}
                {stay.nights > 1 && <span>({stay.nights}N)</span>}
              </div>
            ))}
            {nightStays.length > 3 && (
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                <span>+{nightStays.length - 3} more</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Inclusions:</h4>
          <div className="grid grid-cols-1 gap-1">
            {inclusions.slice(0, 2).map((inclusion, i) => (
              <div key={i} className="flex items-start gap-1 text-xs">
                <Check size={14} className="text-green-300 mt-0.5 flex-shrink-0" />
                <span className="text-white">{inclusion}</span>
              </div>
            ))}
            {inclusions.length > 2 && (
              <div className="text-xs text-blue-300">+ {inclusions.length - 2} more inclusions</div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <div className="w-full flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full text-sm bg-fuchsia-600 hover:bg-fuchsia-500">
                Enquire Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <LeadForm packageName={title} />
            </DialogContent>
          </Dialog>
          
          <Link to={`/tour/${index}`} className="w-full">
            <Button variant="outline" className="w-full text-sm border-blue-400 text-blue-300 hover:bg-blue-500/30 hover:text-white backdrop-blur-md">
              View Details
            </Button>
          </Link>
        </div>
        
        <div className="w-full flex justify-center items-center gap-1 text-xs text-gray-300">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            transportType === 'car' ? 'bg-blue-500/30 text-blue-300' : 'bg-orange-500/30 text-orange-300'
          }`}>
            {transportType === 'car' ? '🚘' : '🏍️'}
          </div>
          <span>{transportType === 'car' ? 'Car Tour' : 'Bike Tour'}</span>
          
          {isWomenOnly && (
            <>
              <span className="mx-1">•</span>
              <div className="w-4 h-4 rounded-full flex items-center justify-center bg-pink-500/30 text-pink-300">
                👩
              </div>
              <span>Women Only</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TourPackage;
