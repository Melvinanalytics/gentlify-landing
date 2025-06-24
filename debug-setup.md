# 🚨 Internal Server Error Debugging Guide

## Aktuelle Probleme behoben:

### ✅ 1. OpenAI API Key Issue
- **Problem**: API-Route schlägt fehl wenn OPENAI_API_KEY fehlt
- **Lösung**: Mock-Response für Development ohne API Key

### ✅ 2. Store Migration 
- **Problem**: Alte `age` vs neue `ageYears`/`ageMonths` Struktur
- **Lösung**: Automatische Migration in Zustand Store

### ✅ 3. CSS Parsing Errors
- **Problem**: @import Statements an falscher Position
- **Lösung**: Korrekte @import Reihenfolge in globals.css

## 🔧 Schritt-für-Schritt Fehlerbehebung:

### Schritt 1: Cache komplett löschen
```bash
cd /Users/melvinvoigtlaender/Desktop/pacify-prototype
rm -rf .next
rm -rf node_modules/.cache
npm install
```

### Schritt 2: Fresh Build
```bash
npm run fresh
```

### Schritt 3: LocalStorage löschen
1. Öffne Safari Entwicklertools (Cmd+Opt+I)
2. Application → Local Storage → localhost:5174
3. Lösche `pacify-store` Eintrag
4. Reload Page

### Schritt 4: OpenAI API Key (Optional)
```bash
# Erstelle .env.local Datei:
echo "OPENAI_API_KEY=your_api_key_here" > .env.local
```

**Hinweis**: Ohne API Key funktioniert die App mit Mock-Antworten!

## 🐛 Fallback Debugging:

### Console Logs checken:
1. Browser: Entwicklertools → Console
2. Server: Terminal wo `npm run dev` läuft

### Häufige Error-Patterns:

#### "Expected date, received string"
→ Store wurde bereits migriert ✅

#### "Cannot find module globals.css"  
→ `npm run clean && npm install` ausführen

#### "OPENAI_API_KEY not configured"
→ Normal! App läuft mit Mock-Responses

#### "ENOENT build-manifest.json"
→ `rm -rf .next && npm run build` ausführen

## 🎯 Finale Test-Sequenz:

```bash
# 1. Alles zurücksetzen
cd /Users/melvinvoigtlaender/Desktop/pacify-prototype
rm -rf .next
rm -rf node_modules/.cache

# 2. Neu installieren  
npm install

# 3. Build testen
npm run build

# 4. Dev starten
npm run dev

# 5. Browser öffnen
open http://localhost:5174
```

## ✨ Erwartetes Verhalten:

- ✅ App lädt ohne Errors
- ✅ ProfileSetup zeigt Age-Picker (Jahre + Monate)  
- ✅ Chat funktioniert mit Mock-Antworten
- ✅ "Reset Store" Button verfügbar in Development

Falls weiterhin Probleme auftreten, bitte **genaue Error-Logs** aus Browser Console und Terminal senden! 