// Evidence-based microlearning facts database
// Curated scientific findings for embedding in responses

export interface EvidenceFact {
  id: string
  category: 'neuroscience' | 'attachment' | 'development' | 'behavior' | 'learning' | 'emotion'
  fact: string // 20-30 words max
  fullContext: string
  source: string
  studyType: 'meta-analysis' | 'longitudinal' | 'experimental' | 'observational' | 'review'
  reliability: 'high' | 'medium' | 'established'
  ageRelevance: {
    min: number // months
    max: number // months
  }
  keywords: string[]
  citationId: string
}

export const EVIDENCE_FACTS: EvidenceFact[] = [
  // Neuroscience findings
  {
    id: 'prefrontal_development',
    category: 'neuroscience',
    fact: 'Der präfrontale Kortex entwickelt sich bis zum 25. Lebensjahr - Impulskontrolle ist bei Kindern neurologisch unreif.',
    fullContext: 'Die Gehirnentwicklung erfolgt von hinten nach vorne, wobei der präfrontale Kortex, der für exekutive Funktionen zuständig ist, erst sehr spät vollständig ausreift. Dies erklärt, warum Kinder Schwierigkeiten mit Impulskontrolle, Planung und emotionaler Regulation haben.',
    source: 'Steinberg, L. (2013). The influence of neuroscience on US Supreme Court decisions',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 0, max: 216 },
    keywords: ['impulskontrolle', 'verhalten', 'unreif', 'gehirn', 'entwicklung'],
    citationId: 'steinberg2013_prefrontal'
  },
  {
    id: 'stress_cortisol',
    category: 'neuroscience',
    fact: 'Chronischer Stress erhöht Cortisol und kann die Hippocampus-Entwicklung beeinträchtigen, was Lernen und Gedächtnis beeinflusst.',
    fullContext: 'Anhaltende Stressbelastung führt zu erhöhten Cortisolspiegeln, die neurotoxisch auf den sich entwickelnden Hippocampus wirken können. Dies kann langfristige Auswirkungen auf Lern- und Gedächtnisfähigkeiten haben.',
    source: 'Lupien et al. (2009). Effects of stress throughout the lifespan on the brain',
    studyType: 'meta-analysis',
    reliability: 'high',
    ageRelevance: { min: 0, max: 216 },
    keywords: ['stress', 'lernen', 'gedächtnis', 'entwicklung', 'cortisol'],
    citationId: 'lupien2009_stress'
  },
  {
    id: 'mirror_neurons',
    category: 'neuroscience',
    fact: 'Spiegelneuronen aktivieren sich beim Beobachten von Emotionen - Kinder lernen emotionale Regulation durch Nachahmung.',
    fullContext: 'Das Spiegelneuronensystem ermöglicht es Kindern, durch Beobachtung und Imitation emotionale und soziale Fähigkeiten zu erlernen. Die Co-Regulation durch Bezugspersonen ist daher neurobiologisch fundiert.',
    source: 'Rizzolatti & Craighero (2004). The mirror-neuron system',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 0, max: 144 },
    keywords: ['nachahmung', 'emotion', 'regulation', 'lernen', 'beobachten'],
    citationId: 'rizzolatti2004_mirror'
  },

  // Attachment research
  {
    id: 'secure_attachment_outcomes',
    category: 'attachment',
    fact: 'Sichere Bindung in der Kindheit korreliert mit besserer emotionaler Regulation und sozialer Kompetenz im Erwachsenenalter.',
    fullContext: 'Longitudinalstudien zeigen, dass Kinder mit sicherer Bindung zu ihren primären Bezugspersonen später bessere Beziehungsfähigkeiten, emotionale Stabilität und Resilienz entwickeln.',
    source: 'Groh et al. (2017). Attachment and developmental psychopathology',
    studyType: 'meta-analysis',
    reliability: 'high',
    ageRelevance: { min: 0, max: 72 },
    keywords: ['bindung', 'regulation', 'sozial', 'beziehung', 'entwicklung'],
    citationId: 'groh2017_attachment'
  },
  {
    id: 'co_regulation',
    category: 'attachment',
    fact: 'Co-Regulation durch Bezugspersonen ist die Basis für die Entwicklung von Selbstregulationsfähigkeiten bei Kindern.',
    fullContext: 'Kinder entwickeln die Fähigkeit zur Selbstregulation durch wiederholte Erfahrungen der Co-Regulation mit einfühlsamen Bezugspersonen. Dieser Prozess ist fundamental für emotionale Entwicklung.',
    source: 'Siegel & Hartzell (2003). Parenting from the inside out',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 0, max: 144 },
    keywords: ['regulation', 'bezugsperson', 'entwicklung', 'emotion', 'basis'],
    citationId: 'siegel2003_coregulation'
  },

  // Developmental psychology
  {
    id: 'theory_of_mind',
    category: 'development',
    fact: 'Theory of Mind entwickelt sich zwischen 3-5 Jahren - vorher können Kinder nicht verstehen, dass andere anders denken.',
    fullContext: 'Die Fähigkeit zu verstehen, dass andere Menschen eigene Überzeugungen, Wünsche und Gedanken haben (Theory of Mind), entwickelt sich typischerweise zwischen dem 3. und 5. Lebensjahr.',
    source: 'Wellman et al. (2001). Meta-analysis of theory-of-mind development',
    studyType: 'meta-analysis',
    reliability: 'established',
    ageRelevance: { min: 24, max: 72 },
    keywords: ['verstehen', 'andere', 'denken', 'empathie', 'perspektive'],
    citationId: 'wellman2001_tom'
  },
  {
    id: 'executive_function_development',
    category: 'development',
    fact: 'Exekutive Funktionen entwickeln sich rapide zwischen 3-7 Jahren, mit Arbeitsgedächtnis als früher Komponente.',
    fullContext: 'Die Entwicklung exekutiver Funktionen (Arbeitsgedächtnis, Inhibition, kognitive Flexibilität) zeigt eine kritische Entwicklungsphase im Vorschulalter, wobei das Arbeitsgedächtnis als erste Komponente reift.',
    source: 'Diamond (2013). Executive functions',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 36, max: 84 },
    keywords: ['konzentration', 'aufmerksamkeit', 'gedächtnis', 'flexibilität', 'kontrolle'],
    citationId: 'diamond2013_executive'
  },
  {
    id: 'language_explosion',
    category: 'development',
    fact: 'Der Wortschatz-Spurt zwischen 18-24 Monaten ermöglicht das Lernen von 6-10 neuen Wörtern täglich.',
    fullContext: 'In der Phase des Wortschatz-Spurts können Kleinkinder durch fast mapping und statistische Lernmechanismen extrem schnell neue Wörter erwerben und deren Bedeutung approximieren.',
    source: 'Bloom (2000). How children learn the meanings of words',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 18, max: 36 },
    keywords: ['sprache', 'wörter', 'lernen', 'kommunikation', 'entwicklung'],
    citationId: 'bloom2000_language'
  },

  // Behavior research
  {
    id: 'tantrum_function',
    category: 'behavior',
    fact: 'Wutanfälle bei 1-4-Jährigen sind normale Kommunikation über unerfüllte Bedürfnisse, nicht manipulatives Verhalten.',
    fullContext: 'Entwicklungspsychologische Forschung zeigt, dass Wutanfälle in der frühen Kindheit primär Kommunikationsversuche über Bedürfnisse darstellen, nicht bewusst manipulatives Verhalten, da Kinder noch nicht über die kognitiven Fähigkeiten für komplexe Manipulation verfügen.',
    source: 'Potegal & Davidson (2003). Temper tantrums in young children',
    studyType: 'observational',
    reliability: 'high',
    ageRelevance: { min: 12, max: 60 },
    keywords: ['wutanfall', 'kommunikation', 'bedürfnis', 'manipulation', 'verhalten'],
    citationId: 'potegal2003_tantrums'
  },
  {
    id: 'positive_discipline',
    category: 'behavior',
    fact: 'Positive Erziehungsmethoden sind effektiver als Bestrafung und fördern internale Motivation sowie Selbstregulation.',
    fullContext: 'Meta-Analysen zeigen konsistent, dass positive Erziehungsansätze (Verstärkung, natürliche Konsequenzen, problemlösendes Vorgehen) zu besseren Verhaltensergebnissen führen als punitive Methoden.',
    source: 'Gershoff & Grogan-Kaylor (2016). Spanking and child outcomes',
    studyType: 'meta-analysis',
    reliability: 'high',
    ageRelevance: { min: 18, max: 144 },
    keywords: ['disziplin', 'bestrafung', 'motivation', 'verhalten', 'erziehung'],
    citationId: 'gershoff2016_discipline'
  },

  // Learning research
  {
    id: 'play_based_learning',
    category: 'learning',
    fact: 'Freies Spiel ist der wichtigste Lernmodus für Kinder und fördert Kreativität, Problemlösung und soziale Fähigkeiten.',
    fullContext: 'Neurowissenschaftliche und entwicklungspsychologische Studien belegen, dass unstrukturiertes, freies Spiel essentielle kognitive, emotionale und soziale Lernprozesse ermöglicht, die durch strukturierte Aktivitäten nicht ersetzt werden können.',
    source: 'Gray (2013). Free to learn: Why unleashing the instinct to play',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 12, max: 144 },
    keywords: ['spiel', 'lernen', 'kreativität', 'problemlösung', 'entwicklung'],
    citationId: 'gray2013_play'
  },
  {
    id: 'screen_time_effects',
    category: 'learning',
    fact: 'Übermäßige Bildschirmzeit vor dem 3. Lebensjahr kann Sprachentwicklung und Aufmerksamkeitsfähigkeiten beeinträchtigen.',
    fullContext: 'Longitudinalstudien zeigen, dass frühe und excessive Medienexposition mit verzögerter Sprachentwicklung und Aufmerksamkeitsproblemen korreliert, wahrscheinlich durch reduzierte soziale Interaktion.',
    source: 'Christakis et al. (2018). Screen time and young children',
    studyType: 'longitudinal',
    reliability: 'high',
    ageRelevance: { min: 6, max: 60 },
    keywords: ['bildschirm', 'medien', 'sprache', 'aufmerksamkeit', 'entwicklung'],
    citationId: 'christakis2018_screen'
  },

  // Emotion research
  {
    id: 'emotion_validation',
    category: 'emotion',
    fact: 'Emotionsvalidierung durch Eltern reduziert die Intensität und Dauer negativer Emotionen bei Kindern signifikant.',
    fullContext: 'Experimentelle Studien zeigen, dass empathische Validierung von Kindergefühlen durch Bezugspersonen zu schnellerer emotionaler Erholung und besserer langfristiger Regulationsfähigkeit führt.',
    source: 'Katz et al. (2012). Emotion coaching by mothers',
    studyType: 'experimental',
    reliability: 'high',
    ageRelevance: { min: 24, max: 144 },
    keywords: ['validation', 'emotion', 'gefühle', 'empathie', 'regulation'],
    citationId: 'katz2012_validation'
  },
  {
    id: 'emotional_contagion',
    category: 'emotion',
    fact: 'Emotionale Ansteckung ist bei Kindern stark ausgeprägt - die Emotionsregulation der Eltern beeinflusst das Kind direkt.',
    fullContext: 'Kinder übernehmen automatisch die emotionalen Zustände ihrer Bezugspersonen durch emotionale Ansteckung. Dies unterstreicht die Wichtigkeit der elterlichen Selbstregulation für das kindliche Wohlbefinden.',
    source: 'Hatfield et al. (1994). Emotional contagion',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 0, max: 144 },
    keywords: ['ansteckung', 'emotion', 'eltern', 'regulation', 'übertragung'],
    citationId: 'hatfield1994_contagion'
  },

  // Sleep and physical regulation
  {
    id: 'sleep_regulation',
    category: 'development',
    fact: 'Schlafmangel beeinträchtigt die Emotionsregulation bei Kindern stärker als bei Erwachsenen und verstärkt alle Verhaltensprobleme.',
    fullContext: 'Neurobiologische Studien zeigen, dass Schlafmangel bei Kindern besonders stark die präfrontale Kontrolle schwächt und das limbische System aktiviert, was zu erhöhter Emotionalität und reduzierter Impulskontrolle führt.',
    source: 'Meltzer & Mindell (2006). Sleep and sleep disorders in children',
    studyType: 'review',
    reliability: 'established',
    ageRelevance: { min: 6, max: 144 },
    keywords: ['schlaf', 'müdigkeit', 'emotion', 'verhalten', 'regulation'],
    citationId: 'meltzer2006_sleep'
  },

  // Parenting research
  {
    id: 'parental_stress',
    category: 'attachment',
    fact: 'Chronischer Elternstress reduziert die Sensitivität für kindliche Signale und beeinträchtigt die Eltern-Kind-Beziehung.',
    fullContext: 'Forschung zur elterlichen Belastung zeigt, dass chronischer Stress die Fähigkeit zur empathischen Wahrnehmung kindlicher Bedürfnisse reduziert und zu weniger responsivem Verhalten führt.',
    source: 'Crnic et al. (2005). Everyday stresses and parenting',
    studyType: 'longitudinal',
    reliability: 'high',
    ageRelevance: { min: 0, max: 144 },
    keywords: ['elternstress', 'sensitivität', 'beziehung', 'belastung', 'responsiv'],
    citationId: 'crnic2005_stress'
  },

  // Additional specialized findings
  {
    id: 'scaffolding_learning',
    category: 'learning',
    fact: 'Zone of Proximal Development: Kinder lernen am besten mit leichter Unterstützung bei moderat herausfordernden Aufgaben.',
    fullContext: 'Vygotskys Konzept der Zone of Proximal Development wurde empirisch bestätigt: Optimales Lernen findet statt, wenn Aufgaben leicht über dem aktuellen Niveau liegen und sensible Unterstützung geboten wird.',
    source: 'Wood et al. (1976). The role of tutoring in problem solving',
    studyType: 'experimental',
    reliability: 'established',
    ageRelevance: { min: 24, max: 144 },
    keywords: ['lernen', 'unterstützung', 'herausforderung', 'entwicklung', 'förderung'],
    citationId: 'wood1976_scaffolding'
  }
]

