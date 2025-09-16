export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      app_users: {
        Row: {
          badges: Json | null
          email: string | null
          hasFoundSecret: boolean | null
          id: string
          questsolved: Json | null
          ratings: Json | null
          secretStep: number | null
          "secretStep.$numberLong": string | null
          startedQuest: boolean | null
          unseenBadge: boolean | null
        }
        Insert: {
          badges?: Json | null
          email?: string | null
          hasFoundSecret?: boolean | null
          id: string
          questsolved?: Json | null
          ratings?: Json | null
          secretStep?: number | null
          "secretStep.$numberLong"?: string | null
          startedQuest?: boolean | null
          unseenBadge?: boolean | null
        }
        Update: {
          badges?: Json | null
          email?: string | null
          hasFoundSecret?: boolean | null
          id?: string
          questsolved?: Json | null
          ratings?: Json | null
          secretStep?: number | null
          "secretStep.$numberLong"?: string | null
          startedQuest?: boolean | null
          unseenBadge?: boolean | null
        }
        Relationships: []
      }
      app_users_badges: {
        Row: {
          badge: string | null
          date_awarded: string | null
          id: string
          user: string | null
        }
        Insert: {
          badge?: string | null
          date_awarded?: string | null
          id: string
          user?: string | null
        }
        Update: {
          badge?: string | null
          date_awarded?: string | null
          id?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_users_badges_badge_fkey"
            columns: ["badge"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_users_badges_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      app_users_questsolved: {
        Row: {
          id: string
          quest1: boolean | null
          quest2: boolean | null
          quest3: boolean | null
          quest4: boolean | null
          user: string | null
        }
        Insert: {
          id: string
          quest1?: boolean | null
          quest2?: boolean | null
          quest3?: boolean | null
          quest4?: boolean | null
          user?: string | null
        }
        Update: {
          id?: string
          quest1?: boolean | null
          quest2?: boolean | null
          quest3?: boolean | null
          quest4?: boolean | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_users_questsolved_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      app_users_ratings: {
        Row: {
          beer: string | null
          id: string
          rating: number | null
          user: string | null
        }
        Insert: {
          beer?: string | null
          id: string
          rating?: number | null
          user?: string | null
        }
        Update: {
          beer?: string | null
          id?: string
          rating?: number | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_users_ratings_beer_fkey"
            columns: ["beer"]
            isOneToOne: false
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_users_ratings_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          description: string | null
          id: string
          image: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          id: string
          image?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          image?: string | null
          title?: string | null
        }
        Relationships: []
      }
      beers: {
        Row: {
          brewery: string | null
          container: string | null
          currency: string | null
          degree_decimal: number | null
          degree_integer: number | null
          description: string | null
          displayonmenu: boolean | null
          displayonstats: boolean | null
          distance: number | null
          edition: string
          ibu: number | null
          id: string
          image: string | null
          imagecard: string | null
          name: string
          price: number | null
          type: string | null
        }
        Insert: {
          brewery?: string | null
          container?: string | null
          currency?: string | null
          degree_decimal?: number | null
          degree_integer?: number | null
          description?: string | null
          displayonmenu?: boolean | null
          displayonstats?: boolean | null
          distance?: number | null
          edition: string
          ibu?: number | null
          id: string
          image?: string | null
          imagecard?: string | null
          name: string
          price?: number | null
          type?: string | null
        }
        Update: {
          brewery?: string | null
          container?: string | null
          currency?: string | null
          degree_decimal?: number | null
          degree_integer?: number | null
          description?: string | null
          displayonmenu?: boolean | null
          displayonstats?: boolean | null
          distance?: number | null
          edition?: string
          ibu?: number | null
          id?: string
          image?: string | null
          imagecard?: string | null
          name?: string
          price?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beers_edition_fk_fkey"
            columns: ["edition"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      editions: {
        Row: {
          active: boolean
          date: string
          id: string
          name: string
          number: number
        }
        Insert: {
          active: boolean
          date: string
          id: string
          name: string
          number: number
        }
        Update: {
          active?: boolean
          date?: string
          id?: string
          name?: string
          number?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          description: string | null
          edition: string | null
          id: string | null
          link: string | null
          time: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          edition?: string | null
          id?: string | null
          link?: string | null
          time?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          edition?: string | null
          id?: string | null
          link?: string | null
          time?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_edition_fk_fkey"
            columns: ["edition"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          id: string
          next_question: string | null
          option: string | null
          question: string | null
          selected_beer: string | null
          selected_beer_id: string | null
        }
        Insert: {
          id: string
          next_question?: string | null
          option?: string | null
          question?: string | null
          selected_beer?: string | null
          selected_beer_id?: string | null
        }
        Update: {
          id?: string
          next_question?: string | null
          option?: string | null
          question?: string | null
          selected_beer?: string | null
          selected_beer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_options_beers"
            columns: ["selected_beer_id"]
            isOneToOne: false
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "options_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          currency: string | null
          date: string | null
          edition: string | null
          id: string
          total_price: number | null
        }
        Insert: {
          currency?: string | null
          date?: string | null
          edition?: string | null
          id: string
          total_price?: number | null
        }
        Update: {
          currency?: string | null
          date?: string | null
          edition?: string | null
          id?: string
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_edition_fk_fkey"
            columns: ["edition"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_beers: {
        Row: {
          beer: string | null
          id: string
          order: string | null
        }
        Insert: {
          beer?: string | null
          id: string
          order?: string | null
        }
        Update: {
          beer?: string | null
          id?: string
          order?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_beers_beer_fkey"
            columns: ["beer"]
            isOneToOne: false
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_beers_order_fkey"
            columns: ["order"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          edition: string | null
          id: string
          qid: number | null
          question: string | null
        }
        Insert: {
          edition?: string | null
          id: string
          qid?: number | null
          question?: string | null
        }
        Update: {
          edition?: string | null
          id?: string
          qid?: number | null
          question?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_edition_fk_fkey"
            columns: ["edition"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
      }
      route_beers: {
        Row: {
          beer: string | null
          id: string
          name: string | null
          order: number | null
          route: string | null
        }
        Insert: {
          beer?: string | null
          id: string
          name?: string | null
          order?: number | null
          route?: string | null
        }
        Update: {
          beer?: string | null
          id?: string
          name?: string | null
          order?: number | null
          route?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_options_beers"
            columns: ["beer"]
            isOneToOne: false
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_beers_route_fkey"
            columns: ["route"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          edition: string | null
          id: string
          name: string | null
        }
        Insert: {
          edition?: string | null
          id: string
          name?: string | null
        }
        Update: {
          edition?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_edition_fk_fkey"
            columns: ["edition"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
