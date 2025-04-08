
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
 * Extracts ID from slug (e.g., "my-tour-title-123abc" returns "123abc")
 * @param slug The slug containing ID at the end
 * @returns The extracted ID
 */
export const extractIdFromSlug = (slug: string): string | null => {
  const parts = slug.split('-');
  // Check if we have enough parts
  if (parts.length <= 1) {
    return null;
  }
  
  // The ID should be the last part or the whole slug
  // We'll handle both formats: "slug-id" and just "id"
  const lastPart = parts[parts.length - 1];
  
  // If it looks like a UUID fragment (8 or more alphanumeric chars), assume it's the ID
  if (/^[0-9a-f]{8,}$/i.test(lastPart)) {
    return lastPart;
  }
  
  // If no ID found in slug format, return the whole slug
  return slug;
};
