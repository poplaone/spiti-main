
/**
 * Utility for efficient lazy loading of images using IntersectionObserver
 */

// Store observer instances to prevent recreation
const observers: Map<string, IntersectionObserver> = new Map();

/**
 * Creates an IntersectionObserver that will call the provided callback
 * when the target element enters the viewport
 */
export const createLazyLoadObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = { rootMargin: '200px' }
): IntersectionObserver => {
  const key = JSON.stringify(options);
  
  if (!observers.has(key)) {
    const observer = new IntersectionObserver(callback, options);
    observers.set(key, observer);
    return observer;
  }
  
  return observers.get(key)!;
};

/**
 * Cleanup function to disconnect observers
 */
export const cleanupObservers = (): void => {
  observers.forEach(observer => observer.disconnect());
  observers.clear();
};
