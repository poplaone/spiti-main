
import { v4 as uuidv4 } from 'uuid';
import { TourPackageProps } from '@/components/TourPackage';

export const ownCarTours: TourPackageProps[] = [
  {
    id: uuidv4(),
    title: "SELF-DRIVE SPITI EXPEDITION",
    image: "/lovable-uploads/e1880eea-44e0-430e-8627-101560cff518.png",
    originalPrice: 25000,
    discountedPrice: 19999,
    discount: 20,
    duration: {
      nights: 7,
      days: 8
    },
    nightStays: [
      { location: "Narkanda", nights: 1 },
      { location: "Sangla", nights: 1 },
      { location: "Tabo", nights: 1 },
      { location: "Kaza", nights: 2 },
      { location: "Chandratal", nights: 1 },
      { location: "Manali", nights: 1 }
    ],
    inclusions: [
      "Pre-planned detailed route map with GPS coordinates",
      "Accommodation bookings in hotels/camps as per itinerary",
      "Breakfast and dinner at all accommodations",
      "Road condition updates and daily briefings",
      "Vehicle mechanical support contacts in key locations",
      "Inner line permits for restricted areas",
      "Emergency satellite phone access in remote areas",
      "24/7 on-call support throughout the journey",
      "First aid kit and basic vehicle toolkit",
      "Detailed guide to best photography spots"
    ],
    exclusions: [
      "Vehicle (participants use their own cars)",
      "Fuel costs and vehicle maintenance",
      "Lunch throughout the tour",
      "Toll charges and parking fees",
      "Vehicle insurance and damage costs",
      "Personal expenses and tips",
      "Any activities not mentioned in inclusions",
      "Additional accommodation in case of roadblocks",
      "Vehicle recovery services if stuck"
    ],
    overview: "Embark on the ultimate self-drive adventure through the stunning landscapes of Spiti Valley. This carefully planned expedition allows you to drive your own vehicle through one of India's most challenging yet rewarding terrains. With pre-booked accommodations, planned stops, and expert support, you can focus on enjoying the journey while having the freedom to explore at your own pace. Perfect for driving enthusiasts who seek adventure without compromising on comfort and safety. Experience the thrill of navigating high mountain passes, river crossings, and winding roads while witnessing breathtaking scenery at every turn.",
    itinerary: [
      {
        day: 1,
        title: "Shimla to Narkanda (65 km)",
        description: "Assemble in Shimla for a detailed briefing about the expedition, route conditions, and safety procedures. Drive to Narkanda through apple orchards and pine forests. Evening vehicle check and preparation for the main journey. Overnight in Narkanda."
      },
      {
        day: 2,
        title: "Narkanda to Sangla (160 km)",
        description: "Drive along the Sutlej River to reach the beautiful Sangla Valley. Navigate through changing landscapes and practice handling your vehicle on mountain roads. Evening walk in Sangla village. Overnight in Sangla."
      },
      {
        day: 3,
        title: "Sangla to Tabo (175 km)",
        description: "An exciting day driving through Kinnaur and entering Spiti Valley. Cross the challenging section of Malling Nala and transition from green mountains to the high-altitude desert landscape. Reach Tabo by evening for overnight stay."
      },
      {
        day: 4,
        title: "Tabo to Kaza via Dhankar (65 km)",
        description: "A shorter drive today allowing time to visit Dhankar Monastery perched dramatically on a cliff. Reach Kaza by afternoon with time to service and check vehicles. Evening exploration of Kaza town. Overnight in Kaza."
      },
      {
        day: 5,
        title: "Kaza Local Exploration - Key, Kibber, Komik Circuit (70 km)",
        description: "Drive your vehicle to some of the highest villages in the world, including Kibber, Komic, and Langza. Practice high-altitude driving skills on relatively easier roads with spectacular views. Return to Kaza for overnight stay."
      },
      {
        day: 6,
        title: "Kaza to Chandratal via Kunzum Pass (110 km)",
        description: "The most challenging driving day, crossing Kunzum Pass (4590m) and navigating the rough road to Chandratal Lake. Test your driving skills on different terrains. Overnight camp near Chandratal."
      },
      {
        day: 7,
        title: "Chandratal to Manali via Rohtang Pass (120 km)",
        description: "Early morning drive to Manali crossing the Batal - Gramphoo stretch, known for water crossings and challenging roads. Cross Rohtang Pass to descend into the green Kullu Valley. Reach Manali by evening for celebration dinner. Overnight in Manali."
      },
      {
        day: 8,
        title: "Departure from Manali",
        description: "Final vehicle check and sharing of expedition memories. Tour concludes after breakfast with departure from Manali."
      }
    ],
    transportType: "car"
  }
];
