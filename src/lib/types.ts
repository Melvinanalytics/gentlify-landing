import { z } from 'zod'

// Newsletter Signup Types
export const NewsletterSignupSchema = z.object({
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein'),
  name: z.string().optional(),
  source: z.string().optional() // Landing page tracking
})

export const NewsletterResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    email: z.string(),
    created_at: z.string()
  }).optional()
})

export type NewsletterSignup = z.infer<typeof NewsletterSignupSchema>
export type NewsletterResponse = z.infer<typeof NewsletterResponseSchema>

// Child Profile Types
export const PersonalityTraitSchema = z.enum([
  'sensibel',
  'energiereich', 
  'schüchtern',
  'neugierig',
  'dickköpfig',
  'hilfsbereit',
  'ängstlich',
  'kreativ',
  'sozial'
])

export const ChildProfileSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  ageYears: z.number().min(1).max(18),
  ageMonths: z.number().min(0).max(11),
  traits: z.array(PersonalityTraitSchema).min(1).max(3),
  createdAt: z.string().default(() => new Date().toISOString())
})

export type PersonalityTrait = z.infer<typeof PersonalityTraitSchema>
export type ChildProfile = z.infer<typeof ChildProfileSchema>

// Need Categories
export const NeedCategorySchema = z.enum([
  'autonomie',
  'sicherheit', 
  'verbindung',
  'anerkennung'
])

export type NeedCategory = z.infer<typeof NeedCategorySchema>

export interface NeedBadge {
  category: NeedCategory
  label: string
  description: string
  color: string
  emoji: string
}

// Chat Message Types
export const MessageRoleSchema = z.enum(['user', 'assistant'])

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: MessageRoleSchema,
  content: z.string(),
  timestamp: z.date(),
  feedback: z.enum(['positive', 'negative']).optional(),
  userId: z.string().optional() // For user-based chat history
})

export type MessageRole = z.infer<typeof MessageRoleSchema>
export type ChatMessage = z.infer<typeof ChatMessageSchema>

// Chat Session Types (for future multi-conversation support)
export const ChatSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().optional(),
  summary: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  messageCount: z.number().default(0)
})

export type ChatSession = z.infer<typeof ChatSessionSchema>

// Conversation Context (for memory and continuity)
export const ConversationContextSchema = z.object({
  userId: z.string(),
  sessionId: z.string().optional(),
  recentMessages: z.array(ChatMessageSchema).max(10), // Last 10 messages for context
  userProfile: ChildProfileSchema,
  conversationSummary: z.string().optional()
})

export type ConversationContext = z.infer<typeof ConversationContextSchema>

// User Intent Types
export const UserIntentSchema = z.enum([
  'verstehen',
  'verstaendnis_fuer_mich', 
  'verstehen_kind',
  'loesung'
])

export type UserIntent = z.infer<typeof UserIntentSchema>

// Enhanced Response Content Types for SCQA Framework
export const SCQAContentSchema = z.object({
  situation: z.string(),    // Kontext (20%)
  complication: z.string(), // Kernproblem (20%)
  question: z.string(),     // Implizite Elternfrage (10%)
  answer: z.string()        // Lösung mit Mikro-Schritten (50%)
})

export const Phase1ResponseSchema = z.object({
  phase1_mirror: z.string() // Emotional mirroring (max 150 tokens)
})

export const Phase2ExpertSchema = z.object({
  situation: z.string(),
  complication: z.string(),
  answer: z.string(),
  embedded_need: z.array(z.string()).max(2),
  evidence_fact: z.string(),
  citation: z.string(),
  micro_interventions: z.array(z.object({
    name: z.string(),
    description: z.string(),
    duration: z.string()
  })).max(2)
})

export const EnhancedAIResponseSchema = z.object({
  phase1_mirror: z.string().optional(),
  phase2_expert: Phase2ExpertSchema.optional(),
  metadata: z.object({
    confidence: z.number().min(0).max(1),
    tokens_used: z.number(),
    age_fact_injected: z.string().optional(),
    temperature_used: z.number().optional(),
    role_prefix: z.string().optional()
  }),
  responsePhase: z.enum(['phase1', 'phase2']),
  needsIntentSelection: z.boolean().optional(),
  rawResponse: z.string()
})

// Legacy Response Content Types (for backward compatibility)
export const ResponseContentSchema = z.object({
  mirror: z.string().optional(),
  core: z.string(),
  hint: z.string().optional()
})

// Legacy AI Response Structure (for backward compatibility)
export const AIResponseSchema = z.object({
  responseType: z.union([UserIntentSchema, z.literal('validation')]),
  content: ResponseContentSchema,
  identifiedNeeds: z.array(NeedCategorySchema).min(1).max(2).optional(),
  needsIntentSelection: z.boolean().optional(),
  rawResponse: z.string()
})

