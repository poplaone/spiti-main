
import { TourPackageFormData } from "../types";

export const prepareOverviewDetails = (formData: TourPackageFormData): string => {
  return JSON.stringify({
    accommodation: formData.accommodation,
    bestTime: formData.bestTime,
    groupSize: formData.groupSize,
    terrain: formData.terrain,
    elevation: formData.elevation,
    availableFrom: formData.availableFrom,
    availableTo: formData.availableTo
  });
};

export const prepareTourPackageData = (
  formData: TourPackageFormData, 
  imageUrl: string, 
  discount: number
) => {
  return {
    title: formData.title,
    image: imageUrl,
    original_price: parseFloat(formData.originalPrice),
    discounted_price: parseFloat(formData.discountedPrice),
    discount,
    duration_nights: parseInt(formData.durationNights),
    duration_days: parseInt(formData.durationDays),
    transport_type: formData.transportType,
    is_women_only: formData.isWomenOnly,
    is_fixed_departure: formData.isFixedDeparture,
    is_customizable: formData.isCustomizable,
    overview: formData.overview,
    overview_details: prepareOverviewDetails(formData)
  };
};
