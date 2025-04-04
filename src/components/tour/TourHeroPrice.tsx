
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-white">
          ₹{formatPrice(discountedPrice)}
        </span>
        <span className="text-base sm:text-lg line-through text-gray-300">
          ₹{formatPrice(originalPrice)}
        </span>
      </div>
      <Badge className="bg-red-500 hover:bg-red-600 text-white px-2 py-1">
        {discount}% OFF
      </Badge>
    </div>
  );
};

export default TourHeroPrice;
