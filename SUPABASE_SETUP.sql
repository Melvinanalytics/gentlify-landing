-- Newsletter Signups Table Setup für Supabase
-- Kopiere dieses SQL in den Supabase SQL Editor

CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  source VARCHAR(100) DEFAULT 'landing_page',
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_source ON newsletter_signups(source);

-- RLS (Row Level Security) Policy - erlaubt Inserts für alle
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann neue Newsletter-Anmeldungen erstellen
CREATE POLICY "Anyone can insert newsletter signups" ON newsletter_signups
FOR INSERT WITH CHECK (true);

-- Policy: Nur authentifizierte Benutzer können lesen (für Dashboard)
CREATE POLICY "Authenticated users can read newsletter signups" ON newsletter_signups
FOR SELECT USING (auth.role() = 'authenticated');

-- Optional: Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_signups_updated_at 
    BEFORE UPDATE ON newsletter_signups 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();