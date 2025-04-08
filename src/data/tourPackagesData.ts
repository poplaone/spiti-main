
import { TourPackageProps } from '@/data/types/tourTypes';
import { bikeTours } from './tours/bikeTours';
import { unexploredTours } from './tours/carTours';
import { ownCarTours } from './tours/ownCarTours';
import { womenOnlyTours } from './tours/womenOnlyTours';
import { buddhistTours } from './tours/buddhistTours';

// Check if the ROYAL SPITI VALLEY WHOLE CIRCUIT tour exists in the data
// and add it if it doesn't exist
const royalSpitiTour: TourPackageProps = {
  id: 'royal-spiti-valley-whole-circuit',
  title: "ROYAL SPITI VALLEY WHOLE CIRCUIT",
  image: "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png",
  originalPrice: 22500,
  discountedPrice: 19999,
  discount: 11,
  duration: {
    nights: 7,
    days: 8
  },
  transportType: "car",
  isWomenOnly: false,
  isFixedDeparture: true,
  isCustomizable: true,
  isVisible: true,
  overview: "Experience the complete Spiti Valley circuit with our Royal Spiti Valley tour. This comprehensive journey takes you through the most stunning landscapes, ancient monasteries, and authentic cultural experiences in the Himalayan cold desert.",
  nightStays: [
    { location: "Shimla", nights: 1, order: 1 },
    { location: "Kalpa", nights: 1, order: 2 },
    { location: "Kaza", nights: 3, order: 3 },
    { location: "Chandratal", nights: 1, order: 4 },
    { location: "Manali", nights: 1, order: 5 }
  ],
  inclusions: [
    "Accommodation on twin/triple sharing basis",
    "Meals (Breakfast & Dinner)",
    "Dedicated tour guide",
    "All sightseeing and monastery visits",
    "All permits and entry fees",
    "Comfortable transportation in SUV",
    "All taxes and service charges"
  ],
  exclusions: [
    "Any airfare or train fare",
    "Personal expenses",
    "Adventure activities",
    "Anything not mentioned in inclusions",
    "Travel insurance",
    "Additional meals or food items ordered"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Shimla",
      description: "Arrive in Shimla and check into your hotel. Evening free to explore Mall Road and the Ridge. Overnight in Shimla."
    },
    {
      day: 2,
      title: "Shimla to Kalpa (220 km / 7-8 hrs)",
      description: "Drive through beautiful apple orchards and pine forests. Visit Sarahan and the Bhimakali Temple. Continue to Kalpa for overnight stay with views of the Kinnaur Kailash range."
    },
    {
      day: 3,
      title: "Kalpa to Kaza (220 km / 8-9 hrs)",
      description: "Travel along the Sutlej River to Nako Lake. Visit the ancient Tabo Monastery (996 AD). Arrive in Kaza by evening for overnight stay."
    },
    {
      day: 4,
      title: "Kaza - Langza - Hikkim - Komic - Kaza",
      description: "Visit the highest villages in Asia including Komic. See the Buddha statue at Langza and the world's highest post office at Hikkim. Return to Kaza for overnight stay."
    },
    {
      day: 5,
      title: "Kaza - Key Monastery - Kibber - Kaza",
      description: "Explore the famous Key Monastery and visit the high-altitude village of Kibber. Interact with local monks and learn about Tibetan Buddhism. Return to Kaza for overnight stay."
    },
    {
      day: 6,
      title: "Kaza to Chandratal (115 km / 5-6 hrs)",
      description: "Drive to the magical Chandratal Lake (Moon Lake). Camp near the lake and enjoy the serene beauty of this high-altitude lake."
    },
    {
      day: 7,
      title: "Chandratal to Manali (120 km / 6-7 hrs)",
      description: "Cross the challenging Rohtang Pass (13,050 ft). Enjoy panoramic views of the surrounding peaks. Arrive in Manali by evening for overnight stay."
    },
    {
      day: 8,
      title: "Departure from Manali",
      description: "After breakfast, departure for your onward journey with beautiful memories of Spiti Valley."
    }
  ],
  overviewDetails: {
    accommodation: "Hotels, Guesthouses, Camping",
    bestTime: "June to September",
    groupSize: "2-12 persons",
    terrain: "Mountainous, High-Altitude Desert",
    elevation: "3,800m-4,500m",
    availableFrom: "June",
    availableTo: "September"
  }
};

// Ensure all tours have the required properties
const processedTours = [
  ...bikeTours,
  ...unexploredTours.filter(tour => tour.title !== "HIDDEN HEAVEN - SPITI VALLEY"),
  ...buddhistTours,
  ...womenOnlyTours,
  ...ownCarTours,
  // Add the Royal Spiti Valley tour if it's not already in one of the collections
  ...(unexploredTours.some(tour => tour.title === "ROYAL SPITI VALLEY WHOLE CIRCUIT") ? [] : [royalSpitiTour]),
  ...unexploredTours.filter(tour => tour.title === "HIDDEN HEAVEN - SPITI VALLEY")
].map(tour => ({
  ...tour,
  // Ensure these properties exist with default values if not specified
  isFixedDeparture: tour.isFixedDeparture !== undefined ? tour.isFixedDeparture : false,
  isCustomizable: tour.isCustomizable !== undefined ? tour.isCustomizable : true,
  // Generate id for static data if not present
  id: tour.id || `static-${tour.title.replace(/\s+/g, '-').toLowerCase()}`
}));

// Set some tours as fixed departures for demonstration
// This is for testing only - in real app, the admin would set these values
const toursWithFixedDepartures = processedTours.map(tour => {
  // Make bike tours and car tours with "UNEXPLORED" in the title fixed departures for demonstration
  if (tour.transportType === 'bike' || 
     (tour.transportType === 'car' && tour.title.includes("UNEXPLORED")) ||
     tour.title === "ROYAL SPITI VALLEY WHOLE CIRCUIT") {
    return {
      ...tour,
      isFixedDeparture: true
    };
  }
  return tour;
});

// Combine all tour types into a single array
export const tourPackagesData: TourPackageProps[] = toursWithFixedDepartures;

// Export individual tour categories for more targeted usage
export {
  bikeTours,
  unexploredTours as carTours,
  ownCarTours,
  womenOnlyTours,
  buddhistTours
};
