import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChildProfile, ChatMessage, ErrorState, ChatSession, ConversationContext } from './types'

// Legacy type for migration
interface LegacyChildProfile {
  name: string
  age: number // Old structure
  traits: string[]
  createdAt: string | Date
}

interface PacifyStore {
  // User State
  currentUserId: string | null
  setCurrentUserId: (userId: string | null) => void
  
  // Child Profile State
  childProfile: ChildProfile | null
  setChildProfile: (profile: ChildProfile) => void
  clearChildProfile: () => void
  
  // Onboarding State
  hasCompletedOnboarding: boolean
  completeOnboarding: () => void
  resetOnboarding: () => void
  
  // Chat State
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  updateMessageFeedback: (messageId: string, feedback: 'positive' | 'negative') => void
  clearMessages: () => void
  loadMessages: (messages: ChatMessage[]) => void
  
  // User-based Chat History (preparation for Supabase integration)
  userChatHistory: Record<string, ChatMessage[]>
  addUserMessage: (userId: string, message: ChatMessage) => void
  getUserMessages: (userId: string) => ChatMessage[]
  clearUserMessages: (userId: string) => void
  
  // UI State
  isLoading: boolean
  setLoading: (loading: boolean) => void
  
  error: ErrorState
  setError: (error: ErrorState) => void
  clearError: () => void
  
  // Utility Actions
  reset: () => void
}

const initialState = {
  currentUserId: null,
  childProfile: null,
  hasCompletedOnboarding: false,
  messages: [],
  userChatHistory: {},
  isLoading: false,
  error: { hasError: false }
}

// Migration function for legacy profiles
const migrateChildProfile = (profile: any): ChildProfile | null => {
  if (!profile) return null
  
  try {
    // Check if it's already new format
    if (profile.ageYears !== undefined && profile.ageMonths !== undefined) {
      return {
        ...profile,
        createdAt: typeof profile.createdAt === 'string' 
          ? profile.createdAt 
          : new Date().toISOString()
      }
    }
    
    // Migrate from old format
    if (profile.age !== undefined) {
      return {
        name: profile.name || 'Unbekannt',
        ageYears: Math.max(1, Math.min(18, profile.age || 4)),
        ageMonths: 0,
        traits: Array.isArray(profile.traits) ? profile.traits : [],
        createdAt: typeof profile.createdAt === 'string' 
          ? profile.createdAt 
          : new Date().toISOString()
      }
    }
    
    return null
  } catch (error) {
    console.warn('Failed to migrate child profile:', error)
    return null
  }
}

export const usePacifyStore = create<PacifyStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // User Actions
      setCurrentUserId: (userId: string | null) =>
        set({ currentUserId: userId }),
      
      // Child Profile Actions
      setChildProfile: (profile: ChildProfile) => 
        set({ childProfile: profile }),
      
      clearChildProfile: () => 
        set({ childProfile: null, hasCompletedOnboarding: false }),
      
      // Onboarding Actions
      completeOnboarding: () => 
        set({ hasCompletedOnboarding: true }),
      
      resetOnboarding: () => 
        set({ hasCompletedOnboarding: false }),
      
      // Chat Actions
      addMessage: (message: ChatMessage) => 
        set((state) => ({ 
          messages: [...state.messages, {
            ...message,
            timestamp: message.timestamp instanceof Date 
              ? message.timestamp 
              : new Date(message.timestamp)
          }] 
        })),
      
      updateMessageFeedback: (messageId: string, feedback: 'positive' | 'negative') =>
        set((state) => ({
          messages: state.messages.map(msg =>
            msg.id === messageId ? { ...msg, feedback } : msg
          )
        })),
      
      clearMessages: () => 
        set({ messages: [] }),
      
      loadMessages: (messages: ChatMessage[]) => 
        set({ 
          messages: messages.map(msg => ({
            ...msg,
            timestamp: msg.timestamp instanceof Date 
              ? msg.timestamp 
              : new Date(msg.timestamp)
          }))
        }),
      
      // User-based Chat History Actions
      addUserMessage: (userId: string, message: ChatMessage) =>
        set((state) => ({
          userChatHistory: {
            ...state.userChatHistory,
            [userId]: [
              ...(state.userChatHistory[userId] || []),
              {
                ...message,
                userId,
                timestamp: message.timestamp instanceof Date 
                  ? message.timestamp 
                  : new Date(message.timestamp)
              }
            ]
          }
        })),
      
      getUserMessages: (userId: string): ChatMessage[] => {
        const state = usePacifyStore.getState() as PacifyStore
        return state.userChatHistory[userId] || []
      },
      
      clearUserMessages: (userId: string) =>
        set((state) => ({
          userChatHistory: {
            ...state.userChatHistory,
            [userId]: []
          }
        })),
      
      // UI State Actions
      setLoading: (loading: boolean) => 
        set({ isLoading: loading }),
      
      setError: (error: ErrorState) => 
        set({ error }),
      
      clearError: () => 
        set({ error: { hasError: false } }),
      
      // Utility Actions
      reset: () => 
        set(initialState)
    }),
    {
      name: 'pacify-store',
      version: 2, // Bump version to trigger migration
      migrate: (persistedState: any, version: number) => {
        try {
          if (version < 2) {
            // Migrate childProfile from old format
            const migratedProfile = migrateChildProfile(persistedState?.childProfile)
            return {
              ...persistedState,
              childProfile: migratedProfile
            }
          }
          return persistedState
        } catch (error) {
          console.warn('Migration failed, resetting store:', error)
          return initialState
        }
      },
      partialize: (state) => ({
        childProfile: state.childProfile,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        messages: state.messages
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('Store rehydration failed:', error)
        }
      }
    }
  )
)

// Selectors for better performance
export const useChildProfile = () => usePacifyStore((state: PacifyStore) => state.childProfile)
export const useHasCompletedOnboarding = () => usePacifyStore((state: PacifyStore) => state.hasCompletedOnboarding)
export const useMessages = () => usePacifyStore((state: PacifyStore) => state.messages)
export const useIsLoading = () => usePacifyStore((state: PacifyStore) => state.isLoading)
export const useError = () => usePacifyStore((state: PacifyStore) => state.error) 