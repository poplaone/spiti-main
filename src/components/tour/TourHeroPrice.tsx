
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
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-gray-500 line-through text-sm">₹{formatPrice(originalPrice)}</span>
        <Badge variant="destructive" className="font-semibold text-white">
          {discount}% OFF
        </Badge>
      </div>
      <div className="text-3xl font-bold text-spiti-forest">
        ₹{formatPrice(discountedPrice)}
      </div>
    </div>
  );
};

export default TourHeroPrice;
