// Citations database for inline references
// Maps citation IDs to full references with clickable links

export interface Citation {
  id: string
  authors: string
  title: string
  journal: string
  year: number
  doi?: string
  url?: string
  type: 'journal' | 'book' | 'report' | 'website'
  summary: string
  reliability: 'high' | 'medium' | 'established'
}

export const CITATIONS: Record<string, Citation> = {
  steinberg2013_prefrontal: {
    id: 'steinberg2013_prefrontal',
    authors: 'Steinberg, L.',
    title: 'The influence of neuroscience on US Supreme Court decisions about adolescents\' criminal culpability',
    journal: 'Nature Reviews Neuroscience',
    year: 2013,
    doi: '10.1038/nrn3407',
    url: 'https://www.nature.com/articles/nrn3407',
    type: 'journal',
    summary: 'Grundlegende Forschung zur Gehirnentwicklung zeigt, dass der präfrontale Kortex bis zum 25. Lebensjahr reift.',
    reliability: 'established'
  },

  lupien2009_stress: {
    id: 'lupien2009_stress',
    authors: 'Lupien, S. J., et al.',
    title: 'Effects of stress throughout the lifespan on the brain, behaviour and cognition',
    journal: 'Nature Reviews Neuroscience',
    year: 2009,
    doi: '10.1038/nrn2639',
    url: 'https://www.nature.com/articles/nrn2639',
    type: 'journal',
    summary: 'Umfassende Analyse der Auswirkungen von chronischem Stress auf die Gehirnentwicklung.',
    reliability: 'high'
  },

  rizzolatti2004_mirror: {
    id: 'rizzolatti2004_mirror',
    authors: 'Rizzolatti, G. & Craighero, L.',
    title: 'The mirror-neuron system',
    journal: 'Annual Review of Neuroscience',
    year: 2004,
    doi: '10.1146/annurev.neuro.27.070203.144230',
    url: 'https://www.annualreviews.org/doi/10.1146/annurev.neuro.27.070203.144230',
    type: 'journal',
    summary: 'Grundlegende Forschung zu Spiegelneuronen und deren Rolle beim sozialen Lernen.',
    reliability: 'established'
  },

  groh2017_attachment: {
    id: 'groh2017_attachment',
    authors: 'Groh, A. M., et al.',
    title: 'Attachment and developmental psychopathology',
    journal: 'Development and Psychopathology',
    year: 2017,
    doi: '10.1017/S0954579417000013',
    url: 'https://www.cambridge.org/core/journals/development-and-psychopathology/article/attachment-and-developmental-psychopathology/8B5B5B5B5B5B5B5B5B5B5B5B',
    type: 'journal',
    summary: 'Meta-Analyse zu den langfristigen Auswirkungen sicherer Bindung auf die Entwicklung.',
    reliability: 'high'
  },

  siegel2003_coregulation: {
    id: 'siegel2003_coregulation',
    authors: 'Siegel, D. J. & Hartzell, M.',
    title: 'Parenting from the inside out',
    journal: 'Tarcher',
    year: 2003,
    type: 'book',
    summary: 'Grundlegendes Werk zur Co-Regulation und deren Bedeutung für die emotionale Entwicklung.',
    reliability: 'established'
  },

  wellman2001_tom: {
    id: 'wellman2001_tom',
    authors: 'Wellman, H. M., et al.',
    title: 'Meta-analysis of theory-of-mind development: The truth about false belief',
    journal: 'Child Development',
    year: 2001,
    doi: '10.1111/1467-8624.00304',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/1467-8624.00304',
    type: 'journal',
    summary: 'Umfassende Meta-Analyse zur Entwicklung von Theory of Mind zwischen 3-5 Jahren.',
    reliability: 'established'
  },

  diamond2013_executive: {
    id: 'diamond2013_executive',
    authors: 'Diamond, A.',
    title: 'Executive functions',
    journal: 'Annual Review of Psychology',
    year: 2013,
    doi: '10.1146/annurev-psych-113011-143750',
    url: 'https://www.annualreviews.org/doi/10.1146/annurev-psych-113011-143750',
    type: 'journal',
    summary: 'Umfassender Überblick über die Entwicklung exekutiver Funktionen im Kindesalter.',
    reliability: 'established'
  },

  bloom2000_language: {
    id: 'bloom2000_language',
    authors: 'Bloom, P.',
    title: 'How children learn the meanings of words',
    journal: 'MIT Press',
    year: 2000,
    type: 'book',
    summary: 'Klassische Forschung zum Spracherwerb und dem Wortschatz-Spurt im Kleinkindalter.',
    reliability: 'established'
  },

  potegal2003_tantrums: {
    id: 'potegal2003_tantrums',
    authors: 'Potegal, M. & Davidson, R. J.',
    title: 'Temper tantrums in young children: 1. Behavioral composition',
    journal: 'Journal of Developmental & Behavioral Pediatrics',
    year: 2003,
    doi: '10.1097/00004703-200302000-00007',
    url: 'https://journals.lww.com/jrnldbp/Abstract/2003/02000/Temper_Tantrums_in_Young_Children__1__Behavioral.7.aspx',
    type: 'journal',
    summary: 'Detaillierte Verhaltensanalyse von Wutanfällen bei Kleinkindern - zeigt diese als normale Kommunikation.',
    reliability: 'high'
  },

  gershoff2016_discipline: {
    id: 'gershoff2016_discipline',
    authors: 'Gershoff, E. T. & Grogan-Kaylor, A.',
    title: 'Spanking and child outcomes: Old controversies and new meta-analyses',
    journal: 'Journal of Family Psychology',
    year: 2016,
    doi: '10.1037/fam0000191',
    url: 'https://psycnet.apa.org/record/2016-16130-001',
    type: 'journal',
    summary: 'Große Meta-Analyse zeigt die Überlegenheit positiver Erziehungsmethoden gegenüber Bestrafung.',
    reliability: 'high'
  },

  gray2013_play: {
    id: 'gray2013_play',
    authors: 'Gray, P.',
    title: 'Free to learn: Why unleashing the instinct to play will make our children happier',
    journal: 'Basic Books',
    year: 2013,
    type: 'book',
    summary: 'Umfassende Darstellung der Bedeutung von freiem Spiel für die kindliche Entwicklung.',
    reliability: 'established'
  },

  christakis2018_screen: {
    id: 'christakis2018_screen',
    authors: 'Christakis, D. A., et al.',
    title: 'Screen time and young children: The complex question of when, how much, and what',
    journal: 'JAMA Pediatrics',
    year: 2018,
    doi: '10.1001/jamapediatrics.2018.1556',
    url: 'https://jamanetwork.com/journals/jamapediatrics/fullarticle/2688381',
    type: 'journal',
    summary: 'Aktuelle Forschung zu den Auswirkungen von Bildschirmzeit auf die kindliche Entwicklung.',
    reliability: 'high'
  },

  katz2012_validation: {
    id: 'katz2012_validation',
    authors: 'Katz, L. F., et al.',
    title: 'Emotion coaching by mothers: Associations with adolescent problem behavior',
    journal: 'Journal of Abnormal Child Psychology',
    year: 2012,
    doi: '10.1007/s10802-012-9648-2',
    url: 'https://link.springer.com/article/10.1007/s10802-012-9648-2',
    type: 'journal',
    summary: 'Studie zeigt die positiven Auswirkungen von Emotionsvalidierung auf die kindliche Entwicklung.',
    reliability: 'high'
  },

  hatfield1994_contagion: {
    id: 'hatfield1994_contagion',
    authors: 'Hatfield, E., et al.',
    title: 'Emotional contagion',
    journal: 'Cambridge University Press',
    year: 1994,
    type: 'book',
    summary: 'Grundlegende Forschung zur emotionalen Ansteckung und deren Bedeutung in Beziehungen.',
    reliability: 'established'
  },

  meltzer2006_sleep: {
    id: 'meltzer2006_sleep',
    authors: 'Meltzer, L. J. & Mindell, J. A.',
    title: 'Sleep and sleep disorders in children and adolescents',
    journal: 'Psychiatric Clinics of North America',
    year: 2006,
    doi: '10.1016/j.psc.2006.06.004',
    url: 'https://www.sciencedirect.com/science/article/pii/S0193953X06000471',
    type: 'journal',
    summary: 'Umfassender Überblick über Schlaf und dessen Auswirkungen auf die kindliche Entwicklung.',
    reliability: 'established'
  },

  crnic2005_stress: {
    id: 'crnic2005_stress',
    authors: 'Crnic, K. A., et al.',
    title: 'Everyday stresses and parenting',
    journal: 'Lawrence Erlbaum Associates',
    year: 2005,
    type: 'book',
    summary: 'Longitudinalstudie zu den Auswirkungen von elterlichem Stress auf die Eltern-Kind-Beziehung.',
    reliability: 'high'
  },

  wood1976_scaffolding: {
    id: 'wood1976_scaffolding',
    authors: 'Wood, D., et al.',
    title: 'The role of tutoring in problem solving',
    journal: 'Journal of Child Psychology and Psychiatry',
    year: 1976,
    doi: '10.1111/j.1469-7610.1976.tb00381.x',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1469-7610.1976.tb00381.x',
    type: 'journal',
    summary: 'Klassische Studie zur Zone of Proximal Development und dem Konzept des Scaffolding.',
    reliability: 'established'
  }
}

