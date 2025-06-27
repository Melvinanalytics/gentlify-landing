import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Phase2RequestSchema, EnhancedChatResponseSchema, type EnhancedChatResponse } from '@/lib/types'
import { 
  getEnhancedResponse, 
  getRelevantEvidenceFact, 
  getRelevantMicroInterventions,
  formatCitation,
  extractKeywords,
  type NeedCategory 
} from '@/lib/knowledge'

// Initialize OpenAI client with proper error handling
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey || apiKey === 'dummy-key-for-build') {
    return null
  }
  
  return new OpenAI({ apiKey })
}

// Role switching based on intent (Principle 9)
function getRolePrefix(intents: string[]): string {
  const primaryIntent = intents[0]
  
  switch (primaryIntent) {
    case 'verstehen':
      return 'Als Entwicklungspsychologe'
    case 'verstaendnis_fuer_mich':
      return 'Als Elterncoach'
    case 'verstehen_kind':
      return 'Als Kinderpsychologe'
    case 'loesung':
      return 'Als Erziehungsexperte'
    default:
      return 'Als Familienspezialist'
  }
}

// Adaptive temperature control (Principle 8)
function getTemperatureForContent(contentType: 'analysis' | 'creative' | 'solution'): number {
  switch (contentType) {
    case 'analysis':
      return 0.2
    case 'creative':
      return 0.8
    case 'solution':
      return 0.4
    default:
      return 0.4
  }
}

// Intelligent token allocation (Principle 12)
function calculateTokenAllocation(intents: string[], isMultiChild: boolean): number {
  let baseTokens = 300
  baseTokens += intents.length * 150 // +150 per intent complexity
  if (isMultiChild) baseTokens += 100 // +100 for multi-child families
  
  return Math.min(baseTokens, 2500) // Hard cap at 2500
}

