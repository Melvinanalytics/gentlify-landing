import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Phase1RequestSchema, EnhancedChatResponseSchema, type EnhancedChatResponse } from '@/lib/types'
import { getAgeContextFact, extractKeywords } from '@/lib/knowledge'

// Initialize OpenAI client with proper error handling
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey || apiKey === 'dummy-key-for-build') {
    return null
  }
  
  return new OpenAI({ apiKey })
}

// Scope boundary check for Phase 1
function checkScope(message: string): { isInScope: boolean; referralType?: 'medical_referral' | 'legal_referral' | 'emergency_resources' } {
  const outOfScopePatterns = [
    // Medical patterns
    /(?:diagnose|krankheit|medizin|arzt|therapie|adhd|autismus|depression|medikament|symptom)/i,
    // Legal patterns  
    /(?:rechtsanwalt|gericht|sorgerecht|polizei|anzeige|illegal|legal|gesetz)/i,
    // Emergency patterns
    /(?:notfall|selbstmord|suizid|verletzung|missbrauch|gewalt|hilfe.*sofort)/i
  ]

  for (const pattern of outOfScopePatterns) {
    if (pattern.test(message)) {
      if (pattern.source.includes('diagnose|krankheit|medizin')) {
        return { isInScope: false, referralType: 'medical_referral' }
      } else if (pattern.source.includes('rechtsanwalt|gericht')) {
        return { isInScope: false, referralType: 'legal_referral' }
      } else if (pattern.source.includes('notfall|selbstmord')) {
        return { isInScope: false, referralType: 'emergency_resources' }
      }
    }
  }

  return { isInScope: true }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedRequest = Phase1RequestSchema.parse(body)
    
    const { message, childProfile, conversationHistory } = validatedRequest
    
    // Scope boundary enforcement (Principle 13)
    const scopeCheck = checkScope(message)
    if (!scopeCheck.isInScope) {
      const response: EnhancedChatResponse = {
        success: false,
        error: 'Diese Anfrage liegt außerhalb meines Beratungsbereichs',
        responseTime: Date.now() - startTime,
        scopeCheck
      }
      
      return NextResponse.json(response, { status: 400 })
    }

    // Check if OpenAI is available
    const openai = getOpenAIClient()
    
    if (!openai) {
      // Return mock response for development without API key
      const mockResponse: EnhancedChatResponse = {
        success: true,
        data: {
          phase1_mirror: "Es klingt, als wärst du gerade in einer herausfordernden Situation. Das ist völlig okay - du machst das großartig.",
          responsePhase: 'phase1',
          needsIntentSelection: true,
          metadata: {
            confidence: 0.85,
            tokens_used: 25,
            temperature_used: 0.6
          },
          rawResponse: "Mock Phase 1 response - OpenAI API key not configured"
        },
        responseTime: Date.now() - startTime,
        scopeCheck
      }
      
      return NextResponse.json(mockResponse)
    }

    // Calculate age in months for context injection (Principle 3)
    const ageInMonths = (childProfile.ageYears * 12) + childProfile.ageMonths
    const ageFact = getAgeContextFact(ageInMonths)

    // Extract keywords for context
    const keywords = extractKeywords(message)
    
    // Create Phase 1 system prompt (Emotional mirroring - Principle 1)
    const systemPrompt = `Du bist ein einfühlsamer Erziehungsberater mit Expertise in bedürfnisorientierter Erziehung.

PHASE 1: EMOTIONALE SPIEGELUNG
Aufgabe: Gib eine kurze emotionale Validierung und Ermutigung (MAX 150 Tokens).

Kindprofil:
- Name: ${childProfile.name}
- Alter: ${childProfile.ageYears} Jahre${childProfile.ageMonths > 0 ? `, ${childProfile.ageMonths} Monate` : ''}
- Eigenschaften: ${childProfile.traits.join(', ')}

${ageFact ? `Kontext: Kind ist ${ageInMonths} Monate alt. Relevante Entwicklungsfakten: ${ageFact}` : ''}

WICHTIG: 
- Nur emotionale Validierung, keine Lösungen
- Maximal 2-3 Sätze
- Warm, empathisch, ermutigend
- Bereite auf Intent-Auswahl vor

Antworte IMMER in folgendem JSON-Format:
{
  "phase1_mirror": "Kurze emotionale Spiegelung und Validierung",
  "responsePhase": "phase1", 
  "needsIntentSelection": true,
  "metadata": {
    "confidence": 0.9,
    "tokens_used": 45,
    "age_fact_injected": "${ageFact || ''}",
    "temperature_used": 0.6
  }
}`

    const userPrompt = `Elternsituation: ${message}`

    // Add conversation history context if available
    const historyContext = conversationHistory && conversationHistory.length > 0 
      ? `\nBisherige Gesprächshistorie: ${conversationHistory.slice(-3).map(h => `${h.role}: ${h.content}`).join('\n')}`
      : ''

    // Call OpenAI API with adaptive temperature (Principle 8)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt + historyContext }
      ],
      temperature: 0.6, // Higher temperature for emotional responses
      max_tokens: 200, // Conservative token limit for Phase 1
      response_format: { type: 'json_object' }
    })

    const rawResponse = completion.choices[0]?.message?.content
    
    if (!rawResponse) {
      throw new Error('Keine Antwort von OpenAI erhalten')
    }

    // Parse and validate AI response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(rawResponse)
    } catch {
      throw new Error('Ungültiges JSON-Format in der AI-Antwort')
    }

    // Add metadata and raw response
    const enhancedResponse = {
      ...parsedResponse,
      rawResponse,
      metadata: {
        ...parsedResponse.metadata,
        tokens_used: completion.usage?.total_tokens || 0
      }
    }

    // Validate response structure
    const validatedResponse = EnhancedChatResponseSchema.parse({
      success: true,
      data: enhancedResponse,
      responseTime: Date.now() - startTime,
      scopeCheck
    })
    
    return NextResponse.json(validatedResponse)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    console.error('Chat Phase 1 API Error:', error)
    
    let errorMessage = 'Ein unerwarteter Fehler ist aufgetreten'
    let errorCode = 'UNKNOWN_ERROR'
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'API-Konfigurationsfehler'
        errorCode = 'API_KEY_ERROR'
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Zu viele Anfragen. Bitte versuche es in einem Moment erneut.'
        errorCode = 'RATE_LIMIT_ERROR'
      } else if (error.message.includes('JSON')) {
        errorMessage = 'Fehler beim Verarbeiten der Antwort'
        errorCode = 'PARSING_ERROR'
      } else {
        errorMessage = error.message
      }
    }
    
    const errorResponse: EnhancedChatResponse = {
      success: false,
      error: errorMessage,
      responseTime
    }
    
    return NextResponse.json(errorResponse, { 
      status: errorCode === 'RATE_LIMIT_ERROR' ? 429 : 500 
    })
  }
}

