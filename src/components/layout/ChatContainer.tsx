'use client'

import { useState, useEffect } from 'react'
import { ChatSidebar } from './ChatSidebar'
import { ChatInterface } from './ChatInterface'
import { useChatHistory } from '@/hooks/useChatHistory'
import { usePacifyStore } from '@/lib/store'

interface ChatContainerProps {
  onEditProfile: () => void
  onBack?: () => void
  user?: any
}

export function ChatContainer({ onEditProfile, onBack, user }: ChatContainerProps) {
  const {
    chatSessions,
    currentSessionId,
    getCurrentSession,
    createNewSession,
    updateSession,
    deleteSession,
    switchToSession
  } = useChatHistory()
  
  const { messages, clearMessages, loadMessages } = usePacifyStore()

  // Initialize with first session or create new one
  useEffect(() => {
    if (!currentSessionId) {
      if (chatSessions.length > 0) {
        switchToSession(chatSessions[0].id)
      } else {
        createNewSession()
      }
    }
  }, [currentSessionId, chatSessions.length])

  // Load messages when session changes
  useEffect(() => {
    const currentSession = getCurrentSession()
    if (currentSession) {
      loadMessages(currentSession.messages)
    } else {
      clearMessages()
    }
  }, [currentSessionId])

  // Update session when messages change
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      updateSession(currentSessionId, messages)
    }
  }, [messages, currentSessionId])

  const handleNewChat = () => {
    createNewSession()
  }

  const handleSelectChat = (sessionId: string) => {
    switchToSession(sessionId)
  }

  const handleDeleteChat = (sessionId: string) => {
    deleteSession(sessionId)
    // If we deleted the current session, create a new one
    if (sessionId === currentSessionId) {
      createNewSession()
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar
        chatSessions={chatSessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onEditProfile={onEditProfile}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatInterface
          onEditProfile={onEditProfile}
          onBack={onBack}
          user={user}
          isInSidebar={true}
        />
      </div>
    </div>
  )
}