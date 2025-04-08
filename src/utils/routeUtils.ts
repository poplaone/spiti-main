
import { TourPackageProps } from "@/data/types/tourTypes";

// Map to convert tour titles to URL-friendly slugs
export const tourTitleToSlug: Record<string, string> = {
  "BUDDHIST AND TRIBAL CIRCUIT–SPITI": "/BUDDHIST-AND-TRIBAL-CIRCUIT-SPITI",
  "INTO THE HEART OF SPITI": "/INTO-THE-HEART-OF-SPITI",
  "KINNAUR VALLEY EXPLORATION": "/KINNAUR-VALLEY-EXPLORATION",
  "LAHAUL SPITI - BIKE TOUR": "/LAHAUL-SPITI-BIKE-TOUR",
  "ROYAL SPITI VALLEY WHOLE CIRCUIT": "/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT",
  "SNOW LEOPARD EXPEDITION - WINTER SPECIAL": "/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL",
  "SOULFUL SPITI GATEWAY": "/SOULFUL-SPITI-GATEWAY",
  "SPITI COMPLETE CIRCUIT - MOST POPULAR": "/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR",
  "SPITI VALLEY TOUR IN YOUR OWN CAR": "/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR",
  "SPITI VALLEY WOMEN ONLY TOUR": "/SPITI-VALLEY-WOMEN-ONLY-TOUR",
  "UNEXPLORED SPITI": "/UNEXPLORED-SPITI",
  "WINTER WHITE SPITI": "/WINTER-WHITE-SPITI",
  "HIDDEN HEAVEN - SPITI VALLEY": "/HIDDEN-HEAVEN-SPITI-VALLEY"
};

// Reverse map to convert URL slugs back to tour titles
export const slugToTourTitle: Record<string, string> = Object.entries(tourTitleToSlug)
  .reduce((acc, [title, slug]) => {
    acc[slug.substring(1)] = title; // Remove the leading slash for the reverse lookup
    return acc;
  }, {} as Record<string, string>);

// Helper function to get the tour type based on the tour title
export const getTourTypeFromTitle = (title: string): string => {
  if (title.toLowerCase().includes('bike')) {
    return 'bike';
  } else if (title.toLowerCase().includes('women only')) {
    return 'women';
  } else if (title.toLowerCase().includes('buddhist') || title.toLowerCase().includes('tribal')) {
    return 'buddhist';
  } else if (title.toLowerCase().includes('own car') || title.toLowerCase().includes('self drive')) {
    return 'owncar';
  } else if (title.toLowerCase().includes('hidden heaven')) {
    return 'hiddenheaven';
  } else {
    return 'unexplored';
  }
};

// Helper function to get the hero image for a specific tour type
export const getHeroImageForTourType = (tourType: string): string => {
  switch (tourType) {
    case 'bike':
      return "/lovable-uploads/5b82c4c3-e5f4-4752-8825-2aaa8634642a.png";
    case 'women':
      return "/lovable-uploads/bc21cc57-f972-4cd7-af1f-ca1542135c90.png";
    case 'buddhist':
      return "/lovable-uploads/f8e55e6b-8b70-4f27-a84d-ee09e7e3550c.png";
    case 'owncar':
      return "/lovable-uploads/b619b7ac-daf4-4da4-8ebc-f30d0c9d883f.png";
    case 'hiddenheaven':
      return "/lovable-uploads/e375b837-c930-402e-8fd0-0ea3280c7540.png";
    case 'unexplored':
    default:
      return "/lovable-uploads/c55ecde9-4eb8-4cfb-b626-4c5b1036b4b9.png";
  }
};
