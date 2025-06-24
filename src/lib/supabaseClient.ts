import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Types for our database schema
export interface User {
  id: string
  email: string
  created_at: string
}

export interface Profile {
  user_id: string
  name: string | null
  child_age: number | null
  character_traits: string[] | null
  parenting_style: string | null
}

export interface ChatHistory {
  id: string
  user_id: string
  message: string
  role: 'user' | 'assistant'
  created_at: string
  summary?: string | null
}