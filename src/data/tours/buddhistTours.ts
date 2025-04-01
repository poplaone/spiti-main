
import { v4 as uuidv4 } from 'uuid';
import { TourPackageProps } from '@/components/TourPackage';

export const buddhistTours: TourPackageProps[] = [
  {
    id: uuidv4(),
    title: "BUDDHIST CIRCUIT - SPIRITUAL JOURNEY",
    image: "/lovable-uploads/fe95c61b-1c4d-48be-9e18-1d3b19b7c41e.png",
    originalPrice: 45000,
    discountedPrice: 38999,
    discount: 13,
    duration: {
      nights: 8,
      days: 9
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Sangla", nights: 1 },
      { location: "Tabo", nights: 2 },
      { location: "Kaza", nights: 2 },
      { location: "Keylong", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Comfortable SUV or tempo traveler transportation",
      "Experienced driver and guide knowledgeable in Buddhist culture",
      "Accommodation in hotels/guest houses on twin sharing basis",
      "Daily breakfast and dinner",
      "All monastery entry fees",
      "Meditation sessions at select monasteries",
      "Special vegetarian meals prepared in traditional style",
      "Cultural performance in Kaza",
      "Inner line permits for restricted areas",
      "Bottled water throughout the journey"
    ],
    exclusions: [
      "Flights or transportation to Shimla and from Manali",
      "Personal expenses and tips",
      "Travel insurance",
      "Lunch throughout the tour",
      "Special rituals or offerings at monasteries",
      "Professional photography or video services",
      "Any additional activities not mentioned in the itinerary",
      "Specialized guides beyond the main tour guide"
    ],
    overview: "Embark on a spiritual journey through the ancient Buddhist monasteries of Spiti Valley. This thoughtfully curated tour takes you through some of the oldest monasteries in the world, providing deep insights into Buddhist philosophy, art, and way of life. Immerse yourself in guided meditation sessions, interact with monks, and witness traditional Buddhist rituals. The serene landscapes of Spiti Valley complement the spiritual experience, making this tour perfect for those seeking both inner peace and outer beauty.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla & Orientation",
        description: "Arrive in Shimla and check in to your hotel. Attend an evening orientation session about Buddhist culture and the journey ahead. Overnight in Shimla."
      },
      {
        day: 2,
        title: "Shimla to Sangla (190 km)",
        description: "Drive to Sangla Valley, visiting the Buddhist temple in Rampur en route. Evening walk in Sangla village and overnight stay."
      },
      {
        day: 3,
        title: "Sangla to Tabo (180 km)",
        description: "Journey to Tabo, home to the famous Tabo Monastery, known as the 'Ajanta of the Himalayas'. Evening meditation session at the monastery. Overnight in Tabo."
      },
      {
        day: 4,
        title: "Tabo Monastery Exploration",
        description: "Full day dedicated to Tabo Monastery, exploring its 1000-year-old murals, sculptures, and scriptures. Participate in morning prayers with monks. Afternoon guided tour and evening discourse on Buddhist philosophy. Overnight in Tabo."
      },
      {
        day: 5,
        title: "Tabo to Kaza via Dhankar Monastery (70 km)",
        description: "Visit Dhankar Monastery perched on a cliff offering spectacular views. Continue to Kaza with a stop at Pin Valley to visit the Kungri Monastery. Overnight in Kaza."
      },
      {
        day: 6,
        title: "Kaza and Key Monastery",
        description: "Early morning visit to Key Monastery, the largest in Spiti Valley, to witness the morning ritual. Return to Kaza for lunch, then visit Komic and Hikkim, highest villages with Buddhist influences. Evening cultural program in Kaza."
      },
      {
        day: 7,
        title: "Kaza to Keylong via Kunzum Pass (120 km)",
        description: "Drive to Keylong crossing Kunzum Pass, stopping at Chandrataal Lake (Moon Lake) for a meditation session. Visit Shashur Monastery near Keylong. Overnight in Keylong."
      },
      {
        day: 8,
        title: "Keylong to Manali via Rohtang Pass (115 km)",
        description: "Journey to Manali crossing Rohtang Pass. Visit Gadhan Thekchhokling Gompa, a Tibetan monastery in Manali. Evening free for exploration and shopping. Farewell dinner and overnight in Manali."
      },
      {
        day: 9,
        title: "Departure from Manali",
        description: "After breakfast, visit Himalayan Nyingmapa Buddhist Temple for final prayers. Tour concludes with departure from Manali."
      }
    ],
    transportType: "car"
  }
];
