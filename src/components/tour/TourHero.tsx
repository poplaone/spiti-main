
import React, { useState } from 'react';
import { Clock, Calendar, MapPin, Bike, Car, Settings, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TourPackageProps } from "@/components/TourPackage";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface TourHeroProps {
  tour: TourPackageProps;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  formatPrice: (price: number) => string;
  heroImage?: string;
}

const TourHero: React.FC<TourHeroProps> = ({
  tour,
  selectedMonth,
  setSelectedMonth,
  formatPrice,
  heroImage = "https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=1200&q=80"
}) => {
  const isMobile = useIsMobile();
  const seoTitle = tour.title.toLowerCase().includes('spiti') ? tour.title : `${tour.title} - Spiti Valley Adventure`;
  
  // Array of available months
  const months = ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"];
                 
  // Function to scroll to itinerary section
  const scrollToItinerary = () => {
    const itinerarySection = document.querySelector('.tour-itinerary');
    if (itinerarySection) {
      itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative h-[80vh] sm:h-[70vh] mt-0" 
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '0',
        paddingTop: '0'
      }}
    >
      {/* Darkening overlay - reduced opacity on mobile for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 sm:from-black/70 sm:via-black/50 sm:to-black/20"></div>
      
      <div className="container mx-auto px-4 h-full flex items-end sm:items-center pb-16 sm:pb-0 relative z-10">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
            {seoTitle}
          </h1>
          
          {/* Tour details in a horizontal layout for better space usage */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-5 text-white">
            <div className="flex items-center">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-spiti-blue" />
              <span className="text-sm sm:text-base">{tour.duration.nights} Nights / {tour.duration.days} Days</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-spiti-blue" />
              <span className="text-sm sm:text-base">Shimla to Manali</span>
            </div>
          </div>
          
          {/* Badges moved to be in line with View Itinerary button */}
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={scrollToItinerary}
              className="border-white text-white hover:text-white bg-transparent sm:size-lg"
            >
              View Itinerary
            </Button>
            
            {tour.transportType === 'bike' ? (
              <Badge className="bg-orange-500 p-1.5">
                <Bike className="w-4 h-4" />
              </Badge>
            ) : (
              <Badge className="bg-green-500 p-1.5">
                <Car className="w-4 h-4" />
              </Badge>
            )}
            
            <Badge className="bg-purple-500 p-1.5">
              <CalendarIcon className="w-4 h-4" />
            </Badge>
            
            <Badge className="bg-blue-400 p-1.5">
              <Settings className="w-4 h-4" /> 
            </Badge>
          </div>
          
          {/* Price section - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:flex items-center space-x-2 mt-1 sm:mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-green-400">₹{formatPrice(tour.discountedPrice)}/-</span>
            <span className="text-sm sm:text-lg line-through opacity-75 text-white">₹{formatPrice(tour.originalPrice)}/-</span>
            <Badge className="bg-red-500 text-sm sm:text-base px-2 sm:px-3 py-0.5 sm:py-1">{tour.discount}% OFF</Badge>
          </div>
          
          {/* Month selection dropdown moved to the bottom */}
          <div className="flex items-center text-white mt-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-spiti-blue" />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32 sm:w-40 h-8 sm:h-10 bg-white/10 border-white/20 text-white text-sm">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {months.map((month) => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
    </section>
  );
};

export default TourHero;
