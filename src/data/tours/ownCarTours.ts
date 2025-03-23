
import { TourPackageProps } from '@/components/TourPackage';

export const ownCarTours: TourPackageProps[] = [
  {
    title: "SPITI VALLEY TOUR IN YOUR OWN CAR",
    image: "public/lovable-uploads/2687a820-b260-4b4b-b64a-eaa97ff88a5c.png",
    originalPrice: 24100,
    discountedPrice: 19300,
    discount: 25,
    duration: {
      nights: 10,
      days: 11
    },
    nightStays: [
      { location: "Narkanda", nights: 1 },
      { location: "Sarahan", nights: 1 },
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
      "10 Nights accommodation on double sharing basis.",
      "10 breakfasts & 10 dinners in the hotel.",
      "Hotel taxes"
    ],
    transportType: "car"
  }
];
