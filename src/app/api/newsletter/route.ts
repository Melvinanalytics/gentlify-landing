import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'
import { NewsletterSignupSchema, type NewsletterResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = NewsletterSignupSchema.parse(body)
    
    const { email, name, source } = validatedData
    
    // Create Supabase client with service role for newsletter (bypasses RLS)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('dummy')) {
      // Mock mode for development
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
    
    // Create typed Supabase client
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)
    
    // Production: Check if email already exists
    try {
      const { data: existingSignup, error: checkError } = await supabase
        .from('newsletter_signups')
        .select('email')
        .eq('email', email)
        .maybeSingle() // Use maybeSingle() instead of single() to handle no results gracefully
      
      if (checkError) {
        console.error('Newsletter check error details:', {
          error: checkError,
          code: checkError.code,
          message: checkError.message,
          details: checkError.details,
          hint: checkError.hint
        })
        
        // If it's not a "no rows" error, throw
        if (checkError.code !== 'PGRST116') {
          throw new Error(`Datenbank-Fehler: ${checkError.message}`)
        }
      }
      
      if (existingSignup) {
        const response: NewsletterResponse = {
          success: false,
          message: 'Diese E-Mail-Adresse ist bereits für den Newsletter angemeldet.'
        }
        return NextResponse.json(response, { status: 409 })
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      throw new Error('Verbindungsfehler zur Datenbank. Bitte später erneut versuchen.')
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
      
      // Check if it's a table not found error
      if (error.code === '42P01') {
        throw new Error('Newsletter-Tabelle nicht gefunden. Bitte Datenbank-Setup prüfen.')
      }
      
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        throw new Error('Diese E-Mail-Adresse ist bereits angemeldet.')
      }
      
      throw new Error('Fehler beim Speichern: ' + error.message)
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