
import { v4 as uuidv4 } from 'uuid';
import { TourPackageProps } from '@/components/TourPackage';

export const womenOnlyTours: TourPackageProps[] = [
  {
    id: uuidv4(),
    title: "WOMEN'S SPECIAL - SPITI SISTERHOOD",
    image: "/lovable-uploads/ee4b158c-7d86-4cb3-bbdb-3a8af09a1881.png",
    originalPrice: 38500,
    discountedPrice: 32999,
    discount: 14,
    duration: {
      nights: 7,
      days: 8
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Kalpa", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Kaza", nights: 2 },
      { location: "Chandratal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "All-female tour guides and support staff",
      "Transportation in comfortable vehicle with female driver",
      "Accommodation in carefully selected women-friendly hotels/homestays",
      "All meals (breakfast, lunch, and dinner)",
      "Specially arranged interactions with local women entrepreneurs",
      "Cooking sessions with local women",
      "Women's wellness sessions in scenic locations",
      "Photography sessions at best spots",
      "Welcome kit with essential items for high-altitude travel",
      "Inner line permits for restricted areas"
    ],
    exclusions: [
      "Transportation to Shimla and from Manali",
      "Personal expenses and tips",
      "Travel insurance",
      "Specialized photography equipment",
      "Personal toiletries and medication",
      "Room heater charges where applicable",
      "Additional accommodation due to roadblocks",
      "Any activities not mentioned in inclusions"
    ],
    overview: "Designed exclusively for women travelers, this unique tour creates a supportive and enriching environment to explore the stunning Spiti Valley. Journey through picturesque landscapes, ancient monasteries, and charming villages in the company of like-minded women. The tour emphasizes safety, comfort, and meaningful experiences with special interactions with local women, wellness sessions amidst nature, and opportunities to learn about local traditions. Led by experienced female guides who understand women travelers' needs, this tour offers the perfect balance of adventure, culture, relaxation, and bonding.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla & Welcome Gathering",
        description: "Arrive in Shimla and check into your hotel. Evening welcome circle and orientation session. Get to know your fellow travelers over a special dinner. Overnight in Shimla."
      },
      {
        day: 2,
        title: "Shimla to Kalpa (220 km)",
        description: "Drive through beautiful landscapes to reach Kalpa, with stops at women-run cafes along the way. Evening yoga session with views of the Kinner Kailash range. Overnight in Kalpa."
      },
      {
        day: 3,
        title: "Kalpa to Nako (120 km)",
        description: "Journey to the charming village of Nako with its serene lake. Visit a local women's handicraft cooperative. Evening meditation session by the lake. Overnight in Nako."
      },
      {
        day: 4,
        title: "Nako to Kaza via Tabo (110 km)",
        description: "Visit the ancient Tabo Monastery en route to Kaza. Meet with members of Spiti Women's Association in Kaza to learn about their conservation efforts. Overnight in Kaza."
      },
      {
        day: 5,
        title: "Kaza Exploration Day",
        description: "Visit Key Monastery and surrounding villages of Kibber, Komic, and Langza. Special lunch with a local family, learning traditional recipes from the women. Group photography session at sunset. Overnight in Kaza."
      },
      {
        day: 6,
        title: "Kaza to Chandratal (110 km)",
        description: "Drive to the magical Chandratal Lake crossing Kunzum Pass. Afternoon free for reflection and journaling by the lake. Evening bonfire with sharing circle. Overnight camp near Chandratal."
      },
      {
        day: 7,
        title: "Chandratal to Manali (120 km)",
        description: "Morning yoga by the lake before departing for Manali. Crossing Rohtang Pass with stunning views. Evening spa session in Manali followed by farewell dinner. Overnight in Manali."
      },
      {
        day: 8,
        title: "Departure from Manali",
        description: "Morning group breakfast with final sharing session. Tour concludes with departure from Manali."
      }
    ],
    transportType: "car",
    isWomenOnly: true
  }
];
