
import { TourPackageFormData } from "../types";

export const validateForm = (formData: TourPackageFormData): void => {
  if (!formData.title) throw new Error('Title is required');
  if (!formData.originalPrice) throw new Error('Original price is required');
  if (!formData.discountedPrice) throw new Error('Discounted price is required');
  if (!formData.durationNights) throw new Error('Duration nights is required');
  if (!formData.durationDays) throw new Error('Duration days is required');
  if (!formData.transportType) throw new Error('Transport type is required');
};

export const calculateDiscount = (originalPrice: string, discountedPrice: string): number => {
  const origPrice = parseFloat(originalPrice);
  const discPrice = parseFloat(discountedPrice);
  return Math.round(((origPrice - discPrice) / origPrice) * 100);
};
