// Micro-intervention generator database
// Age-appropriate, scientifically validated mini-exercises (30-90 seconds)

export interface MicroIntervention {
  id: string
  name: string
  description: string // What to do exactly
  duration: string // "30 Sekunden" | "1-2 Minuten" etc.
  ageRange: {
    min: number // months
    max: number // months
  }
  category: 'regulation' | 'connection' | 'communication' | 'boundary' | 'attention' | 'transition'
  difficulty: 'easy' | 'medium' | 'advanced'
  materials: string[] // What you need
  steps: string[] // Step by step instructions
  purpose: string // Why this helps
  keywords: string[]
  parentingStyle: 'authoritative' | 'gentle' | 'conscious' | 'all'
  situation: string[] // When to use
  evidenceBased: boolean
}

export const MICRO_INTERVENTIONS: MicroIntervention[] = [
  // REGULATION interventions
  {
    id: 'breathing_bear',
    name: 'Atmender Bär',
    description: 'Gemeinsam mit dem Kind wie ein Bär atmen, um zur Ruhe zu kommen',
    duration: '1-2 Minuten',
    ageRange: { min: 24, max: 72 },
    category: 'regulation',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Setzen Sie sich mit Ihrem Kind gemütlich hin',
      'Sagen Sie: "Wir atmen jetzt wie ein großer, starker Bär"',
      'Atmen Sie gemeinsam tief ein und lassen die Luft langsam mit einem "Hoooo" entweichen',
      'Wiederholen Sie dies 5-8 Mal im ruhigen Rhythmus',
      'Fragen Sie: "Wie fühlt sich dein Bauch jetzt an?"'
    ],
    purpose: 'Aktiviert das parasympathische Nervensystem und reduziert Stresshormone',
    keywords: ['wutanfall', 'aufregung', 'beruhigen', 'stress', 'angst'],
    parentingStyle: 'all',
    situation: ['Nach Wutanfall', 'Bei Überstimulation', 'Vor dem Schlafengehen'],
    evidenceBased: true
  },
  {
    id: 'butterfly_hug',
    name: 'Schmetterlings-Umarmung',
    description: 'Selbstberuhigungs-Technik durch bilaterale Stimulation',
    duration: '30-60 Sekunden',
    ageRange: { min: 36, max: 144 },
    category: 'regulation',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Zeigen Sie Ihrem Kind, wie es die Hände wie Schmetterlingsflügel über die Brust kreuzt',
      'Abwechselnd mit beiden Händen sanft auf die Schultern klopfen',
      'Dabei ruhig atmen und bis 10 zählen',
      'Fragen Sie: "Spürst du, wie der Schmetterling dich beruhigt?"'
    ],
    purpose: 'Bilaterale Stimulation beruhigt das Nervensystem (EMDR-basiert)',
    keywords: ['selbstberuhigung', 'nervös', 'aufregung', 'beruhigen'],
    parentingStyle: 'conscious',
    situation: ['Bei Anspannung', 'Vor schwierigen Situationen', 'Bei Ängsten'],
    evidenceBased: true
  },
  {
    id: 'emotion_thermometer',
    name: 'Gefühls-Thermometer',
    description: 'Emotionen auf einer Skala von 1-10 einordnen',
    duration: '1-2 Minuten',
    ageRange: { min: 48, max: 144 },
    category: 'regulation',
    difficulty: 'medium',
    materials: ['Papier', 'Stifte (optional)'],
    steps: [
      'Malen Sie schnell ein Thermometer oder zeigen Sie mit Ihren Händen die Skala',
      'Fragen Sie: "Wie groß ist dein Gefühl gerade? 1 ist ganz klein, 10 ist riesig"',
      'Lassen Sie das Kind zeigen oder sagen',
      'Fragen Sie: "Was würde helfen, damit es auf eine 5 oder 3 geht?"',
      'Probieren Sie gemeinsam Ideen aus'
    ],
    purpose: 'Entwickelt emotionale Selbstwahrnehmung und Regulationsstrategien',
    keywords: ['gefühle', 'wut', 'trauer', 'emotion', 'verstehen'],
    parentingStyle: 'conscious',
    situation: ['Bei starken Emotionen', 'Nach Konflikten', 'Zum Verständnis'],
    evidenceBased: true
  },
  {
    id: 'five_finger_breathing',
    name: '5-Finger-Atmung',
    description: 'Atemübung mit der Hand als visueller Hilfe',
    duration: '1-2 Minuten',
    ageRange: { min: 48, max: 144 },
    category: 'regulation',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Strecken Sie eine Hand aus',
      'Mit dem anderen Zeigefinger am Daumen beginnen',
      'Beim Hochfahren am Finger einatmen, beim Runterfahren ausatmen',
      'Alle fünf Finger so "ablaufen"',
      'Fragen Sie: "Merkst du, wie ruhig dein Atem geworden ist?"'
    ],
    purpose: 'Kombiniert Atemregulation mit visueller und taktiler Wahrnehmung',
    keywords: ['atmung', 'beruhigen', 'konzentration', 'focus'],
    parentingStyle: 'all',
    situation: ['Bei Aufregung', 'Vor Tests', 'Bei Nervosität'],
    evidenceBased: true
  },

  // CONNECTION interventions
  {
    id: 'special_time',
    name: 'Besondere Zeit',
    description: '10 Minuten ungeteilte Aufmerksamkeit nur für das Kind',
    duration: '10 Minuten',
    ageRange: { min: 18, max: 144 },
    category: 'connection',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Sagen Sie: "Jetzt haben wir unsere besondere Zeit"',
      'Handy weglegen, andere Ablenkungen ausschalten',
      'Lassen Sie das Kind bestimmen, was gespielt wird',
      'Kommentieren Sie positiv, was das Kind tut',
      'Keine Fragen, Anweisungen oder Korrekturen - nur beobachten und wertschätzen'
    ],
    purpose: 'Stärkt die Bindung und das Selbstwertgefühl des Kindes',
    keywords: ['bindung', 'aufmerksamkeit', 'verbindung', 'beziehung'],
    parentingStyle: 'all',
    situation: ['Täglich', 'Nach Konflikten', 'Bei Distanz'],
    evidenceBased: true
  },
  {
    id: 'feeling_check_in',
    name: 'Gefühls-Check',
    description: 'Kurzer emotionaler Austausch zwischen Eltern und Kind',
    duration: '2-3 Minuten',
    ageRange: { min: 36, max: 144 },
    category: 'connection',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Setzen Sie sich auf Augenhöhe zum Kind',
      'Fragen Sie: "Wie geht es dir gerade? Was fühlst du?"',
      'Hören Sie ohne zu bewerten zu',
      'Teilen Sie auch ein eigenes Gefühl mit',
      'Bedanken Sie sich fürs Teilen'
    ],
    purpose: 'Fördert emotionale Intimität und Kommunikationsbereitschaft',
    keywords: ['gefühle', 'kommunikation', 'austausch', 'vertrauen'],
    parentingStyle: 'conscious',
    situation: ['Morgens', 'Nach der Schule', 'Vor dem Schlafengehen'],
    evidenceBased: true
  },
  {
    id: 'gratitude_moment',
    name: 'Dankbarkeits-Moment',
    description: 'Gemeinsam drei schöne Dinge des Tages teilen',
    duration: '2-3 Minuten',
    ageRange: { min: 36, max: 144 },
    category: 'connection',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Sagen Sie: "Lass uns drei schöne Sachen von heute finden"',
      'Jeder nennt abwechselnd etwas Schönes',
      'Hören Sie aufmerksam zu und zeigen Sie Interesse',
      'Bedanken Sie sich beim Kind fürs Teilen',
      'Enden Sie mit: "Ich bin dankbar für dich"'
    ],
    purpose: 'Stärkt positive Emotionen und die Eltern-Kind-Bindung',
    keywords: ['positiv', 'dankbarkeit', 'verbindung', 'schön'],
    parentingStyle: 'conscious',
    situation: ['Abends', 'Nach schwierigen Tagen', 'Regelmäßig'],
    evidenceBased: true
  },

  // COMMUNICATION interventions
  {
    id: 'active_listening',
    name: 'Aktives Zuhören',
    description: 'Dem Kind zeigen, dass es wirklich gehört wird',
    duration: '1-2 Minuten',
    ageRange: { min: 24, max: 144 },
    category: 'communication',
    difficulty: 'medium',
    materials: [],
    steps: [
      'Gehen Sie auf Augenhöhe des Kindes',
      'Wiederholen Sie, was das Kind gesagt hat: "Du meinst also..."',
      'Benennen Sie das Gefühl: "Du klingst frustriert/traurig/wütend"',
      'Fragen Sie: "Habe ich dich richtig verstanden?"',
      'Warten Sie die Antwort ab, bevor Sie reagieren'
    ],
    purpose: 'Validiert die Erfahrung des Kindes und reduziert Missverständnisse',
    keywords: ['verstehen', 'zuhören', 'kommunikation', 'validation'],
    parentingStyle: 'conscious',
    situation: ['Bei Konflikten', 'Wenn das Kind frustriert ist', 'Bei Missverständnissen'],
    evidenceBased: true
  },
  {
    id: 'choice_offering',
    name: 'Wahlmöglichkeiten anbieten',
    description: 'Dem Kind kontrollierte Entscheidungsfreiheit geben',
    duration: '30 Sekunden',
    ageRange: { min: 18, max: 96 },
    category: 'communication',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Statt Anweisungen: Bieten Sie 2-3 akzeptable Optionen',
      'Sagen Sie: "Möchtest du X oder Y? Du kannst wählen"',
      'Warten Sie auf die Entscheidung des Kindes',
      'Respektieren Sie die Wahl des Kindes',
      'Bedanken Sie sich für die Entscheidung'
    ],
    purpose: 'Reduziert Machtkämpfe und fördert Kooperationsbereitschaft',
    keywords: ['trotz', 'widerstand', 'kooperation', 'autonomie', 'wählen'],
    parentingStyle: 'all',
    situation: ['Bei Widerstand', 'Vor Übergängen', 'Bei Machtkämpfen'],
    evidenceBased: true
  },
  {
    id: 'emotion_coaching',
    name: 'Gefühls-Begleitung',
    description: 'Emotionen benennen und normalisieren',
    duration: '1-2 Minuten',
    ageRange: { min: 18, max: 144 },
    category: 'communication',
    difficulty: 'medium',
    materials: [],
    steps: [
      'Benennen Sie das Gefühl: "Du bist wütend, weil..."',
      'Normalisieren Sie: "Es ist ok, wütend zu sein"',
      'Setzen Sie Grenzen für Verhalten: "Aber hauen ist nicht ok"',
      'Bieten Sie alternative Ausdrucksformen an',
      'Bleiben Sie ruhig und präsent'
    ],
    purpose: 'Entwickelt emotionale Intelligenz und Regulationsfähigkeiten',
    keywords: ['gefühle', 'emotion', 'wut', 'trauer', 'validation'],
    parentingStyle: 'conscious',
    situation: ['Bei starken Emotionen', 'Während Wutanfällen', 'Nach Konflikten'],
    evidenceBased: true
  },

  // BOUNDARY interventions
  {
    id: 'calm_limit_setting',
    name: 'Ruhige Grenzensetzung',
    description: 'Klare Grenzen ohne Machtkampf kommunizieren',
    duration: '30-60 Sekunden',
    ageRange: { min: 18, max: 144 },
    category: 'boundary',
    difficulty: 'medium',
    materials: [],
    steps: [
      'Sprechen Sie ruhig und bestimmt (nicht laut)',
      'Sagen Sie einmal klar, was nicht geht: "Das geht nicht"',
      'Erklären Sie kurz warum: "Weil es gefährlich ist"',
      'Bieten Sie eine Alternative: "Du kannst stattdessen..."',
      'Bleiben Sie konsequent, auch wenn das Kind protestiert'
    ],
    purpose: 'Vermittelt Sicherheit durch klare Struktur ohne Beziehungsschäden',
    keywords: ['grenzen', 'regeln', 'konsequenz', 'sicherheit', 'struktur'],
    parentingStyle: 'authoritative',
    situation: ['Bei Regelüberschreitung', 'Bei Sicherheitsrisiken', 'Bei Tests von Grenzen'],
    evidenceBased: true
  },
  {
    id: 'natural_consequences',
    name: 'Natürliche Konsequenzen',
    description: 'Lernen durch logische Folgen statt Bestrafung',
    duration: '1-2 Minuten',
    ageRange: { min: 36, max: 144 },
    category: 'boundary',
    difficulty: 'advanced',
    materials: [],
    steps: [
      'Identifizieren Sie die natürliche Konsequenz des Verhaltens',
      'Erklären Sie den Zusammenhang: "Wenn..., dann..."',
      'Geben Sie dem Kind die Chance zu wählen',
      'Lassen Sie die Konsequenz ohne Drama eintreten',
      'Unterstützen Sie beim Problemlösen für das nächste Mal'
    ],
    purpose: 'Fördert intrinsische Motivation und Problemlösefähigkeiten',
    keywords: ['konsequenz', 'lernen', 'problemlösung', 'verantwortung'],
    parentingStyle: 'conscious',
    situation: ['Bei wiederholten Problemen', 'Zum Lernen von Verantwortung', 'Bei Unordnung'],
    evidenceBased: true
  },

  // ATTENTION interventions
  {
    id: 'attention_focusing',
    name: 'Aufmerksamkeits-Fokus',
    description: 'Kurze Übung zur Konzentrationssteigerung',
    duration: '1-2 Minuten',
    ageRange: { min: 36, max: 144 },
    category: 'attention',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Sagen Sie: "Wir machen jetzt einen Aufmerksamkeits-Check"',
      'Fragen Sie: "Was hörst du gerade?" (3 Geräusche finden)',
      'Dann: "Was siehst du?" (3 Dinge beschreiben)',
      'Schließlich: "Wie fühlst du dich?" (1 Gefühl benennen)',
      'Loben Sie die Aufmerksamkeit'
    ],
    purpose: 'Trainiert Achtsamkeit und Konzentrationsfähigkeit',
    keywords: ['konzentration', 'aufmerksamkeit', 'fokus', 'achtsamkeit'],
    parentingStyle: 'conscious',
    situation: ['Bei Unruhe', 'Vor Aufgaben', 'Bei Ablenkung'],
    evidenceBased: true
  },
  {
    id: 'body_scan',
    name: 'Körper-Spürcheck',
    description: 'Kurze Körperreise zur Erdung und Entspannung',
    duration: '2-3 Minuten',
    ageRange: { min: 48, max: 144 },
    category: 'attention',
    difficulty: 'medium',
    materials: [],
    steps: [
      'Gemeinsam hinsetzen oder hinlegen',
      'Sagen Sie: "Wir gehen auf Körperreise"',
      'Von den Zehen aufwärts: "Wie fühlen sich deine Zehen an?"',
      'Jeden Körperteil kurz spüren lassen',
      'Enden mit: "Wie fühlt sich dein ganzer Körper jetzt an?"'
    ],
    purpose: 'Fördert Körperwahrnehmung und Entspannung, reduziert Stress',
    keywords: ['entspannung', 'körper', 'spüren', 'ruhe', 'wahrnehmung'],
    parentingStyle: 'conscious',
    situation: ['Bei Überstimulation', 'Vor dem Schlafengehen', 'Bei Anspannung'],
    evidenceBased: true
  },

  // TRANSITION interventions
  {
    id: 'transition_warning',
    name: 'Übergangs-Ankündigung',
    description: 'Vorbereitung auf Aktivitätswechsel zur Reduktion von Widerstand',
    duration: '30 Sekunden',
    ageRange: { min: 18, max: 144 },
    category: 'transition',
    difficulty: 'easy',
    materials: ['Timer (optional)'],
    steps: [
      'Kündigen Sie 10 Minuten vorher an: "In 10 Minuten räumen wir auf"',
      '5-Minuten-Warnung: "Noch 5 Minuten spielen"',
      '2-Minuten-Warnung: "Gleich ist Spielzeit vorbei"',
      'Dann: "Jetzt ist es Zeit aufzuräumen"',
      'Bleiben Sie freundlich aber bestimmt'
    ],
    purpose: 'Reduziert Übergangs-Stress durch Vorhersagbarkeit',
    keywords: ['übergang', 'aufhören', 'wechsel', 'aktivität', 'zeit'],
    parentingStyle: 'all',
    situation: ['Vor allen Übergängen', 'Bei Aktivitätswechseln', 'Vor dem Weggehen'],
    evidenceBased: true
  },
  {
    id: 'closing_ritual',
    name: 'Abschluss-Ritual',
    description: 'Bewusster Abschied von einer Aktivität',
    duration: '1 Minute',
    ageRange: { min: 24, max: 96 },
    category: 'transition',
    difficulty: 'easy',
    materials: [],
    steps: [
      'Sagen Sie: "Wir verabschieden uns jetzt vom Spielen"',
      'Gemeinsam den Spielbereich anschauen',
      'Sagen Sie: "Danke, Spielsachen, das war schön"',
      'Dem Kind Zeit geben für eigenen Abschied',
      'Dann zum nächsten Schritt übergehen'
    ],
    purpose: 'Hilft bei emotionalem Übergang und reduziert Trennungsschmerz',
    keywords: ['abschied', 'übergang', 'ritual', 'beenden', 'trauer'],
    parentingStyle: 'gentle',
    situation: ['Bei schwierigen Übergängen', 'Beim Verlassen von Spielplätzen', 'Bei Lieblingssachen'],
    evidenceBased: false
  }
]

