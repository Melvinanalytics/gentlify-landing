// Knowledge base index - exports all knowledge databases
// Centralized access point for all knowledge systems

// Age facts
export {
  AGE_FACTS,
  getRelevantAgeFacts,
  getAgeContextFact,
  type AgeFact
} from './age-facts'

// Hierarchical needs
export {
  HIERARCHICAL_NEEDS,
  NEED_BADGES,
  getNeedsByCategory,
  getRelevantNeeds,
  getAllNeedCategories,
  type Need,
  type NeedCategory
} from './needs-hierarchy'

// Evidence facts
export {
  EVIDENCE_FACTS,
  getRelevantEvidenceFact,
  getFactByCategory,
  getAllEvidenceCategories,
  type EvidenceFact
} from './evidence-facts'

// Micro interventions
export {
  MICRO_INTERVENTIONS,
  getRelevantMicroInterventions,
  getRandomMicroIntervention,
  getMicroInterventionsByDifficulty,
  type MicroIntervention
} from './micro-interventions'

// Citations
export {
  CITATIONS,
  getCitation,
  formatCitation,
  getFullReference,
  getCitationsByReliability,
  getRandomCitation,
  type Citation
} from './citations'

// Import types and functions for local use
import type { Need } from './needs-hierarchy'
import type { EvidenceFact } from './evidence-facts'
import type { MicroIntervention } from './micro-interventions'
import { getAgeContextFact } from './age-facts'
import { getRelevantNeeds } from './needs-hierarchy'
import { getRelevantEvidenceFact } from './evidence-facts'
import { getRelevantMicroInterventions } from './micro-interventions'
import { formatCitation } from './citations'

// Combined helper functions
export function getEnhancedResponse(
  message: string,
  ageInMonths: number,
  userIntent: string
): {
  ageFact: string
  relevantNeeds: Need[]
  evidenceFact: EvidenceFact | null
  microInterventions: MicroIntervention[]
  citation: string
} {
  // Extract keywords from message
  const keywords = extractKeywords(message)
  
  // Get age context
  const ageFact = getAgeContextFact(ageInMonths)
  
  // Get relevant needs (max 2)
  const relevantNeeds = getRelevantNeeds(keywords, ageInMonths, 2)
  
  // Get evidence fact
  const evidenceFact = getRelevantEvidenceFact(keywords, ageInMonths)
  
  // Get micro interventions (max 2)
  const microInterventions = getRelevantMicroInterventions(keywords, ageInMonths, undefined, 2)
  
  // Format citation if evidence fact exists
  const citation = evidenceFact ? formatCitation(evidenceFact.citationId, true) : ''
  
  return {
    ageFact,
    relevantNeeds,
    evidenceFact,
    microInterventions,
    citation
  }
}

// Simple keyword extraction helper
export function extractKeywords(message: string): string[] {
  const commonKeywords = [
    'wutanfall', 'trotz', 'nein', 'schlafen', 'essen', 'teilen', 'freunde',
    'angst', 'weinen', 'hauen', 'schreien', 'aufräumen', 'zähneputzen',
    'anziehen', 'kindergarten', 'geschwister', 'eifersucht', 'lügen',
    'respekt', 'grenzen', 'regeln', 'konsequenzen', 'strafen', 'belohnung',
    'motivation', 'konzentration', 'hyperaktiv', 'sensibel', 'schüchtern',
    'aggressiv', 'traurig', 'fröhlich', 'wütend', 'frustriert', 'müde',
    'überfordert', 'stress', 'trennung', 'abschied', 'eingewöhnung'
  ]
  
  const messageLower = message.toLowerCase()
  return commonKeywords.filter(keyword => messageLower.includes(keyword))
}