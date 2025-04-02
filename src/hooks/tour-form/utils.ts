
import { TourPackageProps } from "@/components/TourPackage";

// Initialize empty tour form data
export const getEmptyTourData = (): TourPackageProps => ({
  title: "",
  image: "",
  originalPrice: 0,
  discountedPrice: 0,
  discount: 0,
  duration: {
    nights: 0,
    days: 0
  },
  nightStays: [],
  inclusions: [],
  exclusions: [],
  overview: "",
  itinerary: [],
  hasFixedDepartures: true,
  isCustomizable: true,
  transportType: 'car',
  isWomenOnly: false,
  availableDates: "June to October",
  customUrl: "",
  departureDates: [],
  bestTime: "June to September",
  groupSize: "2-10 People",
  terrain: "Himalayan Mountain Passes",
  elevation: "2,000 - 4,550 meters",
  accommodationType: "Hotels & Homestays"
});

// Calculate discount percentage based on original and discounted price
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice > 0 && discountedPrice > 0) {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }
  return 0;
};
