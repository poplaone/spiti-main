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
          order: number | null
          tour_package_id: string
        }
        Insert: {
          id?: string
          location: string
          nights: number
          order?: number | null
          tour_package_id: string
        }
        Update: {
          id?: string
          location?: string
          nights?: number
          order?: number | null
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
          meta: Json | null
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
          meta?: Json | null
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
          meta?: Json | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
