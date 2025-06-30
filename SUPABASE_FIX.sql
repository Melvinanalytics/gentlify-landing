-- Fix für Newsletter Signups wenn RLS aktiviert ist
-- Führe dieses SQL in Supabase aus

-- Option 1: RLS deaktivieren (einfachste Lösung für Newsletter)
ALTER TABLE newsletter_signups DISABLE ROW LEVEL SECURITY;

-- ODER Option 2: RLS Policies für Anonymous Users erlauben
-- (Falls du RLS behalten willst)

-- Erst alle alten Policies löschen
DROP POLICY IF EXISTS "Anyone can insert newsletter signups" ON newsletter_signups;
DROP POLICY IF EXISTS "Authenticated users can read newsletter signups" ON newsletter_signups;

-- Neue Policies erstellen
-- Policy: Jeder (auch anonymous) kann Newsletter-Anmeldungen erstellen
CREATE POLICY "Enable insert for anon" ON newsletter_signups
FOR INSERT 
TO anon
WITH CHECK (true);

-- Policy: Jeder kann seine eigene Email prüfen (für Duplicate Check)
CREATE POLICY "Enable select own email for anon" ON newsletter_signups
FOR SELECT
TO anon
USING (true);

-- Test ob die Tabelle richtig funktioniert:
-- INSERT INTO newsletter_signups (email, source) VALUES ('test@example.com', 'test');