
/**
 * Converts a string to a URL-friendly slug
 * @param str The string to convert to a slug
 * @returns A URL-friendly slug
 */
export const createSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

/**
 * Extracts ID from slug (e.g., "my-tour-title/123abc" returns "123abc")
 * @param slug The slug containing ID at the end
 * @returns The extracted ID
 */
export const extractIdFromSlug = (slug: string): string | null => {
  // Check if slug contains a slash (new format: slug/id)
  if (slug.includes('/')) {
    const parts = slug.split('/');
    return parts[parts.length - 1]; // Return the last part after slash
  }
  
  // If no slash found, this is an old-style URL or direct ID
  return slug;
};
