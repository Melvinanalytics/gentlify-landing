# 🚀 Rapid Development Guide für Gentlify

## Quick Start - Development Mode aktivieren

```bash
# 1. Development Mode einschalten
./scripts/toggle-dev-mode.sh on

# 2. App starten
npm run dev

# 3. Öffne http://localhost:3000
# → Kein Login erforderlich! Direkt loslegen! 🎉
```

## Development Mode Features

### ✅ Was ist aktiviert:
- **Kein Login erforderlich** - Direkt zur App
- **Mock User** - Automatischer Dev-User (`dev@gentlify.app`)
- **Gelbes Banner** - Zeigt an, dass Dev-Mode aktiv ist
- **Volle App-Funktionalität** - Alle Features verfügbar

### 🛡️ Was ist deaktiviert:
- Supabase Authentication
- Magic Link Login
- Session Management
- Auth State Changes

## Workflow für Rapid Prototyping

### 1. Vor der Development Session

```bash
# Repository klonen (falls noch nicht geschehen)
git clone https://github.com/Melvinanalytics/gentlify-core.git
cd gentlify-core

# Dependencies installieren
npm install

# Dev Mode aktivieren
./scripts/toggle-dev-mode.sh on
```

### 2. Während der Development

```bash
# Terminal 1: Next.js Dev Server
npm run dev

# Terminal 2: Für Claude Code Interaktionen
# Bleibe im gentlify-core Verzeichnis für alle Änderungen
```

**Best Practices mit Claude Code:**
- Arbeite direkt im `gentlify-core` Verzeichnis
- Nutze konkrete Feature-Beschreibungen
- Lass Claude Code die TodoWrite Tools nutzen für bessere Organisation
- Committe regelmäßig deine Änderungen

### 3. Nach der Development Session

```bash
# Option A: Dev Mode beibehalten für nächste Session
# (Nichts tun - bleibt aktiviert)

# Option B: Production Mode aktivieren
./scripts/toggle-dev-mode.sh off

# Änderungen committen
git add .
git commit -m "feat: implement new features"
git push
```

## Environment Variables Setup

### `.env.local` Beispiel für Development:

```env
# Supabase (optional im Dev Mode)
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Development Mode
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_DEV_USER_EMAIL=dev@gentlify.app
NEXT_PUBLIC_DEV_USER_ID=dev-user-123
```

## Invitation System aktivieren (nach Development)

Das Invitation System ist bereits dokumentiert in `INVITATION_AUTH_IMPLEMENTATION.md`. 

Um es zu aktivieren:

1. **Dev Mode deaktivieren:**
   ```bash
   ./scripts/toggle-dev-mode.sh off
   ```

2. **Invitation System UI implementieren:**
   - Ersetze `Login.tsx` mit Invitation-basiertem Login
   - Implementiere Admin-Routes für Einladungen
   - Aktiviere die Datenbank-Tables (siehe Dokumentation)

3. **Deployment:**
   ```bash
   git push # Vercel deployed automatisch
   ```

## Häufige Szenarien

### Szenario 1: Neues Feature entwickeln
```bash
# 1. Dev Mode an
./scripts/toggle-dev-mode.sh on

# 2. Server starten
npm run dev

# 3. Mit Claude Code arbeiten
# "Implementiere ein neues Dashboard für Eltern-Statistiken"

# 4. Testen und iterieren
# Direkt im Browser ohne Login!
```

### Szenario 2: User Feedback einarbeiten
```bash
# 1. Feedback sammeln
# 2. Dev Mode aktivieren (falls nicht aktiv)
./scripts/toggle-dev-mode.sh on

# 3. Schnelle Iterationen
# 4. Deploy zu Vercel für User Testing
```

### Szenario 3: Production vorbereiten
```bash
# 1. Dev Mode aus
./scripts/toggle-dev-mode.sh off

# 2. Auth testen
npm run dev
# → Login Screen sollte erscheinen

# 3. Deploy
git push
```

## Troubleshooting

### Problem: "Dev Mode funktioniert nicht"
- Prüfe `.env.local`: `NEXT_PUBLIC_DEV_MODE=true`
- Server neu starten: `npm run dev`
- Browser Cache leeren

### Problem: "Änderungen werden nicht angezeigt"
- Next.js Cache löschen: `rm -rf .next`
- Server neu starten

### Problem: "Production Auth funktioniert nicht"
- Stelle sicher, dass Dev Mode AUS ist
- Prüfe Supabase Credentials in `.env.local`
- Prüfe Vercel Environment Variables

## Tips für effizientes Arbeiten mit Claude Code

1. **Nutze klare Anweisungen:**
   ```
   "Implementiere ein Eltern-Dashboard mit Statistiken über Gespräche"
   ```

2. **Referenziere bestehende Patterns:**
   ```
   "Erstelle eine neue Komponente ähnlich wie ChatInterface"
   ```

3. **Batch ähnliche Änderungen:**
   ```
   "Update alle Komponenten von 'Pacify' zu 'Gentlify'"
   ```

4. **Nutze Git Commits als Checkpoints:**
   ```
   "Committe die bisherigen Änderungen mit einer aussagekräftigen Message"
   ```

## Nächste Schritte

1. **Aktiviere Dev Mode jetzt:**
   ```bash
   ./scripts/toggle-dev-mode.sh on
   npm run dev
   ```

2. **Beginne mit der Entwicklung!** 🚀

3. **Bei Fragen:** Frag Claude Code nach diesem Guide!

---

**Hinweis:** Dieser Development Mode ist NUR für lokale Entwicklung gedacht. Stelle sicher, dass `NEXT_PUBLIC_DEV_MODE=false` in Production!