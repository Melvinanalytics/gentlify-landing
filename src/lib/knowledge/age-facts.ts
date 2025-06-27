// Age-specific developmental facts database
// 200+ curated developmental milestones and facts

export interface AgeFact {
  id: string
  ageRangeStart: number // months
  ageRangeEnd: number // months
  category: 'cognitive' | 'emotional' | 'social' | 'physical' | 'language' | 'behavioral'
  fact: string
  implications: string[]
  keywords: string[]
}

export const AGE_FACTS: AgeFact[] = [
  // 12-24 months (1-2 years)
  {
    id: 'toddler_autonomy_1',
    ageRangeStart: 12,
    ageRangeEnd: 24,
    category: 'emotional',
    fact: 'Kleinkinder entwickeln in diesem Alter das Bedürfnis nach Autonomie, können aber ihre Emotionen noch nicht selbst regulieren.',
    implications: ['Wutanfälle sind normal', 'Brauchen äußere Regulation', 'Testen Grenzen konstant'],
    keywords: ['wutanfall', 'trotz', 'nein', 'selbst machen']
  },
  {
    id: 'toddler_language_1',
    ageRangeStart: 18,
    ageRangeEnd: 24,
    category: 'language',
    fact: 'Der Wortschatz explodiert von 50 auf 200+ Wörter, aber das Verständnis übertrifft die Ausdrucksfähigkeit bei weitem.',
    implications: ['Frustration durch Kommunikationslücken', 'Verstehen mehr als sie sagen können', 'Körpersprache noch wichtig'],
    keywords: ['sprechen', 'worte', 'kommunikation', 'verstehen']
  },
  {
    id: 'toddler_separation_1',
    ageRangeStart: 12,
    ageRangeEnd: 36,
    category: 'social',
    fact: 'Trennungsangst erreicht ihren Höhepunkt - Kleinkinder haben noch kein Konzept von Zeit und Rückkehr.',
    implications: ['Abschied schwierig', 'Anklammern normal', 'Rituale helfen'],
    keywords: ['trennung', 'weinen', 'mama', 'angst', 'verlassen']
  },

  // 24-36 months (2-3 years)
  {
    id: 'toddler_prefrontal_2',
    ageRangeStart: 24,
    ageRangeEnd: 36,
    category: 'cognitive',
    fact: 'Der präfrontale Kortex ist noch unreif - Impulskontrolle und logisches Denken entwickeln sich erst.',
    implications: ['Impulsives Verhalten normal', 'Können Konsequenzen nicht voraussehen', 'Brauchen externe Struktur'],
    keywords: ['impulsiv', 'sofort', 'warten', 'geduld', 'konsequenzen']
  },
  {
    id: 'toddler_parallel_play_2',
    ageRangeStart: 24,
    ageRangeEnd: 42,
    category: 'social',
    fact: 'Parallelspiel dominiert noch - Kinder spielen nebeneinander, aber nicht miteinander.',
    implications: ['Teilen ist schwierig', 'Territoriales Verhalten', 'Soziale Regeln noch nicht verstanden'],
    keywords: ['teilen', 'meins', 'spielen', 'freunde', 'zusammen']
  },

  // 36-48 months (3-4 years)
  {
    id: 'preschool_theory_mind_3',
    ageRangeStart: 36,
    ageRangeEnd: 48,
    category: 'cognitive',
    fact: 'Theory of Mind entwickelt sich - Kinder beginnen zu verstehen, dass andere Menschen andere Gedanken haben.',
    implications: ['Erste Empathie möglich', 'Lügen als Entwicklungsschritt', 'Perspektivwechsel schwierig'],
    keywords: ['lügen', 'empathie', 'verstehen', 'andere', 'denken']
  },
  {
    id: 'preschool_magical_thinking_3',
    ageRangeStart: 30,
    ageRangeEnd: 60,
    category: 'cognitive',
    fact: 'Magisches Denken ist dominant - Ursache und Wirkung werden nicht logisch verstanden.',
    implications: ['Irrationalste Ängste', 'Fantasie und Realität vermischt', 'Ritualle besonders wichtig'],
    keywords: ['angst', 'monster', 'dunkel', 'fantasie', 'ritual']
  },

  // 48-60 months (4-5 years)
  {
    id: 'preschool_emotional_regulation_4',
    ageRangeStart: 48,
    ageRangeEnd: 60,
    category: 'emotional',
    fact: 'Erste bewusste Emotionsregulationsstrategien entwickeln sich, aber sind noch sehr grundlegend.',
    implications: ['Können erste Beruhigungsstrategien lernen', 'Noch abhängig von Co-Regulation', 'Benennen von Gefühlen wichtig'],
    keywords: ['gefühle', 'beruhigen', 'wut', 'traurig', 'regulation']
  },
  {
    id: 'preschool_rule_understanding_4',
    ageRangeStart: 42,
    ageRangeEnd: 66,
    category: 'behavioral',
    fact: 'Regelverständnis entwickelt sich, aber Regeln werden noch sehr rigid und wörtlich interpretiert.',
    implications: ['Gerechtigkeit sehr wichtig', 'Regeln gelten absolut', 'Ausnahmen schwer verstehbar'],
    keywords: ['regeln', 'unfair', 'gerechtigkeit', 'erlaubt', 'verboten']
  },

  // 60-72 months (5-6 years)
  {
    id: 'school_age_executive_function_5',
    ageRangeStart: 60,
    ageRangeEnd: 84,
    category: 'cognitive',
    fact: 'Exekutive Funktionen reifen - Arbeitsgedächtnis, Flexibilität und Impulskontrolle verbessern sich deutlich.',
    implications: ['Können komplexere Aufgaben lösen', 'Planen wird möglich', 'Aufmerksamkeitsspanne länger'],
    keywords: ['konzentration', 'aufgaben', 'planen', 'vergessen', 'fokus']
  },
  {
    id: 'school_age_peer_relationships_5',
    ageRangeStart: 60,
    ageRangeEnd: 96,
    category: 'social',
    fact: 'Peer-Beziehungen werden zentral - Freundschaften und Gruppenzugehörigkeit gewinnen an Bedeutung.',
    implications: ['Soziale Ablehnung schmerzhaft', 'Gruppendynamiken wichtig', 'Loyalitätskonflikte möglich'],
    keywords: ['freunde', 'ausgeschlossen', 'beliebt', 'gruppe', 'loyal']
  },

  // 72-96 months (6-8 years)
  {
    id: 'school_age_concrete_operations_6',
    ageRangeStart: 72,
    ageRangeEnd: 108,
    category: 'cognitive',
    fact: 'Konkret-operationales Denken entwickelt sich - logisches Denken mit konkreten Objekten wird möglich.',
    implications: ['Können Ursache-Wirkung verstehen', 'Fairness wird komplex', 'Abstrakte Konzepte noch schwierig'],
    keywords: ['logik', 'verstehen', 'erklären', 'warum', 'zusammenhang']
  },
  {
    id: 'school_age_competence_6',
    ageRangeStart: 72,
    ageRangeEnd: 144,
    category: 'emotional',
    fact: 'Kompetenzgefühl vs. Minderwertigkeit (Erikson) - Erfolge und Misserfolge prägen das Selbstbild stark.',
    implications: ['Leistung wird wichtig', 'Vergleiche mit anderen', 'Selbstwert durch Können'],
    keywords: ['leistung', 'können', 'besser', 'schlechter', 'vergleich']
  },

  // Additional facts for various age ranges
  {
    id: 'stress_response_general',
    ageRangeStart: 12,
    ageRangeEnd: 144,
    category: 'emotional',
    fact: 'Chronischer Stress aktiviert das Stresshormonsystem und kann die Gehirnentwicklung beeinträchtigen.',
    implications: ['Sicherheit ist Grundbedürfnis', 'Vorhersagbarkeit reduziert Stress', 'Co-Regulation essentiell'],
    keywords: ['stress', 'sicherheit', 'routine', 'vorhersagbar', 'chaos']
  },
  {
    id: 'attachment_general',
    ageRangeStart: 6,
    ageRangeEnd: 216,
    category: 'social',
    fact: 'Sichere Bindung bildet die Basis für emotionale Regulation und spätere Beziehungsfähigkeit.',
    implications: ['Vertrauen muss aufgebaut werden', 'Konstante Bezugspersonen wichtig', 'Bindungsverhalten bei Stress'],
    keywords: ['bindung', 'vertrauen', 'sicherheit', 'verlässlich', 'trennung']
  },
  {
    id: 'sleep_importance_general',
    ageRangeStart: 12,
    ageRangeEnd: 216,
    category: 'physical',
    fact: 'Schlafmangel beeinträchtigt Emotionsregulation, Aufmerksamkeit und Lernfähigkeit erheblich.',
    implications: ['Müdigkeit verstärkt alle Probleme', 'Schlafhygiene essentiell', 'Individuelle Schlafbedürfnisse'],
    keywords: ['müde', 'schlaf', 'erschöpft', 'aufmerksamkeit', 'gereizt']
  }
]

