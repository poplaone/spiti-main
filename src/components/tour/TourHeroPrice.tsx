
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";

interface TourHeroPriceProps {
  discountedPrice: number;
  originalPrice: number;
  discount: number;
  isWomenOnly?: boolean;
  formatPrice: (price: number) => string;
}

const TourHeroPrice: React.FC<TourHeroPriceProps> = ({
  discountedPrice,
  originalPrice,
  discount,
  isWomenOnly,
  formatPrice
}) => {
  return (
    <div className="flex items-center gap-2">
      <Badge className="bg-red-500 hover:bg-red-600 text-white px-2 py-1">
        {discount}% OFF
      </Badge>
      
      {isWomenOnly && (
        <Badge className="bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 flex items-center gap-1">
          <UserRound className="h-3 w-3" />
          <span>Women Only</span>
        </Badge>
      )}
    </div>
  );
};

export default TourHeroPrice;
