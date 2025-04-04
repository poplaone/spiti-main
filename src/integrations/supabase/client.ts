
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ttyhfrbubjpmzruwwihd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eWhmcmJ1YmpwbXpydXd3aWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzk4MTgsImV4cCI6MjA1OTMxNTgxOH0.tv8W6Hb7f3RdqnYs-LqgxeA3gXUJgIDVnnOtzcdVSno";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Add custom types for our tables
declare module '@supabase/supabase-js' {
  export interface Database {
    public: {
      Tables: {
        tour_packages: {
          Row: {
            id: string
            title: string
            image: string
            original_price: number
            discounted_price: number
            discount: number
            duration_nights: number
            duration_days: number
            transport_type: string
            is_women_only: boolean
            overview: string | null
            created_at: string
            updated_at: string
          }
          Insert: {
            id?: string
            title: string
            image: string
            original_price: number
            discounted_price: number
            discount: number
            duration_nights: number
            duration_days: number
            transport_type: string
            is_women_only?: boolean
            overview?: string | null
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            title?: string
            image?: string
            original_price?: number
            discounted_price?: number
            discount?: number
            duration_nights?: number
            duration_days?: number
            transport_type?: string
            is_women_only?: boolean
            overview?: string | null
            created_at?: string
            updated_at?: string
          }
        }
        night_stays: {
          Row: {
            id: string
            tour_package_id: string
            location: string
            nights: number
          }
          Insert: {
            id?: string
            tour_package_id: string
            location: string
            nights: number
          }
          Update: {
            id?: string
            tour_package_id?: string
            location?: string
            nights?: number
          }
        }
        inclusions: {
          Row: {
            id: string
            tour_package_id: string
            description: string
          }
          Insert: {
            id?: string
            tour_package_id: string
            description: string
          }
          Update: {
            id?: string
            tour_package_id?: string
            description?: string
          }
        }
        exclusions: {
          Row: {
            id: string
            tour_package_id: string
            description: string
          }
          Insert: {
            id?: string
            tour_package_id: string
            description: string
          }
          Update: {
            id?: string
            tour_package_id?: string
            description?: string
          }
        }
        itinerary_days: {
          Row: {
            id: string
            tour_package_id: string
            day_number: number
            title: string
            description: string
          }
          Insert: {
            id?: string
            tour_package_id: string
            day_number: number
            title: string
            description: string
          }
          Update: {
            id?: string
            tour_package_id?: string
            day_number?: number
            title?: string
            description?: string
          }
        }
        admin_users: {
          Row: {
            id: string
            created_at: string
          }
          Insert: {
            id: string
            created_at?: string
          }
          Update: {
            id?: string
            created_at?: string
          }
        }
      }
    }
  }
}
