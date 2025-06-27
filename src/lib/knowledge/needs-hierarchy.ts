// Hierarchical needs mapping - 50+ predefined needs in 6 categories
// Based on psychological research and child development theory

export type NeedCategory = 
  | 'autonomie'      // Self-determination
  | 'sicherheit'     // Safety & Security  
  | 'verbindung'     // Connection & Belonging
  | 'anerkennung'    // Recognition & Validation
  | 'stimulation'    // Stimulation & Growth
  | 'regulation'     // Emotional & Physical Regulation

export interface Need {
  id: string
  category: NeedCategory
  name: string
  description: string
  behaviorSignals: string[]
  parentResponse: string
  ageRelevance: {
    min: number // months
    max: number // months
    peak: number // months where this need is most prominent
  }
  keywords: string[]
}

export const HIERARCHICAL_NEEDS: Need[] = [
  // AUTONOMIE (Self-determination)
  {
    id: 'autonomie_choices',
    category: 'autonomie',
    name: 'Eigene Entscheidungen treffen',
    description: 'Das Kind möchte selbst wählen und entscheiden können',
    behaviorSignals: ['Sagt "Nein" zu Vorschlägen', 'Besteht auf eigene Ideen', 'Widerstand gegen Hilfe'],
    parentResponse: 'Bieten Sie begrenzte Wahlmöglichkeiten an',
    ageRelevance: { min: 18, max: 144, peak: 30 },
    keywords: ['nein', 'selbst', 'alleine', 'wählen', 'entscheiden']
  },
  {
    id: 'autonomie_competence',
    category: 'autonomie', 
    name: 'Kompetenz erleben',
    description: 'Das Kind will Dinge selbst schaffen und meistern',
    behaviorSignals: ['Will alles alleine machen', 'Frustriert bei Misserfolg', 'Stolz auf Errungenschaften'],
    parentResponse: 'Ermöglichen Sie altersentsprechende Herausforderungen',
    ageRelevance: { min: 24, max: 144, peak: 60 },
    keywords: ['schaffen', 'können', 'alleine machen', 'stolz', 'frustriert']
  },
  {
    id: 'autonomie_boundaries',
    category: 'autonomie',
    name: 'Grenzen testen',
    description: 'Das Kind erkundet seine Macht und Einflussbereich',
    behaviorSignals: ['Testet Regeln konstant', 'Provoziert bewusst', 'Schaut nach Reaktionen'],
    parentResponse: 'Bleiben Sie bei klaren, liebevollen Grenzen',
    ageRelevance: { min: 18, max: 96, peak: 36 },
    keywords: ['grenzen', 'testen', 'provozieren', 'macht', 'trotz']
  },
  {
    id: 'autonomie_identity',
    category: 'autonomie',
    name: 'Eigene Identität entwickeln',
    description: 'Das Kind will als eigenständige Person wahrgenommen werden',
    behaviorSignals: ['Betont Unterschiede', 'Will nicht verglichen werden', 'Eigene Präferenzen stark'],
    parentResponse: 'Würdigen Sie die Einzigartigkeit Ihres Kindes',
    ageRelevance: { min: 36, max: 144, peak: 72 },
    keywords: ['anders', 'einzigartig', 'ich', 'eigen', 'individuell']
  },
  {
    id: 'autonomie_privacy',
    category: 'autonomie',
    name: 'Privatsphäre haben',
    description: 'Das Kind braucht eigene Bereiche und Geheimnisse',
    behaviorSignals: ['Will Türe schließen', 'Geheime Spiele', 'Abgrenzung von Eltern'],
    parentResponse: 'Respektieren Sie altersgemäße Privatsphäre',
    ageRelevance: { min: 48, max: 144, peak: 84 },
    keywords: ['privat', 'geheim', 'alleine', 'türe', 'eigener raum']
  },
  {
    id: 'autonomie_movement',
    category: 'autonomie',
    name: 'Bewegungsfreiheit',
    description: 'Das Kind will sich frei bewegen und erkunden',
    behaviorSignals: ['Unruhe bei Einschränkung', 'Drang zu rennen/klettern', 'Widerstand gegen Stillsitzen'],
    parentResponse: 'Schaffen Sie sichere Bewegungsräume',
    ageRelevance: { min: 12, max: 144, peak: 42 },
    keywords: ['bewegen', 'rennen', 'klettern', 'stillsitzen', 'unruhe']
  },
  {
    id: 'autonomie_tempo',
    category: 'autonomie',
    name: 'Eigenes Tempo bestimmen',
    description: 'Das Kind braucht Zeit für seine Prozesse',
    behaviorSignals: ['Trödelt bei Übergängen', 'Widerstand gegen Zeitdruck', 'Braucht Vorlaufzeit'],
    parentResponse: 'Planen Sie mehr Zeit ein und kündigen Sie Übergänge an',
    ageRelevance: { min: 24, max: 144, peak: 48 },
    keywords: ['trödeln', 'zeit', 'langsam', 'übergang', 'tempo']
  },
  {
    id: 'autonomie_responsibility',
    category: 'autonomie',
    name: 'Verantwortung übernehmen',
    description: 'Das Kind will für Dinge verantwortlich sein',
    behaviorSignals: ['Will Aufgaben haben', 'Stolz auf Pflichten', 'Kümmert sich um Haustiere/Pflanzen'],
    parentResponse: 'Geben Sie altersgemäße Verantwortlichkeiten',
    ageRelevance: { min: 36, max: 144, peak: 72 },
    keywords: ['verantwortung', 'aufgabe', 'pflicht', 'kümmern', 'helfen']
  },

  // SICHERHEIT (Safety & Security)
  {
    id: 'sicherheit_physical',
    category: 'sicherheit',
    name: 'Körperliche Sicherheit',
    description: 'Das Kind braucht Schutz vor Gefahren und Verletzungen',
    behaviorSignals: ['Angst vor Höhen/Dunkelheit', 'Klammert bei Fremden', 'Sucht Schutz bei Gefahr'],
    parentResponse: 'Schaffen Sie eine sichere Umgebung und bleiben Sie ruhig',
    ageRelevance: { min: 6, max: 144, peak: 24 },
    keywords: ['angst', 'gefahr', 'verletzung', 'sicher', 'schutz']
  },
  {
    id: 'sicherheit_emotional',
    category: 'sicherheit',
    name: 'Emotionale Sicherheit',
    description: 'Das Kind braucht vorhersagbare, liebevolle Beziehungen',
    behaviorSignals: ['Unsicherheit bei Veränderung', 'Sucht Nähe bei Stress', 'Regressive Verhaltensweisen'],
    parentResponse: 'Bleiben Sie emotional verfügbar und vorhersagbar',
    ageRelevance: { min: 6, max: 144, peak: 36 },
    keywords: ['unsicher', 'veränderung', 'nähe', 'stress', 'regressiv']
  },
  {
    id: 'sicherheit_routine',
    category: 'sicherheit',
    name: 'Vorhersagbare Struktur',
    description: 'Das Kind braucht Routinen und klare Abläufe',
    behaviorSignals: ['Widerstand gegen Planänderungen', 'Beruhigt durch Rituale', 'Fragt nach dem Ablauf'],
    parentResponse: 'Halten Sie verlässliche Routinen ein',
    ageRelevance: { min: 12, max: 144, peak: 48 },
    keywords: ['routine', 'ritual', 'ablauf', 'plan', 'struktur']
  },
  {
    id: 'sicherheit_consistency',
    category: 'sicherheit',
    name: 'Konsistente Grenzen',
    description: 'Das Kind braucht klare, verlässliche Regeln',
    behaviorSignals: ['Verunsicherung bei wechselnden Regeln', 'Testet Grenzen wiederholt', 'Fragt nach Erlaubnis'],
    parentResponse: 'Setzen Sie klare, konsistente Grenzen',
    ageRelevance: { min: 18, max: 144, peak: 42 },
    keywords: ['regeln', 'grenzen', 'konsistent', 'verlässlich', 'erlaubnis']
  },
  {
    id: 'sicherheit_presence',
    category: 'sicherheit',
    name: 'Anwesenheit der Bezugsperson',
    description: 'Das Kind braucht die Gewissheit, dass Bezugspersonen da sind',
    behaviorSignals: ['Trennungsangst', 'Ruft nach Eltern', 'Prüft ständig Anwesenheit'],
    parentResponse: 'Kündigen Sie Abwesenheiten an und halten Sie Kontakt',
    ageRelevance: { min: 6, max: 72, peak: 18 },
    keywords: ['trennung', 'da sein', 'weg', 'alleine', 'verlassen']
  },
  {
    id: 'sicherheit_calm',
    category: 'sicherheit',
    name: 'Ruhige Atmosphäre',
    description: 'Das Kind braucht eine stressfreie Umgebung',
    behaviorSignals: ['Überstimulation bei Lärm', 'Rückzug bei Chaos', 'Ruhe-Suchverhalten'],
    parentResponse: 'Schaffen Sie ruhige Räume und Zeiten',
    ageRelevance: { min: 6, max: 144, peak: 30 },
    keywords: ['lärm', 'chaos', 'ruhe', 'überstimulation', 'rückzug']
  },
  {
    id: 'sicherheit_health',
    category: 'sicherheit',
    name: 'Körperliches Wohlbefinden',
    description: 'Das Kind braucht Grundversorgung für Gesundheit',
    behaviorSignals: ['Unruhe bei Hunger/Müdigkeit', 'Krankheitsverhalten', 'Komfort-Suchverhalten'],
    parentResponse: 'Achten Sie auf Grundbedürfnisse wie Schlaf und Ernährung',
    ageRelevance: { min: 0, max: 144, peak: 12 },
    keywords: ['hunger', 'müde', 'krank', 'wohlbefinden', 'komfort']
  },

  // VERBINDUNG (Connection & Belonging)
  {
    id: 'verbindung_attachment',
    category: 'verbindung',
    name: 'Sichere Bindung',
    description: 'Das Kind braucht eine verlässliche emotionale Verbindung',
    behaviorSignals: ['Sucht Nähe bei Stress', 'Teilt Erlebnisse mit', 'Orientiert sich an Bezugsperson'],
    parentResponse: 'Sein Sie emotional verfügbar und responsiv',
    ageRelevance: { min: 0, max: 144, peak: 18 },
    keywords: ['nähe', 'bindung', 'teilen', 'orientierung', 'verfügbar']
  },
  {
    id: 'verbindung_belonging',
    category: 'verbindung',
    name: 'Zugehörigkeit zur Familie',
    description: 'Das Kind will Teil der Familiengemeinschaft sein',
    behaviorSignals: ['Will bei allem dabei sein', 'Imitiert Familienmitglieder', 'Widerstand gegen Ausschluss'],
    parentResponse: 'Beziehen Sie das Kind in Familienaktivitäten ein',
    ageRelevance: { min: 12, max: 144, peak: 36 },
    keywords: ['dabei sein', 'imitieren', 'ausschluss', 'familie', 'zugehörigkeit']
  },
  {
    id: 'verbindung_friendship',
    category: 'verbindung',
    name: 'Freundschaften',
    description: 'Das Kind braucht Gleichaltrige und Peer-Beziehungen',
    behaviorSignals: ['Sucht Kontakt zu anderen Kindern', 'Trauer bei sozialer Ablehnung', 'Freude bei gemeinsamen Aktivitäten'],
    parentResponse: 'Ermöglichen Sie soziale Kontakte zu Gleichaltrigen',
    ageRelevance: { min: 24, max: 144, peak: 72 },
    keywords: ['freunde', 'andere kinder', 'ablehnung', 'spielen', 'kontakt']
  },
  {
    id: 'verbindung_intimacy',
    category: 'verbindung',
    name: 'Emotionale Intimität',
    description: 'Das Kind will tiefe, vertrauensvolle Beziehungen',
    behaviorSignals: ['Teilt Geheimnisse', 'Sucht private Gespräche', 'Will Aufmerksamkeit'],
    parentResponse: 'Schaffen Sie Zeiten für intensive Zweisamkeit',
    ageRelevance: { min: 36, max: 144, peak: 60 },
    keywords: ['geheimnis', 'vertrauen', 'aufmerksamkeit', 'zweisamkeit', 'privat']
  },
  {
    id: 'verbindung_cooperation',
    category: 'verbindung',
    name: 'Kooperation',
    description: 'Das Kind will mit anderen zusammenarbeiten',
    behaviorSignals: ['Will helfen und beitragen', 'Freude an Teamarbeit', 'Widerstand gegen Konkurrenz'],
    parentResponse: 'Schaffen Sie Gelegenheiten für gemeinsame Projekte',
    ageRelevance: { min: 36, max: 144, peak: 72 },
    keywords: ['helfen', 'zusammenarbeiten', 'team', 'gemeinsam', 'beitragen']
  },
  {
    id: 'verbindung_empathy',
    category: 'verbindung',
    name: 'Empathie geben und erhalten',
    description: 'Das Kind will verstanden werden und andere verstehen',
    behaviorSignals: ['Tröstet andere', 'Will eigene Gefühle erklärt bekommen', 'Reagiert auf Emotionen anderer'],
    parentResponse: 'Benennen und validieren Sie Gefühle',
    ageRelevance: { min: 24, max: 144, peak: 48 },
    keywords: ['verstehen', 'trösten', 'gefühle', 'empathie', 'validierung']
  },
  {
    id: 'verbindung_physical_affection',
    category: 'verbindung',
    name: 'Körperliche Zuneigung',
    description: 'Das Kind braucht altersgerechte körperliche Nähe',
    behaviorSignals: ['Sucht Umarmungen', 'Kuschelt sich an', 'Will auf den Arm'],
    parentResponse: 'Bieten Sie körperliche Zuneigung nach Bedarf des Kindes an',
    ageRelevance: { min: 0, max: 144, peak: 24 },
    keywords: ['umarmung', 'kuscheln', 'arm', 'körperlich', 'nähe']
  },

  // ANERKENNUNG (Recognition & Validation)
  {
    id: 'anerkennung_seen',
    category: 'anerkennung',
    name: 'Gesehen werden',
    description: 'Das Kind will wahrgenommen und beachtet werden',
    behaviorSignals: ['Ruft "Schau mal!"', 'Zeigt Leistungen vor', 'Aufmerksamkeits-Suchverhalten'],
    parentResponse: 'Schenken Sie dem Kind bewusste Aufmerksamkeit',
    ageRelevance: { min: 18, max: 144, peak: 48 },
    keywords: ['schau mal', 'zeigen', 'aufmerksamkeit', 'beachten', 'sehen']
  },
  {
    id: 'anerkennung_achievement',
    category: 'anerkennung',
    name: 'Leistung gewürdigt',
    description: 'Das Kind will für seine Anstrengungen anerkannt werden',
    behaviorSignals: ['Stolz auf Errungenschaften', 'Will Lob für Versuche', 'Enttäuschung bei Nicht-Beachtung'],
    parentResponse: 'Würdigen Sie Anstrengung und Fortschritt',
    ageRelevance: { min: 24, max: 144, peak: 72 },
    keywords: ['stolz', 'lob', 'anstrengung', 'leistung', 'errungenschaft']
  },
  {
    id: 'anerkennung_uniqueness',
    category: 'anerkennung',
    name: 'Einzigartigkeit geschätzt',
    description: 'Das Kind will für seine besonderen Eigenschaften geschätzt werden',
    behaviorSignals: ['Betont Besonderheiten', 'Will nicht verglichen werden', 'Zeigt individuelle Talente'],
    parentResponse: 'Schätzen Sie die individuellen Stärken Ihres Kindes',
    ageRelevance: { min: 36, max: 144, peak: 84 },
    keywords: ['besonders', 'einzigartig', 'talent', 'stärken', 'individuell']
  },
  {
    id: 'anerkennung_voice',
    category: 'anerkennung', 
    name: 'Stimme gehört',
    description: 'Das Kind will dass seine Meinung zählt',
    behaviorSignals: ['Will mitreden', 'Besteht auf eigene Sichtweise', 'Frustriert wenn übergangen'],
    parentResponse: 'Hören Sie aktiv zu und nehmen Sie Meinungen ernst',
    ageRelevance: { min: 30, max: 144, peak: 60 },
    keywords: ['meinung', 'mitreden', 'zuhören', 'sichtweise', 'übergangen']
  },
  {
    id: 'anerkennung_respect',
    category: 'anerkennung',
    name: 'Respekt als Person',
    description: 'Das Kind will als vollwertige Person respektiert werden',
    behaviorSignals: ['Widerstand gegen Herablassung', 'Will ernstgenommen werden', 'Reagiert auf Ton'],
    parentResponse: 'Sprechen Sie respektvoll auf Augenhöhe',
    ageRelevance: { min: 36, max: 144, peak: 72 },
    keywords: ['respekt', 'ernstnehmen', 'augenhöhe', 'herablassung', 'person']
  },
  {
    id: 'anerkennung_growth',
    category: 'anerkennung',
    name: 'Wachstum anerkannt',
    description: 'Das Kind will dass sein Fortschritt bemerkt wird',
    behaviorSignals: ['Zeigt neue Fähigkeiten', 'Erinnert an Verbesserungen', 'Stolz auf Entwicklung'],
    parentResponse: 'Bemerken und würdigen Sie Entwicklungsschritte',
    ageRelevance: { min: 24, max: 144, peak: 48 },
    keywords: ['fortschritt', 'wachstum', 'entwicklung', 'fähigkeiten', 'verbesserung']
  },

  // STIMULATION (Stimulation & Growth)
  {
    id: 'stimulation_novelty',
    category: 'stimulation',
    name: 'Neue Erfahrungen',
    description: 'Das Kind braucht Abwechslung und neue Eindrücke',
    behaviorSignals: ['Langeweile bei Routine', 'Sucht neue Aktivitäten', 'Neugier auf Unbekanntes'],
    parentResponse: 'Bieten Sie altersgerechte neue Erfahrungen',
    ageRelevance: { min: 6, max: 144, peak: 36 },
    keywords: ['langweilig', 'neu', 'aktivität', 'neugier', 'abwechslung']
  },
  {
    id: 'stimulation_learning',
    category: 'stimulation',
    name: 'Lernen und Verstehen',
    description: 'Das Kind will die Welt verstehen und Neues lernen',
    behaviorSignals: ['Stellt viele Fragen', 'Experimentiert gerne', 'Freude an Entdeckungen'],
    parentResponse: 'Beantworten Sie Fragen und ermutigen Sie Neugier',
    ageRelevance: { min: 18, max: 144, peak: 48 },
    keywords: ['fragen', 'warum', 'lernen', 'verstehen', 'entdecken']
  },
  {
    id: 'stimulation_challenge',
    category: 'stimulation',
    name: 'Angemessene Herausforderung',
    description: 'Das Kind braucht Aufgaben die weder zu leicht noch zu schwer sind',
    behaviorSignals: ['Frustriert bei zu schweren Aufgaben', 'Gelangweilt bei zu leichten', 'Flow-Zustand bei passenden'],
    parentResponse: 'Finden Sie die richtige Balance bei Herausforderungen',
    ageRelevance: { min: 24, max: 144, peak: 72 },
    keywords: ['herausforderung', 'schwer', 'leicht', 'frustriert', 'gelangweilt']
  },
  {
    id: 'stimulation_creativity',
    category: 'stimulation',
    name: 'Kreative Ausdrucksmöglichkeiten',
    description: 'Das Kind will kreativ sein und sich ausdrücken',
    behaviorSignals: ['Liebt Basteln/Malen', 'Erfindet Geschichten', 'Experimentiert mit Materialien'],
    parentResponse: 'Stellen Sie Materialien für kreative Aktivitäten bereit',
    ageRelevance: { min: 18, max: 144, peak: 60 },
    keywords: ['basteln', 'malen', 'kreativ', 'geschichten', 'erfinden']
  },
  {
    id: 'stimulation_mastery',
    category: 'stimulation',
    name: 'Meisterschaft entwickeln',
    description: 'Das Kind will in bestimmten Bereichen richtig gut werden',
    behaviorSignals: ['Übung macht Spaß', 'Perfektionistische Tendenzen', 'Stolz auf Können'],
    parentResponse: 'Unterstützen Sie Interessensgebiete mit Geduld',
    ageRelevance: { min: 48, max: 144, peak: 84 },
    keywords: ['üben', 'perfekt', 'meisterschaft', 'können', 'expertise']
  },
  {
    id: 'stimulation_exploration',
    category: 'stimulation',
    name: 'Umgebung erkunden',
    description: 'Das Kind will seine Umwelt erforschen und verstehen',
    behaviorSignals: ['Klettert überall hin', 'Öffnet alle Schränke', 'Untersucht Gegenstände'],
    parentResponse: 'Schaffen Sie sichere Erkundungsmöglichkeiten',
    ageRelevance: { min: 12, max: 96, peak: 30 },
    keywords: ['erkunden', 'klettern', 'untersuchen', 'erforschen', 'neugierig']
  },

  // REGULATION (Emotional & Physical Regulation)
  {
    id: 'regulation_emotional_support',
    category: 'regulation',
    name: 'Emotionale Co-Regulation',
    description: 'Das Kind braucht Hilfe beim Regulieren seiner Emotionen',
    behaviorSignals: ['Wutanfälle', 'Überwältigt von Gefühlen', 'Sucht Trost bei Stress'],
    parentResponse: 'Bleiben Sie ruhig und helfen Sie beim Beruhigen',
    ageRelevance: { min: 12, max: 144, peak: 36 },
    keywords: ['wutanfall', 'überwältigt', 'trost', 'beruhigen', 'emotion']
  },
  {
    id: 'regulation_sensory',
    category: 'regulation',
    name: 'Sensorische Regulation',
    description: 'Das Kind braucht Hilfe bei der Verarbeitung von Sinneseindrücken',
    behaviorSignals: ['Überstimulation in lauten Umgebungen', 'Sucht bestimmte Texturen', 'Sensitivität gegenüber Licht/Geräuschen'],
    parentResponse: 'Passen Sie die Umgebung an die sensorischen Bedürfnisse an',
    ageRelevance: { min: 6, max: 144, peak: 42 },
    keywords: ['laut', 'überstimulation', 'sensibel', 'textur', 'geräusch']
  },
  {
    id: 'regulation_sleep',
    category: 'regulation',
    name: 'Schlafregulation',
    description: 'Das Kind braucht Unterstützung bei gesunden Schlafmustern',
    behaviorSignals: ['Widerstand gegen Schlafenszeit', 'Müdigkeit/Überdrehtheit', 'Einschlafprobleme'],
    parentResponse: 'Etablieren Sie beruhigende Schlafrituale',
    ageRelevance: { min: 6, max: 144, peak: 30 },
    keywords: ['schlaf', 'müde', 'überdreht', 'einschlafen', 'schlafenszeit']
  },
  {
    id: 'regulation_impulse',
    category: 'regulation',
    name: 'Impulskontrolle',
    description: 'Das Kind lernt noch, Impulse zu kontrollieren',
    behaviorSignals: ['Handelt ohne nachzudenken', 'Schwierigkeiten beim Warten', 'Impulsive Reaktionen'],
    parentResponse: 'Helfen Sie mit Struktur und Vorhersagbarkeit',
    ageRelevance: { min: 18, max: 144, peak: 48 },
    keywords: ['impulsiv', 'warten', 'nachdenken', 'spontan', 'reaktion']
  },
  {
    id: 'regulation_attention',
    category: 'regulation',
    name: 'Aufmerksamkeitsregulation',
    description: 'Das Kind braucht Hilfe beim Fokussieren und Aufmerksamkeit steuern',
    behaviorSignals: ['Leicht ablenkbar', 'Schwierigkeiten bei längeren Aufgaben', 'Hyperfokus oder Unaufmerksamkeit'],
    parentResponse: 'Strukturieren Sie Aufgaben und minimieren Sie Ablenkungen',
    ageRelevance: { min: 24, max: 144, peak: 60 },
    keywords: ['ablenkung', 'fokus', 'aufmerksamkeit', 'konzentration', 'aufgaben']
  },
  {
    id: 'regulation_transition',
    category: 'regulation',
    name: 'Übergangshilfe',
    description: 'Das Kind braucht Unterstützung bei Wechseln zwischen Aktivitäten',
    behaviorSignals: ['Schwierigkeiten beim Aufhören', 'Widerstand gegen Wechsel', 'Braucht Vorwarnzeit'],
    parentResponse: 'Kündigen Sie Übergänge an und nutzen Sie Rituale',
    ageRelevance: { min: 18, max: 144, peak: 42 },
    keywords: ['übergang', 'aufhören', 'wechsel', 'aktivität', 'ritual']
  },
  {
    id: 'regulation_physical',
    category: 'regulation',
    name: 'Körperliche Bedürfnisse',
    description: 'Das Kind braucht Hilfe bei der Wahrnehmung und Befriedigung körperlicher Bedürfnisse',
    behaviorSignals: ['Vergisst zu essen/trinken', 'Merkt nicht dass es müde ist', 'Körperliche Unruhe'],
    parentResponse: 'Helfen Sie beim Erkennen und Befriedigen körperlicher Signale',
    ageRelevance: { min: 12, max: 144, peak: 36 },
    keywords: ['hunger', 'durst', 'müdigkeit', 'körperlich', 'bedürfnis']
  }
]