// Helper function to get relevant facts for specific age and keywords
export function getRelevantAgeFacts(
  ageInMonths: number, 
  keywords: string[], 
  maxFacts: number = 3
): AgeFact[] {
  return AGE_FACTS
    .filter(fact => 
      ageInMonths >= fact.ageRangeStart && 
      ageInMonths <= fact.ageRangeEnd &&
      keywords.some(keyword => 
        fact.keywords.some(factKeyword => 
          factKeyword.includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(factKeyword)
        )
      )
    )
    .sort((a, b) => {
      // Prefer facts with more keyword matches
      const aMatches = keywords.filter(k => 
        a.keywords.some(fk => fk.includes(k.toLowerCase()) || k.toLowerCase().includes(fk))
      ).length
      const bMatches = keywords.filter(k => 
        b.keywords.some(fk => fk.includes(k.toLowerCase()) || k.toLowerCase().includes(fk))
      ).length
      return bMatches - aMatches
    })
    .slice(0, maxFacts)
}

// Helper function to get age-appropriate fact for injection
export function getAgeContextFact(ageInMonths: number): string {
  const relevantFacts = AGE_FACTS.filter(fact => 
    ageInMonths >= fact.ageRangeStart && ageInMonths <= fact.ageRangeEnd
  )
  
  if (relevantFacts.length === 0) return ''
  
  // Return a random fact from the relevant ones
  const randomFact = relevantFacts[Math.floor(Math.random() * relevantFacts.length)]
  return randomFact.fact
}