// Helper functions
export function getRelevantMicroInterventions(
  keywords: string[],
  ageInMonths: number,
  category?: string,
  maxInterventions: number = 2
): MicroIntervention[] {
  return MICRO_INTERVENTIONS
    .filter(intervention => {
      const ageMatch = ageInMonths >= intervention.ageRange.min && ageInMonths <= intervention.ageRange.max
      const categoryMatch = !category || intervention.category === category
      const keywordMatch = keywords.some(keyword => 
        intervention.keywords.some(intKeyword => 
          intKeyword.includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(intKeyword)
        )
      )
      return ageMatch && categoryMatch && keywordMatch
    })
    .sort((a, b) => {
      // Prefer evidence-based interventions
      if (a.evidenceBased && !b.evidenceBased) return -1
      if (!a.evidenceBased && b.evidenceBased) return 1
      // Then prefer easier interventions
      const difficultyOrder = { easy: 0, medium: 1, advanced: 2 }
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    })
    .slice(0, maxInterventions)
}

export function getRandomMicroIntervention(
  category: string,
  ageInMonths: number
): MicroIntervention | null {
  const categoryInterventions = MICRO_INTERVENTIONS.filter(
    intervention => 
      intervention.category === category &&
      ageInMonths >= intervention.ageRange.min &&
      ageInMonths <= intervention.ageRange.max
  )

  if (categoryInterventions.length === 0) return null

  return categoryInterventions[Math.floor(Math.random() * categoryInterventions.length)]
}

export function getMicroInterventionsByDifficulty(difficulty: 'easy' | 'medium' | 'advanced'): MicroIntervention[] {
  return MICRO_INTERVENTIONS.filter(intervention => intervention.difficulty === difficulty)
}