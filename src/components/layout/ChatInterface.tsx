'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { usePacifyStore, useChildProfile, useMessages, useIsLoading } from '@/lib/store'
import { type ChatMessage, type ChildProfile } from '@/lib/types'
import { Send, ThumbsUp, ThumbsDown, Settings, Loader2, ArrowLeft } from 'lucide-react'

interface ChatInterfaceProps {
  onEditProfile: () => void
  onBack?: () => void
  user?: any // User from Supabase auth
  isInSidebar?: boolean // New prop to indicate if used within sidebar layout
}

export function ChatInterface({ onEditProfile, onBack, user, isInSidebar = false }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  // Simplified state - no more dual-phase logic needed
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const childProfile = useChildProfile()
  const messages = useMessages()
  const isLoading = useIsLoading()
  const { addMessage, setLoading, setError, updateMessageFeedback } = usePacifyStore()
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return
    
    // Create default profile if none exists
    const activeProfile = childProfile || {
      name: 'Mein Kind',
      ageYears: 4,
      ageMonths: 0,
      traits: [],
      createdAt: new Date().toISOString()
    }
    
    const userMessageContent = input.trim()
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageContent,
      timestamp: new Date()
    }
    
    addMessage(userMessage)
    setInput('')
    setLoading(true)
    
    try {
      // Ensure profile has the correct structure for API compatibility
      const normalizedProfile: ChildProfile = {
        name: activeProfile.name,
        ageYears: activeProfile.ageYears || (activeProfile as any).age || 4,
        ageMonths: activeProfile.ageMonths || 0,
        traits: activeProfile.traits,
        createdAt: typeof activeProfile.createdAt === 'string' 
          ? activeProfile.createdAt 
          : new Date().toISOString()
      }
      
      // Prepare conversation history for context
      const conversationHistory = messages
        .slice(-6) // Last 6 messages for context
        .map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        }))
      
      // UNIFIED: Single comprehensive response
      const chatRequest = {
        message: userMessageContent,
        childProfile: normalizedProfile,
        conversationHistory
      }
      
      const response = await fetch('/api/chat-unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatRequest)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (!data.content) {
        throw new Error('Keine Antwort vom Server erhalten')
      }
      
      // Create simple AI message with unified response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        metadata: data.metadata
      }
      
      addMessage(aiMessage)
      
    } catch (error) {
      console.error('Chat error:', error)
      setError({
        hasError: true,
        message: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'
      })
    } finally {
      setLoading(false)
    }
  }
  
  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    updateMessageFeedback(messageId, feedback)
  }

  // Intent selection removed - now using unified response
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }
  
  useEffect(() => {
    adjustTextareaHeight()
  }, [input])
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header - only show when NOT in sidebar */}
      {!isInSidebar && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-lg">👶</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">
                {childProfile?.name}, {childProfile?.ageYears} Jahre {childProfile?.ageMonths ? `${childProfile.ageMonths} Monate` : ''}
              </h1>
              <p className="text-sm text-gray-600">
                {childProfile?.traits.join(' • ')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {process.env.NODE_ENV === 'development' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('pacify-store')
                  window.location.reload()
                }}
                className="text-xs"
              >
                Reset Store
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditProfile}
              data-testid="edit-profile-button"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Simple header for sidebar mode */}
      {isInSidebar && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-sm">👶</span>
            </div>
            <div>
              <h1 className="font-medium text-gray-900 text-sm">
                Chat mit {childProfile?.name || 'deinem Kind'}
              </h1>
            </div>
          </div>
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message: ChatMessage) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {message.role === 'user' ? (
                  <UserMessage message={message} />
                ) : (
                  <AIMessage 
                    message={message} 
                    onFeedback={(feedback) => handleFeedback(message.id, feedback)}
                  />
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
        
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-4">
        {/* Message Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Erzähl mir von einer herausfordernden Situation mit deinem Kind..."
              className="min-h-[44px] max-h-[120px] resize-none"
              disabled={isLoading}
              data-testid="message-input"
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-11 px-4"
            data-testid="send-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">💝</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Ich bin für dich da
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto">
        Erzähl mir von einer herausfordernden Situation mit deinem Kind. 
        Ich helfe dir mit empathischen und bedürfnisorientierten Lösungen.
      </p>
    </motion.div>
  )
}

function UserMessage({ message }: { message: ChatMessage }) {
  const formatTime = (timestamp: Date | string) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex justify-end">
      <Card className="max-w-[80%] bg-indigo-600 text-white p-4">
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className="text-xs text-indigo-200 mt-2">
          {formatTime(message.timestamp)}
        </p>
      </Card>
    </div>
  )
}

function AIMessage({ 
  message, 
  onFeedback
}: { 
  message: ChatMessage
  onFeedback: (feedback: 'positive' | 'negative') => void
}) {
  const formatTime = (timestamp: Date | string) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex justify-start">
      <Card className="max-w-[85%] p-6 space-y-4">
        {/* AI Avatar */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Gentlify Coach</h4>
            <p className="text-xs text-gray-500">{formatTime(message.timestamp)}</p>
          </div>
        </div>

        {/* Response Content */}
        <div className="prose prose-sm max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        {/* Metadata (optional) */}
        {message.metadata && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            {message.metadata.intents_detected && (
              <span>Erkannte Bedürfnisse: {message.metadata.intents_detected.join(', ')}</span>
            )}
          </div>
        )}

        {/* Feedback Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFeedback('positive')}
            className="h-8 px-3"
          >
            <ThumbsUp className="w-3 h-3 mr-1" />
            Hilfreich
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFeedback('negative')}
            className="h-8 px-3"
          >
            <ThumbsDown className="w-3 h-3 mr-1" />
            Nicht hilfreich
          </Button>
        </div>
      </Card>
    </div>
  )
}

function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <Card className="p-4 flex items-center space-x-3">
        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        <span className="text-gray-600">Ich denke nach...</span>
      </Card>
    </motion.div>
  )
} 