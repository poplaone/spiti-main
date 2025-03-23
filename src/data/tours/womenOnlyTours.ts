
import { TourPackageProps } from '@/components/TourPackage';

export const womenOnlyTours: TourPackageProps[] = [
  {
    title: "SPITI VALLEY WOMEN ONLY TOUR",
    image: "public/lovable-uploads/6c611954-32cc-4b99-8441-ce15d3b90e76.png",
    originalPrice: 32400,
    discountedPrice: 25900,
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
      { location: "Chandrataal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Pick and Drop From Chandigarh",
      "All Sightseeing as per itinerary by Innova/Tempo Traveller.",
      "09 Nights accommodation on double sharing basis.",
      "09 breakfasts & 09 dinners in the hotel.",
      "Hotel taxes."
    ],
    transportType: "car",
    isWomenOnly: true
  }
];
