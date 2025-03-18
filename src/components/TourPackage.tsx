
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
    <Card className="overflow-hidden transition-all hover:shadow-xl bg-white/30 backdrop-blur-md border-white/30">
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
            <span className="text-sm text-gray-500 line-through">{originPrice}</span>
            <CardTitle className="text-xl font-bold text-green-600">{discPrice}</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar size={16} />
            <span className="text-sm">{duration.nights}N/{duration.days}D</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Night Stays:</h4>
          <div className="flex flex-wrap gap-1">
            {nightStays.slice(0, 3).map((stay, i) => (
              <div key={i} className="flex items-center gap-1 bg-spiti-sand/50 px-2 py-1 rounded-full text-xs">
                <MapPin size={12} className="text-spiti-brown" />
                {stay.location}
                {stay.nights > 1 && <span>({stay.nights}N)</span>}
              </div>
            ))}
            {nightStays.length > 3 && (
              <div className="flex items-center gap-1 bg-spiti-sand/50 px-2 py-1 rounded-full text-xs">
                <span>+{nightStays.length - 3} more</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Inclusions:</h4>
          <div className="grid grid-cols-1 gap-1">
            {inclusions.slice(0, 2).map((inclusion, i) => (
              <div key={i} className="flex items-start gap-1 text-xs">
                <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{inclusion}</span>
              </div>
            ))}
            {inclusions.length > 2 && (
              <div className="text-xs text-blue-600">+ {inclusions.length - 2} more inclusions</div>
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
            <Button variant="outline" className="w-full text-sm border-spiti-blue text-spiti-blue hover:bg-spiti-blue hover:text-white">
              View Details
            </Button>
          </Link>
        </div>
        
        <div className="w-full flex justify-center items-center gap-1 text-xs text-gray-500">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            transportType === 'car' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
          }`}>
            {transportType === 'car' ? '🚘' : '🏍️'}
          </div>
          <span>{transportType === 'car' ? 'Car Tour' : 'Bike Tour'}</span>
          
          {isWomenOnly && (
            <>
              <span className="mx-1">•</span>
              <div className="w-4 h-4 rounded-full flex items-center justify-center bg-pink-100 text-pink-600">
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
