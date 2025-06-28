'use client'

import { useDevAuth } from '@/hooks/useDevAuth'

export function DevModeBanner() {
  const { isDevMode } = useDevAuth()
  
  if (!isDevMode) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black px-4 py-2 text-center z-50">
      <div className="flex items-center justify-center gap-2">
        <span className="font-semibold">🚧 Development Mode</span>
        <span className="text-sm opacity-75">Auth disabled for rapid prototyping</span>
      </div>
    </div>
  )
}