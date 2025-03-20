
import React from 'react';
import { Clock } from 'lucide-react';
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white">
            {seoTitle}
          </h1>
          
          <div className="flex items-center text-lg text-white">
            <Clock className="w-5 h-5 mr-2" />
            <span>{tour.duration.nights} Nights / {tour.duration.days} Days</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-green-400">₹{formatPrice(tour.discountedPrice)}/-</span>
            <span className="text-sm line-through opacity-75 text-white">₹{formatPrice(tour.originalPrice)}/-</span>
            <Badge className="bg-red-500">{tour.discount}% OFF</Badge>
          </div>
          
          <Button variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white">
            View Tour Details
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourHero;