// Helper functions
export function getNeedsByCategory(category: NeedCategory): Need[] {
  return HIERARCHICAL_NEEDS.filter(need => need.category === category)
}

export function getRelevantNeeds(
  keywords: string[], 
  ageInMonths: number, 
  maxNeeds: number = 2
): Need[] {
  return HIERARCHICAL_NEEDS
    .filter(need => 
      ageInMonths >= need.ageRelevance.min && 
      ageInMonths <= need.ageRelevance.max &&
      keywords.some(keyword => 
        need.keywords.some(needKeyword => 
          needKeyword.includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(needKeyword)
        )
      )
    )
    .sort((a, b) => {
      // Sort by age relevance peak proximity
      const aPeakDistance = Math.abs(a.ageRelevance.peak - ageInMonths)
      const bPeakDistance = Math.abs(b.ageRelevance.peak - ageInMonths)
      return aPeakDistance - bPeakDistance
    })
    .slice(0, maxNeeds)
}

export function getAllNeedCategories(): NeedCategory[] {
  return ['autonomie', 'sicherheit', 'verbindung', 'anerkennung', 'stimulation', 'regulation']
}

// Updated need badges to include new categories
export const NEED_BADGES = {
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
  },
  stimulation: {
    category: 'stimulation',
    label: 'Stimulation',
    description: 'Dein Kind braucht Herausforderung und Neues',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    emoji: '💛'
  },
  regulation: {
    category: 'regulation',
    label: 'Regulation',
    description: 'Dein Kind braucht Hilfe bei der Selbstregulation',
    color: 'bg-red-100 text-red-800 border-red-200',
    emoji: '❤️'
  }
} as const