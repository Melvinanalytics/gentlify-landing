# 📋 Requirements – Pacify Prototype

## 🎯 Job To Be Done (JTBD)
**"Wenn mein Kind einen Wutanfall hat oder sich schwierig verhält, möchte ich sofort empathische und bedürfnisorientierte Kommunikationsstrategien erhalten, damit ich ruhig bleiben und die Situation deeskalieren kann."**

## 🧠 SLC-Approach

### Simple (Kernfähigkeiten - max. 3)
1. **Situationseingabe**: Textfeld für Beschreibung der aktuellen Situation
2. **Sofortige LLM-Antwort**: Strukturierte Antwort in <3 Sekunden  
3. **Kindprofil**: Alter + 2-3 Charaktereigenschaften für personalisierte Antworten

### Lovable (3 Micro-Delights)
1. **Empathische Spiegelung**: "Es klingt, als wärst du gerade überfordert..." 
2. **Sanfte Animationen**: Typing-Effekt bei Antworten + beruhigende Farbübergänge
3. **Bedürfnis-Badges**: Kleine farbige Labels (🧡 Autonomie, 💙 Sicherheit, 💚 Verbindung)

### Complete (End-to-End Flow)
- **Onboarding**: Kindprofil anlegen (30 Sek)
- **Core Task**: Situation eingeben → strukturierte Antwort erhalten  
- **Success State**: 3 konkrete Handlungsschritte + Bedürfnisanalyse
- **Feedback Loop**: Daumen hoch/runter für Antwortqualität
- **Empty States**: Hilfstexte bei leerem Chat

## 👥 Zielgruppe
- Eltern von Kindern 2-12 Jahre
- Interesse an bedürfnisorientierter Erziehung
- Smartphone/Desktop-affin
- Zeit-/Stressbudget: 30 Sek - 2 Min pro Anfrage

## ✅ MVP Akzeptanzkriterien
- [ ] Textfeld + Submit funktioniert
- [ ] LLM-Integration (OpenAI GPT-4o-mini)
- [ ] Antwortstruktur: Spiegelung + Bedürfnisse + 3 Schritte
- [ ] Kindprofil speichern (LocalStorage)
- [ ] Responsive Design (Mobile-First)
- [ ] Antwortzeit < 3 Sekunden
- [ ] Feedback-System (👍👎)

## 🚫 Non-Goals (bewusst ausgelassen)
- Mehrsprachigkeit
- User Registration/Login  
- Conversation History
- Admin Dashboard
- Push Notifications
- Offline-Modus
- Video/Audio Input

## 📊 KPI-Ziele
- **Activation Rate**: ≥60% (User gibt erste Situation ein)
- **Day-7 Retention**: ≥30% (User kommt nach 7 Tagen zurück)
- **NPS-Proxy**: ≥25 (basierend auf Feedback-Bewertungen)
- **Response Quality**: ≥80% positive Bewertungen 