
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
    <div className="flex items-center">
      <Badge className="bg-red-500 hover:bg-red-600 text-white px-2 py-1">
        {discount}% OFF
      </Badge>
    </div>
  );
};

export default TourHeroPrice;
