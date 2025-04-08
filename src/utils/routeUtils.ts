
/**
 * Maps tour titles to URL slugs for cleaner URLs
 */
export const tourTitleToSlug: Record<string, string> = {
  "BUDDHIST AND TRIBAL CIRCUIT–SPITI": "/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI",
  "INTO THE HEART OF SPITI": "/INTO-THE-HEART-OF-SPITI",
  "KINNAUR VALLEY EXPLORATION": "/KINNAUR-VALLEY-EXPLORATION",
  "LAHAUL SPITI - BIKE TOUR": "/LAHAUL-SPITI-BIKE-TOUR",
  "SPITI VALLEY TOUR IN YOUR OWN CAR": "/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR",
  "SPITI VALLEY WOMEN ONLY TOUR": "/SPITI-VALLEY-WOMEN-ONLY-TOUR",
  "UNEXPLORED SPITI": "/UNEXPLORED-SPITI",
  "WINTER WHITE SPITI": "/WINTER-WHITE-SPITI",
  "ROYAL SPITI VALLEY WHOLE CIRCUIT": "/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT",
  "SNOW LEOPARD EXPEDITION - WINTER SPECIAL": "/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL",
  "SOULFUL SPITI GATEWAY": "/SOULFUL-SPITI-GATEWAY",
  "SPITI COMPLETE CIRCUIT - MOST POPULAR": "/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR"
};

/**
 * Reverse mapping from slugs to tour titles for lookup
 */
export const slugToTourTitle: Record<string, string> = Object.entries(tourTitleToSlug).reduce(
  (acc, [title, slug]) => {
    // Remove leading slash for the key
    const key = slug.startsWith('/') ? slug.substring(1) : slug;
    acc[key] = title;
    return acc;
  },
  {} as Record<string, string>
);
