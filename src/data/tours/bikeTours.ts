
import { TourPackageProps } from '@/components/TourPackage';

export const bikeTours: TourPackageProps[] = [
  {
    title: "LAHAUL SPITI - BIKE TOUR",
    image: "/lovable-uploads/96c75803-78e2-4f53-a67c-b14d8e80d30f.png",
    originalPrice: 48125,
    discountedPrice: 38500,
    discount: 25,
    duration: {
      nights: 7,
      days: 8
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Sangla", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Kaza", nights: 2 },
      { location: "Chandrataal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "All sightseeing as per itinerary by Bike.",
      "Pickup & Drop from Chandigarh.",
      "07 Breakfasts and 07 Dinners at hotel/Home stay/Camps.",
      "Hotel taxes.",
      "Helmet and Spare Parts with Tool Kit."
    ],
    exclusions: [
      "Lunch not included.",
      "05% GST not included.",
      "Oxygen Cylinder.",
      "AC will not be operational in hilly areas",
      "Medical kit with Oximeter.",
      "Walkie talkies if required.",
      "Heater not included",
      "Any additional expenses.",
      "Tips and porter chargers.",
      "Early check in and late check out at the hotel.",
      "Expenses of personal nature.",
      "Any other services not specified above.",
      "Additional Costs due to Flight Cancellations, Road blocks, natural calamities and Political strikes."
    ],
    overview: "Get ready for a Memorable 07 Nights 08 Day bike adventure through the Beautiful landscapes of Himachal Pradesh and Spiti Valley. If you love adventure this is the ride for you. Starting from Chandigarh this journey takes you through the stunning Hills of Shimla, the green valleys of Kinnaur, high-altitude terrain of Spiti. Ride through some of the world's highest villages, explore monasteries, explore the breathtaking beauty of Chandratal Lake. Experience thrilling off-road journey, roam in the Himalayan culture, and create memories that will last a lifetime.",
    itinerary: [
      {
        day: 1,
        title: "Chandigarh to Shimla - Journey Begins",
        description: "On arrival at Chandiagrh, Pick your Bikes. Scenic drive through the Shivalik Hills to Shimla. If time permits, explore Mall Road, The Ridge, and Christ Church. Enjoy a relaxed evening with a sunset view. Overnight stay in Shimla."
      },
      {
        day: 2,
        title: "Shimla to Sangla - Kinnaur Valley Awaits",
        description: "After breakfast, Drive towards Sangla, the gateway to Kinnaur Valley. Drive through Kufri, Narkanda, Rampur and Taranda Dhank. Explore Baspa River banks and interact with locals. Overnight stay in Sangla/Rakchham."
      },
      {
        day: 3,
        title: "Sangla/Rakcham to Nako - Monasteries, Cliffs & River Confluences",
        description: "Visit Chitkul, India's last village near the Indo-China border. Walk by the Baspa River, enjoy breathtaking views, and visit the local Temple. Drive via Pooh, Chango, and Khab Sangam, where Spiti & Sutlej Rivers meet. Reach Nako, a picturesque village with traditional houses. Explore Nako Lake & Nako Monastery. Optional hike to Wind Prayer Wheel Site for View of Nako Village, its serene lake, and the surrounding majestic mountain ranges. Overnight stay in Nako."
      },
      {
        day: 4,
        title: "Nako to Kaza - Scenic Drive to Spiti's Heart",
        description: "Wakeup early. After breakfast start your journey to Kaza Village. Visit Gue Village to see the 500-year-old Mummy of Sangha Tenzing(Buddhist monk). Stop at Tabo Monastery (1000 years old), known as the \"Ajanta of the Himalayas\". Explore Dhankar Monastery, perched dramatically on a cliff and witness the breathtaking confluence of the Pin and Spiti River. Drive towards Kaza, stopping at photographic viewpoints. Explore Kaza Market & Monastery. Enjoy Spitian food at famous cafes. Overnight stay in Kaza."
      },
      {
        day: 5,
        title: "Kaza - Hikkim - Komic - Langza - Kaza - World's Highest Villages & Fossils",
        description: "After breakfast visit Kaza Monastery and Market(if missed last day). Visit Hikkim, home to the world's highest post office (send a postcard!). Explore Komic (world's highest motorable village) and its ancient Tangyud Monastery. Drive to Langza, known for fossils and the giant Buddha statue. Capture breathtaking views of Peaks. Return to Kaza for an overnight stay."
      },
      {
        day: 6,
        title: "Langza - Key - Kibber - Chandratal - Monasteries, Bridges & A Magical Lake",
        description: "Start Early. After breakfast start your journey for Chandratal Lake. En-route visit Key Monastery. Largest Monastery of Spiti valley. It's a religious training centre for lamas. Further visit Kibber village. Kibber is small village and is take off point for the popular trek to Tso Moriri in Ladakh. After that Visit Chicham bridge which is Asia's highest suspension bridge. Stop at Losar village for lunch, which is the last village of spiti valley. Visit Kunzum Pass and Temple, situated at an altitude of 4551 mtrs. Reach Chandratal till evening. Checkin to the Camps. Visit lake if time permits or visit early morning before breakfast. Overnight at camps."
      },
      {
        day: 7,
        title: "Chandratal to Manali - Offroad Thrill & Tunnel Adventure",
        description: "Wake early and visit Chandratal Lake. After breakfast start your journey for Manali. Start your drive via Batal – Gramphu, one of the most thrilling off-road routes. Stop at the Chacha-Chachi Dhaba for tea/snacks. Cross the Atal Tunnel (9 kms), the world's longest highway tunnel above 10,000 feet. Reach Manali, check in, and relax. Explore Mall Road & Café. Overnight stay in Manali."
      },
      {
        day: 8,
        title: "Manali to Chandigarh - Farewell to the Himalayas",
        description: "Enjoy a relaxed breakfast with a view of the mountains. Begin your journey back to Chandigarh, driving through lush valleys and scenic landscapes. Drop Your bikes at Bike Vendor. Trip concludes with unforgettable memories of Spiti Valley. TOUR END"
      }
    ],
    transportType: "bike"
  }
];
