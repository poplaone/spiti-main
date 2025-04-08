
import { TourPackageProps } from '@/components/TourPackage';

export const womenOnlyTours: TourPackageProps[] = [
  {
    title: "SPITI VALLEY WOMEN ONLY TOUR",
    image: "/lovable-uploads/bc21cc57-f972-4cd7-af1f-ca1542135c90.png",
    originalPrice: 32750,
    discountedPrice: 26200,
    discount: 25,
    duration: {
      nights: 8,
      days: 9
    },
    nightStays: [
      { location: "Shimla", nights: 1 },
      { location: "Sangla", nights: 1 },
      { location: "Nako", nights: 1 },
      { location: "Mudh", nights: 1 },
      { location: "Kaza", nights: 2 },
      { location: "Chandrataal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "All sightseeing as per itinerary by Innova Crysta/Ertiga/Tempo Traveler/Similar.",
      "Pickup & Drop: Flexible as per client preference (Chandigarh/Delhi).",
      "08 Breakfasts and 08 Dinners at hotel/Home stay/Camps.",
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
    overview: "Enjoy a stunning 9-day trip of Spiti Valley. Starting from Chandigarh, travel through Shimla, Sangla, and Nako, witnessing picturesque villages, ancient monasteries, and stunning river confluences. Explore Mudh and Kaza, home to the world's highest post office and remote Himalayan settlements. Discover the beauty of Chandratal Lake, cross high-altitude passes, and experience thrilling off-road drives. Conclude the trip in Manali before heading back to Chandigarh with unforgettable memories of the mystical Spiti Valley.",
    itinerary: [
      {
        day: 1,
        title: "Chandigarh to Shimla - Journey Begins",
        description: "Pickup from Chandigarh Airport/Railway Station. Scenic drive through the Shivalik Hills to Shimla. If time permits, explore Mall Road, The Ridge, and Christ Church. Enjoy a relaxed evening with a sunset view. Overnight stay in Shimla."
      },
      {
        day: 2,
        title: "Shimla to Sangla - Kinnaur Valley Awaits",
        description: "After breakfast, Drive towards Sangla, the gateway to Kinnaur Valley. Drive through Kufri, Narkanda, Rampur and Taranda Dhank. Visit Kamru Fort and the beautiful Sangla Village. Explore Baspa River banks and interact with locals. Overnight stay in Sangla/Rakchham."
      },
      {
        day: 3,
        title: "Sangla/Rakchham to Nako - Monasteries, Cliffs & River Confluences",
        description: "Visit Chitkul, India's last village near the Indo-China border. Walk by the Baspa River, enjoy breathtaking views, and visit the local Temple. Drive via Pooh, Chango, and Khab Sangam, where Spiti & Sutlej Rivers meet. Reach Nako, a picturesque village with traditional houses. Explore Nako Lake & Nako Monastery. Optional hike to Wind Prayer Wheel Site for View of Nako Village, its serene lake, and the surrounding majestic mountain ranges. Overnight stay in Nako."
      },
      {
        day: 4,
        title: "Nako to Mudh - Ancient Monasteries & the Mystical Mummy",
        description: "Wakeup early. After breakfast start your journey to Mudh Village. Visit Gue Village to see the 500-year-old Mummy of Sangha Tenzing(Buddhist monk). Stop at Tabo Monastery (1000 years old), known as the \"Ajanta of the Himalayas\". Explore Dhankar Monastery, perched dramatically on a cliff and witness the breathtaking confluence of the Pin and Spiti River. Enter Pin Valley National Park, home to the elusive Snow Leopard. Reach Mudh Village, the last village of Pin Valley. Overnight stay in Mudh."
      },
      {
        day: 5,
        title: "Mudh to Kaza - Scenic Drive to Spiti's Heart",
        description: "Leisurely morning exploring Mudh Village and its Buddhist culture. Drive towards Kaza, stopping at photographic viewpoints. Explore Kaza Market & Monastery. Enjoy Spitian food at famous cafes. Overnight stay in Kaza."
      },
      {
        day: 6,
        title: "Kaza - Hikkim - Komic - Langza - Kaza - World's Highest Villages & Fossils",
        description: "After breakfast visit Kaza Monastery and Market(if missed last day). Visit Hikkim, home to the world's highest post office (send a postcard!). Explore Komic (world's highest motorable village) and its ancient Tangyud Monastery. Drive to Langza, known for fossils and the giant Buddha statue. Capture breathtaking views of Peaks. Return to Kaza for an overnight stay."
      },
      {
        day: 7,
        title: "Langza - Key - Kibber - Chandratal - Monasteries, Bridges & A Magical Lake",
        description: "After breakfast start your journey for Chandratal Lake. Visit Key Monastery, the largest in Spiti, a renowned Tibetan Buddhist gompa that also serves as a training center for young monks. Interact with them to learn about their way of life. Explore Kibber Village, the starting point of the Parang La Trek to Ladakh and a popular spot for spotting snow leopards in winter. Cross Chicham Bridge, Asia's highest suspension bridge. Stop at Losar (last village of Spiti Valley) for lunch. Visit Kunzum Pass and Temple situated at an altitude of 4551 mtrs. Reach Chandratal Lake, the \"Moon Lake\" till evening. Check in to the Camps. Visit lake if time permits or visit early morning before breakfast. Overnight stay at camps."
      },
      {
        day: 8,
        title: "Chandratal to Manali - Offroad Thrill & Tunnel Adventure",
        description: "Wake early and visit Chandratal Lake. After breakfast start your journey for Manali. Start your drive via Batal – Gramphu, one of the most thrilling off-road routes. Stop at the Chacha-Chachi Dhaba for tea/snacks. Cross the Atal Tunnel (9 kms), the world's longest highway tunnel above 10,000 feet. Reach Manali, check in, and relax. Explore Mall Road & Café. Overnight stay in Manali."
      },
      {
        day: 9,
        title: "Manali to Chandigarh - Farewell to the Himalayas",
        description: "Enjoy a relaxed breakfast with a view of the mountains. Begin your journey back to Chandigarh, driving through lush valleys and scenic landscapes. Drop at Chandigarh Airport/Railway Station in the evening. Trip concludes with unforgettable memories of Spiti Valley."
      }
    ],
    transportType: "car",
    isWomenOnly: true
  }
];
