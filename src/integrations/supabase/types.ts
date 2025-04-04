export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      exclusions: {
        Row: {
          description: string
          id: string
          tour_package_id: string
        }
        Insert: {
          description: string
          id?: string
          tour_package_id: string
        }
        Update: {
          description?: string
          id?: string
          tour_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exclusions_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      inclusions: {
        Row: {
          description: string
          id: string
          tour_package_id: string
        }
        Insert: {
          description: string
          id?: string
          tour_package_id: string
        }
        Update: {
          description?: string
          id?: string
          tour_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inclusions_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_days: {
        Row: {
          day_number: number
          description: string
          id: string
          title: string
          tour_package_id: string
        }
        Insert: {
          day_number: number
          description: string
          id?: string
          title: string
          tour_package_id: string
        }
        Update: {
          day_number?: number
          description?: string
          id?: string
          title?: string
          tour_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      night_stays: {
        Row: {
          id: string
          location: string
          nights: number
          tour_package_id: string
        }
        Insert: {
          id?: string
          location: string
          nights: number
          tour_package_id: string
        }
        Update: {
          id?: string
          location?: string
          nights?: number
          tour_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "night_stays_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_departure_dates: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          start_date: string
          status: string
          tour_package_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          start_date: string
          status?: string
          tour_package_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          start_date?: string
          status?: string
          tour_package_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_departure_dates_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_packages: {
        Row: {
          created_at: string
          discount: number
          discounted_price: number
          duration_days: number
          duration_nights: number
          id: string
          image: string
          is_customizable: boolean | null
          is_fixed_departure: boolean | null
          is_visible: boolean
          is_women_only: boolean
          original_price: number
          overview: string | null
          overview_details: Json | null
          title: string
          transport_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          discount: number
          discounted_price: number
          duration_days: number
          duration_nights: number
          id?: string
          image: string
          is_customizable?: boolean | null
          is_fixed_departure?: boolean | null
          is_visible?: boolean
          is_women_only?: boolean
          original_price: number
          overview?: string | null
          overview_details?: Json | null
          title: string
          transport_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          discount?: number
          discounted_price?: number
          duration_days?: number
          duration_nights?: number
          id?: string
          image?: string
          is_customizable?: boolean | null
          is_fixed_departure?: boolean | null
          is_visible?: boolean
          is_women_only?: boolean
          original_price?: number
          overview?: string | null
          overview_details?: Json | null
          title?: string
          transport_type?: string
          updated_at?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
