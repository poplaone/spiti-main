
import { v4 as uuidv4 } from 'uuid';
import { TourPackageProps } from '@/components/TourPackage';

export const unexploredTours: TourPackageProps[] = [
  {
    id: uuidv4(),
    title: "UNEXPLORED SPITI - HIDDEN GEMS",
    image: "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png",
    originalPrice: 42000,
    discountedPrice: 34999,
    discount: 17,
    duration: {
      nights: 7,
      days: 8
    },
    nightStays: [
      { location: "Narkanda", nights: 1 },
      { location: "Chitkul", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Mud Village (Pin Valley)", nights: 1 },
      { location: "Demul Village", nights: 1 },
      { location: "Kaza", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Transportation in comfortable SUV",
      "Experienced local driver familiar with remote routes",
      "Accommodation in homestays and boutique properties",
      "All meals (breakfast, lunch, and dinner)",
      "Village walking tours with local guides",
      "Cultural performances in tribal villages",
      "Homestay cooking sessions",
      "Photography assistance at scenic spots",
      "Inner Line Permits for restricted areas",
      "Star gazing sessions (weather permitting)"
    ],
    exclusions: [
      "Transportation to Shimla and from Manali",
      "Personal expenses and tips",
      "Travel insurance",
      "Alcoholic beverages",
      "Special activities not mentioned in inclusions",
      "Extra snacks and beverages",
      "Specialized photography equipment",
      "Additional room heaters if required"
    ],
    overview: "Venture off the beaten path and discover the hidden gems of Spiti Valley that most tourists never see. This unique tour takes you to remote villages, secluded monasteries, hidden lakes, and pristine valleys that showcase the authentic and unspoiled beauty of the region. Stay in traditional homestays, interact with local families, taste authentic cuisine, and experience the true culture of Spiti away from touristy spots. Perfect for adventurous travelers seeking unique experiences and photographers looking for untouched landscapes.",
    itinerary: [
      {
        day: 1,
        title: "Shimla to Narkanda (65 km)",
        description: "Drive from Shimla to Narkanda, visiting the hidden Hatu Peak temple with panoramic Himalayan views. Evening nature walk through apple orchards. Overnight in a heritage property in Narkanda."
      },
      {
        day: 2,
        title: "Narkanda to Chitkul (180 km)",
        description: "Journey to Chitkul, the last inhabited village near the Indo-Tibet border. En route, stop at the lesser-known Batseri village for lunch with a local family. Explore Chitkul and overnight stay."
      },
      {
        day: 3,
        title: "Chitkul to Nako via Hangrang Valley (160 km)",
        description: "Travel through the unexplored Hangrang Valley to reach Nako. Visit the secret meditation caves above Nako village. Evening boat ride on Nako Lake and overnight in a traditional homestay."
      },
      {
        day: 4,
        title: "Nako to Mud Village, Pin Valley (120 km)",
        description: "Drive to the remote Mud Village in Pin Valley, stopping at the hidden waterfall near Attargo. Afternoon trek to spot the elusive Himalayan wildlife in Pin Valley National Park. Stay with a local family and participate in traditional cooking."
      },
      {
        day: 5,
        title: "Mud Village to Demul via Komic (90 km)",
        description: "Visit Komic, one of the highest inhabited villages, then continue to the remote Demul village. Participate in local farming activities and enjoy a special cultural evening organized by villagers. Overnight in a community-managed guesthouse."
      },
      {
        day: 6,
        title: "Demul to Kaza via Langza and Hikkim (40 km)",
        description: "Morning hike to the fossil ridge of Langza. Visit Hikkim to send a postcard from the world's highest post office. Afternoon exploration of the lesser-known caves near Kaza. Overnight in Kaza."
      },
      {
        day: 7,
        title: "Kaza to Manali via Secret Valley Route (220 km)",
        description: "Journey to Manali taking the less-traveled route through Losar and Batal, with a stop at the hidden gem of Chandratal Lake. Picnic lunch at a secluded spot with mountain views. Reach Manali by evening for overnight stay."
      },
      {
        day: 8,
        title: "Departure from Manali",
        description: "After breakfast, visit the ancient and lesser-known Jagatsukh Temple near Manali. Tour concludes with departure from Manali."
      }
    ],
    transportType: "car"
  },
  {
    id: uuidv4(),
    title: "HIDDEN HEAVEN - SPITI VALLEY",
    image: "/lovable-uploads/f262aa99-2c5e-40c6-a141-1533f2d5c68c.png",
    originalPrice: 39999,
    discountedPrice: 32999,
    discount: 18,
    duration: {
      nights: 6,
      days: 7
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Kalpa", nights: 1 },
      { location: "Tabo", nights: 1 },
      { location: "Kaza", nights: 2 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Accommodation in hotels/guest houses on twin-sharing basis",
      "Transportation in comfortable vehicle (SUV or Tempo Traveler)",
      "Meals: Breakfast and dinner daily",
      "Professional tour guide throughout the journey",
      "All applicable taxes and service charges",
      "Sightseeing as per itinerary",
      "Inner line permits for restricted areas",
      "Monastery entrance fees",
      "Complimentary mineral water during travel",
      "First aid kit"
    ],
    exclusions: [
      "Airfare or train fare to reach Shimla and return from Manali",
      "Lunch throughout the tour",
      "Personal expenses and tips",
      "Travel insurance",
      "Any activities not mentioned in inclusions",
      "Room heater charges where applicable",
      "Additional accommodation due to road blockages/landslides",
      "Professional photography or videography services"
    ],
    overview: "Experience the mesmerizing beauty of Spiti Valley, a hidden heaven nestled in the Trans-Himalayan region. This carefully crafted tour takes you through breathtaking landscapes, ancient monasteries, charming villages, and crystal-clear lakes. Journey through high mountain passes, witness stunning vistas, and immerse yourself in the unique culture of this high-altitude desert. This tour is perfect for adventure seekers, nature lovers, and photography enthusiasts who want to witness the pristine beauty of one of India's most spectacular yet lesser-explored destinations.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla & Orientation",
        description: "Arrive in Shimla and check into your hotel. Evening orientation session about the journey ahead. Explore Mall Road and enjoy a welcome dinner. Overnight in Shimla."
      },
      {
        day: 2,
        title: "Shimla to Kalpa (220 km)",
        description: "Drive through scenic routes along Sutlej River to reach Kalpa, offering stunning views of the Kinner Kailash range. Evening walk around the village to experience local culture. Overnight in Kalpa."
      },
      {
        day: 3,
        title: "Kalpa to Tabo (170 km)",
        description: "Journey to Tabo, home to the famous 1000-year-old monastery. Visit the monastery known as the 'Ajanta of the Himalayas'. Evening walk around Tabo village. Overnight in Tabo."
      },
      {
        day: 4,
        title: "Tabo to Kaza via Dhankar and Pin Valley (80 km)",
        description: "Visit Dhankar Monastery perched on a cliff offering spectacular views. Explore Pin Valley and Kungri Monastery. Reach Kaza by evening. Overnight in Kaza."
      },
      {
        day: 5,
        title: "Kaza Local Exploration",
        description: "Visit Key Monastery, Kibber, Komic (highest motor-able village), and Langza (fossil village). Return to Kaza in the evening and explore the local market. Overnight in Kaza."
      },
      {
        day: 6,
        title: "Kaza to Manali via Kunzum Pass and Chandrataal (200 km)",
        description: "Early departure for Manali crossing Kunzum Pass (4590m). Visit the beautiful Chandrataal Lake (subject to weather conditions). Continue to Manali through the scenic Lahaul Valley. Overnight in Manali."
      },
      {
        day: 7,
        title: "Departure from Manali",
        description: "After breakfast, tour concludes with departure from Manali."
      }
    ],
    transportType: "car"
  }
];
