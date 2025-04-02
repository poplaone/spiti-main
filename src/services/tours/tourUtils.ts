
import { TourPackageProps } from '@/components/TourPackage';
import { TourTransportType } from '@/data/types/tourTypes';

// Storage key for localStorage
export const TOURS_STORAGE_KEY = 'spiti-admin-tours';

// Convert legacy transport types to supported types
export const normalizeTransportType = (transportType: string): TourTransportType => {
  if (transportType === 'innova') {
    return 'premium';
  }
  return transportType as TourTransportType;
};

// Generate slug from title
export const generateCustomUrl = (title: string, existingTours: TourPackageProps[]): string => {
  // Convert to lowercase, replace spaces with hyphens, remove special chars
  let slug = title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  
  // Check if slug already exists
  let counter = 0;
  let uniqueSlug = slug;
  
  while (existingTours.some(tour => tour.customUrl === uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
  
  return uniqueSlug;
};
