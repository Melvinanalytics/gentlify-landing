'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { NewsletterSignup, NewsletterResponse } from '@/lib/types'

interface NewsletterSignupProps {
  variant?: 'default' | 'inline' | 'hero'
  source?: string
  className?: string
}

export function NewsletterSignup({ 
  variant = 'default', 
  source = 'landing_page',
  className = '' 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Bitte gib deine E-Mail-Adresse ein')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const signupData: NewsletterSignup = {
        email: email.trim(),
        name: name.trim() || undefined,
        source
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })

      const result: NewsletterResponse = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setEmail('')
        setName('')
        setMessage(result.message)
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  // Hero Variant - Large, prominent
  if (variant === 'hero') {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSuccess}
              className="h-12 text-lg"
            />
            <Input
              type="text"
              placeholder="Dein Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading || isSuccess}
              className="h-12"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading || isSuccess}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            {isLoading ? 'Wird angemeldet...' : isSuccess ? '✅ Angemeldet!' : 'Newsletter abonnieren'}
          </Button>
        </form>
        
        {message && (
          <p className={`mt-3 text-sm text-center ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  // Inline Variant - Horizontal layout
  if (variant === 'inline') {
    return (
      <div className={`w-full ${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSuccess}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || isSuccess}
          >
            {isLoading ? '...' : isSuccess ? '✅' : 'Abonnieren'}
          </Button>
        </form>
        
        {message && (
          <p className={`mt-2 text-xs ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  // Default Variant - Card layout
  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Newsletter</CardTitle>
        <CardDescription>
          Bleib auf dem Laufenden über neue Features und Erziehungstipps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSuccess}
          />
          <Input
            type="text"
            placeholder="Dein Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading || isSuccess}
          />
          <Button 
            type="submit" 
            disabled={isLoading || isSuccess}
            className="w-full"
          >
            {isLoading ? 'Wird angemeldet...' : isSuccess ? '✅ Angemeldet!' : 'Abonnieren'}
          </Button>
        </form>
        
        {message && (
          <p className={`mt-3 text-sm text-center ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}