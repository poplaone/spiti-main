
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface TourHeroPriceProps {
  discountedPrice: number;
  originalPrice: number;
  discount: number;
  formatPrice: (price: number) => string;
}

const TourHeroPrice: React.FC<TourHeroPriceProps> = ({
  discountedPrice,
  originalPrice,
  discount,
  formatPrice
}) => {
  return (
    <div className="hidden sm:flex items-center space-x-2 mt-1 sm:mt-4">
      <span className="text-2xl sm:text-3xl font-bold text-green-400">₹{formatPrice(discountedPrice)}/-</span>
      <span className="text-sm sm:text-lg line-through opacity-75 text-white">₹{formatPrice(originalPrice)}/-</span>
      <Badge className="bg-red-500 text-sm sm:text-base px-2 sm:px-3 py-0.5 sm:py-1">{discount}% OFF</Badge>
    </div>
  );
};

export default TourHeroPrice;
