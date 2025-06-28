'use client'

import { useDevAuth } from '@/hooks/useDevAuth'

export function DevModeBanner() {
  const { isDevMode } = useDevAuth()
  
  if (!isDevMode) return null
  
  return (
    <div className="fixed top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs rounded-md z-50 shadow-sm">
      <span className="font-medium">🚧 DEV</span>
    </div>
  )
}