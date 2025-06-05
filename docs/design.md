# 🎨 Design – Pacify Prototype

## 🏛️ Architecture Overview

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────┐
│   Next.js App  │    │  OpenAI API  │    │ LocalStorage│
│  (Frontend)     │────│   (LLM)      │    │ (Profile)   │
│                 │    │              │    │             │
└─────────────────┘    └──────────────┘    └─────────────┘
```

## 🎯 Component Hierarchy

```
App
├── ProfileSetup (First-Time)
│   ├── ChildAgeInput
│   ├── PersonalityTraits  
│   └── ParentingStyle
├── ChatInterface (Main App)
│   ├── Header (Child Info)
│   ├── MessageList
│   │   ├── EmptyState
│   │   ├── UserMessage
│   │   └── AIResponse
│   │       ├── EmpathyMirror
│   │       ├── NeedsBadges  
│   │       ├── ActionSteps
│   │       └── FeedbackButtons
│   └── InputArea
│       ├── TextInput
│       └── SubmitButton
└── LoadingStates
    ├── TypingIndicator
    └── ThinkingAnimation
```

## 🎨 Lovable Micro-Delights

### 1. Empathische Spiegelung
- Antworten beginnen mit: "Es klingt so, als ob du gerade..."
- Warme, einfühlsame Sprache mit beruhigender Wirkung
- Erkennung emotionaler Zustände (überfordert, müde, frustriert)

### 2. Sanfte Animationen  
- **Typing Effect**: Antworten erscheinen Wort für Wort (150ms Delay)
- **Gradient Transitions**: Beruhigende Übergänge von Blau zu Grün
- **Pulse Animation**: Submit-Button pulsiert sanft bei Eingabe

### 3. Bedürfnis-Badges
- 🧡 **Autonomie**: "Dein Kind möchte selbst entscheiden"
- 💙 **Sicherheit**: "Dein Kind braucht Schutz und Vorhersagbarkeit"  
- 💚 **Verbindung**: "Dein Kind sehnt sich nach Nähe"
- 💜 **Anerkennung**: "Dein Kind möchte gesehen werden"

## 📱 UI Flows

### Onboarding Flow (30 Sekunden)
1. **Landing**: "Hallo! Lass uns dein Kind kennenlernen."
2. **Alter**: Slider 2-12 Jahre
3. **Eigenschaften**: 3 aus 9 Traits auswählen (sensibel, energiereich, schüchtern...)
4. **Fertig**: "Perfekt! Erzähl mir von eurer aktuellen Situation."

### Core Chat Flow  
1. **Eingabe**: "Meine 4-jährige Tochter wirft sich auf den Boden..."
2. **Thinking**: Pulsierender Kreis mit "Ich denke nach..."
3. **Antwort**: 
   - Spiegelung (2-3 Sätze)
   - Bedürfnis-Badges (1-2 erkannte Bedürfnisse)
   - 3 konkrete Handlungsschritte
4. **Feedback**: 👍👎 Buttons

### Empty States
- **Erste Nutzung**: "Erzähl mir von einer herausfordernden Situation mit deinem Kind."
- **Nach Feedback**: "Wie ist es gelaufen? Erzähl mir mehr!"

## 🎨 Design System

### Farben (Beruhigend & Warm)
```css
--primary: #4F46E5 (Indigo)
--secondary: #10B981 (Emerald)  
--accent: #F59E0B (Amber)
--text: #1F2937 (Gray-800)
--background: #F9FAFB (Gray-50)
--card: #FFFFFF
```

### Typography
- **Headlines**: Inter Bold 24px/32px
- **Body**: Inter Regular 16px/24px  
- **Labels**: Inter Medium 14px/20px

### Spacing
- Container: max-width 768px, mx-auto
- Padding: 16px mobile, 24px desktop
- Card spacing: 20px zwischen Elementen

## 📐 Wireframes

### Mobile Layout (Primary)
```
┌─────────────────────┐
│ 👶 Lisa, 4 Jahre    │ ← Header mit Kind-Info
├─────────────────────┤
│                     │
│ [Empty State Text]  │ ← Zentriert, freundlich
│                     │
├─────────────────────┤
│ "Erzähl mir von..." │ ← Placeholder
│ [Textfeld]          │
│           [Senden]  │ ← Rechts ausgerichtet
└─────────────────────┘
```

### Chat Response Layout
```
┌─────────────────────┐
│ Es klingt, als wärst│ ← Empathie-Spiegelung
│ du gerade müde...   │
│                     │
│ 🧡 Autonomie        │ ← Bedürfnis-Badges  
│ 💚 Verbindung       │
│                     │
│ 1. Geh auf Augenhöhe│ ← 3 Handlungsschritte
│ 2. Benenne Gefühle  │
│ 3. Biete Optionen   │
│                     │
│     👍      👎      │ ← Feedback
└─────────────────────┘
``` 