'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface PlaceholderViewProps {
  title: string
  description: string
  icon: string
  onBack: () => void
}

export function PlaceholderView({ title, description, icon, onBack }: PlaceholderViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{icon}</span>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Card className="p-12 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">{icon}</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  🚧 <strong>In Entwicklung:</strong> Diese Funktion wird bald verfügbar sein. 
                  Bleib dran für Updates!
                </p>
              </div>

              <Button onClick={onBack} className="mt-6">
                Zurück zum Menü
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}