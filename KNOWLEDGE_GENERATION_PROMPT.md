# LLM Knowledge Generation Prompt
## Für erweiterte Wissensdatenbank der Gentlify Erziehungsberatung

---

## 🎯 AUFGABE
Generiere hochspezifische, wissenschaftlich belegte Erziehungsregeln und Logik-Schemata, die NICHT in Standard-LLM-Trainingsdaten enthalten sind. Fokus auf messbare, quantitative Fakten für altersgerechte Erziehungsberatung.

## 📊 ZIELFORMAT
Jeder Eintrag muss folgende Struktur haben:

```typescript
{
  id: "rule_[kategorie]_[nummer]",
  ageRange: [minMonths, maxMonths], // präzise Altersspanne
  category: "entwicklungspsychologie" | "neurobiologie" | "bindungstheorie" | "verhaltensregulation" | "emotionale_entwicklung",
  rule: "Quantifizierte Regel mit konkreten Zahlen/Prozenten",
  evidence: "Spezifische Studienreferenz mit Jahr und Autorin",
  application: "Konkrete Handlungsanweisung für Eltern",
  commonMisconception: "Häufiger Irrglaube der korrigiert wird",
  keyInsight: "Nicht-intuitiver Fakt der Eltern überrascht"
}
```

## 🧠 BEISPIELE FÜR GEWÜNSCHTE INHALTE

### Neurobiologische Präzision:
- "Impulskontrolle ist bei 3-Jährigen nur zu 23% entwickelt (vs. 78% bei 7-Jährigen)" - Quelle: Diamond, 2013
- "Stresshormon Cortisol bleibt nach Wutanfall 45-90 Minuten erhöht" - Casey et al., 2019
- "Präfrontaler Kortex wächst bis Alter 25, aber kritische Phase ist 18-36 Monate"

### Bindungstheorie-Spezifika:
- "Sichere Bindung: 65% der Kinder, aber nur 45% bei arbeitenden Müttern >50h/Woche"
- "Co-Regulation funktioniert optimal bei <15cm Körpernähe und Augenkontakt"
- "Trennungsangst peak bei 14-18 Monaten, dauert durchschnittlich 6-8 Monate"

### Verhaltensregulation:
- "Tantrums: 83% der 2-Jährigen, aber Dauer >15min bei nur 12% (pathologisch bei >30min)"
- "Emotional Coaching reduziert Problemverhalten um 42% (vs. 8% bei Ignorieren)"
- "Positive Verstärkung: Verhältnis 5:1 zu Kritik für optimale Entwicklung"

## 🔬 WISSENSCHAFTLICHE ANFORDERUNGEN

### QUELLEN-PRIORITÄT:
1. **Peer-reviewed Studien (2015-2024)**
2. **Longitudinalstudien mit >1000 Probanden**
3. **Meta-Analysen und systematische Reviews**
4. **Neurowissenschaftliche fMRI/EEG-Studien**

