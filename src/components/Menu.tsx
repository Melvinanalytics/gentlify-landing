'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabaseClient'
import { 
  MessageCircle, 
  User, 
  Heart, 
  Calendar, 
  HelpCircle, 
  Settings, 
  LogOut,
  ArrowRight
} from 'lucide-react'

interface MenuProps {
  user: any
  onNavigate: (section: string) => void
}

interface MenuCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  onClick: () => void
}

export function Menu({ user, onNavigate }: MenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      // Parent component should handle the auth state change
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const menuCards: MenuCard[] = [
    {
      id: 'problem-solver',
      title: 'Problem Solver',
      description: 'Erhalte sofortige Hilfe bei herausfordernden Situationen',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      onClick: () => onNavigate('problem-solver')
    },
    {
      id: 'personalization',
      title: 'Personalisierung',
      description: 'Passe dein Kindprofil und Einstellungen an',
      icon: <User className="w-6 h-6" />,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      onClick: () => onNavigate('personalization')
    },
    {
      id: 'parenting-style',
      title: 'Erziehungsstil',
      description: 'Entdecke und entwickle deinen Erziehungsansatz',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
      onClick: () => onNavigate('parenting-style')
    },
    {
      id: 'daily-challenges',
      title: 'Tägliche Herausforderungen',
      description: 'Meistere alltägliche Erziehungssituationen',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      onClick: () => onNavigate('daily-challenges')
    },
    {
      id: 'communication-quiz',
      title: 'Kommunikations-Quiz',
      description: 'Teste und verbessere deine Kommunikationsfähigkeiten',
      icon: <HelpCircle className="w-6 h-6" />,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      onClick: () => onNavigate('communication-quiz')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-lg">💝</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Pacify</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('settings')}
              data-testid="settings-button"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-testid="logout-button"
            >
              {isLoggingOut ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Willkommen zurück! 👋
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wie kann ich dir heute bei der empathischen Erziehung helfen?
          </p>
        </motion.div>

        {/* Menu Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {menuCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-200 ${card.color}`}
                onClick={card.onClick}
                data-testid={`menu-card-${card.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-indigo-600">
                    {card.icon}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Schnellaktionen</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('problem-solver')}
              className="text-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Neue Situation besprechen
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('personalization')}
              className="text-sm"
            >
              <User className="w-4 h-4 mr-2" />
              Profil bearbeiten
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Entwickelt mit ❤️ für empathische Eltern</p>
        </div>
      </div>
    </div>
  )
}