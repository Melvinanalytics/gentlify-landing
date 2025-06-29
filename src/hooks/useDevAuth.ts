'use client'

import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

// Mock user for development mode
const DEV_USER: User = {
  id: process.env.NEXT_PUBLIC_DEV_USER_ID || 'dev-user-123',
  email: process.env.NEXT_PUBLIC_DEV_USER_EMAIL || 'dev@gentlify.app',
  app_metadata: {},
  user_metadata: {
    name: 'Dev User',
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  confirmed_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  role: 'authenticated',
  phone: undefined,
  phone_confirmed_at: undefined,
}

export const useDevAuth = () => {
  // Check multiple ways for dev mode activation
  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true' || 
                   process.env.NODE_ENV === 'development' ||
                   typeof window !== 'undefined' && window.location.hostname.includes('github.dev')
  
  return {
    isDevMode,
    devUser: isDevMode ? DEV_USER : null,
  }
}

// Helper to check if dev mode is enabled
export const isDevModeEnabled = () => process.env.NEXT_PUBLIC_DEV_MODE === 'true' || 
                                     process.env.NODE_ENV === 'development' ||
                                     (typeof window !== 'undefined' && window.location.hostname.includes('github.dev'))