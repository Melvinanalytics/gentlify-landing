import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ChatRequestSchema, AIResponseSchema, type ChatResponse } from '@/lib/types'

/**
 * Creates OpenAI client instance with environment-based configuration
 * Returns null in development when API key is not configured
 */
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey || apiKey === 'dummy-key-for-build') {
    return null
  }
  
  return new OpenAI({ apiKey })
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await request.json()
    const validatedRequest = ChatRequestSchema.parse(body)
    
    const { message, childProfile, userIntent } = validatedRequest
    
    const openai = getOpenAIClient()
    
    if (!openai) {
      // Development mode: return structured mock responses for testing
      const mockResponse = !userIntent ? {
        responseType: 'validation',
        content: {
          core: "Es klingt, als wärst du gerade in einer herausfordernden Situation. Das ist völlig okay - du machst das großartig."
        },
        needsIntentSelection: true,
        rawResponse: "Mock validation response - OpenAI API key not configured"
      } : {
        responseType: userIntent,
        content: {
          mirror: userIntent === 'loesung' ? "Es klingt, als wärst du gerade in einer herausfordernden Situation." : undefined,
          core: userIntent === 'verstehen' 
            ? "Dein Kind befindet sich wahrscheinlich in einem emotionalen Überflutungszustand. Das Gehirn ist noch nicht vollständig entwickelt, um starke Gefühle zu regulieren."
            : userIntent === 'verstaendnis_fuer_mich'
            ? "Es ist völlig normal, dass du dich überfordert fühlst. Du machst das großartig, auch wenn es sich nicht so anfühlt."
            : userIntent === 'verstehen_kind'
            ? "Aus der Sicht deines Kindes fühlt sich die Welt gerade groß und unkontrollierbar an. Es versucht, seine Gefühle zu kommunizieren."
            : "Du könntest z. B. sagen: 'Ich sehe, dass du gerade traurig bist, weil ich Nein gesagt habe.'",
          hint: userIntent === 'loesung' ? "Bleib ruhig, auch wenn dein Kind laut wird. Dein sicherer Rahmen hilft ihm beim Runterkommen." : undefined
        },
        needsIntentSelection: false,
        rawResponse: "Mock response - OpenAI API key not configured"
      }
      
      const responseTime = Date.now() - startTime
      
      // Validate mock response structure
      const validatedMockResponse = AIResponseSchema.parse(mockResponse)
      
      const response: ChatResponse = {
        success: true,
        data: validatedMockResponse,
        responseTime
      }
      
      return NextResponse.json(response)
    }
    
    // Create context-sensitive prompt based on user intent
    const getSystemPrompt = (intent: string | null, childProfile: any) => {
      const childTraitsContext = childProfile.traits.length > 0 
        ? `\nBerücksichtige diese Eigenschaften des Kindes in deiner Antwort: ${childProfile.traits.join(', ')}.`
        : '';

      const baseContext = `Du bist ein einfühlsamer Erziehungsberater mit Expertise in bedürfnisorientierter Erziehung.

Kindprofil:
- Name: ${childProfile.name}
- Alter: ${childProfile.ageYears} Jahre${childProfile.ageMonths > 0 ? `, ${childProfile.ageMonths} Monate` : ''}
- Eigenschaften: ${childProfile.traits.join(', ')}${childTraitsContext}`;

      // If no intent is provided, this is the initial validation step
      if (!intent) {
        return baseContext + `

AUFGABE: Gib eine kurze emotionale Validierung (max. 2 Sätze).

WICHTIG: Antworte IMMER in folgendem JSON-Format:
{
  "responseType": "validation",
  "content": {
    "core": "Kurze emotionale Validierung und Ermutigung"
  },
  "needsIntentSelection": true
}

Beispiel: "Es klingt, als wärst du gerade in einer herausfordernden Situation. Das ist völlig okay - du machst das großartig."`;
      }

      // Intent-based responses
      const intentPrompt = baseContext + `

WICHTIG: Antworte IMMER in folgendem JSON-Format:
{
  "responseType": "${intent}",
  "content": {
    "mirror": "optional: nur bei 'loesung'",
    "core": "Hauptinhalt der Antwort",
    "hint": "optional: nur bei 'loesung'"
  },
  "needsIntentSelection": false
}`;

      switch (intent) {
        case 'verstehen':
          return intentPrompt + `

AUFGABE: Erkläre ruhig und empathisch, was psychologisch im Kind passiert.
- Fokus auf Entwicklungspsychologie, Bedürfnisse, Regulation
- Berücksichtige die Eigenschaften des Kindes: ${childProfile.traits.join(', ')}
- Keine Lösungen geben, nur Verständnis vermitteln
- Wissenschaftlich fundiert aber verständlich`;

        case 'verstaendnis_fuer_mich':
          return intentPrompt + `

AUFGABE: Validiere die Emotionen des Elternteils und stärke Selbstmitgefühl.
- Richte die Antwort komplett auf den Elternteil
- Validiere Überforderung, Stress, Unsicherheit
- Stärke das Vertrauen in die eigenen Fähigkeiten
- Keine Ratschläge fürs Kind, nur Unterstützung für den Elternteil`;

        case 'verstehen_kind':
          return intentPrompt + `

AUFGABE: Zeige empathisch die Kinderperspektive auf, ohne zu werten.
- Beschreibe wie das Kind die Situation erlebt
- Berücksichtige die Eigenschaften: ${childProfile.traits.join(', ')}
- Verwende "Vielleicht fühlt sich ${childProfile.name}..." 
- Keine Lösungen, nur Perspektivwechsel
- Altersgerecht und einfühlsam`;

        case 'loesung':
          return intentPrompt + `

AUFGABE: Gib eine strukturierte Lösung mit:
1. "mirror": Kurze emotionale Spiegelung (1 Satz)
2. "core": Konkreter Formulierungsvorschlag, den der Elternteil direkt sagen kann (max. 2 Sätze)
3. "hint": 1-2 ergänzende Kommunikationshinweise

Berücksichtige die Eigenschaften des Kindes: ${childProfile.traits.join(', ')}`;

        default:
          return intentPrompt;
      }
    };

    const systemPrompt = getSystemPrompt(userIntent, childProfile);

    const userPrompt = `Situation: ${message}`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
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

    // Add rawResponse for debugging
    const aiResponse = {
      ...parsedResponse,
      rawResponse
    }

    // Validate response structure
    const validatedResponse = AIResponseSchema.parse(aiResponse)
    
    const responseTime = Date.now() - startTime
    
    const response: ChatResponse = {
      success: true,
      data: validatedResponse,
      responseTime
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    console.error('Chat API Error:', error)
    
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
    
    const errorResponse: ChatResponse = {
      success: false,
      error: errorMessage,
      responseTime
    }
    
    return NextResponse.json(errorResponse, { 
      status: errorCode === 'RATE_LIMIT_ERROR' ? 429 : 500 
    })
  }
} 