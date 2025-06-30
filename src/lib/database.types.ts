// Supabase Database Types - Generated from schema
// Skalierbare Typen für User Management

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'moderator'
          onboarding_completed: boolean
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          onboarding_completed?: boolean
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          onboarding_completed?: boolean
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_signups: {
        Row: {
          id: string
          email: string
          name: string | null
          source: string | null
          confirmed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          source?: string | null
          confirmed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          source?: string | null
          confirmed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      child_profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          age_years: number
          age_months: number
          personality_traits: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age_years: number
          age_months?: number
          personality_traits?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age_years?: number
          age_months?: number
          personality_traits?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chat_history: {
        Row: {
          id: string
          user_id: string
          child_profile_id: string | null
          session_id: string
          role: 'user' | 'assistant'
          content: string
          intent: string | null
          feedback: 'positive' | 'negative' | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          child_profile_id?: string | null
          session_id: string
          role: 'user' | 'assistant'
          content: string
          intent?: string | null
          feedback?: 'positive' | 'negative' | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          child_profile_id?: string | null
          session_id?: string
          role?: 'user' | 'assistant'
          content?: string
          intent?: string | null
          feedback?: 'positive' | 'negative' | null
          metadata?: Json
          created_at?: string
        }
      }
      usage_analytics: {
        Row: {
          id: string
          user_id: string
          event_type: string
          event_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_type: string
          event_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: string
          event_data?: Json
          created_at?: string
        }
      }
    }
    Views: {
      user_dashboard_stats: {
        Row: {
          user_id: string
          email: string
          full_name: string | null
          child_profiles_count: number
          chat_sessions_count: number
          messages_sent: number
          last_activity: string | null
        }
      }
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_active_child_profile: {
        Args: { user_id: string }
        Returns: {
          id: string
          name: string
          age_years: number
          age_months: number
          personality_traits: string[]
        }[]
      }
    }
    Enums: {
      user_role: 'user' | 'admin' | 'moderator'
      chat_role: 'user' | 'assistant'
      feedback_type: 'positive' | 'negative'
    }
  }
}

// Helper Types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Convenience Types
export type Profile = Tables<'profiles'>
export type NewsletterSignup = Tables<'newsletter_signups'>
export type ChildProfile = Tables<'child_profiles'>
export type ChatHistory = Tables<'chat_history'>
export type UsageAnalytics = Tables<'usage_analytics'>
export type UserRole = Enums<'user_role'>
export type ChatRole = Enums<'chat_role'>
export type FeedbackType = Enums<'feedback_type'>