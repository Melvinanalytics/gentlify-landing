'use client'

import { useState, useEffect } from 'react'
import { ProfileSetup } from '@/components/layout/ProfileSetup'
import { ChatInterface } from '@/components/layout/ChatInterface'
import { Login } from '@/components/Login'
import { Menu } from '@/components/Menu'
import { PlaceholderView } from '@/components/PlaceholderView'
import { useHasCompletedOnboarding, usePacifyStore } from '@/lib/store'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [currentView, setCurrentView] = useState<string>('menu')
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  
  const hasCompletedOnboarding = useHasCompletedOnboarding()
  const { resetOnboarding, setCurrentUserId } = usePacifyStore()
  
  // Handle authentication state
  useEffect(() => {
    const initAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsAuthLoading(false)
      setIsClient(true)
    }

    initAuth()

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
  }, [])
  
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

  // Show login if not authenticated
  if (!user) {
    return <Login />
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
      return <ChatInterface onEditProfile={handleEditProfile} onBack={handleBackToMenu} user={user} />
    
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