export type SCQAContent = z.infer<typeof SCQAContentSchema>
export type Phase1Response = z.infer<typeof Phase1ResponseSchema>
export type Phase2Expert = z.infer<typeof Phase2ExpertSchema>
export type EnhancedAIResponse = z.infer<typeof EnhancedAIResponseSchema>
export type AIResponse = z.infer<typeof AIResponseSchema>
export type ResponseContent = z.infer<typeof ResponseContentSchema>

// Enhanced API Request/Response Types for Dual-Phase Protocol
export const Phase1RequestSchema = z.object({
  message: z.string().min(1).max(1000),
  childProfile: ChildProfileSchema,
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    timestamp: z.string()
  })).optional()
})

export const Phase2RequestSchema = z.object({
  message: z.string().min(1).max(1000),
  childProfile: ChildProfileSchema,
  userIntents: z.array(UserIntentSchema).min(1),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    timestamp: z.string()
  })).optional(),
  phase1Response: z.string().optional()
})

export const EnhancedChatResponseSchema = z.object({
  success: z.boolean(),
  data: EnhancedAIResponseSchema.optional(),
  error: z.string().optional(),
  responseTime: z.number(),
  scopeCheck: z.object({
    isInScope: z.boolean(),
    referralType: z.enum(['medical_referral', 'legal_referral', 'emergency_resources']).optional()
  }).optional()
})

// Legacy API Request/Response Types (for backward compatibility)
export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  childProfile: ChildProfileSchema,
  userIntent: UserIntentSchema.nullable()
})

export const ChatResponseSchema = z.object({
  success: z.boolean(),
  data: AIResponseSchema.optional(),
  error: z.string().optional(),
  responseTime: z.number()
})

export type Phase1Request = z.infer<typeof Phase1RequestSchema>
export type Phase2Request = z.infer<typeof Phase2RequestSchema>
export type EnhancedChatResponse = z.infer<typeof EnhancedChatResponseSchema>
export type ChatRequest = z.infer<typeof ChatRequestSchema>
export type ChatResponse = z.infer<typeof ChatResponseSchema>

// UI State Types
export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorState {
  hasError: boolean
  message?: string
  code?: string
}

// App State
export interface AppState {
  childProfile: ChildProfile | null
  messages: ChatMessage[]
  isLoading: boolean
  error: ErrorState
  hasCompletedOnboarding: boolean
}

// Constants
export const PERSONALITY_TRAITS: Record<PersonalityTrait, string> = {
  sensibel: 'Sensibel & feinfühlig',
  energiereich: 'Energiereich & lebhaft',
  schüchtern: 'Schüchtern & zurückhaltend',
  neugierig: 'Neugierig & wissbegierig',
  dickköpfig: 'Dickköpfig & willensstark',
  hilfsbereit: 'Hilfsbereit & kooperativ',
  ängstlich: 'Ängstlich & vorsichtig',
  kreativ: 'Kreativ & fantasievoll',
  sozial: 'Sozial & kontaktfreudig'
}

export const NEED_BADGES: Record<NeedCategory, NeedBadge> = {
  autonomie: {
    category: 'autonomie',
    label: 'Autonomie',
    description: 'Dein Kind möchte selbst entscheiden',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    emoji: '🧡'
  },
  sicherheit: {
    category: 'sicherheit',
    label: 'Sicherheit',
    description: 'Dein Kind braucht Schutz und Vorhersagbarkeit',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    emoji: '💙'
  },
  verbindung: {
    category: 'verbindung',
    label: 'Verbindung',
    description: 'Dein Kind sehnt sich nach Nähe',
    color: 'bg-green-100 text-green-800 border-green-200',
    emoji: '💚'
  },
  anerkennung: {
    category: 'anerkennung',
    label: 'Anerkennung',
    description: 'Dein Kind möchte gesehen werden',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    emoji: '💜'
  }
}

// Intent Button Configuration
export interface IntentButton {
  intent: UserIntent
  label: string
  description: string
  icon: string
  color: string
}

export const INTENT_BUTTONS: Record<UserIntent, IntentButton> = {
  verstehen: {
    intent: 'verstehen',
    label: 'Situation verstehen',
    description: 'Was passiert psychologisch im Kind?',
    icon: '🧠',
    color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
  },
  verstaendnis_fuer_mich: {
    intent: 'verstaendnis_fuer_mich',
    label: 'Für mich da sein',
    description: 'Validierung meiner Gefühle als Elternteil',
    icon: '🤗',
    color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
  },
  verstehen_kind: {
    intent: 'verstehen_kind',
    label: 'Kind verstehen',
    description: 'Wie erlebt mein Kind die Situation?',
    icon: '👶',
    color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
  },
  loesung: {
    intent: 'loesung',
    label: 'Konkrete Lösung',
    description: 'Was kann ich direkt sagen und tun?',
    icon: '💡',
    color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
  }
} 