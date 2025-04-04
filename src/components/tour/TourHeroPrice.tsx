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
  return;
};
export default TourHeroPrice;