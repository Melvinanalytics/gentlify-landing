import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ChatRequestSchema, type ChatMessage, type ChildProfile, type UserIntent } from '@/lib/types'
import { getAgeContextFact, extractKeywords, getEvidenceFact, getRandomMicroIntervention, mapPsychologicalNeeds } from '@/lib/knowledge'

// Initialize OpenAI client with proper error handling
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey || apiKey === 'dummy-key-for-build') {
    return null
  }
  
  return new OpenAI({ apiKey })
}

// Scope boundary check
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
      }
      if (pattern.source.includes('rechtsanwalt|gericht')) {
        return { isInScope: false, referralType: 'legal_referral' }
      }
      if (pattern.source.includes('notfall|selbstmord')) {
        return { isInScope: false, referralType: 'emergency_resources' }
      }
    }
  }

  return { isInScope: true }
}

// Automatically detect user intent from message
function detectUserIntent(message: string): UserIntent[] {
  const intentPatterns = {
    verstehen: /(?:versteh|begreif|nachvollzieh|warum|entwicklung|phase|verhalten)/i,
    verstaendnis_fuer_mich: /(?:frustriert|müde|überfordert|stress|ich.*kann.*nicht|hilf.*mir|erschöpft|allein)/i,
    verstehen_kind: /(?:kind.*fühl|kind.*denk|kind.*sicht|perspektiv.*kind|kind.*erlebt)/i,
    loesung: /(?:was.*tun|wie.*kann|lösung|strategie|tipp|hilf|schaff|mach|konkret)/i
  }

  const detectedIntents: UserIntent[] = []
  
  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    if (pattern.test(message)) {
      detectedIntents.push(intent as UserIntent)
    }
  }

  // Default fallback if no specific intent detected
  if (detectedIntents.length === 0) {
    detectedIntents.push('loesung') // Default to solution-oriented
  }

  return detectedIntents
}

// Get appropriate temperature based on detected intents
function getAdaptiveTemperature(intents: UserIntent[]): number {
  if (intents.includes('verstaendnis_fuer_mich')) return 0.7 // More empathetic
  if (intents.includes('verstehen_kind')) return 0.6 // Balanced understanding
  if (intents.includes('loesung')) return 0.4 // More structured solutions
  return 0.5 // Default balanced
}

// Get token limit based on intent complexity - INCREASED for longer responses
function getTokenLimit(intents: UserIntent[], childProfile: ChildProfile): number {
  const baseTokens = 800  // Increased from 400
  const intentMultiplier = intents.length * 300  // Increased from 200
  const profileComplexity = childProfile.traits.length * 100  // Increased from 50
  
  return Math.min(3000, baseTokens + intentMultiplier + profileComplexity)  // Increased max from 1500 to 3000
}

