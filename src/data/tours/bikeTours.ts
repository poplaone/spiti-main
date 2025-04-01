
import { v4 as uuidv4 } from 'uuid';
import { TourPackageProps } from '@/components/TourPackage';

export const bikeTours: TourPackageProps[] = [
  {
    id: uuidv4(),
    title: "SPITI BIKE TOUR - LAH TO MANALI",
    image: "/lovable-uploads/45fbb6b0-d8f5-4d0f-95b1-5ecfce12b08d.png",
    originalPrice: 35000,
    discountedPrice: 29999,
    discount: 15,
    duration: {
      nights: 9,
      days: 10
    },
    nightStays: [
      { location: "Leh", nights: 1 },
      { location: "Nubra Valley", nights: 1 },
      { location: "Pangong Lake", nights: 1 },
      { location: "Leh", nights: 2 },
      { location: "Jispa", nights: 1 },
      { location: "Kaza", nights: 1 },
      { location: "Kalpa", nights: 1 },
      { location: "Narkanda", nights: 1 }
    ],
    inclusions: [
      "Royal Enfield 350cc Bike",
      "Fuel for the entire journey",
      "Accommodation in standard hotels/camps on a twin/triple sharing basis",
      "All meals (breakfast, lunch, and dinner)",
      "Backup vehicle for luggage and emergencies",
      "Experienced guide and mechanic",
      "Inner Line Permit for restricted areas",
      "First aid kit",
      "Oxygen cylinder for emergency situations",
      "Bonfire at camping sites (subject to availability)"
    ],
    exclusions: [
      "Flights or transportation to Leh and from Manali",
      "Personal expenses",
      "Travel insurance",
      "Any cost arising due to natural calamities or roadblocks",
      "Monument entrance fees if applicable",
      "Activities not mentioned in the inclusions",
      "Alcoholic beverages",
      "Room heater charges where applicable"
    ],
    overview: "Experience the thrill of riding through the majestic landscapes of the Himalayas on this unforgettable Spiti Valley bike tour. Starting from Leh and ending in Manali, this adventure takes you through high mountain passes, serene lakes, ancient monasteries, and traditional villages. Feel the rush as you navigate winding roads with your Royal Enfield, witness breathtaking vistas, and immerse yourself in the unique culture of the region. This journey is designed for adventure enthusiasts who seek an authentic Himalayan biking experience.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh & Acclimatization",
        description: "Arrive in Leh and transfer to your hotel. Spend the day acclimatizing to the high altitude. Evening briefing session about the journey ahead and bike distribution."
      },
      {
        day: 2,
        title: "Leh to Nubra Valley via Khardung La (120 km)",
        description: "Begin your ride to Nubra Valley crossing Khardung La, one of the world's highest motorable passes. Descend to the beautiful Nubra Valley and visit the sand dunes at Hunder. Experience a short camel safari and overnight stay in Nubra."
      },
      {
        day: 3,
        title: "Nubra Valley to Pangong Lake via Shyok Route (150 km)",
        description: "Ride along the Shyok River to reach the stunning Pangong Lake, famous for its changing colors and tranquil beauty. Enjoy the evening by the lakeside and overnight stay in camps."
      },
      {
        day: 4,
        title: "Pangong Lake to Leh via Chang La (180 km)",
        description: "Early morning at Pangong Lake to witness the sunrise. Return to Leh via Chang La pass, visiting Hemis Monastery en route. Overnight stay in Leh."
      },
      {
        day: 5,
        title: "Leh Local Sightseeing",
        description: "Explore Leh city, visiting Shanti Stupa, Leh Palace, and local markets. Bike servicing and preparation for the Spiti leg of the journey. Overnight stay in Leh."
      },
      {
        day: 6,
        title: "Leh to Jispa via Tanglang La (340 km)",
        description: "Longest riding day, crossing multiple high passes including Tanglang La, entering the beautiful Lahaul Valley. Overnight stay in Jispa."
      },
      {
        day: 7,
        title: "Jispa to Kaza via Kunzum Pass (200 km)",
        description: "Enter Spiti Valley crossing Kunzum Pass. Visit Key Monastery and reach Kaza by evening. Overnight stay in Kaza."
      },
      {
        day: 8,
        title: "Kaza to Kalpa via Dhankar (160 km)",
        description: "Explore Dhankar Monastery and ride through the changing landscapes to reach Kalpa, offering stunning views of the Kinner Kailash range. Overnight stay in Kalpa."
      },
      {
        day: 9,
        title: "Kalpa to Narkanda via Rampur (180 km)",
        description: "Continue descending through apple orchards and pine forests, reaching the famous hill station of Narkanda. Farewell dinner and overnight stay."
      },
      {
        day: 10,
        title: "Narkanda to Manali & Departure (120 km)",
        description: "Final ride to Manali through Kullu Valley. Arrive in Manali by afternoon, return the bikes, and the tour concludes."
      }
    ],
    transportType: "bike"
  }
];
