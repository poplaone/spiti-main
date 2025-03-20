
import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TourPackageProps } from "@/components/TourPackage";

interface TourHeroProps {
  tour: TourPackageProps;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  formatPrice: (price: number) => string;
}

const TourHero: React.FC<TourHeroProps> = ({ tour, selectedMonth, setSelectedMonth, formatPrice }) => {
  const seoTitle = tour.title.toLowerCase().includes('spiti') ? tour.title : `${tour.title} - Spiti Valley Adventure`;

  return (
    <section className="min-h-[60vh] mt-16 relative flex items-center py-8 md:py-12" style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=1200&q=80)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex-1 text-white max-w-2xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-heading font-bold">
              <span className="bg-gradient-to-r from-green-400 via-yellow-300 to-orange-500 text-transparent bg-clip-text">
                {seoTitle}
              </span>
            </h1>
            <div className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2" />
              <span>{tour.duration.nights} Nights / {tour.duration.days} Days Himalayan Adventure</span>
            </div>
            <p className="text-lg">
              Explore the breathtaking landscapes of Spiti Valley with our expertly crafted tour package. 
              Journey through ancient monasteries, remote villages, and pristine high-altitude lakes.
            </p>
            
            {/* Price displayed below image on mobile */}
            <div className="flex items-center space-x-4 lg:hidden">
              <span className="text-2xl font-bold text-green-400">₹{formatPrice(tour.discountedPrice)}/-</span>
              <span className="text-sm line-through opacity-75">₹{formatPrice(tour.originalPrice)}/-</span>
              <Badge className="bg-red-500">{tour.discount}% OFF</Badge>
            </div>
            
            {/* Month selector for mobile and desktop */}
            <div className="w-full sm:w-64">
              <label className="block text-white mb-2">Choose Travel Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="June">June 2023</SelectItem>
                  <SelectItem value="July">July 2023</SelectItem>
                  <SelectItem value="August">August 2023</SelectItem>
                  <SelectItem value="September">September 2023</SelectItem>
                  <SelectItem value="October">October 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourHero;
