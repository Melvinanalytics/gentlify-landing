'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
// ScrollArea component replaced with overflow-auto
import { Card } from '@/components/ui/card'
import { Plus, MessageSquare, Trash2, Settings } from 'lucide-react'
import { ChatSession } from '@/hooks/useChatHistory'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatSidebarProps {
  chatSessions: ChatSession[]
  currentSessionId: string | null
  onNewChat: () => void
  onSelectChat: (sessionId: string) => void
  onDeleteChat: (sessionId: string) => void
  onEditProfile: () => void
}

export function ChatSidebar({
  chatSessions,
  currentSessionId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onEditProfile
}: ChatSidebarProps) {
  const [hoverSessionId, setHoverSessionId] = useState<string | null>(null)

  const formatDate = (date: Date): string => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return 'Heute'
    } else if (diffInHours < 48) {
      return 'Gestern'
    } else {
      return date.toLocaleDateString('de-DE', { 
        day: '2-digit', 
        month: '2-digit' 
      })
    }
  }

  const groupSessionsByDate = (sessions: ChatSession[]) => {
    const groups = new Map<string, ChatSession[]>()
    
    sessions.forEach(session => {
      const dateKey = formatDate(session.updatedAt)
      if (!groups.has(dateKey)) {
        groups.set(dateKey, [])
      }
      groups.get(dateKey)!.push(session)
    })
    
    return Array.from(groups.entries())
  }

  const groupedSessions = groupSessionsByDate(chatSessions)

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Neue Unterhaltung
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {groupedSessions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Noch keine Unterhaltungen</p>
              <p className="text-sm">Starte dein erstes Gespräch!</p>
            </div>
          ) : (
            groupedSessions.map(([dateGroup, sessions]) => (
              <div key={dateGroup} className="mb-4">
                <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                  {dateGroup}
                </div>
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative group"
                      onMouseEnter={() => setHoverSessionId(session.id)}
                      onMouseLeave={() => setHoverSessionId(null)}
                    >
                      <Card
                        className={`p-3 cursor-pointer transition-all duration-200 ${
                          currentSessionId === session.id
                            ? 'bg-blue-50 border-blue-300'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => onSelectChat(session.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-medium truncate ${
                              currentSessionId === session.id 
                                ? 'text-blue-900' 
                                : 'text-gray-900'
                            }`}>
                              {session.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {session.messages.length} Nachrichten
                            </p>
                          </div>
                          
                          <AnimatePresence>
                            {hoverSessionId === session.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onDeleteChat(session.id)
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          onClick={onEditProfile}
          variant="ghost" 
          className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
        >
          <Settings className="h-4 w-4" />
          Profil bearbeiten
        </Button>
      </div>
    </div>
  )
}