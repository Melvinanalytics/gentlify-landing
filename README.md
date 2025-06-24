# 🌟 Gentlify - Empathische Erziehungsberatung

> KI-gestützte Kommunikationshilfe für bedürfnisorientierte Erziehung

Gentlify hilft Eltern in herausfordernden Situationen mit ihren Kindern durch empathische, bedürfnisorientierte Kommunikationsstrategien. Die App nutzt KI, um sofortige, personalisierte Lösungsvorschläge zu geben.

## ✨ Features

### 🎯 Simple (Kernfunktionen)
- **Situationseingabe**: Beschreibe herausfordernde Momente mit deinem Kind
- **Sofortige KI-Antworten**: Strukturierte Hilfe in <3 Sekunden
- **Kindprofil**: Personalisierte Antworten basierend auf Alter und Eigenschaften

### 💝 Lovable (Micro-Delights)
- **Empathische Spiegelung**: "Es klingt, als wärst du gerade überfordert..."
- **Bedürfnis-Badges**: Visuelle Darstellung erkannter Kinderbedürfnisse
- **Sanfte Animationen**: Beruhigende Übergänge und Typing-Effekte

### ✅ Complete (End-to-End)
- **Onboarding**: Kindprofil in 30 Sekunden erstellen
- **Chat-Interface**: Intuitive Kommunikation mit der KI
- **Feedback-System**: Bewertung der Antwortqualität
- **Persistenz**: Lokale Speicherung ohne Server-Abhängigkeit

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Framer Motion
- **State Management**: Zustand + LocalStorage
- **AI Integration**: OpenAI GPT-4o-mini
- **Styling**: Custom Design System mit Inter Font

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+ 
- OpenAI API Key

### Installation

```bash
# Repository klonen
git clone <repository-url>
cd gentlify-prototype

# Dependencies installieren
npm install

# Environment Setup
cp .env.local.example .env.local
# Füge deinen OpenAI API Key hinzu

# Development Server starten
npm run dev
```

Die App ist dann verfügbar unter `http://localhost:5174`

### Environment Variables

Kopiere `.env.local.example` zu `.env.local` und fülle die Werte aus:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (für Authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

Erstelle die folgenden Tabellen in deiner Supabase-Datenbank:

```sql
-- Users table (automatically created by Supabase Auth)

-- Profiles table
CREATE TABLE profiles (
  user_id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  name text,
  child_age integer,
  character_traits text[],
  parenting_style text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Chat history table
CREATE TABLE chat_history (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  message text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  summary text
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can only see their own profile" ON profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only see their own chat history" ON chat_history FOR ALL USING (auth.uid() = user_id);
```

## 📱 Usage

### 1. Anmeldung (Magic Link)
1. **E-Mail eingeben**: Deine E-Mail-Adresse
2. **Magic Link erhalten**: Prüfe dein Postfach
3. **Anmelden**: Klicke auf den Link in der E-Mail

### 2. Onboarding (30 Sekunden)
1. **Name eingeben**: "Wie heißt dein Kind?"
2. **Alter wählen**: Slider von 2-12 Jahren
3. **Eigenschaften auswählen**: 1-3 Persönlichkeitsmerkmale

### 3. Hauptmenü
- **Problem Solver**: Sofortige Hilfe bei herausfordernden Situationen
- **Personalisierung**: Kindprofil und Einstellungen anpassen
- **Erziehungsstil**: Erziehungsansatz entdecken und entwickeln
- **Tägliche Herausforderungen**: Alltägliche Erziehungssituationen meistern
- **Kommunikations-Quiz**: Kommunikationsfähigkeiten testen und verbessern

### 4. Chat Interface (Problem Solver)
1. **Situation beschreiben**: "Meine 4-jährige Tochter wirft sich auf den Boden..."
2. **Intent auswählen**: Was brauchst du jetzt?
   - 🧠 **Situation verstehen**: Psychologische Hintergründe
   - 🤗 **Für mich da sein**: Emotionale Unterstützung
   - 👶 **Kind verstehen**: Kinderperspektive
   - 💡 **Konkrete Lösung**: Direkte Handlungsschritte
3. **KI-Antwort erhalten**: 
   - Empathische Spiegelung
   - Strukturierte Antworten
   - Konkrete Handlungsvorschläge
4. **Feedback geben**: 👍👎 für Antwortqualität

## 🎨 Design System

### Farben
- **Primary**: Indigo (#4F46E5) - Vertrauen, Ruhe
- **Secondary**: Emerald (#10B981) - Wachstum, Hoffnung  
- **Accent**: Amber (#F59E0B) - Wärme, Energie
- **Background**: Gray-50 (#F9FAFB) - Neutralität

### Bedürfnis-Badges
- 🧡 **Autonomie**: Orange - "Dein Kind möchte selbst entscheiden"
- 💙 **Sicherheit**: Blau - "Dein Kind braucht Schutz und Vorhersagbarkeit"
- 💚 **Verbindung**: Grün - "Dein Kind sehnt sich nach Nähe"
- 💜 **Anerkennung**: Lila - "Dein Kind möchte gesehen werden"

## 🧪 Development

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/chat/       # LLM API endpoint
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Custom layout components
└── lib/
    ├── types.ts        # TypeScript definitions
    ├── store.ts        # Zustand store
    └── utils.ts        # Utility functions
```

## 📊 Performance Targets

- **First Paint**: <1.5s
- **LLM Response**: <3s
- **Bundle Size**: <500KB gzipped
- **Mobile Optimization**: 320px+ breakpoints

## 🎯 KPI Goals

- **Activation Rate**: ≥60% (User gibt erste Situation ein)
- **Day-7 Retention**: ≥30% (User kommt nach 7 Tagen zurück)
- **Response Quality**: ≥80% positive Bewertungen

## 🔒 Privacy & Security

- **Keine Server-Speicherung**: Alle Daten bleiben lokal
- **API-Sicherheit**: OpenAI API Keys nur server-side
- **HTTPS**: Erzwungen via Vercel
- **Datenschutz**: Keine Tracking-Scripts

## 🚫 Bewusste Limitierungen (Non-Goals)

- Mehrsprachigkeit
- User Registration/Login
- Conversation History Export
- Admin Dashboard
- Push Notifications
- Video/Audio Input

## 🔄 Roadmap

### v0.2 - User Feedback Integration
- [ ] User Testing mit 5-10 Eltern
- [ ] Response Quality Improvements
- [ ] Error Handling Verbesserungen

### v0.3 - Enhanced Experience  
- [ ] Mehr Persönlichkeitsmerkmale
- [ ] Erweiterte Bedürfniskategorien
- [ ] Performance Optimierungen

### v1.0 - Production Ready
- [ ] Comprehensive Testing
- [ ] Analytics Integration
- [ ] SEO Optimization

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Changes committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request öffnen

## 📄 License

Dieses Projekt ist unter der MIT License lizenziert.

## 🙏 Acknowledgments

- **Bedürfnisorientierte Erziehung**: Inspiriert von Jesper Juul, Alfie Kohn
- **Design System**: Basiert auf shadcn/ui und Tailwind CSS
- **AI Integration**: Powered by OpenAI GPT-4o-mini

---

**Entwickelt mit ❤️ für empathische Eltern**
