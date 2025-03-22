
import React from 'react';
import { Clock, Calendar, Mountain, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TourPackageProps } from "@/components/TourPackage";
import { Button } from "@/components/ui/button";

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
  const seoTitle = tour.title.toLowerCase().includes('spiti') ? tour.title : `${tour.title} - Spiti Valley Adventure`;

  return (
    <section className="relative h-[70vh] mt-8 sm:mt-0" style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20"></div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center space-x-2">
            <Badge className="bg-spiti-blue">Premium Tour</Badge>
            {tour.transportType === 'bike' && <Badge className="bg-orange-500">Bike Expedition</Badge>}
            {tour.transportType === 'car' && <Badge className="bg-green-500">Car Journey</Badge>}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
            {seoTitle}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-white">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-spiti-blue" />
              <span>{tour.duration.nights} Nights / {tour.duration.days} Days</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-spiti-blue" />
              <span>Shimla to Manali</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-3xl font-bold text-green-400">₹{formatPrice(tour.discountedPrice)}/-</span>
            <span className="text-lg line-through opacity-75 text-white">₹{formatPrice(tour.originalPrice)}/-</span>
            <Badge className="bg-red-500 text-base px-3 py-1">{tour.discount}% OFF</Badge>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button size="lg" className="bg-spiti-blue hover:bg-spiti-forest text-white">
              Book Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20 hover:text-white">
              View Itinerary
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
    </section>
  );
};

export default TourHero;
