'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabaseClient'
import { Mail, ArrowRight, Check } from 'lucide-react'

interface LoginProps {
  onSuccess?: () => void
}

export function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Bitte gib deine E-Mail-Adresse ein')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      setIsEmailSent(true)
      
      // Optional: trigger success callback after a delay
      if (onSuccess) {
        setTimeout(onSuccess, 2000)
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    setIsEmailSent(false)
    setEmail('')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Willkommen bei Pacify
            </h1>
            <p className="text-gray-600">
              Empathische Unterstützung für deine Erziehung
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isEmailSent ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-Mail-Adresse
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="deine@email.de"
                        className="pl-10"
                        disabled={isLoading}
                        data-testid="email-input"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="w-full"
                    data-testid="login-button"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Wird gesendet...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Magic Link senden
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Wir senden dir einen sicheren Anmeldelink per E-Mail
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="email-sent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    E-Mail gesendet!
                  </h3>
                  <p className="text-gray-600">
                    Wir haben dir einen Anmeldelink an
                  </p>
                  <p className="font-medium text-indigo-600">
                    {email}
                  </p>
                  <p className="text-sm text-gray-500">
                    gesendet. Prüfe dein Postfach und klicke auf den Link.
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleBackToLogin}
                    className="w-full"
                    data-testid="back-to-login-button"
                  >
                    Andere E-Mail verwenden
                  </Button>
                  
                  <p className="text-xs text-gray-500">
                    Keine E-Mail erhalten? Prüfe deinen Spam-Ordner
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Mit der Anmeldung stimmst du unseren Nutzungsbedingungen zu
          </p>
        </div>
      </motion.div>
    </div>
  )
}