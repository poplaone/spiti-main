
import { TourPackageProps } from '@/components/TourPackage';

export const bikeTours: TourPackageProps[] = [
  {
    title: "LAHAUL SPITI - BIKE TOUR",
    image: "public/lovable-uploads/f3302b9e-3a1e-4963-a96b-1338bf4881db.png",
    originalPrice: 47000,
    discountedPrice: 37600,
    discount: 25,
    duration: {
      nights: 9,
      days: 10
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Sangla", nights: 1 },
      { location: "Kalpa", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Mudh", nights: 1 },
      { location: "Kaza", nights: 1 },
      { location: "Langza", nights: 1 },
      { location: "Chandertaal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Pick up and Drop Chandigarh.",
      "All Sightseeing as per itinerary by Bike.",
      "09 Nights accommodation on double sharing basis.",
      "09 breakfasts & 09 dinners in the hotel.",
      "Hotel taxes.",
      "Helmet and Spare Parts with Tool Kit."
    ],
    transportType: "bike"
  }
];