export async function POST(req: NextRequest) {
  try {
    const client = getOpenAIClient()
    
    // Mock response for development/build - ENHANCED
    if (!client) {
      return NextResponse.json({
        content: "💡 **Entwicklungsnotiz**: Das ist eine Mock-Antwort, da keine OpenAI-API-Key konfiguriert ist.\n\n**Emotionale Validierung:**\nIch verstehe deine Situation wirklich gut, und ich kann förmlich spüren, wie herausfordernd das für dich als Elternteil sein muss. Es ist völlig normal, dass du dir Sorgen machst und nach Lösungen suchst. Du zeigst bereits so viel Liebe und Fürsorge, indem du dir Gedanken machst und Hilfe suchst.\n\n**Fachliche Einordnung:**\nAus entwicklungspsychologischer Sicht ist das Verhalten, das du beschreibst, oft ein natürlicher Teil der kindlichen Entwicklung. Kinder testen in verschiedenen Phasen ihre Grenzen und erkunden, wie die Welt um sie herum funktioniert. Dies ist ein wichtiger Prozess, durch den sie lernen, sich selbst zu regulieren und soziale Normen zu verstehen. Je nach Alter deines Kindes können verschiedene Entwicklungssprünge dazu beitragen, dass sich Verhalten temporär intensiviert.\n\n**Konkrete Lösungsschritte:**\n1. **Beobachtungsphase (3-5 Tage)**: Dokumentiere genau, wann das Verhalten auftritt, was davor passiert und wie dein Kind reagiert. Dies hilft dir, Muster zu erkennen.\n2. **Ruhige Gespräche führen**: Wähle einen entspannten Moment und frage dein Kind offen, wie es sich fühlt. Oft stecken unerfüllte Bedürfnisse dahinter.\n3. **Klare, liebevolle Grenzen setzen**: Erkläre ruhig aber bestimmt, welches Verhalten okay ist und welches nicht, immer mit einer Alternative.\n4. **Positive Verstärkung**: Achte bewusst darauf, erwünschtes Verhalten zu bemerken und zu loben.\n5. **Vorhersagbare Routinen schaffen**: Kinder fühlen sich sicherer, wenn sie wissen, was als nächstes kommt.\n6. **Selbstfürsorge**: Sorge auch für dich selbst, denn nur entspannte Eltern können gelassen reagieren.\n\n**Zusätzliche Perspektive:**\nManchmal hilft es auch, das Verhalten aus der Sicht des Kindes zu betrachten. Was könnte es versuchen zu kommunizieren? Oft sind scheinbar 'schwierige' Verhaltensweisen eigentlich Hilfeschreie oder Ausdruck unerfüllter Bedürfnisse.\n\n**Wissenschaftlicher Hintergrund:**\nStudien zeigen, dass Kinder, die sich sicher und verstanden fühlen, eher kooperieren. Die Bindungsforschung bestätigt, dass empathische Reaktionen der Eltern die Selbstregulation der Kinder fördern.\n\n**Meine Frage an dich:** Hast du schon bemerkt, ob es bestimmte Tageszeiten oder Situationen gibt, in denen das Verhalten häufiger auftritt? Und wie geht es dir selbst in diesen Momenten emotional? 🤗",
        metadata: {
          confidence: 0.85,
          intents_detected: ['loesung', 'verstehen', 'verstaendnis_fuer_mich'],
          temperature_used: 0.5,
          tokens_used: 450,
          has_follow_up: true
        }
      })
    }

    const body = await req.json()
    const validatedData = ChatRequestSchema.parse(body)
    
    const { message, childProfile, conversationHistory } = validatedData

    // Check scope boundary
    const scopeCheck = checkScope(message)
    if (!scopeCheck.isInScope) {
      return NextResponse.json({
        content: "Ich verstehe deine Sorge, aber das liegt außerhalb meines Fachbereichs als Elterncoach. Bitte wende dich an entsprechende Fachkräfte oder Beratungsstellen.",
        metadata: {
          scope_referral: scopeCheck.referralType,
          confidence: 1.0,
          intents_detected: [],
          temperature_used: 0.3,
          tokens_used: 50,
          has_follow_up: false
        }
      })
    }

    // Detect user intents automatically
    const detectedIntents = detectUserIntent(message)
    const temperature = getAdaptiveTemperature(detectedIntents)
    const maxTokens = getTokenLimit(detectedIntents, childProfile)

    // Get contextual information
    const ageContextFact = getAgeContextFact(childProfile.ageYears, childProfile.ageMonths)
    const evidenceFact = getEvidenceFact(extractKeywords(message))
    const microIntervention = getRandomMicroIntervention()
    const psychologicalNeeds = mapPsychologicalNeeds(childProfile.traits, message)

    // Build conversation context
    const recentHistory = conversationHistory.slice(-4) // Last 4 messages for context
    const contextString = recentHistory.length > 0 
      ? `\n\nBisheriger Gesprächsverlauf:\n${recentHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`
      : ''

    // Create unified system prompt
    const systemPrompt = `Du bist ein empathischer und professioneller Elterncoach mit Expertise in Entwicklungspsychologie. Deine Aufgabe ist es, Eltern mit einer einzigen, umfassenden Antwort zu helfen, die sowohl emotional validierend als auch fachlich fundiert ist.

**Erkannte Bedürfnisse:** ${detectedIntents.join(', ')}

**Kinderprofil:**
- Name: ${childProfile.name}
- Alter: ${childProfile.ageYears} Jahre ${childProfile.ageMonths} Monate  
- Eigenschaften: ${childProfile.traits.join(', ')}

**Entwicklungskontext:**
${ageContextFact.fact} (${ageContextFact.category})

**Wissenschaftliche Evidenz:**
${evidenceFact.fact} - ${evidenceFact.citation} (Verlässlichkeit: ${evidenceFact.reliability}/10)

**Praktische Intervention:**
${microIntervention.technique} (${microIntervention.duration}, ${microIntervention.difficulty})

**Psychologische Bedürfnisse:**
${psychologicalNeeds.join(', ')}

**Antwort-Struktur (AUSFÜHRLICH UND DETAILLIERT):**
1. **Emotionale Validierung** (3-4 Sätze): Zeige tiefes Verständnis und Empathie für die Situation
2. **Fachliche Einordnung** (4-5 Sätze): Erkläre das Verhalten ausführlich entwicklungspsychologisch mit Hintergründen
3. **Konkrete Lösungen** (6-8 detaillierte Schritte): Gib umfassende, praktische Handlungsempfehlungen mit Erklärungen warum sie funktionieren
4. **Zusätzliche Perspektiven** (2-3 Sätze): Biete alternative Blickwinkel oder ergänzende Ansätze
5. **Wissenschaftlicher Hintergrund** (2-3 Sätze): Integriere die Evidenz-Fakten natürlich in die Antwort
6. **Weiterdenkende Frage** (1-2 Sätze): Stelle eine durchdachte Nachfrage, um das Gespräch zu vertiefen

**Stil:**
- Warm, professionell und ermutigend
- Wissenschaftlich fundiert aber verständlich  
- AUSFÜHRLICH und detailliert - nutze den Platz für wertvolle Inhalte
- Konkret und umsetzbar mit Begründungen
- Mit Emojis sparsam aber wirkungsvoll einsetzen
- WICHTIG: Immer mit einer durchdachten Nachfrage abschließen

**Länge**: Ziele auf 300-500 Wörter für eine umfassende, hilfreiche Antwort

${contextString}`

    const userPrompt = `Elternfrage: "${message}"

Bitte gib eine umfassende, einfühlsame und professionelle Antwort, die alle erkannten Bedürfnisse (${detectedIntents.join(', ')}) adressiert.

**ZWINGEND ERFORDERLICH:** Deine Antwort MUSS mit einer durchdachten Nachfrage enden, die das Gespräch vertieft. Beispiele für gute Nachfragen:
- "Wie reagiert denn [Kindername] normalerweise, wenn...?"
- "Hast du schon bemerkt, ob es bestimmte Situationen gibt, in denen...?"
- "Was denkst du, könnte [Kindername] in diesen Momenten beschäftigen?"
- "Magst du mir erzählen, wie ihr als Familie bisher mit solchen Situationen umgegangen seid?"
- "Welcher der Ansätze spricht dich am meisten an, und warum?"

Die Nachfrage sollte zeigen, dass du wirklich an der individuellen Situation interessiert bist und mehr verstehen möchtest.`

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    })

    const responseContent = completion.choices[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.'

    // Check if response contains follow-up question
    const hasFollowUp = /\?/.test(responseContent)

    return NextResponse.json({
      content: responseContent,
      metadata: {
        confidence: 0.9,
        intents_detected: detectedIntents,
        temperature_used: temperature,
        tokens_used: completion.usage?.total_tokens || 0,
        has_follow_up: hasFollowUp,
        age_context: ageContextFact.category,
        evidence_reliability: evidenceFact.reliability,
        psychological_needs: psychologicalNeeds
      }
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    return NextResponse.json({
      content: "Es tut mir leid, aber ich kann momentan nicht antworten. Bitte versuche es in einem Moment noch einmal.",
      metadata: {
        error: true,
        confidence: 0,
        intents_detected: [],
        temperature_used: 0,
        tokens_used: 0,
        has_follow_up: false
      }
    }, { status: 500 })
  }
}