// Helper functions
export function getRelevantEvidenceFact(
  keywords: string[], 
  ageInMonths: number,
  category?: string
): EvidenceFact | null {
  const relevantFacts = EVIDENCE_FACTS.filter(fact => {
    const ageMatch = ageInMonths >= fact.ageRelevance.min && ageInMonths <= fact.ageRelevance.max
    const categoryMatch = !category || fact.category === category
    const keywordMatch = keywords.some(keyword => 
      fact.keywords.some(factKeyword => 
        factKeyword.includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(factKeyword)
      )
    )
    return ageMatch && categoryMatch && keywordMatch
  })

  if (relevantFacts.length === 0) return null

  // Prefer high reliability facts
  const highReliabilityFacts = relevantFacts.filter(f => f.reliability === 'high')
  const factsToChooseFrom = highReliabilityFacts.length > 0 ? highReliabilityFacts : relevantFacts

  // Return random fact from relevant ones
  return factsToChooseFrom[Math.floor(Math.random() * factsToChooseFrom.length)]
}

export function getFactByCategory(category: string): EvidenceFact[] {
  return EVIDENCE_FACTS.filter(fact => fact.category === category)
}

export function getAllEvidenceCategories(): string[] {
  return ['neuroscience', 'attachment', 'development', 'behavior', 'learning', 'emotion']
}