
import { TourPackageProps } from '@/components/TourPackage';

export const carTours: TourPackageProps[] = [
  {
    title: "UNEXPLORED SPITI",
    image: "public/lovable-uploads/a122e2c4-bd62-41e0-ab07-d5e16dd5bb42.png",
    originalPrice: 22700,
    discountedPrice: 18900,
    discount: 20,
    duration: {
      nights: 6,
      days: 7
    },
    nightStays: [
      { location: "Sangla", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Kaza", nights: 1 },
      { location: "Langza", nights: 1 },
      { location: "Chandrataal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Pick up from Shimla and drop to Manali.",
      "All Sightseeing as per itinerary by Innova/Tempo Traveller.",
      "06 Nights accommodation on double sharing basis.",
      "06 breakfasts & 06 dinners in the hotel.",
      "Oxygen cylinder + Oximeter.",
      "Group Leader.",
      "Hotel taxes."
    ],
    transportType: "car"
  },
  {
    title: "HIDDEN HEAVEN - SPITI VALLEY",
    image: "public/lovable-uploads/45fbb6b0-d8f5-4d0f-95b1-5ecfce12b08d.png",
    originalPrice: 25800,
    discountedPrice: 21500,
    discount: 20,
    duration: {
      nights: 8,
      days: 9
    },
    nightStays: [
      { location: "Sangla", nights: 1 },
      { location: "Kalpa", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Mudh", nights: 1 },
      { location: "Kaza", nights: 1 },
      { location: "Langza", nights: 1 },
      { location: "Chandrataal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Pick up from Shimla and drop to Manali.",
      "All Sightseeing as per itinerary by Innova/Tempo Traveller.",
      "08 Nights accommodation on double sharing basis.",
      "08 breakfasts & 08 dinners in the hotel.",
      "Hotel taxes."
    ],
    transportType: "car"
  }
];
