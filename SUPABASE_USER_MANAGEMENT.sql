-- GENTLIFY: Sauberes, skalierbares User Management Setup
-- Führe dieses SQL in Supabase aus für korrektes RLS Setup

-- ============================================
-- 1. PROFILES TABLE (Erweiterte User-Daten)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  onboarding_completed BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS für Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 2. NEWSLETTER SIGNUPS (Öffentlich zugänglich)
-- ============================================
-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can insert newsletter signups" ON newsletter_signups;
DROP POLICY IF EXISTS "Authenticated users can read newsletter signups" ON newsletter_signups;
DROP POLICY IF EXISTS "Enable insert for anon" ON newsletter_signups;
DROP POLICY IF EXISTS "Enable select own email for anon" ON newsletter_signups;

-- Ensure RLS is enabled
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Newsletter Policies (korrekt für anonymous access)
CREATE POLICY "Anyone can sign up for newsletter" ON newsletter_signups
  FOR INSERT 
  TO public  -- Wichtig: public, nicht anon!
  WITH CHECK (true);

CREATE POLICY "Anyone can check if email exists" ON newsletter_signups
  FOR SELECT
  TO public  -- Wichtig: public für duplicate check!
  USING (true);

CREATE POLICY "Only admins can view all signups" ON newsletter_signups
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 3. CHILD PROFILES (Für App-Features)
-- ============================================
CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  age_years INTEGER NOT NULL CHECK (age_years >= 0 AND age_years <= 18),
  age_months INTEGER DEFAULT 0 CHECK (age_months >= 0 AND age_months < 12),
  personality_traits TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index für Performance
CREATE INDEX idx_child_profiles_user_id ON child_profiles(user_id);

-- RLS für Child Profiles
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;

-- Child Profiles Policies
CREATE POLICY "Users can view own children" ON child_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own children" ON child_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own children" ON child_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own children" ON child_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 4. CHAT HISTORY (Für App-Features)
-- ============================================
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_profile_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  intent TEXT,
  feedback TEXT CHECK (feedback IN ('positive', 'negative')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes für Performance
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_session_id ON chat_history(session_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at DESC);

-- RLS für Chat History
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Chat History Policies
CREATE POLICY "Users can view own chat history" ON chat_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages" ON chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback" ON chat_history
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 5. USAGE ANALYTICS (Für Insights)
-- ============================================
CREATE TABLE IF NOT EXISTS usage_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index für Performance
CREATE INDEX idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX idx_usage_analytics_event_type ON usage_analytics(event_type);
CREATE INDEX idx_usage_analytics_created_at ON usage_analytics(created_at DESC);

-- RLS für Usage Analytics
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

-- Usage Analytics Policies
CREATE POLICY "Users can insert own analytics" ON usage_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own analytics" ON usage_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all analytics" ON usage_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 6. TRIGGERS & FUNCTIONS
-- ============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id, 
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_child_profiles_updated_at 
  BEFORE UPDATE ON child_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. HELPER FUNCTIONS
-- ============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's active child profile
CREATE OR REPLACE FUNCTION get_active_child_profile(user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  age_years INTEGER,
  age_months INTEGER,
  personality_traits TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT cp.id, cp.name, cp.age_years, cp.age_months, cp.personality_traits
  FROM child_profiles cp
  WHERE cp.user_id = $1 
  AND cp.is_active = true
  ORDER BY cp.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 8. INITIAL ADMIN USER (Optional)
-- ============================================
-- Uncomment und passe die Email an für ersten Admin:
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE email = 'deine-admin-email@example.com';

-- ============================================
-- 9. PERFORMANCE VIEWS
-- ============================================

-- View für User Dashboard Stats
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
  p.id as user_id,
  p.email,
  p.full_name,
  COUNT(DISTINCT cp.id) as child_profiles_count,
  COUNT(DISTINCT ch.session_id) as chat_sessions_count,
  COUNT(ch.id) FILTER (WHERE ch.role = 'user') as messages_sent,
  MAX(ch.created_at) as last_activity
FROM profiles p
LEFT JOIN child_profiles cp ON p.id = cp.user_id
LEFT JOIN chat_history ch ON p.id = ch.user_id
WHERE p.id = auth.uid()
GROUP BY p.id, p.email, p.full_name;

-- Grant access to views
GRANT SELECT ON user_dashboard_stats TO authenticated;

-- ============================================
-- TEST QUERIES
-- ============================================
-- Test Newsletter Signup (sollte funktionieren):
-- INSERT INTO newsletter_signups (email, source) VALUES ('test@example.com', 'test');
-- SELECT * FROM newsletter_signups WHERE email = 'test@example.com';