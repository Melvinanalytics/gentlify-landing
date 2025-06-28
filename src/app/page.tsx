'use client'

import { useState, useEffect } from 'react'
import { ProfileSetup } from '@/components/layout/ProfileSetup'
import { ChatContainer } from '@/components/layout/ChatContainer'
import { Login } from '@/components/Login'
import { Menu } from '@/components/Menu'
import { PlaceholderView } from '@/components/PlaceholderView'
import { useHasCompletedOnboarding, usePacifyStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import { useDevAuth } from '@/hooks/useDevAuth'
import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [currentView, setCurrentView] = useState<string>('menu')
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  
  const hasCompletedOnboarding = useHasCompletedOnboarding()
  const { resetOnboarding, setCurrentUserId } = usePacifyStore()
  const { isDevMode, devUser } = useDevAuth()
  
  // Handle authentication state
  useEffect(() => {
    const initAuth = async () => {
      // If in dev mode, use mock user
      if (isDevMode && devUser) {
        setUser(devUser)
        setIsAuthLoading(false)
        setIsClient(true)
        setCurrentUserId(devUser.id)
        return
      }

      // Normal auth flow
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsAuthLoading(false)
      setIsClient(true)
    }

    initAuth()

    // Skip auth subscription in dev mode
    if (isDevMode) {
      return
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const newUser = session?.user ?? null
        setUser(newUser)
        setIsAuthLoading(false)
        
        // Update store with current user ID
        setCurrentUserId(newUser?.id ?? null)
        
        // Reset view on logout
        if (event === 'SIGNED_OUT') {
          setCurrentView('menu')
          setShowProfileEdit(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [isDevMode, devUser])
  
  // Loading state
  if (!isClient || isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Pacify wird geladen...</p>
        </div>
      </div>
    )
  }

  // Development mode: authentication bypassed for rapid prototyping
  if (!user) {
    setUser({
      id: 'dev-user-123',
      email: 'dev@gentlify.app',
      app_metadata: {},
      user_metadata: { name: 'Dev User' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      phone: null,
      phone_confirmed_at: null,
    })
  }
  
  const handleEditProfile = () => {
    setShowProfileEdit(true)
    resetOnboarding()
  }
  
  const handleProfileComplete = () => {
    setShowProfileEdit(false)
    setCurrentView('menu')
  }

  const handleNavigate = (section: string) => {
    setCurrentView(section)
  }

  const handleBackToMenu = () => {
    setCurrentView('menu')
    setShowProfileEdit(false)
  }
  
  // Show profile setup only if editing (not for initial onboarding)
  if (showProfileEdit) {
    return <ProfileSetup onComplete={handleProfileComplete} />
  }
  
  // Skip initial onboarding, go directly to menu
  if (!hasCompletedOnboarding) {
    // Auto-complete onboarding on first visit
    usePacifyStore.getState().completeOnboarding()
  }

  // Handle different views
  switch (currentView) {
    case 'menu':
      return <Menu user={user} onNavigate={handleNavigate} />
    
    case 'problem-solver':
      return <ChatContainer onEditProfile={handleEditProfile} onBack={handleBackToMenu} user={user} />
    
    case 'personalization':
      return <ProfileSetup onComplete={handleBackToMenu} />
    
    case 'parenting-style':
      return (
        <PlaceholderView
          title="Erziehungsstil"
          description="Entdecke verschiedene Erziehungsansätze und finde heraus, welcher Stil zu dir passt."
          icon="❤️"
          onBack={handleBackToMenu}
        />
      )
    
    case 'daily-challenges':
      return (
        <PlaceholderView
          title="Tägliche Herausforderungen"
          description="Bewältige alltägliche Erziehungssituationen mit gezielten Tipps und Strategien."
          icon="📅"
          onBack={handleBackToMenu}
        />
      )
    
    case 'communication-quiz':
      return (
        <PlaceholderView
          title="Kommunikations-Quiz"
          description="Teste deine Kommunikationsfähigkeiten und lerne neue Ansätze kennen."
          icon="❓"
          onBack={handleBackToMenu}
        />
      )
    
    case 'settings':
      return (
        <PlaceholderView
          title="Einstellungen"
          description="Verwalte deine Kontoeinstellungen und App-Präferenzen."
          icon="⚙️"
          onBack={handleBackToMenu}
        />
      )
    
    default:
      return <Menu user={user} onNavigate={handleNavigate} />
  }
}
