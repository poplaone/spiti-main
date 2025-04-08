
import { TourPackageProps } from '@/data/types/tourTypes';

// This file now serves as a placeholder for tour data
// All tours are now coming from Supabase database instead of static files

// Export an empty array as the default tour packages data
// This will be replaced by data from the database via ToursContext
export const tourPackagesData: TourPackageProps[] = [];

// No longer exporting individual tour categories as they're fetched from the database
