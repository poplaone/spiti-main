import { TourPackageProps } from '@/components/TourPackage';

export const tourPackagesData: TourPackageProps[] = [
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
  },
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
    title: "BUDDHIST AND TRIBAL CIRCUIT–SPITI",
    image: "public/lovable-uploads/f1653a42-dba2-4c39-b394-d63a3ab5aeda.png",
    originalPrice: 39375,
    discountedPrice: 31500,
    discount: 25,
    duration: {
      nights: 10,
      days: 11
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Sarahan", nights: 1 },
      { location: "Sangla", nights: 1 },
      { location: "Kalpa", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Mudh", nights: 1 },
      { location: "Kaza", nights: 2 },
      { location: "Chandrataal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "All sightseeing as per itinerary by Innova Crysta/Ertiga/Tempo Traveler/Similar.",
      "Pickup & Drop: Flexible as per client preference (Chandigarh/Delhi).",
      "10 Breakfasts and 10 Dinners at hotel/Home stay/Camps.",
      "All driver charges, Toll charges, Parking, State tax and fuel fee included.",
      "Airport/Railway Station and Hotel Pickup.",
      "Hotel taxes."
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
    itinerary: [
      {
        day: 1,
        title: "Chandigarh to Shimla - Journey Begins",
        description: "Pickup from Chandigarh Airport/Railway Station. Scenic drive through the Shivalik Hills to Shimla. If time permits, explore Mall Road, The Ridge, and Christ Church. Enjoy a relaxed evening with a sunset view. Overnight stay in Shimla."
      },
      {
        day: 2,
        title: "Shimla to Sarahan - Into the Himalayan Foothills",
        description: "After breakfast, drive through Kufri, Narkanda, and Rampur. Explore Hawa Ghar and Sarahan Bird Pheasantry. Enjoy a peaceful night with views of Shrikhand Mahadev Peak. Overnight stay in Sarahan."
      },
      {
        day: 3,
        title: "Sarahan to Sangla - Kinnaur Valley Awaits",
        description: "Wake up early for temple prayers. Drive towards Sangla, the gateway to Kinnaur Valley. Through Taranda Dhank. Explore Baspa River banks and interact with locals. Overnight stay in Sangla/Rakchham."
      },
      {
        day: 4,
        title: "Sangla to Kalpa - Enchanting Valleys & Apple Orchards",
        description: "Visit Chitkul, India's last village near the Indo-China border. Walk by the Baspa River, enjoy breathtaking views, and visit the local Temple. Drive towards Kalpa, famous for stunning views of Kinner Kailash Range. Explore Kalpa Monastery and traditional wooden houses. You can take in the beauty of the apple orchards spread across the landscape. Overnight stay in Kalpa."
      },
      {
        day: 5,
        title: "Kalpa to Nako - Monasteries, Cliffs & River Confluences",
        description: "Visit Suicide Point (a dramatic cliff with stunning views). Drive via Pooh, Chango, and Khab Sangam, where Spiti & Sutlej Rivers meet. Reach Nako, a picturesque village with traditional houses. Explore Nako Lake & Nako Monastery. Optional hike to Wind Prayer Wheel Site for View of Nako Village, its serene lake, and the surrounding majestic mountain ranges. Overnight stay in Nako."
      },
      {
        day: 6,
        title: "Nako to Mudh - Ancient Monasteries & the Mystical Mummy",
        description: "Wakeup early. After breakfast start your journey to Mudh Village. Visit Gue Village to see the 500-year-old Mummy of Sangha Tenzing (Buddhist monk). Stop at Tabo Monastery (1000 years old), known as the 'Ajanta of the Himalayas'. Explore Dhankar Monastery, perched dramatically on a cliff and witness the breathtaking confluence of the Pin and Spiti River. Enter Pin Valley National Park, home to the elusive Snow Leopard. Reach Mudh Village, the last village of Pin Valley. Overnight stay in Mudh."
      },
      {
        day: 7,
        title: "Mudh to Kaza - Scenic Drive to Spiti's Heart",
        description: "Leisurely morning exploring Mudh Village and its Buddhist culture. Drive towards Kaza, stopping at photographic viewpoints. Explore Kaza Market & Monastery. Enjoy Spitian food at famous cafes. Overnight stay in Kaza."
      },
      {
        day: 8,
        title: "Kaza - Hikkim - Komic - Langza - Kaza - World's Highest Villages & Fossils",
        description: "After breakfast visit Kaza Monastery and Market (if missed last day). Visit Hikkim, home to the world's highest post office (send a postcard!). Explore Komic (world's highest motorable village) and its ancient Tangyud Monastery. Drive to Langza, known for fossils and the giant Buddha statue. Capture breathtaking views of Peaks. Return to Kaza for an overnight stay."
      },
      {
        day: 9,
        title: "Langza - Key - Kibber - Chandratal - Monasteries, Bridges & A Magical Lake",
        description: "After breakfast start your journey for Chandratal Lake. Visit Key Monastery, the largest in Spiti, a renowned Tibetan Buddhist gompa that also serves as a training center for young monks. Interact with them to learn about their way of life. Explore Kibber Village, the starting point of the Parang La Trek to Ladakh and a popular spot for spotting snow leopards in winter. Cross Chicham Bridge, Asia's highest suspension bridge. Stop at Losar (last village of Spiti Valley) for lunch. Visit Kunzum Pass and Temple situated at an altitude of 4551 mtrs. Reach Chandratal Lake, the 'Moon Lake' till evening. Check in to the Camps. Visit lake if time permits or visit early morning before breakfast. Overnight stay at camps."
      },
      {
        day: 10,
        title: "Chandratal to Manali - Offroad Thrill & Tunnel Adventure",
        description: "Wake early and visit Chandratal Lake (if skipped Last day). After breakfast start your journey for Manali. Start your drive via Batal – Gramphu, one of the most thrilling off-road routes. Stop at the Chacha-Chachi Dhaba for tea/snacks. Cross the Atal Tunnel (9 kms), the world's longest highway tunnel above 10,000 feet. Reach Manali, check in, and relax. Explore Mall Road & Café. Overnight stay in Manali."
      },
      {
        day: 11,
        title: "Manali to Chandigarh - Farewell to the Himalayas",
        description: "Enjoy a relaxed breakfast with a view of the mountains. Begin your journey back to Chandigarh, driving through lush valleys and scenic landscapes. Drop at Chandigarh Airport/Railway Station in the evening. Trip concludes with unforgettable memories of Spiti Valley. TOUR END"
      }
    ],
    overview: "Embark on an 11-day journey through Spiti Valley, a land of rugged mountains, ancient monasteries, and remote villages. Travel through stunning landscapes, from the lush hills of Shimla to the high-altitude deserts of Spiti. Explore charming villages, visit historic monasteries and witness the breathtaking beauty of Chandratal Lake. Experience thrilling drives through high mountain passes, cross Asia's highest suspension bridge, and soak in the serene vibes of Spitian culture. The journey ends in Manali, leaving you with unforgettable memories of the Himalayas.",
    transportType: "car"
  },
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
  },
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
  },
];
