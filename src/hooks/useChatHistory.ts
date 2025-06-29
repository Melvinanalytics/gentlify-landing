'use client'

import { useState, useEffect } from 'react'
import { ChatMessage } from '@/lib/types'

export interface ChatSession {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messages: ChatMessage[]
}

export function useChatHistory() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  // Load chat history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('gentlify_chat_history')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setChatSessions(parsed.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt)
        })))
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }
  }, [])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('gentlify_chat_history', JSON.stringify(chatSessions))
    }
  }, [chatSessions])

  const generateTitle = (messages: ChatMessage[]): string => {
    const firstUserMessage = messages.find(msg => msg.role === 'user')?.content
    if (!firstUserMessage) return 'Neue Unterhaltung'
    
    // Create a concise title from the first user message
    const words = firstUserMessage.split(' ').slice(0, 6)
    return words.join(' ') + (words.length < firstUserMessage.split(' ').length ? '...' : '')
  }

  const createNewSession = (): string => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: 'Neue Unterhaltung',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: []
    }
    setChatSessions(prev => [newSession, ...prev])
    setCurrentSessionId(newSession.id)
    return newSession.id
  }

  const updateSession = (sessionId: string, messages: ChatMessage[]) => {
    setChatSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const title = messages.length > 0 ? generateTitle(messages) : 'Neue Unterhaltung'
        return {
          ...session,
          title,
          messages,
          updatedAt: new Date()
        }
      }
      return session
    }))
  }

  const deleteSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId))
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null)
    }
  }

  const getCurrentSession = (): ChatSession | null => {
    return chatSessions.find(session => session.id === currentSessionId) || null
  }

  const switchToSession = (sessionId: string) => {
    setCurrentSessionId(sessionId)
  }

  return {
    chatSessions,
    currentSessionId,
    getCurrentSession,
    createNewSession,
    updateSession,
    deleteSession,
    switchToSession
  }
}