// Contradiction check helper (Principle 10)
function checkForContradictions(response: string, ageFact: string): { hasContradiction: boolean; confidence: number } {
  // Simple contradiction detection - in production this would be more sophisticated
  const contradictionPatterns = [
    /kann.*nicht.*entwicklung/i,
    /zu.*jung.*verstehen/i,
    /bereits.*können.*sollte/i
  ]
  
  let hasContradiction = false
  for (const pattern of contradictionPatterns) {
    if (pattern.test(response) && !response.toLowerCase().includes(ageFact.toLowerCase())) {
      hasContradiction = true
      break
    }
  }
  
  // Simple confidence calculation
  const confidence = hasContradiction ? 0.6 : 0.9
  
  return { hasContradiction, confidence }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedRequest = Phase2RequestSchema.parse(body)
    
    const { message, childProfile, userIntents, conversationHistory, phase1Response } = validatedRequest
    
    // Check if OpenAI is available
    const openai = getOpenAIClient()
    
    if (!openai) {
      // Return mock response for development without API key
      const mockResponse: EnhancedChatResponse = {
        success: true,
        data: {
          phase2_expert: {
            situation: "Dein Kind zeigt typisches Verhalten für sein Alter und testet Grenzen.",
            complication: "Die Situation fühlt sich überwältigend an, weil du nicht weißt, wie du reagieren sollst.",
            answer: "Bleibe ruhig und setze liebevolle Grenzen. Sage klar 'Das geht nicht' und biete eine Alternative an.",
            embedded_need: ["Autonomie", "Sicherheit"],
            evidence_fact: "Präfrontaler Kortex entwickelt sich bis 25 - Impulskontrolle ist bei Kindern neurologisch unreif.",
            citation: "Steinberg (2013) ⧉",
            micro_interventions: [
              {
                name: "Ruhige Grenzensetzung",
                description: "Klare Grenzen ohne Machtkampf kommunizieren",
                duration: "30-60 Sekunden"
              }
            ]
          },
          responsePhase: 'phase2',
          metadata: {
            confidence: 0.85,
            tokens_used: 450,
            temperature_used: 0.4,
            role_prefix: "Als Erziehungsexperte"
          },
          rawResponse: "Mock Phase 2 response - OpenAI API key not configured"
        },
        responseTime: Date.now() - startTime
      }
      
      return NextResponse.json(mockResponse)
    }

    // Calculate age in months and get enhanced knowledge
    const ageInMonths = (childProfile.ageYears * 12) + childProfile.ageMonths
    const keywords = extractKeywords(message)
    const knowledgeData = getEnhancedResponse(message, ageInMonths, userIntents[0])
    
    // Role switching (Principle 9)
    const rolePrefix = getRolePrefix(userIntents)
    
    // Intelligent token allocation (Principle 12)
    const maxTokens = calculateTokenAllocation(userIntents, false) // TODO: detect multi-child
    
    // Create Phase 2 system prompt with SCQA framework (Principles 2, 4)
    const systemPrompt = `${rolePrefix} mit Expertise in bedürfnisorientierter Erziehung.

PHASE 2: EXPERTENANTWORT nach Intent-Auswahl
${phase1Response ? `Phase 1 Spiegelung war: "${phase1Response}"` : ''}

Kindprofil:
- Name: ${childProfile.name}
- Alter: ${childProfile.ageYears} Jahre${childProfile.ageMonths > 0 ? `, ${childProfile.ageMonths} Monate` : ''}
- Eigenschaften: ${childProfile.traits.join(', ')}

${knowledgeData.ageFact ? `Kontext: Kind ist ${ageInMonths} Monate alt. Relevante Entwicklungsfakten: ${knowledgeData.ageFact}` : ''}

Gewählte Intents: ${userIntents.join(', ')}

MANDATORY SCQA FRAMEWORK (Principle 2):
- Situation: Kontext (20% der Antwort)
- Complication: Kernproblem (20% der Antwort) 
- Answer: Lösung mit Mikro-Schritten (50% der Antwort)

EINZUBETTENDE INHALTE:
${knowledgeData.relevantNeeds.length > 0 ? `- Bedürfnisse: ${knowledgeData.relevantNeeds.map(n => n.name).join(', ')} (eingebettet in Fließtext)` : ''}
${knowledgeData.evidenceFact ? `- Wissenschaftsfakt: ${knowledgeData.evidenceFact.fact}` : ''}
${knowledgeData.microInterventions.length > 0 ? `- Mikro-Übungen: ${knowledgeData.microInterventions.map(i => i.name).join(', ')}` : ''}

WICHTIG: 
- Strukturiere nach SCQA aber als natürlichen Fließtext
- Integriere Bedürfnisse in den Text (nie als Liste)
- Füge 1 wissenschaftlichen Fakt im Kern ein
- Biete 1-2 konkrete Mikro-Übungen
- Keine Aufzählungen oder Listen
- Fokus auf gewählte Intents: ${userIntents.join(', ')}

Antworte IMMER in folgendem JSON-Format:
{
  "phase2_expert": {
    "situation": "Beschreibung der Situation und Kontext",
    "complication": "Das zugrundeliegende Problem", 
    "answer": "Konkrete Lösung mit Mikro-Schritten",
    "embedded_need": ["Bedürfnis1", "Bedürfnis2"],
    "evidence_fact": "Wissenschaftlicher Fakt (20-30 Wörter)",
    "citation": "Autor (Jahr) ⧉",
    "micro_interventions": [
      {
        "name": "Übungsname",
        "description": "Was genau tun",
        "duration": "Zeitangabe"
      }
    ]
  },
  "responsePhase": "phase2",
  "metadata": {
    "confidence": 0.9,
    "tokens_used": 0,
    "temperature_used": ${getTemperatureForContent('solution')},
    "role_prefix": "${rolePrefix}"
  }
}`

    // Add conversation history and semantic context (Principle 5)
    let contextPrompt = `Elternsituation: ${message}`
    
    if (conversationHistory && conversationHistory.length > 0) {
      const recentContext = conversationHistory
        .slice(-3) // Last 3 messages for context
        .map(h => `${h.role}: ${h.content}`)
        .join('\n')
      
      contextPrompt += `\n\nBisheriger Kontext: ${recentContext}`
    }

    // Call OpenAI API with adaptive temperature (Principle 8)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: contextPrompt }
      ],
      temperature: getTemperatureForContent('solution'),
      max_tokens: maxTokens,
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

    // Contradiction check (Principle 10)
    const fullResponseText = `${parsedResponse.phase2_expert?.situation} ${parsedResponse.phase2_expert?.complication} ${parsedResponse.phase2_expert?.answer}`
    const contradictionCheck = checkForContradictions(fullResponseText, knowledgeData.ageFact)

    // Enhanced response with metadata
    const enhancedResponse = {
      ...parsedResponse,
      rawResponse,
      metadata: {
        ...parsedResponse.metadata,
        confidence: contradictionCheck.confidence,
        tokens_used: completion.usage?.total_tokens || 0,
        age_fact_injected: knowledgeData.ageFact
      }
    }

    // Validate response structure
    const validatedResponse = EnhancedChatResponseSchema.parse({
      success: true,
      data: enhancedResponse,
      responseTime: Date.now() - startTime
    })
    
    return NextResponse.json(validatedResponse)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    console.error('Chat Phase 2 API Error:', error)
    
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

