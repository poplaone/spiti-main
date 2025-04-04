
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ttyhfrbubjpmzruwwihd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eWhmcmJ1YmpwbXpydXd3aWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzk4MTgsImV4cCI6MjA1OTMxNTgxOH0.tv8W6Hb7f3RdqnYs-LqgxeA3gXUJgIDVnnOtzcdVSno";

// Define the Database interface for our Supabase client
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
          is_visible: boolean
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
          is_visible?: boolean
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
          is_visible?: boolean
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
      tour_departure_dates: {
        Row: {
          id: string
          tour_package_id: string | null
          start_date: string
          end_date: string
          status: string
          created_at: string | null
        }
        Insert: {
          id?: string
          tour_package_id?: string | null
          start_date: string
          end_date: string
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          tour_package_id?: string | null
          start_date?: string
          end_date?: string
          status?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Create and export the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type Tables = Database['public']['Tables'];
