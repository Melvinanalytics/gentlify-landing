'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { usePacifyStore, useChildProfile, useMessages, useIsLoading } from '@/lib/store'
import { NEED_BADGES, INTENT_BUTTONS, type ChatMessage, type AIResponse, type ChatRequest, type ChildProfile, type UserIntent } from '@/lib/types'
import { Send, ThumbsUp, ThumbsDown, Settings, Loader2, ArrowLeft } from 'lucide-react'

interface ChatInterfaceProps {
  onEditProfile: () => void
  onBack?: () => void
  user?: any // User from Supabase auth
}

export function ChatInterface({ onEditProfile, onBack, user }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const [selectedIntent, setSelectedIntent] = useState<UserIntent[]>([])
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
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
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
      
      const request: ChatRequest = {
        message: input.trim(),
        childProfile: normalizedProfile,
        userIntent: null // Always start with validation
      }
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Unbekannter Fehler')
      }
      
      const aiResponse: AIResponse = data.data
      
      // Create formatted AI message with proper timestamp
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: JSON.stringify(aiResponse),
        timestamp: new Date()
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

  const handleIntentSelection = async (intents: UserIntent[], originalMessage: string) => {
    if (!childProfile || isLoading) return
    
    setLoading(true)
    
    try {
      // Find the last user message to use as context
      const lastUserMessage = messages.filter((m: ChatMessage) => m.role === 'user').pop()
      const messageToUse = lastUserMessage?.content || originalMessage || "Fortsetzung der vorherigen Anfrage"
      
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
      
      // Make API calls for each selected intent
      for (const intent of intents) {
        const request: ChatRequest = {
          message: messageToUse,
          childProfile: normalizedProfile,
          userIntent: intent
        }
        
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Unbekannter Fehler')
        }
        
        const aiResponse: AIResponse = data.data
        
        // Create formatted AI message with proper timestamp
        const aiMessage: ChatMessage = {
          id: (Date.now() + Math.random()).toString(),
          role: 'assistant',
          content: JSON.stringify(aiResponse),
          timestamp: new Date()
        }
        
        addMessage(aiMessage)
      }
      
    } catch (error) {
      console.error('Intent selection error:', error)
      setError({
        hasError: true,
        message: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'
      })
    } finally {
      setLoading(false)
    }
  }
  
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
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
                    onIntentSelection={handleIntentSelection}
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
  onFeedback,
  onIntentSelection
}: { 
  message: ChatMessage
  onFeedback: (feedback: 'positive' | 'negative') => void
  onIntentSelection: (intents: UserIntent[], originalMessage: string) => void
}) {
  const [selectedIntents, setSelectedIntents] = useState<UserIntent[]>([])
  
  let aiResponse: AIResponse
  
  try {
    aiResponse = JSON.parse(message.content)
  } catch {
    return (
      <div className="flex justify-start">
        <Card className="max-w-[80%] p-4">
          <p className="text-red-600">Fehler beim Laden der Antwort</p>
        </Card>
      </div>
    )
  }

  const getResponseIcon = (responseType: string) => {
    switch (responseType) {
      case 'verstehen': return '🧠'
      case 'verstaendnis_fuer_mich': return '🤗'
      case 'verstehen_kind': return '👶'
      case 'loesung': return '💡'
      case 'validation': return '💝'
      default: return '💝'
    }
  }

  const getResponseTitle = (responseType: string) => {
    switch (responseType) {
      case 'verstehen': return 'Situation verstehen'
      case 'verstaendnis_fuer_mich': return 'Für dich da sein'
      case 'verstehen_kind': return 'Kind verstehen'
      case 'loesung': return 'Konkrete Lösung'
      case 'validation': return 'Verständnis'
      default: return 'Antwort'
    }
  }

  const handleIntentToggle = (intent: UserIntent) => {
    if (selectedIntents.includes(intent)) {
      setSelectedIntents(selectedIntents.filter(i => i !== intent))
    } else {
      setSelectedIntents([...selectedIntents, intent])
    }
  }

  const handleSubmitIntents = () => {
    if (selectedIntents.length > 0 && onIntentSelection) {
      onIntentSelection(selectedIntents, "")
      setSelectedIntents([]) // Reset selection after submitting
    }
  }
  
  return (
    <div className="flex justify-start">
      <Card className="max-w-[80%] p-6 space-y-4">
        {/* Response Type Header - only show for non-validation responses */}
        {aiResponse.responseType !== 'validation' && (
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-lg">{getResponseIcon(aiResponse.responseType)}</span>
            <h3 className="font-semibold text-gray-900">{getResponseTitle(aiResponse.responseType)}</h3>
          </div>
        )}

        {/* Mirror (only for loesung) */}
        {aiResponse?.content?.mirror && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-800 leading-relaxed font-medium">
              {aiResponse.content.mirror}
            </p>
          </div>
        )}
        
        {/* Core Content */}
        <div>
          <p className="text-gray-800 leading-relaxed">
            {aiResponse?.content?.core || 'Keine Antwort verfügbar'}
          </p>
        </div>

        {/* Hint (only for loesung) */}
        {aiResponse?.content?.hint && (
          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-amber-800 leading-relaxed text-sm">
              💡 <strong>Tipp:</strong> {aiResponse.content.hint}
            </p>
          </div>
        )}
        
        {/* Intent Selection (only when needsIntentSelection is true) */}
        {aiResponse.needsIntentSelection && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Was brauchst du jetzt?</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 mb-4">
              {Object.entries(INTENT_BUTTONS).map(([intent, config]) => (
                <Button
                  key={intent}
                  variant={selectedIntents.includes(intent as UserIntent) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleIntentToggle(intent as UserIntent)}
                  className={`flex items-center gap-2 text-xs h-auto py-3 px-3 transition-all duration-200 ${
                    selectedIntents.includes(intent as UserIntent)
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 ring-opacity-50'
                      : 'hover:bg-gray-50 hover:border-indigo-300'
                  }`}
                  data-testid={`intent-selection-${intent}`}
                >
                  <span className="text-sm">{config.icon}</span>
                  <span className="font-medium text-xs">{config.label}</span>
                </Button>
              ))}
            </div>
            {selectedIntents.length > 0 && (
              <div className="flex flex-col items-center gap-2 mb-3">
                <div className="text-xs text-gray-600">
                  {selectedIntents.length === 1 
                    ? '1 Bereich ausgewählt' 
                    : `${selectedIntents.length} Bereiche ausgewählt`}
                </div>
                <Button
                  onClick={handleSubmitIntents}
                  size="sm"
                  className="px-6 bg-indigo-600 hover:bg-indigo-700"
                >
                  <span className="mr-2">✨</span>
                  Antwort erhalten
                </Button>
              </div>
            )}
            <p className="text-xs text-gray-500 text-center">
              oder schreib es mir einfach in den Chat
            </p>
          </div>
        )}
        
        {/* Feedback */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {(() => {
              try {
                const date = message.timestamp instanceof Date 
                  ? message.timestamp 
                  : new Date(message.timestamp)
                return date.toLocaleTimeString('de-DE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })
              } catch (error) {
                console.warn('Error formatting timestamp:', error)
                return new Date().toLocaleTimeString('de-DE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })
              }
            })()}
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback('positive')}
              className={`h-8 px-2 ${
                message.feedback === 'positive' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-500 hover:text-green-600'
              }`}
              data-testid="feedback-positive"
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback('negative')}
              className={`h-8 px-2 ${
                message.feedback === 'negative' 
                  ? 'bg-red-100 text-red-700' 
                  : 'text-gray-500 hover:text-red-600'
              }`}
              data-testid="feedback-negative"
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>
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