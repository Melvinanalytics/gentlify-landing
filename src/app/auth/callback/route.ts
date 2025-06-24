import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(new URL('/auth/error', request.url))
      }
      
      // Successful authentication, redirect to main app
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/auth/error', request.url))
    }
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL('/', request.url))
}