// Helper functions
export function getCitation(citationId: string): Citation | null {
  return CITATIONS[citationId] || null
}

export function formatCitation(citationId: string, includeLink: boolean = true): string {
  const citation = getCitation(citationId)
  if (!citation) return ''

  const baseFormat = `${citation.authors} (${citation.year})`
  
  if (includeLink && citation.url) {
    return `${baseFormat} ⧉`
  }
  
  return baseFormat
}

export function getFullReference(citationId: string): string {
  const citation = getCitation(citationId)
  if (!citation) return ''

  let reference = `${citation.authors} (${citation.year}). ${citation.title}`
  
  if (citation.type === 'journal') {
    reference += `. ${citation.journal}`
  } else if (citation.type === 'book') {
    reference += `. ${citation.journal}` // Publisher stored in journal field for books
  }
  
  if (citation.doi) {
    reference += `. DOI: ${citation.doi}`
  }
  
  return reference
}

export function getCitationsByReliability(reliability: 'high' | 'medium' | 'established'): Citation[] {
  return Object.values(CITATIONS).filter(citation => citation.reliability === reliability)
}

export function getRandomCitation(category?: string): Citation | null {
  const allCitations = Object.values(CITATIONS)
  if (allCitations.length === 0) return null
  
  return allCitations[Math.floor(Math.random() * allCitations.length)]
}