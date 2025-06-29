import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { NewsletterSignupSchema, type NewsletterResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = NewsletterSignupSchema.parse(body)
    
    const { email, name, source } = validatedData
    
    // Check if we're in development mode with dummy credentials
    const isDevelopment = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('dummy')
    
    if (isDevelopment) {
      // In development: simulate successful signup without DB check
      const mockResponse: NewsletterResponse = {
        success: true,
        message: 'Vielen Dank! Du wurdest erfolgreich für den Newsletter angemeldet. (Development Mode)',
        data: {
          id: `dev-${Date.now()}`,
          email,
          created_at: new Date().toISOString()
        }
      }
      return NextResponse.json(mockResponse)
    }
    
    // Production: Check if email already exists
    const { data: existingSignup, error: checkError } = await supabase
      .from('newsletter_signups')
      .select('email')
      .eq('email', email)
      .maybeSingle() // Use maybeSingle() instead of single() to handle no results gracefully
    
    if (checkError) {
      console.error('Newsletter check error:', checkError)
      throw new Error('Fehler beim Überprüfen der E-Mail-Adresse')
    }
    
    if (existingSignup) {
      const response: NewsletterResponse = {
        success: false,
        message: 'Diese E-Mail-Adresse ist bereits für den Newsletter angemeldet.'
      }
      return NextResponse.json(response, { status: 409 })
    }
    
    // Insert new newsletter signup (only in production)
    const { data, error } = await supabase
      .from('newsletter_signups')
      .insert([
        {
          email,
          name: name || null,
          source: source || 'landing_page',
          confirmed: false
        }
      ])
      .select('id, email, created_at')
      .single()
    
    if (error) {
      console.error('Newsletter signup error:', error)
      throw new Error('Fehler beim Speichern der Newsletter-Anmeldung')
    }
    
    const responseTime = Date.now() - startTime
    
    const response: NewsletterResponse = {
      success: true,
      message: 'Vielen Dank! Du wurdest erfolgreich für den Newsletter angemeldet.',
      data: {
        id: data.id,
        email: data.email,
        created_at: data.created_at
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    console.error('Newsletter API Error:', error)
    
    let errorMessage = 'Ein unerwarteter Fehler ist aufgetreten'
    
    if (error instanceof Error) {
      if (error.message.includes('email')) {
        errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein'
      } else if (error.message.includes('network')) {
        errorMessage = 'Netzwerkfehler. Bitte versuche es erneut.'
      } else {
        errorMessage = error.message
      }
    }
    
    const errorResponse: NewsletterResponse = {
      success: false,
      message: errorMessage
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// Optional: GET endpoint to check subscription status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  if (!email) {
    return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
  }
  
  try {
    const { data, error } = await supabase
      .from('newsletter_signups')
      .select('email, confirmed, created_at')
      .eq('email', email)
      .single()
    
    if (error && error.code === 'PGRST116') {
      return NextResponse.json({ subscribed: false })
    }
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      subscribed: true,
      confirmed: data.confirmed,
      created_at: data.created_at
    })
    
  } catch (error) {
    console.error('Newsletter check error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}