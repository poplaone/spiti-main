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
          email: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      exclusions: {
        Row: {
          description: string
          id: string
          tour_id: string | null
        }
        Insert: {
          description: string
          id?: string
          tour_id?: string | null
        }
        Update: {
          description?: string
          id?: string
          tour_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exclusions_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      inclusions: {
        Row: {
          description: string
          id: string
          tour_id: string | null
        }
        Insert: {
          description: string
          id?: string
          tour_id?: string | null
        }
        Update: {
          description?: string
          id?: string
          tour_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inclusions_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
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
          tour_id: string | null
        }
        Insert: {
          day_number: number
          description: string
          id?: string
          title: string
          tour_id?: string | null
        }
        Update: {
          day_number?: number
          description?: string
          id?: string
          title?: string
          tour_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      night_stays: {
        Row: {
          id: string
          location: string
          nights: number
          tour_id: string | null
        }
        Insert: {
          id?: string
          location: string
          nights: number
          tour_id?: string | null
        }
        Update: {
          id?: string
          location?: string
          nights?: number
          tour_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "night_stays_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          available_from: string | null
          created_at: string | null
          days: number
          discount: number
          discounted_price: number
          has_fixed_departures: boolean | null
          id: string
          image: string | null
          is_customizable: boolean | null
          is_women_only: boolean | null
          nights: number
          original_price: number
          overview: string | null
          title: string
          transport_type: Database["public"]["Enums"]["transport_type"]
          updated_at: string | null
        }
        Insert: {
          available_from?: string | null
          created_at?: string | null
          days: number
          discount: number
          discounted_price: number
          has_fixed_departures?: boolean | null
          id?: string
          image?: string | null
          is_customizable?: boolean | null
          is_women_only?: boolean | null
          nights: number
          original_price: number
          overview?: string | null
          title: string
          transport_type: Database["public"]["Enums"]["transport_type"]
          updated_at?: string | null
        }
        Update: {
          available_from?: string | null
          created_at?: string | null
          days?: number
          discount?: number
          discounted_price?: number
          has_fixed_departures?: boolean | null
          id?: string
          image?: string | null
          is_customizable?: boolean | null
          is_women_only?: boolean | null
          nights?: number
          original_price?: number
          overview?: string | null
          title?: string
          transport_type?: Database["public"]["Enums"]["transport_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          email: string
        }
        Returns: boolean
      }
    }
    Enums: {
      transport_type: "bike" | "car" | "innova"
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