### BEVORZUGTE AUTOREN/INSTITUTIONEN:
- Laurence Steinberg (Adoleszenzforschung)
- Adele Diamond (Exekutive Funktionen)
- Mary Ainsworth Institute
- Center on the Developing Child (Harvard)
- Institute of Psychiatry (King's College London)

### VERMEIDEN:
- Allgemeine Entwicklungspsychologie-Basics
- Bekannte Theorien (Piaget, Erikson etc.)
- Populärwissenschaftliche Quellen
- Generische Erziehungsratgeber

## 📋 KATEGORIEN ZU ERWEITERN

### 1. NEUROBIOLOGIE & GEHIRNENTWICKLUNG
```
- Präzise Zeitfenster für kritische Entwicklungsphasen
- Quantifizierte Reifungsgeschwindigkeiten verschiedener Hirnregionen
- Messbare Auswirkungen von Stress/Trauma auf Hirnstrukturen
- Konkrete Zahlen zu Aufmerksamkeitsspannen nach Alter
```

### 2. EMOTIONSREGULATION
```
- Zeitdauer bis zur Beruhigung nach verschiedenen Trigger-Typen
- Effektivitäts-Prozentwerte verschiedener Beruhigungstechniken
- Altersgerechte Erwartungen an Selbstregulation (Minuten/Stunden)
- Herzfrequenz/Cortisol-Normalisierung nach emotionalen Ereignissen
```

### 3. SOZIALE ENTWICKLUNG
```
- Quantifizierte Entwicklung von Empathie und Theory of Mind
- Messbare Peer-Interaktion-Fähigkeiten nach Altersgruppen
- Zahlenwerte zu Kooperationsbereitschaft und Teilungsverhalten
- Konkrete Zeitrahmen für Freundschaftsbildung
```

### 4. SPRACHENTWICKLUNG & KOMMUNIKATION
```
- Präzise Wortschatz-Entwicklung (Wörter pro Monat)
- Verständnis komplexer Anweisungen nach Altersgruppen
- Effektivität verschiedener Kommunikationsstrategien (Prozent-Erfolg)
- Attention-Span für verbale Anweisungen (Sekunden/Minuten)
```

### 5. SCHLAF & BIORHYTHMUS
```
- Altersgerechte Schlafzyklen und REM-Phasen
- Auswirkungen von Schlafmangel auf Verhalten (quantifiziert)
- Optimale Zeitfenster für Schlaftraining
- Melatonin-Ausschüttung und natürliche Einschlafzeiten
```

## 🎯 ANWENDUNGSFOKUS

### FÜR CHAT-BOT PROMPTING:
Jede Regel soll in If-Then-Logik übersetzbar sein:
```
IF kind.alter >= 18 AND kind.alter <= 36 MONTHS
AND situation == "wutanfall"
THEN expected_duration = "2-15 Minuten normal"
AND intervention = "Co-Regulation durch Körpernähe"
AND avoid = "Rational erklären (Präfrontalcortex nicht entwickelt)"
```

### ELTERN-KOMMUNIKATION:
- Konkrete Zeitangaben statt "bald" oder "später"
- Messbare Erwartungen statt vage Hoffnungen
- Wissenschaftliche Beruhigung statt Bauchgefühl
- Normalisierung durch Vergleichszahlen

## 🚀 AUSGABEFORMAT

Generiere **20-30 Einträge** in folgendem TypeScript-Format:

```typescript
export const ADVANCED_KNOWLEDGE_RULES = [
  {
    id: "rule_neurobio_001",
    ageRange: [18, 42], // 1.5-3.5 Jahre
    category: "neurobiologie",
    rule: "Impulskontrolle ist bei 3-Jährigen nur zu 23% ausgeprägt, erreicht 50% erst mit 5 Jahren",
    evidence: "Diamond, A. (2013). Executive functions. Annual Review of Psychology, 64, 135-168",
    application: "Erwarte keine Selbstkontrolle bei Süßigkeiten - strukturiere Umgebung statt Willenskraft zu fordern",
    commonMisconception: "Kind ist stur/ungezogen",
    keyInsight: "Biologisch unmöglich, nicht charakterbedingt"
  },
  // ... weitere Einträge
]
```

## ⚠️ QUALITÄTSKRITERIEN

### JEDER EINTRAG MUSS HABEN:
- ✅ Konkrete Zahlen/Prozente/Zeitangaben
- ✅ Spezifische, nachprüfbare Quelle
- ✅ Sofort anwendbare Handlungsanweisung
- ✅ Korrektur eines verbreiteten Mythos
- ✅ Überraschenden, nicht-intuitiven Fakt

### VERMEIDE:
- ❌ Vage Formulierungen ("oft", "meist", "manchmal")
- ❌ Bekannte Allgemeinplätze
- ❌ Quellen älter als 2010
- ❌ Nicht-messbare Aussagen
- ❌ Kulturell spezifische Ratschläge

---

**ZIEL: Eine Wissensdatenbank die jeden Erziehungscoach und jede App durch präzise, wissenschaftliche Fakten übertrifft und Eltern mit konkreten, messbaren Erwartungen und Strategien ausstattet.**