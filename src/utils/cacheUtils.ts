
/**
 * Utility functions for handling API caching
 */

// Cache duration in milliseconds
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// In-memory cache store
const memoryCache: Record<string, { data: any; timestamp: number }> = {};

/**
 * Get data from cache if it exists and is not expired
 * @param key Cache key
 * @returns Cached data or null if not found/expired
 */
export const getFromCache = (key: string) => {
  const cachedItem = memoryCache[key];
  if (!cachedItem) return null;
  
  const now = Date.now();
  if (now - cachedItem.timestamp > CACHE_DURATION) {
    // Cache expired, remove it
    delete memoryCache[key];
    return null;
  }
  
  return cachedItem.data;
};

/**
 * Store data in the cache
 * @param key Cache key
 * @param data Data to store
 */
export const setInCache = (key: string, data: any) => {
  memoryCache[key] = {
    data,
    timestamp: Date.now()
  };
};

/**
 * Clear all cached data
 */
export const clearCache = () => {
  Object.keys(memoryCache).forEach(key => {
    delete memoryCache[key];
  });
};

/**
 * Enhanced fetch function with caching capabilities
 * @param url URL to fetch
 * @param options Fetch options
 * @param cacheKey Optional custom cache key
 * @returns Promise with fetched data
 */
export const cachedFetch = async (url: string, options?: RequestInit, cacheKey?: string) => {
  const key = cacheKey || url;
  const cachedData = getFromCache(key);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setInCache(key, data);
    return data;
  } catch (error) {
    console.error('Error in cachedFetch:', error);
    throw error;
  }
};
