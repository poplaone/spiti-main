
/**
 * Converts a string to a URL-friendly slug
 * @param str The string to convert to a slug
 * @returns A URL-friendly slug
 */
export const createSlug = (str: string): string => {
  if (!str) return '';
  
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
  if (!slug) return null;
  
  // Check if slug contains a slash (new format: slug/id)
  if (slug.includes('/')) {
    const parts = slug.split('/');
    return parts[parts.length - 1]; // Return the last part after slash
  }
  
  // Check if the slug is in the format "/tour/id"
  if (slug.startsWith('/tour/')) {
    return slug.replace('/tour/', '');
  }
  
  // If no slash found, this is an old-style URL or direct ID
  return slug;
};

/**
 * Creates a full tour URL with slug and ID
 * @param title The tour title
 * @param id The tour ID
 * @returns The full URL slug
 */
export const createTourUrl = (title: string, id: string): string => {
  const slug = createSlug(title);
  return `/tour/${slug}/${id}`;
};
