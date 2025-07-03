
/**
 * Maps tour titles to URL slugs for cleaner URLs
 */
export const tourTitleToSlug: Record<string, string> = {
  "BUDDHIST AND TRIBAL CIRCUIT–SPITI": "/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI",
  "BUDDHIST AND TRIBAL CIRCUIT–SPITI ": "/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI", // With trailing space
  "BUDDHIST AND TRIBAL CIRCUIT SPITI": "/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI",
  "INTO THE HEART OF SPITI": "/INTO-THE-HEART-OF-SPITI",
  "KINNAUR VALLEY EXPLORATION": "/KINNAUR-VALLEY-EXPLORATION",
  "LAHAUL SPITI - BIKE TOUR": "/LAHAUL-SPITI-BIKE-TOUR",
  "SPITI VALLEY TOUR IN YOUR OWN CAR": "/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR",
  "SPITI VALLEY WOMEN ONLY TOUR": "/SPITI-VALLEY-WOMEN-ONLY-TOUR",
  "UNEXPLORED SPITI": "/UNEXPLORED-SPITI",
  "WINTER WHITE SPITI": "/WINTER-WHITE-SPITI",
  "ROYAL SPITI VALLEY (WHOLE CIRCUIT)": "/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT",
  "ROYAL SPITI VALLEY WHOLE CIRCUIT": "/ROYAL-SPITI-VALLEY-WHOLE-CIRCUIT",
  "SNOW LEOPARD EXPEDITION (WINTER SPECIAL)": "/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL",
  "SNOW LEOPARD EXPEDITION (WINTER SPECIAL) ": "/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL", // With trailing space
  "SNOW LEOPARD EXPEDITION WINTER SPECIAL": "/SNOW-LEOPARD-EXPEDITION-WINTER-SPECIAL",
  "SOULFUL SPITI GATEWAY": "/SOULFUL-SPITI-GATEWAY",
  "SOULFUL  SPITI GATEWAY": "/SOULFUL-SPITI-GATEWAY",
  "SPITI COMPLETE CIRCUIT(MOST POPULAR)": "/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR",
  "SPITI COMPLETE CIRCUIT (MOST POPULAR)": "/SPITI-COMPLETE-CIRCUIT-MOST-POPULAR"
};

/**
 * Generate SEO-friendly slug from tour title
 */
export const generateSlugFromTitle = (title: string): string => {
  return '/' + title
    .toUpperCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except hyphens and spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Get SEO-friendly URL for any tour title
 */
export const getTourUrl = (title: string): string => {
  // Check if predefined mapping exists
  if (tourTitleToSlug[title]) {
    return tourTitleToSlug[title];
  }
  
  // Generate slug automatically
  return generateSlugFromTitle(title);
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
